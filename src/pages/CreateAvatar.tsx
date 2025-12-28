import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Upload, Mic, Camera, Check, X, Play, Square,
  AlertCircle, Info, Globe, Lock, Loader2, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  { id: 1, name: 'Info' },
  { id: 2, name: 'Upload' },
  { id: 3, name: 'Process' },
  { id: 4, name: 'Train' },
  { id: 5, name: 'Generate' },
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

  const [isRecording, setIsRecording] = useState(false);

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
              <label className="block text-sm font-medium mb-1.5">Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="input-field"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Privacy</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, privacy: 'private' })}
                  className={`p-3 rounded-lg border text-left text-sm ${
                    formData.privacy === 'private' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <Lock className="w-4 h-4 mb-1" />
                  <p className="font-medium">Private</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, privacy: 'public' })}
                  className={`p-3 rounded-lg border text-left text-sm ${
                    formData.privacy === 'public' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <Globe className="w-4 h-4 mb-1" />
                  <p className="font-medium">Public</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="card-simple p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Photo</span>
                </div>
                <div className="upload-zone aspect-square mb-3">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm font-medium">Drop photo here</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG • 1024×1024</p>
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>Center face, neutral expression, good lighting</span>
                </div>
              </div>

              {/* Voice */}
              <div className="card-simple p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Mic className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Voice (30-60s)</span>
                </div>

                <div className="flex justify-center mb-4">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isRecording ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </button>
                </div>

                <p className="text-xs text-center text-muted-foreground mb-4">
                  {isRecording ? 'Recording...' : 'Click to record'}
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

                <button className="w-full p-3 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50">
                  Upload MP3/WAV
                </button>
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
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-simple p-5">
                <h3 className="font-medium mb-4">Face Detection</h3>
                <div className="aspect-square rounded-lg bg-muted flex items-center justify-center mb-4">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Face detected: 1</span>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Re-detect
                  </Button>
                </div>
              </div>

              <div className="card-simple p-5">
                <h3 className="font-medium mb-4">Audio Cleaning</h3>
                <div className="aspect-[2/1] rounded-lg bg-muted mb-4" />
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Noise Reduction</span>
                      <span className="text-muted-foreground">40%</span>
                    </div>
                    <input type="range" className="w-full" defaultValue={40} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <Check className="w-4 h-4" />
                    Audio quality: Good
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-md mx-auto animate-fade-in">
            <div className="card-simple p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                  <circle
                    cx="64" cy="64" r="56"
                    fill="none" stroke="currentColor" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * 0.33}`}
                    className="text-primary transition-all"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">67%</span>
                </div>
              </div>

              <h2 className="text-lg font-semibold mb-2">Training in Progress</h2>
              <p className="text-sm text-muted-foreground mb-6">Estimated: 3 min remaining</p>

              <div className="grid grid-cols-3 gap-3 mb-6 text-sm">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="font-semibold">67/100</p>
                  <p className="text-xs text-muted-foreground">Epochs</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="font-semibold">3:24</p>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="font-semibold">85%</p>
                  <p className="text-xs text-muted-foreground">GPU</p>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm">Preview</Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 card-simple p-5">
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary ml-1" />
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

                <div>
                  <label className="block text-sm font-medium mb-1.5">Script</label>
                  <textarea
                    placeholder="Enter text for your avatar to speak..."
                    className="input-field min-h-[100px] resize-none"
                    defaultValue="Hello! This is my AI-generated avatar speaking."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="card-simple p-4">
                  <h3 className="font-medium mb-3 text-sm">Voice Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Speed</span>
                        <span className="text-muted-foreground">1.0x</span>
                      </div>
                      <input type="range" className="w-full" defaultValue={50} />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Pitch</span>
                        <span className="text-muted-foreground">0</span>
                      </div>
                      <input type="range" className="w-full" defaultValue={50} />
                    </div>
                  </div>
                </div>

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
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
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
          <Button onClick={handleNext} disabled={currentStep === 5}>
            {currentStep === 4 ? 'View Results' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CreateAvatar;
