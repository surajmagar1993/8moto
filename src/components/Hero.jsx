import React from 'react';
import { Flame, MapPin, ShieldCheck, GraduationCap, ArrowRight, Ticket } from 'lucide-react';

export default function Hero({ settings, onOpenRegistration }) {
  const hero = settings?.hero || {
    mediaType: 'image',
    imageUrl: '/images/hero_monsoon.jpg',
    videoUrl: '',
    titleLine1: 'THE MONSOON CRUCIBLE',
    titleHighlight: 'OF INDIA.',
    titleLine2: '',
    subtitle: '14 unbroken years of charting treacherous red clay trenches, submerged riverbed boulders, and vertical Sahyadri ridges. Home of the Pune Offroad Expedition (POE) and premier ADV & 4x4 training academy.',
    editionBadge: 'EDITION 14 CONFIRMED • AUG 15-16, 2026',
    locationBadge: 'LAVASA • MULSHI • VARANDHA GHATS'
  };

  const telemetry = [
    { value: "14TH", label: "Annual POE Raid", detail: "Unbroken monsoon tradition since 2012" },
    { value: "5,200+", label: "KM of Raw Trail", detail: "Sahyadri & Konkan single-tracks" },
    { value: "3,800+", label: "Riders & 4x4 Rigs", detail: "From stock ADVs to locked Gypsys" },
    { value: "100%", label: "Recovery Record", detail: "Heavy 4x4 winches & paramedic sweep" },
  ];

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-between pt-12 pb-10 overflow-hidden bg-[#07090E]">
      
      {/* Background Media with Editorial Contrast Treatment */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {hero.mediaType === 'video' && hero.videoUrl ? (
          <video
            src={hero.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            poster={hero.imageUrl || '/images/hero_monsoon.jpg'}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <img
            src={hero.imageUrl || '/images/hero_monsoon.jpg'}
            alt="8Moto Sahyadri Off-road Expedition"
            className="w-full h-full object-cover object-center"
          />
        )}
        
        {/* Layered cinematic dark vignetting for authentic text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/75 to-[#07090E]/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090E] via-[#07090E]/85 to-transparent"></div>
        <div className="absolute inset-0 topo-pattern opacity-40 pointer-events-none"></div>
      </div>

      {/* Main Hero Editorial Box */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-4xl xl:max-w-5xl">
          
          {/* Authentic Expedition Badge */}
          <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs font-mono mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]"></span>
            <span className="text-[#FF4D00] font-bold tracking-wider">{hero.editionBadge || 'EDITION 14 • AUG 15-16, 2026'}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{hero.locationBadge || 'LAVASA • MULSHI • VARANDHA GHATS'}</span>
            </span>
          </div>

          {/* Gritty Editorial Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-['Bebas_Neue'] tracking-tight text-white uppercase leading-[0.88] drop-shadow-xl">
            {hero.titleLine1 || 'THE MONSOON CRUCIBLE'}{' '}
            <span className="text-[#FF4D00]">
              {hero.titleHighlight || 'OF INDIA.'}
            </span>
            {hero.titleLine2 && <><br />{hero.titleLine2}</>}
          </h1>

          {/* Authentic Authoritative Subtitle */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-3xl drop-shadow">
            {hero.subtitle || '14 unbroken years of charting treacherous red clay trenches, submerged riverbed boulders, and vertical Sahyadri ridges. Home of the Pune Offroad Expedition (POE) and premier ADV & 4x4 training academy.'}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#poe-spotlight"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#FF4D00] hover:bg-[#FF661A] text-white font-mono text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xl shadow-[#FF4D00]/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2 group"
            >
              <Flame className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>POE 14 ROADBOOK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={() => onOpenRegistration('poe-2026')}
              className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Ticket className="w-4 h-4 text-[#FF4D00]" />
              <span>RESERVE PASS</span>
            </button>

            <a
              href="#academy"
              className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-black/40 hover:bg-black/60 border border-white/15 text-slate-300 hover:text-white font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>RIDING ACADEMY</span>
            </a>
          </div>

          {/* Rally Credential Badges */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FIM & Motorsport Safety Protocol</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="text-[#FF4D00] font-bold">100% RECOVERY:</span>
              <span>Warn-Winched Heavy 4x4 Sweep Team</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 text-slate-400">
              <span>Basecamp: Pune, MH (18.5204° N, 73.8567° E)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Grounded Rally Telemetry Bar */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {telemetry.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-4 sm:p-5 rounded-xl bg-[#0C1017]/90 border border-white/10 hover:border-[#FF4D00]/40 transition-colors"
            >
              <div className="font-['Bebas_Neue'] text-3xl sm:text-4xl lg:text-5xl text-white tracking-wider leading-none">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1 uppercase font-mono">
                {stat.label}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
