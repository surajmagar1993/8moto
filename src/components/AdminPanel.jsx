import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Save, Plus, Trash2, Edit3, Film, Settings, Share2, 
  Compass, BarChart3, CheckCircle2, AlertCircle, RefreshCw, Eye, ExternalLink, Mail
} from 'lucide-react';
import { adminLogin, updateSettings, createExpedition, updateExpedition, deleteExpedition, fetchInquiries } from '../services/api';

export default function AdminPanel({ isOpen, onClose, settings, expeditions, onRefreshData }) {
  const [token, setToken] = useState(() => localStorage.getItem('8moto_admin_token') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('general'); // general, hero, socials, expeditions, telemetry, inquiries
  
  // Local state for editable settings
  const [formSettings, setFormSettings] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ state: 'idle', message: '' });

  // Expedition editor state
  const [editingExpedition, setEditingExpedition] = useState(null);
  const [isNewExpedition, setIsNewExpedition] = useState(false);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (settings) {
      setFormSettings(JSON.parse(JSON.stringify(settings)));
    }
  }, [settings]);

  useEffect(() => {
    if (token && activeTab === 'inquiries') {
      fetchInquiries(token).then(res => {
        if (res.success) setInquiries(res.data);
      });
    }
  }, [token, activeTab]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await adminLogin(password);
    if (res.success) {
      setToken(res.token);
      localStorage.setItem('8moto_admin_token', res.token);
    } else {
      setLoginError(res.message || 'Incorrect password');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('8moto_admin_token');
  };

  const handleSaveSettings = async () => {
    setSaveStatus({ state: 'saving', message: 'Saving changes to GoDaddy backend...' });
    const res = await updateSettings(formSettings, token);
    if (res.success) {
      setSaveStatus({ state: 'success', message: 'All website settings successfully saved & synchronized!' });
      if (onRefreshData) onRefreshData();
      setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 3000);
    } else {
      setSaveStatus({ state: 'error', message: res.message || 'Failed to update settings.' });
    }
  };

  // Expedition Handlers
  const handleStartCreateExpedition = () => {
    setEditingExpedition({
      id: '',
      title: '',
      tag: 'New Trail Expedition',
      isFlagship: false,
      difficulty: 'Intermediate Dual-Sport',
      difficultyLevel: 2,
      location: 'Sahyadri Valley, Pune',
      duration: 'Single Day Run',
      elevation: '1,000m',
      terrain: 'Monsoon Clay, Gravel & Hill Slopes',
      dates: 'Upcoming Season',
      seatsLeft: 20,
      image: '/images/hero_monsoon.jpg',
      videoUrl: '',
      price: '₹3,500',
      category: ['ADV Motorcycle', '4x4 SUV'],
      description: '',
      stages: [
        { name: 'Stage 1: Basecamp Entry', dist: '15 KM', terrain: 'Firm Dirt & Streams' }
      ],
      gear: ['Full Face Helmet', 'Ankle Boots', 'Riding Gloves']
    });
    setIsNewExpedition(true);
  };

  const handleSaveExpedition = async (e) => {
    e.preventDefault();
    if (!editingExpedition.title) return alert('Expedition title is required');

    setSaveStatus({ state: 'saving', message: 'Saving expedition...' });

    let res;
    if (isNewExpedition) {
      res = await createExpedition(editingExpedition, token);
    } else {
      res = await updateExpedition(editingExpedition.id, editingExpedition, token);
    }

    if (res.success) {
      setSaveStatus({ state: 'success', message: 'Expedition saved successfully!' });
      setEditingExpedition(null);
      if (onRefreshData) onRefreshData();
      setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 3000);
    } else {
      alert(res.message || 'Error saving expedition');
    }
  };

  const handleDeleteExpedition = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    const res = await deleteExpedition(id, token);
    if (res.success) {
      if (onRefreshData) onRefreshData();
    } else {
      alert(res.message || 'Error deleting expedition');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#0B0F17] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Title Bar */}
        <div className="px-6 py-4 bg-[#101622] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF5500] flex items-center justify-center text-white font-['Bebas_Neue'] text-xl">
              8M
            </div>
            <div>
              <div className="text-xs font-mono text-[#FF5500] font-bold uppercase tracking-wider flex items-center gap-2">
                <span>8MOTO BHARAT BACKEND ADMIN</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-emerald-400 font-normal">GoDaddy Node.js API Ready</span>
              </div>
              <h2 className="text-lg font-bold text-white leading-none">
                Website Content & Expedition Management System
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {saveStatus.state !== 'idle' && (
          <div className={`px-6 py-2.5 text-xs font-mono flex items-center justify-between shrink-0 ${
            saveStatus.state === 'success' 
              ? 'bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-400' 
              : saveStatus.state === 'error'
              ? 'bg-red-500/15 border-b border-red-500/30 text-red-400'
              : 'bg-[#FF5500]/15 border-b border-[#FF5500]/30 text-[#FF5500]'
          }`}>
            <span className="flex items-center gap-2">
              {saveStatus.state === 'success' && <CheckCircle2 className="w-4 h-4" />}
              {saveStatus.state === 'saving' && <RefreshCw className="w-4 h-4 animate-spin" />}
              {saveStatus.state === 'error' && <AlertCircle className="w-4 h-4" />}
              {saveStatus.message}
            </span>
          </div>
        )}

        {/* Body Content */}
        {!token ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500] mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide">
                ADMIN ACCESS REQUIRED
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your 8Moto administrative passkey to edit logos, hero video, expeditions, and social channels.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter administrator password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#080A0E] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none font-mono text-center tracking-widest"
                />
                {loginError && (
                  <div className="text-xs text-red-400 mt-2 font-mono flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {loginError}
                  </div>
                )}
                <div className="text-[11px] text-slate-500 font-mono mt-1.5">
                  Default passkey: <code className="text-[#FF5500]">8moto2026</code>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-bold text-xs uppercase tracking-wider font-mono shadow-lg shadow-[#FF5500]/25 transition-all cursor-pointer"
              >
                UNLOCK ADMIN PANEL
              </button>
            </form>
          </div>
        ) : (
          /* Main Admin Workspace */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-60 bg-[#080A0E] border-r border-white/10 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
              <button
                onClick={() => { setActiveTab('general'); setEditingExpedition(null); }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left shrink-0 ${
                  activeTab === 'general' ? 'bg-[#FF5500] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Header & Footer</span>
              </button>

              <button
                onClick={() => { setActiveTab('hero'); setEditingExpedition(null); }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left shrink-0 ${
                  activeTab === 'hero' ? 'bg-[#FF5500] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Film className="w-4 h-4 shrink-0" />
                <span>Hero & Video Media</span>
              </button>

              <button
                onClick={() => { setActiveTab('socials'); setEditingExpedition(null); }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left shrink-0 ${
                  activeTab === 'socials' ? 'bg-[#FF5500] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Share2 className="w-4 h-4 shrink-0" />
                <span>Socials & Contact</span>
              </button>

              <button
                onClick={() => { setActiveTab('expeditions'); setEditingExpedition(null); }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left shrink-0 ${
                  activeTab === 'expeditions' ? 'bg-[#FF5500] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span>Expeditions ({expeditions?.length || 0})</span>
              </button>

              <button
                onClick={() => { setActiveTab('telemetry'); setEditingExpedition(null); }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left shrink-0 ${
                  activeTab === 'telemetry' ? 'bg-[#FF5500] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span>Telemetry Numbers</span>
              </button>

              <button
                onClick={() => { setActiveTab('inquiries'); setEditingExpedition(null); }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left shrink-0 ${
                  activeTab === 'inquiries' ? 'bg-[#FF5500] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Inquiries Inbox</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              {/* TAB 1: GENERAL (HEADER & FOOTER) */}
              {activeTab === 'general' && formSettings && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
                      HEADER & FOOTER BRANDING
                    </h3>
                    <p className="text-xs text-slate-400">
                      Customize top navbar brand text, logos, footer description, and official basecamp details.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#080A0E] border border-white/10 space-y-4">
                    <h4 className="text-xs font-mono text-[#FF5500] uppercase font-bold">TOP HEADER NAVBAR</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Navbar Brand Title</label>
                        <input
                          type="text"
                          value={formSettings.headerLogo?.text || ''}
                          onChange={(e) => setFormSettings({
                            ...formSettings,
                            headerLogo: { ...formSettings.headerLogo, text: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Navbar Subtitle</label>
                        <input
                          type="text"
                          value={formSettings.headerLogo?.subtitle || ''}
                          onChange={(e) => setFormSettings({
                            ...formSettings,
                            headerLogo: { ...formSettings.headerLogo, subtitle: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Custom Header Logo Image URL (Optional - leaves icon if empty)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. /images/logo.png or https://..."
                        value={formSettings.headerLogo?.imageUrl || ''}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          headerLogo: { ...formSettings.headerLogo, imageUrl: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#080A0E] border border-white/10 space-y-4">
                    <h4 className="text-xs font-mono text-[#FF5500] uppercase font-bold">FOOTER BRANDING</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Footer Brand Title</label>
                        <input
                          type="text"
                          value={formSettings.footerLogo?.text || ''}
                          onChange={(e) => setFormSettings({
                            ...formSettings,
                            footerLogo: { ...formSettings.footerLogo, text: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Custom Footer Logo URL (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. /images/footer-logo.png"
                          value={formSettings.footerLogo?.imageUrl || ''}
                          onChange={(e) => setFormSettings({
                            ...formSettings,
                            footerLogo: { ...formSettings.footerLogo, imageUrl: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Footer Bio Description</label>
                      <textarea
                        rows={3}
                        value={formSettings.footerLogo?.description || ''}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          footerLogo: { ...formSettings.footerLogo, description: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Head Marshal Name</label>
                        <input
                          type="text"
                          value={formSettings.headMarshal || ''}
                          onChange={(e) => setFormSettings({ ...formSettings, headMarshal: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Basecamp Location</label>
                        <input
                          type="text"
                          value={formSettings.basecamp || ''}
                          onChange={(e) => setFormSettings({ ...formSettings, basecamp: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-3 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE HEADER & FOOTER SETTINGS</span>
                  </button>
                </div>
              )}

              {/* TAB 2: HERO & VIDEO MEDIA */}
              {activeTab === 'hero' && formSettings && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
                      HERO SECTION & VIDEO BACKGROUND
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure your high-octane background. Choose between an atmospheric MP4 video loop or a crisp static action photo.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#080A0E] border border-white/10 space-y-5">
                    {/* Media Type Toggle */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2">BACKGROUND MEDIA TYPE</label>
                      <div className="grid grid-cols-2 gap-3 max-w-md">
                        <button
                          type="button"
                          onClick={() => setFormSettings({
                            ...formSettings,
                            hero: { ...formSettings.hero, mediaType: 'video' }
                          })}
                          className={`p-3 rounded-xl border text-xs font-mono text-center cursor-pointer transition-all ${
                            formSettings.hero?.mediaType === 'video'
                              ? 'bg-[#FF5500] border-[#FF5500] text-white font-bold shadow-lg shadow-[#FF5500]/25'
                              : 'bg-[#111622] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          🎬 Loop MP4 Video Background
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormSettings({
                            ...formSettings,
                            hero: { ...formSettings.hero, mediaType: 'image' }
                          })}
                          className={`p-3 rounded-xl border text-xs font-mono text-center cursor-pointer transition-all ${
                            formSettings.hero?.mediaType === 'image'
                              ? 'bg-[#FF5500] border-[#FF5500] text-white font-bold shadow-lg shadow-[#FF5500]/25'
                              : 'bg-[#111622] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          📷 High-Res Action Image
                        </button>
                      </div>
                    </div>

                    {/* Video URL Input */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Hero Video URL (MP4 / WebM direct file URL)
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/trail-video.mp4"
                        value={formSettings.hero?.videoUrl || ''}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          hero: { ...formSettings.hero, videoUrl: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm font-mono"
                      />
                      <div className="text-[11px] text-slate-500 font-mono mt-1">
                        Tip: You can host videos on GoDaddy, Vimeo direct MP4, or cloud CDNs.
                      </div>
                    </div>

                    {/* Fallback Image */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Poster / Fallback Image URL
                      </label>
                      <input
                        type="text"
                        value={formSettings.hero?.imageUrl || ''}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          hero: { ...formSettings.hero, imageUrl: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                      />
                    </div>

                    {/* Media Live Preview Box */}
                    <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                      <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
                        <span>LIVE MEDIA PREVIEW</span>
                        <span className="text-[#FF5500] font-bold">{formSettings.hero?.mediaType?.toUpperCase()} MODE</span>
                      </div>
                      <div className="relative h-44 rounded-lg overflow-hidden border border-white/10">
                        {formSettings.hero?.mediaType === 'video' && formSettings.hero?.videoUrl ? (
                          <video
                            src={formSettings.hero.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={formSettings.hero?.imageUrl || '/images/hero_monsoon.jpg'}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                          <span className="font-['Bebas_Neue'] text-3xl text-white tracking-widest drop-shadow">
                            {formSettings.hero?.titleLine1} {formSettings.hero?.titleHighlight} {formSettings.hero?.titleLine2}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Headline Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Title Line 1</label>
                        <input
                          type="text"
                          value={formSettings.hero?.titleLine1 || ''}
                          onChange={(e) => setFormSettings({
                            ...formSettings,
                            hero: { ...formSettings.hero, titleLine1: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Highlight Word</label>
                        <input
                          type="text"
                          value={formSettings.hero?.titleHighlight || ''}
                          onChange={(e) => setFormSettings({
                            ...formSettings,
                            hero: { ...formSettings.hero, titleHighlight: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-[#FF5500] font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Title Line 2</label>
                        <input
                          type="text"
                          value={formSettings.hero?.titleLine2 || ''}
                          onChange={(e) => setFormSettings({
                            ...formSettings,
                            hero: { ...formSettings.hero, titleLine2: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Hero Subtitle</label>
                      <textarea
                        rows={2}
                        value={formSettings.hero?.subtitle || ''}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          hero: { ...formSettings.hero, subtitle: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-3 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE HERO & VIDEO SETTINGS</span>
                  </button>
                </div>
              )}

              {/* TAB 3: SOCIALS & CONTACT */}
              {activeTab === 'socials' && formSettings && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
                      SOCIAL CHANNELS & EXPEDITION DESK
                    </h3>
                    <p className="text-xs text-slate-400">
                      Update external links for Instagram, YouTube, Facebook, and the official WhatsApp hotline.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#080A0E] border border-white/10 space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Instagram Profile URL</label>
                      <input
                        type="url"
                        value={formSettings.socials?.instagram || ''}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          socials: { ...formSettings.socials, instagram: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">YouTube Channel URL</label>
                      <input
                        type="url"
                        value={formSettings.socials?.youtube || ''}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          socials: { ...formSettings.socials, youtube: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Facebook Page URL</label>
                      <input
                        type="url"
                        value={formSettings.socials?.facebook || ''}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          socials: { ...formSettings.socials, facebook: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Official WhatsApp Link</label>
                      <input
                        type="url"
                        value={formSettings.socials?.whatsapp || ''}
                        onChange={(e) => setFormSettings({
                          ...formSettings,
                          socials: { ...formSettings.socials, whatsapp: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={formSettings.phone || ''}
                          onChange={(e) => setFormSettings({ ...formSettings, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={formSettings.email || ''}
                          onChange={(e) => setFormSettings({ ...formSettings, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-white text-sm font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-3 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE SOCIAL & CONTACT LINKS</span>
                  </button>
                </div>
              )}

              {/* TAB 4: EXPEDITIONS & PAGES */}
              {activeTab === 'expeditions' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
                        EXPEDITIONS & TRAIL PAGES
                      </h3>
                      <p className="text-xs text-slate-400">
                        Create, modify, or remove trail expeditions, routes, stages, and requirements.
                      </p>
                    </div>

                    <button
                      onClick={handleStartCreateExpedition}
                      className="px-4 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-[#FF5500]/25 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD NEW EXPEDITION</span>
                    </button>
                  </div>

                  {/* Expedition Form (if editing/creating) */}
                  {editingExpedition ? (
                    <form onSubmit={handleSaveExpedition} className="p-6 rounded-2xl bg-[#080A0E] border-2 border-[#FF5500]/50 space-y-5 animate-in fade-in">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="font-['Bebas_Neue'] text-xl text-[#FF5500] tracking-wider">
                          {isNewExpedition ? 'CREATE NEW EXPEDITION' : `EDITING: ${editingExpedition.title}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingExpedition(null)}
                          className="text-xs font-mono text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Title *</label>
                          <input
                            type="text"
                            required
                            value={editingExpedition.title}
                            onChange={(e) => setEditingExpedition({ ...editingExpedition, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Tag / Sub-Header</label>
                          <input
                            type="text"
                            value={editingExpedition.tag}
                            onChange={(e) => setEditingExpedition({ ...editingExpedition, tag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Difficulty Level</label>
                          <select
                            value={editingExpedition.difficultyLevel}
                            onChange={(e) => setEditingExpedition({ 
                              ...editingExpedition, 
                              difficultyLevel: parseInt(e.target.value, 10),
                              difficulty: e.target.value === '1' ? 'Novice & Soft-Roader' : e.target.value === '2' ? 'Intermediate Dual-Sport' : 'Hard Enduro & Pro 4x4'
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                          >
                            <option value={1}>🟢 Level 1 (Novice)</option>
                            <option value={2}>🟡 Level 2 (Moderate / Intermediate)</option>
                            <option value={3}>🔴 Level 3 (Extreme Hard Enduro / Pro 4x4)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                          <input
                            type="text"
                            value={editingExpedition.location}
                            onChange={(e) => setEditingExpedition({ ...editingExpedition, location: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Dates</label>
                          <input
                            type="text"
                            value={editingExpedition.dates}
                            onChange={(e) => setEditingExpedition({ ...editingExpedition, dates: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Price / Fee</label>
                          <input
                            type="text"
                            value={editingExpedition.price}
                            onChange={(e) => setEditingExpedition({ ...editingExpedition, price: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Cover Image URL</label>
                          <input
                            type="text"
                            value={editingExpedition.image}
                            onChange={(e) => setEditingExpedition({ ...editingExpedition, image: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Trail Video URL (Optional)</label>
                          <input
                            type="url"
                            placeholder="https://...mp4"
                            value={editingExpedition.videoUrl || ''}
                            onChange={(e) => setEditingExpedition({ ...editingExpedition, videoUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Expedition Description</label>
                        <textarea
                          rows={3}
                          value={editingExpedition.description}
                          onChange={(e) => setEditingExpedition({ ...editingExpedition, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-sm"
                        />
                      </div>

                      {/* Stages Editor */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-mono text-slate-300">ROUTE STAGES</label>
                          <button
                            type="button"
                            onClick={() => setEditingExpedition({
                              ...editingExpedition,
                              stages: [...editingExpedition.stages, { name: `Stage ${editingExpedition.stages.length + 1}`, dist: '10 KM', terrain: 'Mud & Boulders' }]
                            })}
                            className="text-[11px] font-mono text-[#FF5500] hover:underline"
                          >
                            + Add Stage
                          </button>
                        </div>

                        <div className="space-y-2">
                          {editingExpedition.stages.map((st, sidx) => (
                            <div key={sidx} className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Stage Name"
                                value={st.name}
                                onChange={(e) => {
                                  const updated = [...editingExpedition.stages];
                                  updated[sidx].name = e.target.value;
                                  setEditingExpedition({ ...editingExpedition, stages: updated });
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-[#111622] border border-white/10 text-xs text-white"
                              />
                              <input
                                type="text"
                                placeholder="Distance"
                                value={st.dist}
                                onChange={(e) => {
                                  const updated = [...editingExpedition.stages];
                                  updated[sidx].dist = e.target.value;
                                  setEditingExpedition({ ...editingExpedition, stages: updated });
                                }}
                                className="w-24 px-3 py-1.5 rounded-lg bg-[#111622] border border-white/10 text-xs text-white font-mono"
                              />
                              <input
                                type="text"
                                placeholder="Terrain details"
                                value={st.terrain}
                                onChange={(e) => {
                                  const updated = [...editingExpedition.stages];
                                  updated[sidx].terrain = e.target.value;
                                  setEditingExpedition({ ...editingExpedition, stages: updated });
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-[#111622] border border-white/10 text-xs text-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = editingExpedition.stages.filter((_, idx) => idx !== sidx);
                                  setEditingExpedition({ ...editingExpedition, stages: updated });
                                }}
                                className="p-1.5 rounded text-red-400 hover:bg-red-500/20"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-mono text-xs font-bold transition-all cursor-pointer"
                        >
                          {isNewExpedition ? 'PUBLISH EXPEDITION' : 'SAVE CHANGES'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingExpedition(null)}
                          className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 text-xs font-mono"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Expeditions List */
                    <div className="space-y-3">
                      {expeditions.map((exp) => (
                        <div
                          key={exp.id}
                          className="p-4 rounded-xl bg-[#080A0E] border border-white/10 flex items-center justify-between gap-4 hover:border-[#FF5500]/40 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={exp.image}
                              alt={exp.title}
                              className="w-14 h-14 rounded-lg object-cover shrink-0 border border-white/10"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-white text-sm truncate">{exp.title}</h4>
                                {exp.isFlagship && (
                                  <span className="px-1.5 py-0.5 rounded bg-[#FF5500] text-[10px] font-mono text-white font-bold">POE</span>
                                )}
                              </div>
                              <div className="text-xs text-slate-400 font-mono mt-0.5">
                                {exp.location} • {exp.dates} • {exp.price}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingExpedition(JSON.parse(JSON.stringify(exp)));
                                setIsNewExpedition(false);
                              }}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Edit Expedition"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteExpedition(exp.id, exp.title)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                              title="Delete Expedition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 5: TELEMETRY STATS */}
              {activeTab === 'telemetry' && formSettings && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
                      HERO TELEMETRY STATS
                    </h3>
                    <p className="text-xs text-slate-400">
                      Update the high-impact stat figures displayed across the website banner.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formSettings.telemetry?.map((stat, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#080A0E] border border-white/10 space-y-2">
                        <div className="text-[11px] font-mono text-[#FF5500] font-bold">STAT #{idx + 1}</div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400">Value (e.g. 14+ / 5,200+)</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const updated = [...formSettings.telemetry];
                              updated[idx].value = e.target.value;
                              setFormSettings({ ...formSettings, telemetry: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#111622] border border-white/10 text-white font-['Bebas_Neue'] text-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const updated = [...formSettings.telemetry];
                              updated[idx].label = e.target.value;
                              setFormSettings({ ...formSettings, telemetry: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#111622] border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400">Subtitle</label>
                          <input
                            type="text"
                            value={stat.sub}
                            onChange={(e) => {
                              const updated = [...formSettings.telemetry];
                              updated[idx].sub = e.target.value;
                              setFormSettings({ ...formSettings, telemetry: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#111622] border border-white/10 text-slate-400 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-3 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE TELEMETRY STATS</span>
                  </button>
                </div>
              )}

              {/* TAB 6: INQUIRIES INBOX */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
                      EXPEDITION INQUIRIES INBOX
                    </h3>
                    <p className="text-xs text-slate-400">
                      View messages and booking queries submitted by riders and 4x4 drivers.
                    </p>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-white/10 rounded-2xl">
                      No incoming inquiries yet. All new queries submitted through the website will appear here.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="p-4 rounded-xl bg-[#080A0E] border border-white/10 space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-[#FF5500] font-bold">{inq.name} ({inq.phone})</span>
                            <span className="text-slate-500">{new Date(inq.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-xs text-slate-300">
                            <strong>Vehicle:</strong> {inq.vehicle || 'Not specified'} | <strong>Expedition:</strong> {inq.expeditionTitle || 'General'}
                          </div>
                          {inq.message && (
                            <p className="text-xs text-slate-400 italic bg-white/5 p-2 rounded">
                              "{inq.message}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
