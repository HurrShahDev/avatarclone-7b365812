import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Bell, Settings, LayoutDashboard, Wand2, Folder, CreditCard,
  Play, Edit, Copy, Download, Trash2, MoreVertical, HardDrive, Cpu, Video,
  CheckCircle, Loader2, AlertCircle, Sparkles, Sun, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample avatar data
const sampleAvatars = [
  {
    id: 1,
    name: 'Aisha',
    version: 'Voice Model v1',
    similarity: 84,
    status: 'ready',
    lastUpdated: 'Dec 20, 2025',
    consentVerified: true,
  },
  {
    id: 2,
    name: 'Marcus',
    version: 'Voice Model v2',
    similarity: 92,
    status: 'ready',
    lastUpdated: 'Dec 18, 2025',
    consentVerified: true,
  },
  {
    id: 3,
    name: 'Sophie',
    version: 'Voice Model v1',
    similarity: 88,
    status: 'training',
    lastUpdated: 'Dec 22, 2025',
    consentVerified: true,
    progress: 67,
  },
  {
    id: 4,
    name: 'James',
    version: 'Voice Model v1',
    similarity: 0,
    status: 'failed',
    lastUpdated: 'Dec 19, 2025',
    consentVerified: true,
    error: 'Not enough audio samples',
  },
];

const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const getStatusChip = (status: string, progress?: number) => {
    switch (status) {
      case 'ready':
        return (
          <span className="status-chip ready">
            <CheckCircle className="w-3 h-3" />
            Ready
          </span>
        );
      case 'training':
        return (
          <span className="status-chip training">
            <Loader2 className="w-3 h-3 animate-spin" />
            Training {progress}%
          </span>
        );
      case 'failed':
        return (
          <span className="status-chip failed">
            <AlertCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">
              <span className="gradient-text">Avatar</span>
              <span className="text-sidebar-foreground">Clone</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <Wand2 className="w-5 h-5" />
                Create Avatar
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <Folder className="w-5 h-5" />
                My Projects
              </Link>
            </li>
            <li>
              <Link
                to="/billing"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                Billing
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Storage Info */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-xs text-muted-foreground">2.4 / 5 GB</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '48%' }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8 bg-background/80 backdrop-blur-md sticky top-0 z-40">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search avatars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 py-2"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="btn-ghost p-2"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="btn-ghost p-2 relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
            </button>

            <Link to="/settings">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                A
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Stats Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <HardDrive className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold">2.4 GB</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Training Jobs</p>
                  <p className="text-2xl font-bold">1 Active</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Videos Generated</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold">My Avatars</h1>
            <Button asChild>
              <Link to="/create">
                <Plus className="w-5 h-5" />
                New Avatar
              </Link>
            </Button>
          </div>

          {/* Avatar Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Create New Card */}
            <Link
              to="/create"
              className="avatar-card flex flex-col items-center justify-center min-h-[320px] border-2 border-dashed border-border hover:border-primary/50 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="font-semibold text-foreground">Create New Avatar</p>
              <p className="text-sm text-muted-foreground">Get started with a new project</p>
            </Link>

            {/* Avatar Cards */}
            {sampleAvatars.map((avatar) => (
              <div key={avatar.id} className="avatar-card group">
                {/* Thumbnail */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-primary/10 to-accent/10">
                  {/* Placeholder Avatar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-primary-foreground/70" />
                    </div>
                  </div>

                  {/* Hover Play */}
                  {avatar.status === 'ready' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-primary-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-xl">
                        <Play className="w-5 h-5 text-primary ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  <div className="absolute top-3 left-3">
                    {getStatusChip(avatar.status, avatar.progress)}
                  </div>

                  {/* Consent Badge */}
                  {avatar.consentVerified && (
                    <div className="absolute top-3 right-3 consent-badge">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Verified
                    </div>
                  )}

                  {/* Training Progress */}
                  {avatar.status === 'training' && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${avatar.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {avatar.name} • {avatar.version}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {avatar.status === 'ready' && `Voice similarity: ${avatar.similarity}%`}
                        {avatar.status === 'training' && 'Training in progress...'}
                        {avatar.status === 'failed' && avatar.error}
                      </p>
                    </div>
                    {avatar.similarity > 0 && (
                      <span className="text-lg font-bold text-accent">{avatar.similarity}%</span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">
                    Last updated: {avatar.lastUpdated}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {avatar.status === 'ready' && (
                      <>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {avatar.status === 'failed' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Retry Training
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <div className="fixed bottom-4 right-4 glass-card p-4 flex items-center gap-3 animate-slide-in-right z-50">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-accent animate-spin" />
        </div>
        <div>
          <p className="font-medium text-foreground">Training started</p>
          <p className="text-sm text-muted-foreground">Estimated: 8 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
