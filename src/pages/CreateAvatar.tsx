import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Upload, Mic, Camera, Check, X, Play, Pause, Square,
  Sparkles, AlertCircle, Info, Globe, Lock, Loader2, Zap, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  { id: 1, name: 'Project Info', description: 'Basic details' },
  { id: 2, name: 'Upload Data', description: 'Photo & voice' },
  { id: 3, name: 'Preprocess', description: 'Align & clean' },
  { id: 4, name: 'Training', description: 'Model training' },
  { id: 5, name: 'Generate', description: 'Preview & export' },
];

const sampleSentences = [
  "Hello, my name is [Your Name], and I'm excited to create my digital avatar.",
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Technology continues to evolve, making our lives more connected than ever.",
  "Please remember to speak clearly and at a natural pace for best results.",
];

const CreateAvatar = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: 'en',
    privacy: 'private',
    imageFile: null as File | null,
    voiceFile: null as File | null,
    consent: false,
  });

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium mb-2">Avatar Name *</label>
              <input
                type="text"
                placeholder="e.g., My Professional Avatar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Short Description</label>
              <textarea
                placeholder="What will this avatar be used for?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field min-h-[100px] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="input-field"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Privacy Level</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, privacy: 'private' })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.privacy === 'private'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Lock className="w-6 h-6 mb-2 text-primary" />
                  <p className="font-medium">Private</p>
                  <p className="text-sm text-muted-foreground">Only you can access</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, privacy: 'public' })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.privacy === 'public'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Globe className="w-6 h-6 mb-2 text-accent" />
                  <p className="font-medium">Public</p>
                  <p className="text-sm text-muted-foreground">Visible in gallery</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Upload */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Upload Photo</h3>
                    <p className="text-sm text-muted-foreground">Single headshot image</p>
                  </div>
                </div>

                <div className="upload-zone aspect-square mb-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground">Drop your photo here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG • Max 10MB • 1024×1024 recommended</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Center your face and keep a neutral expression. Good lighting and a plain background work best.
                    </p>
                  </div>
                </div>
              </div>

              {/* Voice Upload/Record */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Voice Sample</h3>
                    <p className="text-sm text-muted-foreground">30-60 seconds recommended</p>
                  </div>
                </div>

                {/* Recording Interface */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                        isRecording
                          ? 'bg-destructive text-destructive-foreground animate-pulse'
                          : 'gradient-bg text-primary-foreground glow'
                      }`}
                    >
                      {isRecording ? (
                        <Square className="w-8 h-8" />
                      ) : (
                        <Mic className="w-8 h-8" />
                      )}
                    </button>
                  </div>

                  {/* Waveform */}
                  <div className="h-16 flex items-center justify-center gap-1 mb-4">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          isRecording ? 'bg-accent waveform-bar' : 'bg-muted h-4'
                        }`}
                        style={{
                          height: isRecording ? `${20 + Math.random() * 80}%` : undefined,
                          animationDelay: `${i * 0.03}s`,
                        }}
                      />
                    ))}
                  </div>

                  <p className="text-center text-sm text-muted-foreground mb-6">
                    {isRecording ? `Recording: ${recordingTime}s` : 'Click to start recording'}
                  </p>
                </div>

                {/* Sample Sentences */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-3">Sample sentences to read:</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {sampleSentences.map((sentence, i) => (
                      <p key={i} className="text-sm text-muted-foreground p-3 rounded-lg bg-muted/50">
                        {sentence}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Or Upload */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-card text-xs text-muted-foreground">or upload audio</span>
                  </div>
                </div>

                <button className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors text-center">
                  <Upload className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Upload MP3 or WAV file</p>
                </button>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="mt-8 p-6 rounded-2xl border border-border bg-muted/30">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="w-5 h-5 rounded border-border mt-0.5"
                />
                <span className="text-sm">
                  <strong className="text-foreground">I confirm I own the rights</strong>
                  <span className="text-muted-foreground"> to the uploaded photo and voice sample. I consent to their processing for avatar generation.</span>
                </span>
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Face Preview */}
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Face Detection & Alignment</h3>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 relative">
                  <div className="w-32 h-32 rounded-full border-4 border-accent border-dashed flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-accent/50" />
                  </div>
                  {/* Face Keypoints Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-40 h-48 border-2 border-primary/30 rounded-[60%]" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Face detected: 1</span>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Re-detect
                  </Button>
                </div>
              </div>

              {/* Audio Preview */}
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Audio Cleaning</h3>
                <div className="aspect-[2/1] rounded-xl bg-muted/50 flex items-center justify-center mb-4 relative">
                  {/* Waveform */}
                  <div className="flex items-center gap-0.5 h-full p-4">
                    {[...Array(50)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary/50 rounded-full"
                        style={{ height: `${20 + Math.random() * 60}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Noise Reduction</span>
                      <span className="text-sm text-muted-foreground">40%</span>
                    </div>
                    <input type="range" className="w-full" defaultValue={40} />
                  </div>

                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-sm text-accent">Audio quality: Good</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compute Options */}
            <div className="mt-8 p-6 rounded-2xl border border-border bg-muted/30">
              <h3 className="font-semibold mb-4">Compute Resources</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <button className="p-4 rounded-xl border-2 border-primary bg-primary/5 text-left">
                  <Zap className="w-6 h-6 mb-2 text-primary" />
                  <p className="font-medium">Cloud GPU</p>
                  <p className="text-sm text-muted-foreground">Fast processing (~8 min)</p>
                </button>
                <button className="p-4 rounded-xl border-2 border-border hover:border-primary/50 text-left transition-colors">
                  <Sparkles className="w-6 h-6 mb-2 text-muted-foreground" />
                  <p className="font-medium">CPU</p>
                  <p className="text-sm text-muted-foreground">Slower (~45 min)</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="glass-card-elevated p-8 text-center">
              {/* Progress Circle */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - 0.67)}`}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(270 55% 36%)" />
                      <stop offset="100%" stopColor="hsl(168 100% 37%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold">67%</span>
                  <span className="text-sm text-muted-foreground">Training</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2">Training in Progress</h2>
              <p className="text-muted-foreground mb-6">
                Your avatar is being created. This typically takes 8-10 minutes.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold">67/100</p>
                  <p className="text-xs text-muted-foreground">Epochs</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold">3:24</p>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-xs text-muted-foreground">GPU Usage</p>
                </div>
              </div>

              {/* Log */}
              <div className="text-left p-4 rounded-xl bg-foreground/5 font-mono text-xs space-y-1 mb-6">
                <p className="text-muted-foreground">[12:34:56] Loading voice embeddings...</p>
                <p className="text-muted-foreground">[12:35:12] Training face mesh: epoch 67/100</p>
                <p className="text-accent">[12:35:24] Checkpoint saved</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline">
                  Preview Sample
                </Button>
                <Button variant="ghost" className="text-destructive">
                  <X className="w-4 h-4 mr-2" />
                  Cancel Training
                </Button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Preview */}
              <div className="lg:col-span-2">
                <div className="glass-card-elevated p-6">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
                      <Play className="w-12 h-12 text-primary-foreground ml-2" />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-4 mb-6">
                    <Button variant="ghost" size="icon">
                      <Play className="w-5 h-5" />
                    </Button>
                    <div className="flex-1 h-2 rounded-full bg-muted">
                      <div className="h-full w-1/3 rounded-full gradient-bg" />
                    </div>
                    <span className="text-sm text-muted-foreground">0:08 / 0:24</span>
                  </div>

                  {/* Script Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Script</label>
                    <textarea
                      placeholder="Enter the text you want your avatar to speak..."
                      className="input-field min-h-[120px] resize-none"
                      defaultValue="Hello! This is my AI-generated avatar speaking. I can say anything you type here with my cloned voice."
                    />
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">Sample 1</Button>
                      <Button variant="outline" size="sm">Sample 2</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Voice Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Speed</span>
                        <span className="text-sm text-muted-foreground">1.0x</span>
                      </div>
                      <input type="range" className="w-full" defaultValue={50} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Pitch</span>
                        <span className="text-sm text-muted-foreground">0</span>
                      </div>
                      <input type="range" className="w-full" defaultValue={50} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Emotion</span>
                        <span className="text-sm text-muted-foreground">Neutral</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm">😊</Button>
                        <Button variant="secondary" size="sm">😐</Button>
                        <Button variant="outline" size="sm">😄</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Export Options</h3>
                  <div className="space-y-3">
                    <Button className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Video
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">MP4 720p</Button>
                      <Button variant="outline" size="sm">MP4 1080p</Button>
                    </div>
                    <Button variant="ghost" className="w-full" size="sm">
                      Audio only (MP3)
                    </Button>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Share</h3>
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-sm">Generate shareable link</span>
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Links expire after 7 days. Consent verification included.
                  </p>
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Save Draft
              </Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all ${
                    currentStep === step.id
                      ? 'bg-primary/10'
                      : currentStep > step.id
                      ? 'opacity-100'
                      : 'opacity-50'
                  }`}
                  onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                >
                  <div
                    className={`stepper-number ${
                      currentStep > step.id
                        ? 'completed'
                        : currentStep === step.id
                        ? 'active'
                        : 'pending'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className="font-medium text-sm">{step.name}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block w-12 h-px bg-border mx-2" />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Step {currentStep} of {steps.length} • Estimated time: 12 minutes
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {renderStepContent()}
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-border bg-background/80 backdrop-blur-md sticky bottom-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            <Button onClick={handleNext} disabled={currentStep === 5}>
              {currentStep === 4 ? 'View Results' : 'Continue'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateAvatar;
