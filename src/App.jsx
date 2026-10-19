import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TrailTicker from './components/TrailTicker';
import Hero from './components/Hero';
import PoeShowcase from './components/PoeShowcase';
import AcademySection from './components/AcademySection';
import TrailMatrix from './components/TrailMatrix';
import SafetySweeps from './components/SafetySweeps';
import MachinePrepGuide from './components/MachinePrepGuide';
import RiderTestimonials from './components/RiderTestimonials';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ExpeditionModal from './components/ExpeditionModal';
import RegistrationModal from './components/RegistrationModal';
import { fetchSettings, fetchExpeditions } from './services/api';
import { EXPEDITIONS as FALLBACK_EXPEDITIONS } from './data/mockData';

export default function App() {
  const [settings, setSettings] = useState(null);
  const [expeditions, setExpeditions] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeExpedition, setActiveExpedition] = useState(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedExpIdForReg, setSelectedExpIdForReg] = useState('poe-2026');

  // Load initial settings and expeditions from GoDaddy API
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

    // Keyboard shortcut for site owner: Ctrl + Shift + A opens Admin Panel
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenRegistration = (expId) => {
    if (typeof expId === 'string') {
      setSelectedExpIdForReg(expId);
    } else {
      setSelectedExpIdForReg('poe-2026');
    }
    setRegistrationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 relative selection:bg-[#FF4D00] selection:text-white">
      
      {/* Live Recon Bulletin Bar */}
      <TrailTicker 
        onOpenExpedition={(exp) => setActiveExpedition(exp)}
        onOpenRegistration={() => handleOpenRegistration('poe-2026')}
      />

      {/* Primary Motorsport Header */}
      <Navbar 
        settings={settings}
        onOpenRegistration={() => handleOpenRegistration('poe-2026')}
      />

      {/* Main Authentic Expedition Experience */}
      <main>
        {/* Kinetic Hero */}
        <Hero 
          settings={settings}
          onOpenExpedition={(exp) => setActiveExpedition(exp)}
          onOpenRegistration={() => handleOpenRegistration('poe-2026')}
        />

        {/* Flagship: Pune Offroad Expedition (POE 14) Roadbook Dossier */}
        <PoeShowcase 
          expeditions={expeditions}
          onOpenExpedition={(exp) => setActiveExpedition(exp)}
          onOpenRegistration={() => handleOpenRegistration('poe-2026')}
        />

        {/* 8Moto Riding & 4x4 Academy */}
        <AcademySection 
          onOpenRegistration={() => handleOpenRegistration('adv-level-1')}
        />

        {/* Trail & Expedition Matrix (Western Ghats & Sahyadri) */}
        <TrailMatrix 
          expeditions={expeditions}
          onOpenExpedition={(exp) => setActiveExpedition(exp)}
          onOpenRegistration={() => handleOpenRegistration('sahyadri-ridge-recon')}
        />

        {/* Safety, Winch Sweeps & Trauma Paramedics */}
        <SafetySweeps />

        {/* Rig Scrutineering & Tire PSI Field Guide */}
        <MachinePrepGuide />

        {/* Verified Rider Community Testimonials */}
        <RiderTestimonials />

        {/* Trail Regulations & FAQ */}
        <FaqSection />
      </main>

      {/* Motorsports Partner Strip & Footer */}
      <Footer 
        settings={settings}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Expedition Dossier / Roadbook Modal */}
      <ExpeditionModal
        expedition={activeExpedition}
        isOpen={Boolean(activeExpedition)}
        onClose={() => setActiveExpedition(null)}
        whatsappNumber={settings?.socials?.whatsapp || '919822086686'}
        onOpenRegistration={handleOpenRegistration}
      />

      {/* Official Motorsport Entry Pass / Registration Modal */}
      <RegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        defaultExpeditionId={selectedExpIdForReg}
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
