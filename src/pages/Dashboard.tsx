import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Bell, Settings, LayoutDashboard, Wand2, Folder, CreditCard,
  Play, Edit, Copy, Download, Trash2, HardDrive, Cpu, Video,
  CheckCircle, Loader2, AlertCircle, Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import avatar1 from '@/assets/avatar-1.jpg';
import avatar2 from '@/assets/avatar-2.jpg';
import avatar3 from '@/assets/avatar-3.jpg';

const sampleAvatars = [
  {
    id: 1,
    name: 'Aisha',
    version: 'v1',
    similarity: 84,
    status: 'ready',
    lastUpdated: 'Dec 20, 2025',
    image: avatar1,
  },
  {
    id: 2,
    name: 'Marcus',
    version: 'v2',
    similarity: 92,
    status: 'ready',
    lastUpdated: 'Dec 18, 2025',
    image: avatar2,
  },
  {
    id: 3,
    name: 'Sophie',
    version: 'v1',
    similarity: 88,
    status: 'training',
    lastUpdated: 'Dec 22, 2025',
    progress: 67,
    image: avatar3,
  },
  {
    id: 4,
    name: 'James',
    version: 'v1',
    similarity: 0,
    status: 'failed',
    lastUpdated: 'Dec 19, 2025',
    error: 'Not enough audio',
    image: avatar2,
  },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            {progress}%
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
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-sidebar border-r border-sidebar-border transform transition-transform lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="AvatarClone" className="h-10 w-auto" />
          </Link>
        </div>

        <nav className="p-3">
          <ul className="space-y-1">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
              { icon: Wand2, label: 'Create Avatar', href: '/create' },
              { icon: Folder, label: 'Projects', href: '/projects' },
              { icon: CreditCard, label: 'Billing', href: '/billing' },
              { icon: Settings, label: 'Settings', href: '/settings' },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                    item.active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground mb-2">Storage: 2.4 / 5 GB</div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: '48%' }} />
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-background sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-9 py-2 w-48 lg:w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-muted rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
            </button>
            <Link to="/settings">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                A
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: HardDrive, label: 'Storage', value: '2.4 GB' },
              { icon: Cpu, label: 'Training', value: '1 Active' },
              { icon: Video, label: 'Videos', value: '24' },
            ].map((stat) => (
              <div key={stat.label} className="card-simple p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="font-semibold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">My Avatars</h1>
            <Button asChild size="sm">
              <Link to="/create">
                <Plus className="w-4 h-4" />
                New Avatar
              </Link>
            </Button>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Create Card */}
            <Link
              to="/create"
              className="card-simple flex flex-col items-center justify-center min-h-[280px] border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="font-medium">Create New</p>
              <p className="text-sm text-muted-foreground">Start a new project</p>
            </Link>

            {/* Avatar Cards */}
            {sampleAvatars.map((avatar) => (
              <div key={avatar.id} className="card-simple overflow-hidden">
                <div className="aspect-[4/5] relative group">
                  <img 
                    src={avatar.image} 
                    alt={`${avatar.name} avatar`}
                    className="w-full h-full object-cover"
                  />

                  {avatar.status === 'ready' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                        <Play className="w-4 h-4 text-primary ml-0.5" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-2 left-2">
                    {getStatusChip(avatar.status, avatar.progress)}
                  </div>

                  <span className="absolute top-2 right-2 consent-badge text-[10px]">
                    Verified
                  </span>

                  {avatar.status === 'training' && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${avatar.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm">{avatar.name} • {avatar.version}</h3>
                    {avatar.similarity > 0 && (
                      <span className="text-sm text-accent font-medium">{avatar.similarity}%</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {avatar.status === 'ready' && `Similarity: ${avatar.similarity}%`}
                    {avatar.status === 'training' && 'Training...'}
                    {avatar.status === 'failed' && avatar.error}
                  </p>

                  <div className="flex gap-1">
                    {avatar.status === 'ready' && (
                      <>
                        <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs">
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                    {avatar.status === 'failed' && (
                      <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                        Retry
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
