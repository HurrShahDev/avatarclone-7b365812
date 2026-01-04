import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Search, Book, Upload, Mic, Video, Shield, Settings, 
  ChevronRight, ExternalLink, Zap, HelpCircle, FileText
} from 'lucide-react';

const docSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Book,
    articles: [
      { id: 'introduction', title: 'Introduction to AvatarClone', content: `
AvatarClone is an AI-powered platform that creates realistic digital avatars using your voice and face. Our technology combines advanced voice cloning with facial animation to produce natural-looking video content.

**What you can do:**
- Create personalized AI avatars from a single photo
- Clone your voice with just 30-60 seconds of audio
- Generate unlimited videos with your avatar
- Export in multiple formats (720p, 1080p)

**Who it's for:**
- Content creators looking to scale video production
- Educators creating personalized learning content
- Businesses automating video presentations
- Anyone wanting a digital twin for various applications
      `},
      { id: 'quick-start', title: 'Quick Start Guide', content: `
**Step 1: Create an Account**
Sign up with your email or GitHub account. You'll need to consent to our data processing terms.

**Step 2: Upload Your Photo**
Upload a clear headshot photo. Best results come from:
- Front-facing photos with good lighting
- Neutral expression
- Plain background
- Resolution of at least 512x512 pixels

**Step 3: Record Your Voice**
Record 30-60 seconds of your natural speech. Tips:
- Use a quiet environment
- Speak at your normal pace
- Read the provided sample sentences
- Keep consistent volume

**Step 4: Train Your Model**
Click "Train" and wait 5-10 minutes for your model to be ready.

**Step 5: Generate Videos**
Enter any script and generate videos with your avatar speaking the text.
      `},
      { id: 'system-requirements', title: 'System Requirements', content: `
**Browser Support:**
- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

**For Recording:**
- Microphone access required
- Minimum 128kbps audio quality

**For Best Experience:**
- Stable internet connection
- Modern device (2020 or newer recommended)
- JavaScript enabled
      `},
    ],
  },
  {
    id: 'upload-guide',
    title: 'Uploading Content',
    icon: Upload,
    articles: [
      { id: 'photo-requirements', title: 'Photo Requirements', content: `
**Supported Formats:**
- JPEG (.jpg, .jpeg)
- PNG (.png)

**Recommended Specifications:**
- Resolution: 1024x1024 pixels (minimum 512x512)
- File size: Under 10MB
- Color: RGB color space

**Best Practices:**
1. Use a recent photo that accurately represents you
2. Face the camera directly
3. Keep a neutral or slight smile expression
4. Ensure even lighting on your face
5. Avoid heavy makeup or accessories that obscure features
6. Use a plain, uncluttered background

**What to Avoid:**
- Blurry or low-resolution images
- Photos with multiple people
- Heavy filters or edits
- Extreme angles
- Sunglasses or face coverings
      `},
      { id: 'voice-requirements', title: 'Voice Sample Requirements', content: `
**Supported Formats:**
- MP3 (.mp3)
- WAV (.wav)
- WebM (from browser recording)

**Duration:**
- Minimum: 30 seconds
- Recommended: 60 seconds
- Maximum: 5 minutes

**Quality Tips:**
1. Record in a quiet room without echo
2. Use a decent microphone (even phone mics work)
3. Maintain consistent distance from the microphone
4. Speak naturally at your normal pace
5. Include variety in tone and pitch
6. Read the provided sample sentences for best results

**What to Avoid:**
- Background music or noise
- Whispering or shouting
- Multiple speakers
- Heavy audio processing
      `},
    ],
  },
  {
    id: 'voice-cloning',
    title: 'Voice Cloning',
    icon: Mic,
    articles: [
      { id: 'how-voice-cloning-works', title: 'How Voice Cloning Works', content: `
Our voice cloning technology uses neural networks to analyze and replicate the unique characteristics of your voice.

**The Process:**
1. **Feature Extraction**: We analyze pitch, tone, cadence, and pronunciation patterns
2. **Model Training**: A neural network learns to reproduce your voice characteristics
3. **Synthesis**: The trained model generates speech from any text input

**What Makes a Good Clone:**
- Diverse speech samples (questions, statements, emotions)
- Clear pronunciation
- Consistent recording quality

**Similarity Scores:**
After training, you'll see a similarity percentage:
- 90%+: Excellent match
- 80-90%: Good match, minor differences
- 70-80%: Recognizable but noticeable differences
- Below 70%: Consider re-recording with better samples
      `},
      { id: 'improving-voice-quality', title: 'Improving Voice Quality', content: `
**Recording Environment:**
- Use a small, carpeted room to reduce echo
- Close windows to minimize outside noise
- Turn off fans and AC during recording

**Microphone Tips:**
- Position 6-12 inches from your mouth
- Use a pop filter if available
- Avoid breathing directly into the mic

**Speaking Tips:**
- Warm up your voice before recording
- Stay hydrated
- Take breaks if you feel strain
- Read naturally, not robotically

**If Quality is Low:**
1. Check your recording environment for noise
2. Try a different microphone
3. Record longer samples (2-3 minutes)
4. Speak more clearly and slowly
      `},
    ],
  },
  {
    id: 'video-generation',
    title: 'Video Generation',
    icon: Video,
    articles: [
      { id: 'creating-videos', title: 'Creating Videos', content: `
**Writing Scripts:**
- Keep sentences natural and conversational
- Punctuation affects pacing (periods = pauses)
- Avoid very long sentences
- Include variety in sentence length

**Voice Settings:**
- **Speed**: Adjust how fast the avatar speaks (0.5x to 2x)
- **Pitch**: Modify the voice pitch slightly
- **Emotion**: Select neutral, happy, or serious tone

**Export Options:**
- 720p: Good for web and social media
- 1080p: Best quality for presentations
- Audio only: MP3 export for podcasts

**Processing Time:**
- Short clips (< 30s): 1-2 minutes
- Medium clips (30s-2min): 3-5 minutes
- Long clips (2min+): 5-10 minutes
      `},
      { id: 'export-sharing', title: 'Exporting & Sharing', content: `
**Download Options:**
- Direct download to your device
- Cloud storage links (7-day expiry)
- Embed codes for websites

**Sharing Settings:**
- Private: Only you can access
- Link sharing: Anyone with link can view
- Public: Listed in public gallery (requires consent)

**Watermarks:**
- Free plan: Small "AvatarClone" watermark
- Pro plan: No watermark
- Custom watermarks available on Enterprise

**Usage Rights:**
- You own all generated content
- Commercial use allowed on paid plans
- Attribution not required but appreciated
      `},
    ],
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    icon: Shield,
    articles: [
      { id: 'data-protection', title: 'Data Protection', content: `
**How We Protect Your Data:**
- End-to-end encryption for all uploads
- Data stored in SOC 2 compliant facilities
- Regular security audits
- No third-party data sharing

**Your Rights (GDPR):**
- Access: Download all your data anytime
- Rectification: Update your information
- Erasure: Delete your account and all data
- Portability: Export data in standard formats

**Data Retention:**
- Active accounts: Data retained while account is active
- Deleted accounts: Data purged within 30 days
- Backups: Encrypted and purged within 90 days
      `},
      { id: 'consent-policy', title: 'Consent Policy', content: `
**Why We Require Consent:**
Creating AI avatars involves processing biometric data. We take this seriously and require explicit consent.

**What You're Consenting To:**
1. Processing of your photo for face modeling
2. Processing of your voice for voice cloning
3. Storage of trained models on our servers
4. Generation of synthetic media using your likeness

**Revoking Consent:**
You can revoke consent anytime in Settings > Privacy. This will:
- Stop all processing immediately
- Queue your data for deletion
- Remove access to generated content

**Ethical Use:**
- Never use avatars to impersonate without permission
- Don't create misleading or harmful content
- Report misuse to our trust & safety team
      `},
    ],
  },
  {
    id: 'account-settings',
    title: 'Account & Settings',
    icon: Settings,
    articles: [
      { id: 'account-management', title: 'Account Management', content: `
**Updating Your Profile:**
1. Go to Settings > Account
2. Edit your name, email, or profile photo
3. Click Save to apply changes

**Changing Password:**
1. Go to Settings > Account
2. Enter current password
3. Enter and confirm new password
4. Click Update Password

**Two-Factor Authentication:**
1. Go to Settings > Security
2. Click Enable 2FA
3. Scan QR code with authenticator app
4. Enter verification code
      `},
      { id: 'billing', title: 'Billing & Plans', content: `
**Available Plans:**

**Free Plan:**
- 1 avatar
- 5 videos per month
- 720p export
- Watermarked videos

**Pro Plan ($19/month):**
- 10 avatars
- Unlimited videos
- 1080p export
- No watermarks
- Priority processing

**Enterprise:**
- Unlimited avatars
- Custom integrations
- Dedicated support
- Contact sales for pricing

**Managing Subscription:**
- Upgrade/downgrade in Settings > Billing
- Changes take effect at next billing cycle
- Refunds available within 14 days
      `},
    ],
  },
];

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeArticle, setActiveArticle] = useState('introduction');

  const currentSection = docSections.find(s => s.id === activeSection);
  const currentArticle = currentSection?.articles.find(a => a.id === activeArticle);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/home" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-semibold">Documentation</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-9 py-2 w-48 lg:w-64"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-4">
              {docSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      setActiveArticle(section.articles[0].id);
                    }}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </button>
                  
                  {activeSection === section.id && (
                    <ul className="mt-1 ml-6 space-y-1">
                      {section.articles.map((article) => (
                        <li key={article.id}>
                          <button
                            onClick={() => setActiveArticle(article.id)}
                            className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded text-sm ${
                              activeArticle === article.id
                                ? 'text-primary font-medium'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <ChevronRight className="w-3 h-3" />
                            {article.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>

            {/* Help Box */}
            <div className="mt-8 p-4 rounded-lg border border-border bg-muted/30">
              <HelpCircle className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-medium text-sm mb-1">Need help?</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Can't find what you're looking for?
              </p>
              <a
                href="mailto:support@avatarclone.ai"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                Contact Support
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {currentArticle && (
              <article className="animate-fade-in">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <FileText className="w-4 h-4" />
                  <span>{currentSection?.title}</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>{currentArticle.title}</span>
                </div>

                <h1 className="text-2xl font-bold mb-6">{currentArticle.title}</h1>

                <div className="prose prose-sm max-w-none">
                  {currentArticle.content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={i} className="text-lg font-semibold mt-6 mb-3">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('**')) {
                      const [title, ...rest] = paragraph.split(':**');
                      return (
                        <div key={i} className="mb-4">
                          <h4 className="font-medium mb-1">{title.replace('**', '')}:</h4>
                          <p className="text-muted-foreground">{rest.join(':**')}</p>
                        </div>
                      );
                    }
                    if (paragraph.startsWith('-')) {
                      return (
                        <ul key={i} className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                          {paragraph.split('\n').map((item, j) => (
                            <li key={j}>{item.replace(/^-\s*/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.match(/^\d\./)) {
                      return (
                        <ol key={i} className="list-decimal list-inside space-y-1 text-muted-foreground mb-4">
                          {paragraph.split('\n').map((item, j) => (
                            <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={i} className="text-muted-foreground mb-4">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
                  <div>
                    {currentSection && currentSection.articles.indexOf(currentArticle) > 0 && (
                      <button
                        onClick={() => {
                          const prevIndex = currentSection.articles.indexOf(currentArticle) - 1;
                          setActiveArticle(currentSection.articles[prevIndex].id);
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        ← Previous
                      </button>
                    )}
                  </div>
                  <div>
                    {currentSection && currentSection.articles.indexOf(currentArticle) < currentSection.articles.length - 1 && (
                      <button
                        onClick={() => {
                          const nextIndex = currentSection.articles.indexOf(currentArticle) + 1;
                          setActiveArticle(currentSection.articles[nextIndex].id);
                        }}
                        className="text-sm text-primary hover:underline"
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Docs;
