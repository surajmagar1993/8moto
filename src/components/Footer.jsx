import React from 'react';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer({ settings, onOpenAdmin }) {
  const footerLogo = settings?.footerLogo || {
    text: '8MOTO BHARAT',
    imageUrl: '',
    description: "India's premier off-road motorsports expedition collective and riding academy based out of Pune, Maharashtra. Spearheading the annual Pune Offroad Expedition (POE) for 14 unbroken years."
  };

  const socials = settings?.socials || {
    instagram: 'https://instagram.com/8moto_bharat',
    youtube: 'https://youtube.com/@8moto_india',
    facebook: 'https://facebook.com/8moto.in',
    whatsapp: 'https://wa.me/919822086686'
  };

  return (
    <footer className="bg-[#05070B] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs font-mono">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Top Motorsports Partner Strip */}
        <div className="pb-12 border-b border-white/10 mb-12">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 text-center mb-6">
            SUPPORTED BY OFF-ROAD & MOTORSPORTS ALLIES
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80">
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest text-slate-300 hover:text-white transition-colors">CEAT SPECIALTY</span>
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest text-slate-300 hover:text-white transition-colors">MAXXIS TIRES</span>
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest text-[#FF4D00]">WARN WINCH</span>
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest text-slate-300 hover:text-white transition-colors">MOTUL LUBRICANTS</span>
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest text-slate-300 hover:text-white transition-colors">KTM ADVENTURE</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 font-sans">
          
          {/* Brand Info (Col 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF4D00] flex items-center justify-center font-['Bebas_Neue'] text-2xl text-white">
                8M
              </div>
              <span className="font-['Bebas_Neue'] text-3xl tracking-wider text-white">
                {footerLogo.text || '8MOTO BHARAT'}
              </span>
            </div>
            
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm font-light">
              {footerLogo.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <MapPin className="w-4 h-4 text-[#FF4D00] shrink-0" />
              <span>{settings?.basecamp || 'Basecamp: Pune • Western Ghats • 18.5204° N, 73.8567° E'}</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF4D00] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  title="8Moto Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF4D00] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  title="8Moto YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF4D00] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  title="8Moto Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              EXPEDITIONS & ACADEMY
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="#poe-spotlight" className="hover:text-[#FF4D00] transition-colors">Pune Offroad Expedition (POE 14)</a>
              </li>
              <li>
                <a href="#expeditions" className="hover:text-[#FF4D00] transition-colors">Sahyadri Mountain Ridge Recon</a>
              </li>
              <li>
                <a href="#expeditions" className="hover:text-[#FF4D00] transition-colors">Konkan Riverbed Raid</a>
              </li>
              <li>
                <a href="#academy" className="hover:text-[#FF4D00] transition-colors">ADV Motorcycle Dynamics (Level 1)</a>
              </li>
              <li>
                <a href="#academy" className="hover:text-[#FF4D00] transition-colors">4x4 Winch Engineering (Level 2)</a>
              </li>
              <li>
                <a href="#rig-prep" className="hover:text-[#FF4D00] transition-colors">Machine Setup & Tire PSI Guide</a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              MARSHAL DESK
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF4D00]" />
                <span className="font-mono">{settings?.phone || '+91 98220 8MOTO'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF4D00]" />
                <span className="font-mono">{settings?.email || 'expeditions@8moto.in'}</span>
              </li>
              <li className="pt-2">
                <div className="text-[11px] text-slate-400 font-mono">Expedition Desk Hours:</div>
                <div className="text-white font-medium">Mon–Sat • 09:00–19:00 IST</div>
              </li>
              <li className="pt-1">
                <div className="text-[11px] text-slate-400 font-mono">Basecamp Location:</div>
                <div className="text-white font-medium">Pune, Maharashtra, Bharat</div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Discreet Admin Access */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; 2012–2026 {footerLogo.text || '8MOTO BHARAT'}. Official Off-Road Expeditions & Riding Academy.
          </div>
          
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by GoDaddy Node.js Hosting</span>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-[#FF4D00] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Marshal Backend Portal"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
