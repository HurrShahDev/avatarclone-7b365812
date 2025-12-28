import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, User, Shield, Lock, Bell, CreditCard,
  Download, Github, Globe, Smartphone, LogOut, AlertTriangle,
  Check, Eye, EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold mb-4">Profile</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-semibold">
                  A
                </div>
                <Button variant="outline" size="sm">Change Photo</Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Name</label>
                  <input type="text" defaultValue="Alex Johnson" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input type="email" defaultValue="alex@example.com" className="input-field" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Password</h2>
              <div className="space-y-3 max-w-sm">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Current password"
                    className="input-field pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <input type="password" placeholder="New password" className="input-field" />
                <input type="password" placeholder="Confirm password" className="input-field" />
                <Button size="sm">Update Password</Button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold mb-4">Connected Apps</h2>
              <div className="space-y-3">
                <div className="card-simple p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-sm">GitHub</p>
                      <p className="text-xs text-muted-foreground">@alexjohnson</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                <div className="card-simple p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Google</p>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Sessions</h2>
              <div className="space-y-3">
                <div className="card-simple p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-sm">Chrome on MacOS</p>
                      <p className="text-xs text-muted-foreground">Current • San Francisco</p>
                    </div>
                  </div>
                  <span className="text-xs text-accent">Active</span>
                </div>
                <div className="card-simple p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Safari on iPhone</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive text-xs">Revoke</Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                <LogOut className="w-3 h-3 mr-2" />
                Sign out all
              </Button>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-accent text-sm">GDPR Compliant</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Data encrypted at rest and in transit. Never shared without consent.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Consent</h2>
              <div className="space-y-3">
                <div className="card-simple p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Voice & Photo Processing</p>
                    <p className="text-xs text-muted-foreground">Dec 15, 2025</p>
                  </div>
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <div className="card-simple p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Marketing</p>
                    <p className="text-xs text-muted-foreground">Product updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-accent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Your Data</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <button className="card-simple p-4 text-left hover:bg-muted/50 transition-colors">
                  <Download className="w-5 h-5 text-primary mb-2" />
                  <p className="font-medium text-sm">Export Data</p>
                  <p className="text-xs text-muted-foreground">Download all your data</p>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="card-simple p-4 text-left hover:bg-muted/50 transition-colors border-destructive/20"
                >
                  <AlertTriangle className="w-5 h-5 text-destructive mb-2" />
                  <p className="font-medium text-sm text-destructive">Delete Data</p>
                  <p className="text-xs text-muted-foreground">Permanently remove all</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold">Email Notifications</h2>
            {[
              { label: 'Training complete', desc: 'When your model finishes' },
              { label: 'Weekly summary', desc: 'Usage overview' },
              { label: 'Product updates', desc: 'New features' },
              { label: 'Security alerts', desc: 'Account activity' },
            ].map((item) => (
              <div key={item.label} className="card-simple p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-accent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
            ))}
          </div>
        );

      case 'billing':
        return (
          <div className="animate-fade-in">
            <div className="card-simple p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Current Plan</p>
                  <h2 className="text-xl font-semibold">Pro Plan</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="font-semibold">10</p>
                  <p className="text-xs text-muted-foreground">Avatars</p>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="font-semibold">50 GB</p>
                  <p className="text-xs text-muted-foreground">Storage</p>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="font-semibold">∞</p>
                  <p className="text-xs text-muted-foreground">Videos</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold">Settings</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-48 flex-shrink-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 animate-fade-in">
          <div className="card-simple max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h3 className="font-semibold">Delete All Data</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              This will permanently delete all your avatars and data. This cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm mb-1.5">Type "DELETE" to confirm</label>
              <input type="text" placeholder="DELETE" className="input-field" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1 bg-destructive hover:bg-destructive/90">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
