import React, { useState, useEffect } from 'react';
import { Volume2, Menu, X, Flame, ShieldCheck, Compass, Lock, MessageSquare } from 'lucide-react';

export default function Navbar({ settings, onOpenAdmin, onOpenExpedition, onPlayRev }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerLogo = settings?.headerLogo || {
    text: '8MOTO BHARAT',
    subtitle: 'PUNE OFFROAD EXPEDITION',
    imageUrl: ''
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#080A0E]/92 backdrop-blur-md border-b border-white/10 shadow-2xl' 
        : 'py-5 bg-gradient-to-b from-[#080A0E]/90 to-transparent'
    }`}>
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            {headerLogo.imageUrl ? (
              <img
                src={headerLogo.imageUrl}
                alt={headerLogo.text}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5500] to-[#B33600] flex items-center justify-center font-black text-2xl tracking-tighter text-white shadow-lg group-hover:scale-105 transition-transform">
                <span className="font-['Bebas_Neue'] text-3xl">8</span>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#FF5500] rounded-full animate-ping"></div>
                </div>
              </div>
            )}

            <div className="flex flex-col">
              <span className="font-['Bebas_Neue'] text-3xl tracking-wider text-white leading-none flex items-center gap-1.5">
                {headerLogo.text || '8MOTO BHARAT'}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-mono font-medium">
                {headerLogo.subtitle || 'PUNE OFFROAD EXPEDITION'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#poe-spotlight" className="hover:text-[#FF5500] transition-colors flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#FF5500]" />
              POE Flagship
            </a>
            <a href="#expeditions" className="hover:text-[#FF5500] transition-colors flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              Expeditions
            </a>
            <a href="#academy" className="hover:text-[#FF5500] transition-colors">
              Riding Academy
            </a>
            <a href="#safety" className="hover:text-[#FF5500] transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Safety Fleet
            </a>
            <a href="#vault" className="hover:text-[#FF5500] transition-colors">
              Trail Vault
            </a>
            <a href="#faq" className="hover:text-[#FF5500] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Throttle Easter Egg */}
            <button
              onClick={onPlayRev}
              title="Click to rev engine throttle!"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-[#FF5500]/20 border border-white/10 hover:border-[#FF5500]/40 text-slate-300 hover:text-[#FF5500] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            >
              <Volume2 className="w-4 h-4 text-[#FF5500] animate-pulse" />
              <span className="hidden xl:inline">REV THROTTLE</span>
            </button>

            {/* Quick WhatsApp Inquiry */}
            <a
              href={settings?.socials?.whatsapp || 'https://wa.me/919822086686'}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold tracking-wide border border-white/10 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>INQUIRE</span>
            </a>

            {/* Backend Admin Button */}
            <button
              onClick={onOpenAdmin}
              className="px-3 py-2.5 rounded-xl bg-[#161D2C] hover:bg-[#FF5500] border border-white/10 hover:border-[#FF5500] text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Open Backend Admin Panel"
            >
              <Lock className="w-3.5 h-3.5 text-[#FF5500] hover:text-white" />
              <span>ADMIN</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
            >
              <Lock className="w-4 h-4 text-[#FF5500]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-5 rounded-2xl bg-[#0E121A] border border-white/10 shadow-2xl flex flex-col gap-4 animate-in fade-in duration-200">
            <a 
              href="#poe-spotlight" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#FF5500] font-medium py-1"
            >
              Pune Offroad Expedition (POE)
            </a>
            <a 
              href="#expeditions" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#FF5500] font-medium py-1"
            >
              Expeditions & Trail Matrix
            </a>
            <a 
              href="#academy" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#FF5500] font-medium py-1"
            >
              8Moto Off-Road Academy
            </a>
            <a 
              href="#safety" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#FF5500] font-medium py-1"
            >
              Safety Fleet & Marshals
            </a>
            <a 
              href="#vault" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#FF5500] font-medium py-1"
            >
              Trail Cinema & Vault
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#FF5500] font-medium py-1"
            >
              FAQ & Regulations
            </a>
            
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#FF5500] text-center font-mono text-xs font-bold text-white flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>OPEN BACKEND ADMIN</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
