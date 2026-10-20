import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Flame, Shield, Wrench, MessageSquare, Ticket } from 'lucide-react';

export default function Navbar({ settings, onOpenRegistration }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerLogo = settings?.headerLogo || {
    text: '8MOTO BHARAT',
    subtitle: 'EXPEDITIONS & TRAIL COLLECTIVE • PUNE',
    imageUrl: ''
  };

  const whatsappUrl = settings?.socials?.whatsapp || 'https://wa.me/919822086686';

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
      scrolled 
        ? 'bg-[#07090E]/95 backdrop-blur-md border-white/10 shadow-2xl py-3' 
        : 'bg-[#07090E]/80 backdrop-blur-sm border-white/5 py-4'
    }`}>
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Editorial Title */}
          <a href="#" className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[#FF4D00] flex items-center justify-center font-['Bebas_Neue'] text-3xl text-white tracking-wider shadow-md shadow-[#FF4D00]/25 group-hover:bg-[#FF661A] transition-colors">
              8M
            </div>

            <div className="flex flex-col">
              <span className="font-['Bebas_Neue'] text-2xl sm:text-3xl tracking-wider text-white leading-none">
                {headerLogo.text || '8MOTO BHARAT'}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-mono font-semibold mt-0.5">
                {headerLogo.subtitle || 'EXPEDITIONS & TRAILS • PUNE'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
            <a href="#poe-spotlight" className="hover:text-[#FF4D00] transition-colors flex items-center gap-1.5 py-1">
              <Flame className="w-3.5 h-3.5 text-[#FF4D00]" />
              <span>POE 14 RAID</span>
            </a>
            <a href="#expeditions" className="hover:text-[#FF4D00] transition-colors flex items-center gap-1.5 py-1">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>TRAIL MATRIX</span>
            </a>
            <a href="#safety" className="hover:text-[#FF4D00] transition-colors flex items-center gap-1.5 py-1">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>SAFETY & SWEEPS</span>
            </a>
            <a href="#rig-prep" className="hover:text-[#FF4D00] transition-colors flex items-center gap-1.5 py-1">
              <Wrench className="w-3.5 h-3.5 text-slate-400" />
              <span>RIG PREP</span>
            </a>
            <a href="#community" className="hover:text-[#FF4D00] transition-colors py-1">
              <span>COMMUNITY</span>
            </a>
            <a href="#faq" className="hover:text-[#FF4D00] transition-colors py-1">
              <span>FAQ</span>
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick WhatsApp Inquiry */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-mono text-xs font-semibold tracking-wide border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>MARSHAL DESK</span>
            </a>

            {/* Official Entry Pass Trigger */}
            <button
              onClick={onOpenRegistration}
              className="px-4 py-2 rounded-lg bg-[#FF4D00] hover:bg-[#FF661A] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FF4D00]/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>RESERVE TRAIL SLOT</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenRegistration}
              className="px-3 py-1.5 rounded-lg bg-[#FF4D00] text-white text-xs font-mono font-bold"
            >
              ENTRY PASS
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-5 rounded-2xl bg-[#0C1017] border border-white/10 shadow-2xl flex flex-col gap-3.5 font-mono text-xs animate-in fade-in duration-200">
            <a 
              href="#poe-spotlight" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#FF4D00] py-1.5 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-[#FF4D00]" />
              <span>POE 14 Annual Raid (August 15–16)</span>
            </a>
            <a 
              href="#expeditions" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-[#FF4D00] py-1.5 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-slate-400" />
              <span>Expeditions & Trail Matrix</span>
            </a>
            <a 
              href="#safety" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-[#FF4D00] py-1.5 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-slate-400" />
              <span>Safety, Winch & Paramedic Sweep</span>
            </a>
            <a 
              href="#rig-prep" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-[#FF4D00] py-1.5 flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-slate-400" />
              <span>Rig Prep & Tire PSI Guide</span>
            </a>
            <a 
              href="#community" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-[#FF4D00] py-1.5"
            >
              Rider Community Reviews
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-[#FF4D00] py-1.5"
            >
              Trail Regulations & FAQ
            </a>
            
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegistration();
                }}
                className="w-full py-3 rounded-xl bg-[#FF4D00] text-center font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>RESERVE OFFICIAL TRAIL PASS</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-center font-bold text-white flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT WITH TRAIL MARSHAL</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
