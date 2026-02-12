import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Upload, Mic, Camera, Check, Play, Square,
  Info, X, Pause, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatarPreview from '@/assets/avatar-preview.jpg';

const steps = [
  { id: 1, name: 'Info' },
  { id: 2, name: 'Upload' },
  { id: 3, name: 'Generate' },
];

const sampleSentences = [
  "Hello, my name is [Your Name], and I'm excited to create my digital avatar.",
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Technology continues to evolve, making our lives more connected than ever.",
];

const CreateAvatar = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: 'en',
    privacy: 'private',
    consent: false,
  });

  // Photo upload state
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSizeWarning, setImageSizeWarning] = useState<string | null>(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraGuide, setCameraGuide] = useState<{
    brightness: 'low' | 'ok' | 'high';
    centered: boolean;
    stable: boolean;
  }>({ brightness: 'ok', centered: false, stable: false });
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, []);

  // Handle image file selection
  const handleImageSelect = (file: File) => {
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      alert('Please upload a JPG or PNG image only.');
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (img.width !== 1024 || img.height !== 1024) {
        setImageSizeWarning(`Image is ${img.width}×${img.height}. Recommended: 1024×1024`);
      } else {
        setImageSizeWarning(null);
      }
    };
    img.src = url;

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setUploadedImage(file);
    setImagePreview(url);
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingImage(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageSelect(file);
  };

  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingImage(true);
  };

  const handleImageDragLeave = () => {
    setIsDraggingImage(false);
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setUploadedImage(null);
    setImagePreview(null);
    setImageSizeWarning(null);
  };

  // Camera analysis: brightness + center region skin-tone detection
  const analyzeFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx || video.videoWidth === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const w = canvas.width;
    const h = canvas.height;

    // 1. Overall brightness
    const fullData = ctx.getImageData(0, 0, w, h).data;
    let totalBrightness = 0;
    const pixelCount = w * h;
    for (let i = 0; i < fullData.length; i += 16) { // sample every 4th pixel
      totalBrightness += (fullData[i] * 0.299 + fullData[i + 1] * 0.587 + fullData[i + 2] * 0.114);
    }
    const avgBrightness = totalBrightness / (pixelCount / 4);

    // 2. Center region: check for skin-tone-like pixels (face proxy)
    const cx = Math.floor(w * 0.3);
    const cy = Math.floor(h * 0.15);
    const cw = Math.floor(w * 0.4);
    const ch = Math.floor(h * 0.55);
    const centerData = ctx.getImageData(cx, cy, cw, ch).data;
    let skinPixels = 0;
    const centerPixelCount = cw * ch;
    for (let i = 0; i < centerData.length; i += 16) {
      const r = centerData[i], g = centerData[i + 1], b = centerData[i + 2];
      // Simple skin tone heuristic (works across various skin tones)
      if (r > 60 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 10 && r - b > 15) {
        skinPixels++;
      }
    }
    const skinRatio = skinPixels / (centerPixelCount / 4);

    // 3. Edge region check: face should NOT be heavily at edges
    const edgeData = ctx.getImageData(0, 0, Math.floor(w * 0.15), h).data;
    let edgeSkin = 0;
    for (let i = 0; i < edgeData.length; i += 16) {
      const r = edgeData[i], g = edgeData[i + 1], b = edgeData[i + 2];
      if (r > 60 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 10 && r - b > 15) {
        edgeSkin++;
      }
    }
    const edgeSkinRatio = edgeSkin / (Math.floor(w * 0.15) * h / 4);

    const centered = skinRatio > 0.12 && edgeSkinRatio < skinRatio * 0.6;
    const brightness: 'low' | 'ok' | 'high' = avgBrightness < 60 ? 'low' : avgBrightness > 210 ? 'high' : 'ok';

    setCameraGuide({ brightness, centered, stable: centered && brightness === 'ok' });
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1024 }, height: { ideal: 1024 } }
      });
      cameraStreamRef.current = stream;
      setIsCameraOpen(true);
      setCameraGuide({ brightness: 'ok', centered: false, stable: false });
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          // Start real-time analysis every 300ms
          analysisIntervalRef.current = setInterval(analyzeFrame, 300);
        }
      }, 200);
    } catch {
      alert('Could not access camera. Please allow camera access and try again.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera-photo.png', { type: 'image/png' });
        handleImageSelect(file);
      }
    }, 'image/png');
    closeCamera();
  };

  const closeCamera = () => {
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => track.stop());
      cameraStreamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioBlob(blob);
        setAudioUrl(url);
        setAudioDuration(recordingDuration);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      alert('Could not access microphone. Please allow microphone access and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      // Clear previous recording
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioBlob(null);
      setAudioUrl(null);
      setAudioDuration(0);
      startRecording();
    }
  };

  const handleAudioFileSelect = (file: File) => {
    if (!file.type.match(/^audio\/(mpeg|wav|mp3|x-wav)$/)) {
      alert('Please upload an MP3 or WAV file only.');
      return;
    }

    const url = URL.createObjectURL(file);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(file);
    setAudioUrl(url);

    // Get duration
    const audio = new Audio(url);
    audio.onloadedmetadata = () => {
      setAudioDuration(Math.round(audio.duration));
    };
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const removeAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setAudioDuration(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-lg mx-auto space-y-5 animate-fade-in">
            <div>
              <label className="block text-sm font-medium mb-1.5">Avatar Name *</label>
              <input
                type="text"
                placeholder="My Professional Avatar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <textarea
                placeholder="What will this avatar be used for?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field min-h-[80px] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Script</label>
              <textarea
                placeholder="Enter text for your avatar to speak..."
                className="input-field min-h-[100px] resize-none"
                defaultValue="Hello! This is my AI-generated avatar speaking."
              />
            </div>

          </div>
        );

      case 2:
        return (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="card-simple p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Photo</span>
                </div>

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
                  className="hidden"
                />

                <div
                  onClick={() => !imagePreview && imageInputRef.current?.click()}
                  onDrop={handleImageDrop}
                  onDragOver={handleImageDragOver}
                  onDragLeave={handleImageDragLeave}
                  className={`upload-zone aspect-square mb-3 relative overflow-hidden cursor-pointer transition-colors ${
                    isDraggingImage ? 'border-primary bg-primary/5' : ''
                  } ${imagePreview ? 'border-solid' : ''}`}
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            imageInputRef.current?.click();
                          }}
                        >
                          Change Photo
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage();
                          }}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm font-medium">Drop photo here</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG • 1024×1024</p>
                    </>
                  )}
                </div>

                {isCameraOpen && (
                  <div className="relative aspect-square mb-3 rounded-lg overflow-hidden border border-border bg-black">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Face guide oval */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className={`w-[55%] h-[70%] rounded-full border-[3px] transition-colors duration-300 ${
                          cameraGuide.stable
                            ? 'border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.4)]'
                            : cameraGuide.centered
                              ? 'border-yellow-400'
                              : 'border-white/50'
                        }`}
                      />
                    </div>

                    {/* Corner brackets */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className={`absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 rounded-tl transition-colors duration-300 ${cameraGuide.stable ? 'border-green-400' : 'border-white/40'}`} />
                      <div className={`absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr transition-colors duration-300 ${cameraGuide.stable ? 'border-green-400' : 'border-white/40'}`} />
                      <div className={`absolute bottom-14 left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl transition-colors duration-300 ${cameraGuide.stable ? 'border-green-400' : 'border-white/40'}`} />
                      <div className={`absolute bottom-14 right-3 w-6 h-6 border-b-2 border-r-2 rounded-br transition-colors duration-300 ${cameraGuide.stable ? 'border-green-400' : 'border-white/40'}`} />
                    </div>

                    {/* Status banner */}
                    <div className="absolute top-2 left-0 right-0 flex flex-col items-center pointer-events-none">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-colors duration-300 ${
                        cameraGuide.stable ? 'bg-green-500/80 text-white' : 'bg-black/60 text-white'
                      }`}>
                        {cameraGuide.stable
                          ? '✓ Ready to capture!'
                          : cameraGuide.centered
                            ? 'Almost there...'
                            : 'Position your face in the oval'}
                      </div>
                    </div>

                    {/* Status chips */}
                    <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-sm ${
                        cameraGuide.brightness === 'ok' ? 'bg-green-500/70 text-white' : 'bg-yellow-500/70 text-white'
                      }`}>
                        {cameraGuide.brightness === 'low' ? '☀ More light' : cameraGuide.brightness === 'high' ? '☀ Too bright' : '☀ Good light'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-sm ${
                        cameraGuide.centered ? 'bg-green-500/70 text-white' : 'bg-yellow-500/70 text-white'
                      }`}>
                        {cameraGuide.centered ? '◎ Centered' : '◎ Center face'}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-3">
                      <Button variant="destructive" size="sm" onClick={closeCamera}>
                        <X className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                      <Button variant="default" size="sm" onClick={capturePhoto}>
                        <Camera className="w-4 h-4 mr-1" /> Capture
                      </Button>
                    </div>
                  </div>
                )}

                {!imagePreview && !isCameraOpen && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mb-3"
                    onClick={openCamera}
                  >
                    <Camera className="w-4 h-4 mr-1" /> Take Photo
                  </Button>
                )}
                {imageSizeWarning && (
                  <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-500 mb-2">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                    <span>{imageSizeWarning}</span>
                  </div>
                )}

                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>Center face, neutral expression, good lighting</span>
                </div>
              </div>

              {/* Voice Recording */}
              <div className="card-simple p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">Voice (30-60s)</span>
                  </div>
                  {audioUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeAudio}
                      className="text-destructive hover:text-destructive h-7 px-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {!audioUrl ? (
                  <>
                    <div className="flex flex-col items-center mb-4">
                      <button
                        onClick={toggleRecording}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                          isRecording
                            ? 'bg-destructive text-destructive-foreground animate-pulse'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                      >
                        {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                      </button>
                      {isRecording && (
                        <p className="text-sm font-medium mt-3 text-destructive">
                          Recording... {formatTime(recordingDuration)}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-center text-muted-foreground mb-4">
                      {isRecording ? 'Click to stop recording' : 'Click to start recording'}
                    </p>

                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {sampleSentences.map((s, i) => (
                        <p key={i} className="text-xs text-muted-foreground p-2 bg-muted rounded">{s}</p>
                      ))}
                    </div>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-2 bg-card text-xs text-muted-foreground">or upload</span>
                      </div>
                    </div>

                    <input
                      ref={audioInputRef}
                      type="file"
                      accept="audio/mpeg,audio/wav,audio/mp3"
                      onChange={(e) => e.target.files?.[0] && handleAudioFileSelect(e.target.files[0])}
                      className="hidden"
                    />

                    <button
                      onClick={() => audioInputRef.current?.click()}
                      className="w-full p-3 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:bg-muted/50 transition-colors"
                    >
                      Upload MP3/WAV
                    </button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4 py-6">
                      <button
                        onClick={togglePlayback}
                        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </button>
                      <div className="text-center">
                        <p className="text-sm font-medium">Audio Ready</p>
                        <p className="text-xs text-muted-foreground">Duration: {formatTime(audioDuration)}</p>
                      </div>
                    </div>

                    <audio
                      ref={audioRef}
                      src={audioUrl}
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />

                    {audioDuration > 0 && audioDuration < 30 && (
                      <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-500">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                        <span>Recording is shorter than 30 seconds. Longer recordings produce better results.</span>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        removeAudio();
                      }}
                    >
                      Record Again
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg border border-border bg-muted/30">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="w-4 h-4 rounded mt-0.5"
                />
                <span className="text-sm text-muted-foreground">
                  I confirm I own the rights to the uploaded content and consent to processing.
                </span>
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 card-simple p-5">
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-4 overflow-hidden relative">
                  <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Button variant="ghost" size="icon">
                    <Play className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 h-1.5 rounded-full bg-muted">
                    <div className="h-full w-1/3 rounded-full bg-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">0:08 / 0:24</span>
                </div>

              </div>

              <div className="space-y-4">
                <div className="card-simple p-4">
                  <h3 className="font-medium mb-3 text-sm">Export</h3>
                  <Button className="w-full mb-2">Generate Video</Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">720p</Button>
                    <Button variant="outline" size="sm">1080p</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">Save Draft</Button>
            <Button variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                  className={`stepper-number ${
                    currentStep > step.id ? 'completed' : currentStep === step.id ? 'active' : 'pending'
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </button>
                <span className={`ml-2 text-sm hidden sm:inline ${
                  currentStep === step.id ? 'font-medium' : 'text-muted-foreground'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && <div className="w-8 h-px bg-border mx-3" />}
              </div>
            ))}
          </div>
          <div className="mt-3 progress-bar">
            <div className="progress-bar-fill" style={{ width: `${(currentStep / steps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderStepContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background sticky bottom-0">
        <div className="container mx-auto px-4 py-3 flex justify-between">
          <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentStep === 3}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CreateAvatar;
