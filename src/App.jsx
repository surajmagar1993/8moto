import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PoeShowcase from './components/PoeShowcase';
import TrailMatrix from './components/TrailMatrix';
import Academy from './components/Academy';
import SafetyProtocol from './components/SafetyProtocol';
import MediaVault from './components/MediaVault';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ExpeditionModal from './components/ExpeditionModal';
import { fetchSettings, fetchExpeditions } from './services/api';
import { EXPEDITIONS as FALLBACK_EXPEDITIONS, BRAND_INFO } from './data/mockData';

export default function App() {
  const [settings, setSettings] = useState(null);
  const [expeditions, setExpeditions] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeExpedition, setActiveExpedition] = useState(null);
  const [showRevToast, setShowRevToast] = useState(false);

  // Load initial settings and expeditions from GoDaddy Node.js API
  const loadData = async () => {
    try {
      const [settingsData, expeditionsData] = await Promise.all([
        fetchSettings(),
        fetchExpeditions()
      ]);

      if (settingsData) {
        setSettings(settingsData);
      }
      if (expeditionsData && expeditionsData.length > 0) {
        setExpeditions(expeditionsData);
      } else {
        setExpeditions(FALLBACK_EXPEDITIONS);
      }
    } catch (e) {
      console.log('Using local fallback mock data:', e);
      setExpeditions(FALLBACK_EXPEDITIONS);
    }
  };

  useEffect(() => {
    loadData();

    // Check if URL contains ?admin=true or #admin to open admin directly
    if (window.location.search.includes('admin=true') || window.location.hash === '#admin') {
      setAdminOpen(true);
    }
  }, []);

  // Web Audio API engine rev synthesizer
  const playEngineRev = () => {
    setShowRevToast(true);
    setTimeout(() => setShowRevToast(false), 2000);

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      osc.type = 'sawtooth';
      subOsc.type = 'triangle';

      const now = ctx.currentTime;

      // Throttle blips
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.22);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.45);
      osc.frequency.exponentialRampToValueAtTime(390, now + 0.7);
      osc.frequency.exponentialRampToValueAtTime(80, now + 1.25);

      subOsc.frequency.setValueAtTime(38, now);
      subOsc.frequency.exponentialRampToValueAtTime(130, now + 0.22);
      subOsc.frequency.exponentialRampToValueAtTime(55, now + 0.45);
      subOsc.frequency.exponentialRampToValueAtTime(195, now + 0.7);
      subOsc.frequency.exponentialRampToValueAtTime(40, now + 1.25);

      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.35, now + 0.15);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.45);
      gainNode.gain.linearRampToValueAtTime(0.45, now + 0.75);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.35);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 1.35);
      subOsc.stop(now + 1.35);
    } catch (e) {
      console.log('Audio not supported or blocked:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080B] text-slate-100 relative selection:bg-[#FF5500] selection:text-white">
      
      {/* Engine Rev Toast */}
      {showRevToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0E131C]/95 border-2 border-[#FF5500] text-white shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF5500]/20 flex items-center justify-center text-[#FF5500] font-['Bebas_Neue'] text-xl">
            8M
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[#FF5500]">8MOTO THROTTLE ENGAGED</div>
            <div className="text-sm font-bold text-white">BRAAAAP! 4-STROKE REV</div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar 
        settings={settings}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenExpedition={(exp) => setActiveExpedition(exp)}
        onPlayRev={playEngineRev}
      />

      {/* Main Sections */}
      <main>
        {/* Kinetic Hero with Video or Image Background */}
        <Hero 
          settings={settings}
          onOpenExpedition={(exp) => setActiveExpedition(exp)}
          onPlayRev={playEngineRev}
        />

        {/* Flagship: Pune Offroad Expedition (POE) */}
        <PoeShowcase 
          expeditions={expeditions}
          onOpenExpedition={(exp) => setActiveExpedition(exp)}
        />

        {/* Trail & Expedition Matrix */}
        <TrailMatrix 
          expeditions={expeditions}
          onOpenExpedition={(exp) => setActiveExpedition(exp)}
        />

        {/* 8Moto Off-Road Academy */}
        <Academy />

        {/* Safety & Marshalling Infrastructure */}
        <SafetyProtocol />

        {/* Trail Cinema & Vault */}
        <MediaVault />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer 
        settings={settings}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Expedition Dossier / Inquiries Modal */}
      <ExpeditionModal
        expedition={activeExpedition}
        isOpen={Boolean(activeExpedition)}
        onClose={() => setActiveExpedition(null)}
        whatsappNumber={settings?.socials?.whatsapp || '919822086686'}
      />

      {/* Backend Admin Control Center */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        settings={settings}
        expeditions={expeditions}
        onRefreshData={loadData}
      />

    </div>
  );
}
