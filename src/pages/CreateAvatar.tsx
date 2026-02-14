import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Upload, Mic, Camera, Check, Play, Square,
  Info, X, Pause, AlertTriangle, RefreshCw, SwitchCamera, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatarPreview from '@/assets/avatar-preview.jpg';

const steps = [
  { id: 1, name: 'Info' },
  { id: 2, name: 'Photo' },
  { id: 3, name: 'Voice' },
  { id: 4, name: 'Generate' },
];

const sampleSentences = [
  "Hello, my name is [Your Name], and I'm excited to create my digital avatar.",
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Technology continues to evolve, making our lives more connected than ever.",
];

const photoTips = [
  { icon: '💡', title: 'Good Lighting', desc: 'Face a window or lamp. Avoid backlight.' },
  { icon: '🎯', title: 'Center Your Face', desc: 'Keep your face centered in the oval guide.' },
  { icon: '😐', title: 'Neutral Expression', desc: 'Relax your face with a slight smile.' },
  { icon: '📐', title: 'Straight Angle', desc: 'Hold the camera at eye level, look directly at it.' },
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
  }>({ brightness: 'low', centered: false, stable: false });
  const [autoCountdown, setAutoCountdown] = useState<number | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const centeredHistoryRef = useRef<boolean[]>([]);
  const brightnessHistoryRef = useRef<('low' | 'ok' | 'high')[]>([]);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const stableStartRef = useRef<number | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      closeCamera();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
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

  const handleImageDragLeave = () => setIsDraggingImage(false);

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setUploadedImage(null);
    setImagePreview(null);
    setImageSizeWarning(null);
  };

  // ─── Stricter skin-tone detection ───
  const isSkinTone = (r: number, g: number, b: number) => {
    // Require minimum brightness to avoid dark noise
    if (r < 60 || g < 40 || b < 20) return false;
    // R must be dominant
    if (r <= g || r <= b) return false;
    // Enough separation between channels
    if ((r - g) < 10 || (r - b) < 15) return false;
    // HSV saturation check
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    // Skin has moderate saturation, not too grey, not too vivid
    return sat > 0.1 && sat < 0.65;
  };

  // ─── Frame analysis with edge comparison ───
  const analyzeFrame = useCallback(() => {
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

    // 1. Brightness - sample every 12th pixel
    const fullData = ctx.getImageData(0, 0, w, h).data;
    let totalBrightness = 0;
    let sampleCount = 0;
    for (let i = 0; i < fullData.length; i += 48) {
      totalBrightness += fullData[i] * 0.299 + fullData[i + 1] * 0.587 + fullData[i + 2] * 0.114;
      sampleCount++;
    }
    const avgBrightness = totalBrightness / sampleCount;

    // 2. Center oval region skin detection
    const cx = Math.floor(w * 0.3);
    const cy = Math.floor(h * 0.15);
    const cw = Math.floor(w * 0.4);
    const ch = Math.floor(h * 0.55);
    const centerData = ctx.getImageData(cx, cy, cw, ch).data;
    let centerSkin = 0;
    let centerTotal = 0;
    for (let i = 0; i < centerData.length; i += 16) {
      if (isSkinTone(centerData[i], centerData[i + 1], centerData[i + 2])) centerSkin++;
      centerTotal++;
    }
    const centerRatio = centerSkin / centerTotal;

    // 3. Edge regions (left+right strips) - face should NOT be there predominantly
    const edgeW = Math.floor(w * 0.15);
    const leftData = ctx.getImageData(0, 0, edgeW, h).data;
    const rightData = ctx.getImageData(w - edgeW, 0, edgeW, h).data;
    let edgeSkin = 0;
    let edgeTotal = 0;
    for (let i = 0; i < leftData.length; i += 16) {
      if (isSkinTone(leftData[i], leftData[i + 1], leftData[i + 2])) edgeSkin++;
      edgeTotal++;
    }
    for (let i = 0; i < rightData.length; i += 16) {
      if (isSkinTone(rightData[i], rightData[i + 1], rightData[i + 2])) edgeSkin++;
      edgeTotal++;
    }
    const edgeRatio = edgeSkin / edgeTotal;

    // Face centered: significant skin in center AND center >> edges
    const rawCentered = centerRatio > 0.15 && centerRatio > edgeRatio * 2;

    // Brightness thresholds
    const rawBrightness: 'low' | 'ok' | 'high' =
      avgBrightness < 70 ? 'low' : avgBrightness > 200 ? 'high' : 'ok';

    // Smoothing over last 7 frames
    const cHist = centeredHistoryRef.current;
    const bHist = brightnessHistoryRef.current;
    cHist.push(rawCentered);
    bHist.push(rawBrightness);
    if (cHist.length > 7) cHist.shift();
    if (bHist.length > 7) bHist.shift();

    const centered = cHist.filter(Boolean).length >= 4;
    const bCounts = { low: 0, ok: 0, high: 0 };
    bHist.forEach(b => bCounts[b]++);
    const brightness = (Object.keys(bCounts) as ('low' | 'ok' | 'high')[])
      .reduce((a, b) => bCounts[a] >= bCounts[b] ? a : b);

    const stable = centered && brightness === 'ok';
    setCameraGuide({ brightness, centered, stable });

    // Auto-capture: start 3s countdown when stable
    if (stable) {
      if (!stableStartRef.current) {
        stableStartRef.current = Date.now();
        setAutoCountdown(3);
        countdownRef.current = setInterval(() => {
          const elapsed = Math.floor((Date.now() - (stableStartRef.current || Date.now())) / 1000);
          const remaining = 3 - elapsed;
          if (remaining <= 0) {
            setAutoCountdown(null);
            if (countdownRef.current) clearInterval(countdownRef.current);
            capturePhoto();
          } else {
            setAutoCountdown(remaining);
          }
        }, 500);
      }
    } else {
      // Reset countdown
      stableStartRef.current = null;
      setAutoCountdown(null);
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    }
  }, []);

  const openCamera = async (facing: 'user' | 'environment' = facingMode) => {
    closeCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1024 }, height: { ideal: 1024 } }
      });
      cameraStreamRef.current = stream;
      setIsCameraOpen(true);
      setFacingMode(facing);
      // Reset detection state
      centeredHistoryRef.current = [];
      brightnessHistoryRef.current = [];
      stableStartRef.current = null;
      setAutoCountdown(null);
      setCameraGuide({ brightness: 'low', centered: false, stable: false });
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          analysisIntervalRef.current = setInterval(analyzeFrame, 250);
        }
      }, 300);
    } catch {
      alert('Could not access camera. Please allow camera access and try again.');
    }
  };

  const flipCamera = () => {
    openCamera(facingMode === 'user' ? 'environment' : 'user');
  };

  const capturePhoto = useCallback(() => {
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
  }, []);

  const closeCamera = () => {
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => track.stop());
      cameraStreamRef.current = null;
    }
    stableStartRef.current = null;
    setAutoCountdown(null);
    setIsCameraOpen(false);
  };

  // ─── Voice recording with waveform ───
  const drawWaveform = useCallback(() => {
    if (!analyserRef.current || !waveformCanvasRef.current) return;
    const analyser = analyserRef.current;
    const canvas = waveformCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      // Calculate audio level for meter
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = (dataArray[i] - 128) / 128;
        sum += v * v;
      }
      setAudioLevel(Math.sqrt(sum / bufferLength));

      ctx.fillStyle = 'hsl(220, 20%, 13%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'hsl(220, 60%, 55%)';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    draw();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Setup analyser for waveform
      const audioCtx = new AudioContext();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioBlob(blob);
        setAudioUrl(url);
        setAudioDuration(recordingDuration);
        stream.getTracks().forEach(track => track.stop());
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        setAudioLevel(0);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      // Start waveform drawing
      setTimeout(drawWaveform, 100);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
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
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioBlob(null);
      setAudioUrl(null);
      setAudioDuration(0);
      startRecording();
    }
  };

  const handleAudioFileSelect = (file: File) => {
    if (!file.type.match(/^audio\/(mpeg|wav|mp3|x-wav|webm)$/)) {
      alert('Please upload an MP3 or WAV file only.');
      return;
    }
    const url = URL.createObjectURL(file);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(file);
    setAudioUrl(url);
    const audio = new Audio(url);
    audio.onloadedmetadata = () => setAudioDuration(Math.round(audio.duration));
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
    if (audioRef.current) audioRef.current.pause();
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
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // ─── Step 1: Info ───
  const renderInfoStep = () => (
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

  // ─── Step 2: Photo ───
  const renderPhotoStep = () => (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-1">Upload Your Photo</h2>
        <p className="text-sm text-muted-foreground">A clear, well-lit face photo produces the best avatar</p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Main photo area */}
        <div className="md:col-span-3 card-simple p-5">
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
            className="hidden"
          />

          {isCameraOpen ? (
            <div className="relative aspect-square rounded-lg overflow-hidden border border-border bg-black">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
              <canvas ref={canvasRef} className="hidden" />

              {/* Face guide oval */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-[55%] h-[70%] rounded-full border-[3px] transition-colors duration-500 ${
                  cameraGuide.stable
                    ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                    : cameraGuide.centered
                      ? 'border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]'
                      : 'border-white/40'
                }`} />
              </div>

              {/* Corner brackets */}
              <div className="absolute inset-0 pointer-events-none">
                {['top-3 left-3 border-t-2 border-l-2 rounded-tl', 'top-3 right-3 border-t-2 border-r-2 rounded-tr', 'bottom-14 left-3 border-b-2 border-l-2 rounded-bl', 'bottom-14 right-3 border-b-2 border-r-2 rounded-br'].map((cls, i) => (
                  <div key={i} className={`absolute w-6 h-6 ${cls} transition-colors duration-300 ${cameraGuide.stable ? 'border-green-400' : 'border-white/40'}`} />
                ))}
              </div>

              {/* Status banner */}
              <div className="absolute top-2 left-0 right-0 flex flex-col items-center pointer-events-none">
                <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-colors duration-300 ${
                  cameraGuide.stable ? 'bg-green-500/80 text-white' : 'bg-black/60 text-white'
                }`}>
                  {autoCountdown !== null
                    ? `📸 Capturing in ${autoCountdown}...`
                    : cameraGuide.stable
                      ? '✓ Perfect! Hold still...'
                      : cameraGuide.centered
                        ? 'Almost there — check lighting'
                        : 'Position your face in the oval'}
                </div>
              </div>

              {/* Status chips */}
              <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-sm ${
                  cameraGuide.brightness === 'ok' ? 'bg-green-500/70 text-white' : 'bg-yellow-500/70 text-white'
                }`}>
                  {cameraGuide.brightness === 'low' ? '☀ More light needed' : cameraGuide.brightness === 'high' ? '☀ Too bright' : '☀ Good light'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-sm ${
                  cameraGuide.centered ? 'bg-green-500/70 text-white' : 'bg-yellow-500/70 text-white'
                }`}>
                  {cameraGuide.centered ? '◎ Face centered' : '◎ Center your face'}
                </span>
              </div>

              {/* Action buttons */}
              <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
                <Button variant="destructive" size="sm" onClick={closeCamera}>
                  <X className="w-4 h-4 mr-1" /> Cancel
                </Button>
                <Button variant="outline" size="sm" className="bg-black/40 border-white/20 text-white hover:bg-black/60" onClick={flipCamera}>
                  <SwitchCamera className="w-4 h-4" />
                </Button>
                <Button variant="default" size="sm" onClick={capturePhoto}>
                  <Camera className="w-4 h-4 mr-1" /> Capture
                </Button>
              </div>
            </div>
          ) : imagePreview ? (
            <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
              <img src={imagePreview} alt="Uploaded preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => imageInputRef.current?.click()}>
                  Change Photo
                </Button>
                <Button variant="secondary" size="sm" onClick={() => openCamera()}>
                  <Camera className="w-4 h-4 mr-1" /> Retake
                </Button>
                <Button variant="destructive" size="sm" onClick={removeImage}>
                  <X className="w-4 h-4 mr-1" /> Remove
                </Button>
              </div>
              {imageSizeWarning && (
                <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 text-xs text-yellow-200 bg-black/60 rounded px-2 py-1">
                  <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <span>{imageSizeWarning}</span>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => imageInputRef.current?.click()}
              onDrop={handleImageDrop}
              onDragOver={handleImageDragOver}
              onDragLeave={handleImageDragLeave}
              className={`upload-zone aspect-square cursor-pointer ${isDraggingImage ? 'border-primary bg-primary/5' : ''}`}
            >
              <Upload className="w-10 h-10 text-muted-foreground" />
              <p className="text-sm font-medium">Drop photo here or click to browse</p>
              <p className="text-xs text-muted-foreground">JPG, PNG • Recommended 1024×1024</p>
            </div>
          )}

          {!imagePreview && !isCameraOpen && (
            <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => openCamera()}>
              <Camera className="w-4 h-4 mr-1" /> Take Photo with Camera
            </Button>
          )}
        </div>

        {/* Tips sidebar */}
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" /> Photo Tips
          </h3>
          {photoTips.map((tip, i) => (
            <div key={i} className="card-simple p-3 flex items-start gap-3">
              <span className="text-lg">{tip.icon}</span>
              <div>
                <p className="text-sm font-medium">{tip.title}</p>
                <p className="text-xs text-muted-foreground">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── Step 3: Voice ───
  const renderVoiceStep = () => (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-1">Record Your Voice</h2>
        <p className="text-sm text-muted-foreground">Read the sample text aloud for 30–60 seconds to clone your voice</p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Main voice area */}
        <div className="md:col-span-3 card-simple p-5">
          {!audioUrl ? (
            <>
              {/* Waveform visualizer */}
              <div className="rounded-lg overflow-hidden border border-border mb-4 bg-card">
                <canvas
                  ref={waveformCanvasRef}
                  width={400}
                  height={100}
                  className="w-full h-24"
                />
              </div>

              {/* Audio level meter */}
              {isRecording && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Volume Level</span>
                    <span className={`text-xs font-medium ${audioLevel < 0.02 ? 'text-yellow-500' : audioLevel > 0.5 ? 'text-destructive' : 'text-accent'}`}>
                      {audioLevel < 0.02 ? 'Too quiet' : audioLevel > 0.5 ? 'Too loud' : 'Good'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-100 ${audioLevel < 0.02 ? 'bg-yellow-500' : audioLevel > 0.5 ? 'bg-destructive' : 'bg-accent'}`}
                      style={{ width: `${Math.min(audioLevel * 300, 100)}%` }}
                    />
                  </div>
                </div>
              )}

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
                    {recordingDuration >= 30 && <span className="text-accent ml-2">✓ Min reached</span>}
                  </p>
                )}
                {!isRecording && !audioUrl && (
                  <p className="text-xs text-muted-foreground mt-2">Tap to start recording</p>
                )}
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-card text-xs text-muted-foreground">or upload audio file</span>
                </div>
              </div>

              <input
                ref={audioInputRef}
                type="file"
                accept="audio/mpeg,audio/wav,audio/mp3,audio/webm"
                onChange={(e) => e.target.files?.[0] && handleAudioFileSelect(e.target.files[0])}
                className="hidden"
              />

              <button
                onClick={() => audioInputRef.current?.click()}
                className="w-full p-3 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:bg-muted/50 transition-colors"
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload MP3 / WAV
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 py-8">
                <button
                  onClick={togglePlayback}
                  className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                <div className="text-center">
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-accent" /> Audio Ready
                  </p>
                  <p className="text-xs text-muted-foreground">Duration: {formatTime(audioDuration)}</p>
                </div>
              </div>

              <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />

              {audioDuration > 0 && audioDuration < 30 && (
                <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-500">
                  <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <span>Recording is shorter than 30 seconds. Longer recordings produce better voice cloning.</span>
                </div>
              )}

              <Button variant="outline" className="w-full" onClick={removeAudio}>
                <RefreshCw className="w-4 h-4 mr-2" /> Record Again
              </Button>
            </div>
          )}
        </div>

        {/* Sample text sidebar */}
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-1.5">
            <Info className="w-4 h-4 text-primary" /> Read Aloud
          </h3>
          <p className="text-xs text-muted-foreground">Read these sentences clearly while recording:</p>
          {sampleSentences.map((s, i) => (
            <div key={i} className="card-simple p-3">
              <p className="text-sm text-muted-foreground leading-relaxed">{s}</p>
            </div>
          ))}
          <div className="card-simple p-3 border-primary/30 bg-primary/5">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Pro tip:</strong> Record in a quiet room. Speak naturally at a consistent pace and volume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Step 4: Generate ───
  const renderGenerateStep = () => (
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
            <Button variant="ghost" size="icon"><Play className="w-4 h-4" /></Button>
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderInfoStep();
      case 2: return renderPhotoStep();
      case 3: return renderVoiceStep();
      case 4: return renderGenerateStep();
      default: return null;
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

      {/* Consent checkbox on photo/voice steps */}
      {(currentStep === 2 || currentStep === 3) && (
        <div className="container mx-auto px-4 pt-4">
          <div className="max-w-2xl mx-auto">
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-border bg-muted/30">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="w-4 h-4 rounded mt-0.5"
              />
              <span className="text-xs text-muted-foreground">
                I confirm I own the rights to the uploaded content and consent to processing.
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderStepContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background sticky bottom-0">
        <div className="container mx-auto px-4 py-3 flex justify-between">
          <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <Button onClick={handleNext} disabled={currentStep === 4}>
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CreateAvatar;
