import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Upload, Mic, Camera, Check, Play, Square,
  Info
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

  const [isRecording, setIsRecording] = useState(false);

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
