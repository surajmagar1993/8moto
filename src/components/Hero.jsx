import React from 'react';
import { Flame, Compass, ChevronRight, MapPin, Gauge, Video, Sparkles } from 'lucide-react';

export default function Hero({ settings, onOpenExpedition, onPlayRev }) {
  const hero = settings?.hero || {
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-motorcyclist-riding-on-a-dirt-road-in-nature-41589-large.mp4',
    imageUrl: '/images/hero_monsoon.jpg',
    titleLine1: 'BORN IN THE',
    titleHighlight: 'SAHYADRI',
    titleLine2: 'MONSOON.',
    subtitle: "Welcome to 8MOTO BHARAT. Organizers of India's legendary Pune Offroad Expedition (POE). Where dual-sport ADVs, hard enduro machines, and battle-prepped 4x4 rigs tackle extreme clay gullies and uncharted mountain passes.",
    editionBadge: 'EDITION 14 CONFIRMED',
    locationBadge: 'LAVASA • MULSHI • SAHYADRI GHATS'
  };

  const telemetry = settings?.telemetry || [
    { value: "14+", label: "POE Editions Conquered", sub: "Annual Flagship Since 2012" },
    { value: "5,200+", label: "Kilometers of Raw Trail", sub: "Sahyadri Rugged Terrain" },
    { value: "3,800+", label: "Riders & Drivers United", sub: "ADVs, Dirt Bikes & 4x4s" },
    { value: "100%", label: "Marshal & Safety Record", sub: "Medical & Winch Support" },
  ];

  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 overflow-hidden">
      
      {/* Edge-to-Edge Background Media (Full-Screen Immersive) */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {hero.mediaType === 'video' && hero.videoUrl ? (
          <video
            src={hero.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            poster={hero.imageUrl || '/images/hero_monsoon.jpg'}
            className="w-full h-full object-cover object-center scale-[1.02]"
          />
        ) : (
          <img
            src={hero.imageUrl || '/images/hero_monsoon.jpg'}
            alt="8Moto Sahyadri Off-road Expedition"
            className="w-full h-full object-cover object-center scale-[1.02]"
          />
        )}
        
        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080B] via-[#06080B]/70 to-[#06080B]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080B] via-[#06080B]/80 to-transparent"></div>
        <div className="absolute inset-0 carbon-grid opacity-20 pointer-events-none"></div>

        {/* Video Mode Indicator */}
        {hero.mediaType === 'video' && hero.videoUrl && (
          <div className="absolute top-28 right-6 lg:right-12 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping"></span>
            <Video className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>TRAIL CINEMA ACTIVE</span>
          </div>
        )}
      </div>

      {/* Main Full-Width Centered Content */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-4xl xl:max-w-5xl">
          
          {/* Live Telemetry Pill */}
          <div className="inline-flex items-center gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-xs font-mono mb-4 sm:mb-6 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping"></span>
            <span className="text-[#FF5500] font-bold tracking-wider">{hero.editionBadge || 'EDITION 14 CONFIRMED'}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{hero.locationBadge || 'LAVASA • MULSHI • SAHYADRI GHATS'}</span>
            </span>
          </div>

          {/* Scalable Responsive Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-['Bebas_Neue'] tracking-tight text-white uppercase leading-[0.88] drop-shadow-2xl">
            {hero.titleLine1 || 'BORN IN THE'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF6E1A] to-[#F59E0B]">
              {hero.titleHighlight || 'SAHYADRI'}
            </span>
            <br />
            {hero.titleLine2 || 'MONSOON.'}
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-200 font-light leading-relaxed max-w-3xl drop-shadow">
            {hero.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#poe-spotlight"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-bold tracking-wide shadow-xl shadow-[#FF5500]/30 hover:shadow-[#FF5500]/50 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2.5 text-sm sm:text-base group"
            >
              <Flame className="w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform" />
              <span>EXPLORE POE 2026</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#expeditions"
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-semibold transition-all cursor-pointer flex items-center gap-2 text-sm sm:text-base hover:-translate-y-0.5"
            >
              <Compass className="w-4 sm:w-5 h-4 sm:h-5 text-slate-300" />
              <span>TRAILS & EXPEDITIONS</span>
            </a>

            <button
              onClick={onPlayRev}
              className="px-4 py-3.5 sm:py-4 rounded-xl bg-[#161D2C]/90 backdrop-blur-md border border-white/10 hover:border-[#FF5500]/50 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 text-xs sm:text-sm font-mono"
              title="Test engine throttle audio sound"
            >
              <Gauge className="w-4 h-4 text-[#FF5500]" />
              <span className="hidden sm:inline">REV THROTTLE</span>
            </button>
          </div>

          {/* Machine Eligibility Chips */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-300 font-mono">
            <span className="text-slate-400 uppercase tracking-wider text-[11px]">Eligible Rigs:</span>
            <span className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
              🏍️ ADVs & Enduro (KTM, Himalayan, GS, Xpulse)
            </span>
            <span className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
              🚙 4x4 Off-Road (Thar, Gypsy, Jimny, Hilux)
            </span>
          </div>

        </div>
      </div>

      {/* Pinned Telemetry Stats Bar (Fully Responsive Across All Devices) */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-10">
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {telemetry.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/30 backdrop-blur-md border border-white/5 hover:border-[#FF5500]/30 transition-all group"
            >
              <div className="font-['Bebas_Neue'] text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider flex items-baseline gap-1 group-hover:text-[#FF5500] transition-colors leading-none">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1 sm:mt-1.5">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-mono mt-0.5 truncate">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
