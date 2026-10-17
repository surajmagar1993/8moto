import React from 'react';
import { Flame, Compass, ChevronRight, MapPin, Gauge, Video } from 'lucide-react';

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
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Media: Video or Image */}
      <div className="absolute inset-0 z-0">
        {hero.mediaType === 'video' && hero.videoUrl ? (
          <video
            src={hero.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            poster={hero.imageUrl || '/images/hero_monsoon.jpg'}
            className="w-full h-full object-cover object-center transform scale-105"
          />
        ) : (
          <img
            src={hero.imageUrl || '/images/hero_monsoon.jpg'}
            alt="8Moto Sahyadri Off-road Expedition"
            className="w-full h-full object-cover object-center transform scale-105"
          />
        )}
        
        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080B] via-[#06080B]/80 to-[#06080B]/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080B] via-[#06080B]/75 to-transparent"></div>
        <div className="absolute inset-0 carbon-grid opacity-20 pointer-events-none"></div>

        {/* Video Mode Indicator */}
        {hero.mediaType === 'video' && hero.videoUrl && (
          <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping"></span>
            <Video className="w-3 h-3 text-[#FF5500]" />
            <span>LIVE TRAIL CINEMA BACKGROUND</span>
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          
          {/* Live Telemetry Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping"></span>
            <span className="text-[#FF5500] font-bold">{hero.editionBadge || 'EDITION 14 CONFIRMED'}</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {hero.locationBadge || 'LAVASA • MULSHI • SAHYADRI GHATS'}
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-['Bebas_Neue'] tracking-tight text-white uppercase leading-[0.9] drop-shadow-2xl">
            {hero.titleLine1 || 'BORN IN THE'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF6E1A] to-[#F59E0B]">
              {hero.titleHighlight || 'SAHYADRI'}
            </span>{' '}
            {hero.titleLine2 || 'MONSOON.'}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
            {hero.subtitle}
          </p>

          {/* Action CTAs (Claim Trail Pass removed, replaced with Explore / Details) */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#poe-spotlight"
              className="px-8 py-4 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-bold tracking-wide shadow-xl shadow-[#FF5500]/30 hover:shadow-[#FF5500]/50 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3 text-base group"
            >
              <Flame className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>EXPLORE POE 2026</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#expeditions"
              className="px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/30 text-white font-semibold transition-all cursor-pointer flex items-center gap-2 text-base hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5 text-slate-300" />
              <span>TRAILS & ACADEMY</span>
            </a>

            <button
              onClick={onPlayRev}
              className="px-4 py-4 rounded-xl bg-[#161D2C]/80 border border-white/10 hover:border-[#FF5500]/50 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 text-sm font-mono"
              title="Test engine throttle audio sound"
            >
              <Gauge className="w-4 h-4 text-[#FF5500]" />
              <span className="hidden sm:inline">REV ENGINE</span>
            </button>
          </div>

          {/* Badges / Vehicle Classes */}
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="text-slate-500 uppercase tracking-wider">Trail Machines:</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
              🏍️ ADV & Enduro (KTM, Himalayan, GS, Xpulse)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
              🚙 4x4 SUVs (Thar, Gypsy, Jimny, Hilux)
            </span>
          </div>

        </div>

        {/* Telemetry Stats Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {telemetry.map((stat, idx) => (
            <div key={idx} className="relative group">
              <div className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider flex items-baseline gap-1 group-hover:text-[#FF5500] transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
