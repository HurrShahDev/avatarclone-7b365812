import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, User, Shield, Lock, Bell, CreditCard, Database, Trash2,
  Download, Github, Globe, Mail, Smartphone, LogOut, AlertTriangle,
  Check, X, Sparkles, Eye, EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-3xl font-bold">
                  A
                </div>
                <div>
                  <Button variant="outline" size="sm" className="mb-2">
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG • Max 5MB</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alex Johnson"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="alex@example.com"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6">Change Password</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input-field pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input type="password" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input type="password" className="input-field" />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-xl font-semibold mb-6">Connected Apps</h2>
              <div className="space-y-4">
                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-muted-foreground">@alexjohnson • Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>

                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <Globe className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6">Active Sessions</h2>
              <div className="space-y-4">
                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Chrome on MacOS</p>
                      <p className="text-sm text-muted-foreground">Current session • San Francisco, CA</p>
                    </div>
                  </div>
                  <span className="text-xs text-accent font-medium">Active now</span>
                </div>

                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Safari on iPhone</p>
                      <p className="text-sm text-muted-foreground">Last active 2 hours ago • Los Angeles, CA</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Revoke
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="mt-4">
                <LogOut className="w-4 h-4 mr-2" />
                Sign out all other sessions
              </Button>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6">Two-Factor Authentication</h2>
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Protect your account</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security with two-factor authentication.
                    </p>
                    <Button variant="accent">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-accent">GDPR Compliant</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your data is encrypted at rest and in transit. We never share your models without explicit consent.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6">Data Retention</h2>
              <div className="glass-card p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Voice samples and images are retained for model training. Generated videos are stored for 90 days unless explicitly saved.
                </p>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 mb-4">
                  <div>
                    <p className="font-medium">Auto-delete unused data</p>
                    <p className="text-sm text-muted-foreground">Remove training data after 1 year of inactivity</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6">Consent Management</h2>
              <div className="space-y-4">
                <div className="glass-card p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Voice & Photo Processing</p>
                    <p className="text-sm text-muted-foreground">Consented on Dec 15, 2025 at 10:32 AM</p>
                  </div>
                  <Check className="w-5 h-5 text-accent" />
                </div>
                <div className="glass-card p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Communications</p>
                    <p className="text-sm text-muted-foreground">Product updates and tips</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6">Your Data</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <button className="glass-card p-6 text-left hover:shadow-elevated transition-all group">
                  <Download className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold">Export My Data</p>
                  <p className="text-sm text-muted-foreground">Download all your data in a portable format</p>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="glass-card p-6 text-left hover:shadow-elevated transition-all group border-destructive/20"
                >
                  <Trash2 className="w-8 h-8 text-destructive mb-4 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-destructive">Delete My Data</p>
                  <p className="text-sm text-muted-foreground">Permanently remove all data and avatars</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-xl font-semibold mb-6">Email Notifications</h2>
              <div className="space-y-4">
                {[
                  { label: 'Training complete', desc: 'When your avatar model finishes training' },
                  { label: 'Weekly summary', desc: 'Overview of your avatar usage and stats' },
                  { label: 'Product updates', desc: 'New features and improvements' },
                  { label: 'Security alerts', desc: 'Unusual activity on your account' },
                ].map((item) => (
                  <div key={item.label} className="glass-card p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="glass-card-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <h2 className="text-2xl font-bold">Pro Plan</h2>
                </div>
                <div className="px-4 py-2 rounded-full gradient-bg text-primary-foreground text-sm font-medium">
                  Active
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold">10</p>
                  <p className="text-sm text-muted-foreground">Avatars</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold">50 GB</p>
                  <p className="text-sm text-muted-foreground">Storage</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold">∞</p>
                  <p className="text-sm text-muted-foreground">Videos</p>
                </div>
              </div>
              <Button variant="outline">Manage Subscription</Button>
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
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
          <div className="glass-card-elevated max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Delete All Data</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              This will permanently delete all your avatars, voice models, generated videos, and account data. You will receive a confirmation email.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                placeholder="DELETE"
                className="input-field"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Everything
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
