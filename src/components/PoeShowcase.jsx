import React, { useState } from 'react';
import { Flame, Calendar, MapPin, Trophy, ShieldCheck, CheckCircle2, ChevronRight, AlertTriangle, ArrowRight, Gauge } from 'lucide-react';

export default function PoeShowcase({ expeditions, onOpenExpedition, onOpenRegistration }) {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const poe = expeditions?.find(e => e.isFlagship || e.id === 'poe-2026') || expeditions?.[0] || {
    id: 'poe-2026',
    title: 'Pune Offroad Expedition (POE 14)',
    dates: 'August 15–16, 2026',
    location: 'Lavasa & Mulshi Valley, Pune, Maharashtra',
    price: '₹6,499',
    image: '/images/poe_expedition.jpg',
    stages: [
      { 
        name: 'Stage 1: The Red Clay Gully', 
        dist: '18 KM', 
        elevation: '720m → 1,050m', 
        gradient: '38° Mud Rut Drop',
        terrain: 'Clay Ruts, Trench Drops & Monsoon Silt',
        notes: 'Low-speed clutch feathering essential. Dedicated 4x4 winch crew positioned at gully choke point.'
      },
      { 
        name: 'Stage 2: Boulder Bed Forcing', 
        dist: '12 KM', 
        elevation: '940m River Valley', 
        gradient: 'Submerged River Rocks',
        terrain: 'Wet Basalt Boulders, Rapids & Silt Sand',
        notes: 'Mandatory line scout before entry. Keep throttle constant through 40cm water crossings.'
      },
      { 
        name: 'Stage 3: The Fogline Ridge Run', 
        dist: '22 KM', 
        elevation: '1,280M High Peak', 
        gradient: 'Low-Visibility Scree Hairpins',
        terrain: 'Loose Basalt Scree, Fog & Wet Rock Steps',
        notes: 'Headlights and reflective vests mandatory. Fog drops visibility to under 15 meters on the ridge.'
      }
    ]
  };

  const activeStage = poe.stages?.[activeStageIdx] || poe.stages?.[0];

  return (
    <section id="poe-spotlight" className="py-20 sm:py-28 bg-[#090C13] relative border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5" />
              ANNUAL FLAGSHIP RAID • EDITION 14
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              PUNE OFFROAD EXPEDITION <span className="text-[#FF4D00]">(POE 14)</span>
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
              Founded in 2012 by off-road veteran <span className="text-white font-medium">Sangram Devekar Patil</span>, POE is Maharashtra's ultimate monsoon crucible. Dual-sport ADVs, dirt bikes, and battle-prepped 4x4 rigs push their limits side-by-side.
            </p>
          </div>

          {/* Rally Timing & Location Card */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 font-mono text-xs">
            <div className="bg-[#121622] border border-white/10 px-5 py-3.5 rounded-xl flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#FF4D00]" />
              <div>
                <div className="text-[10px] text-slate-400">DATES CONFIRMED</div>
                <div className="text-sm font-bold text-white">{poe.dates}</div>
              </div>
            </div>
            <div className="bg-[#121622] border border-white/10 px-5 py-3.5 rounded-xl flex items-center gap-3">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] text-slate-400">BASECAMP & VALLEY</div>
                <div className="text-sm font-bold text-white">Lavasa & Mulshi Valley, Pune</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Roadbook & Live Stage Profile */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 Cols): Documentary Photo & Rig Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
              <img
                src={poe.image || '/images/poe_expedition.jpg'}
                alt="Pune Offroad Expedition Live Monsoon Action"
                className="w-full h-[340px] sm:h-[460px] lg:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C13] via-transparent to-transparent"></div>
              
              {/* Telemetry Stamp */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SCRUTINEERING PASS: 2026 AUDITED</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0C1018]/90 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-[#FF4D00] font-bold">2-DAY MONSOON RAID</div>
                  <div className="text-sm sm:text-base font-bold text-white">52 KM Extreme Mountain Stages • Ridge Bivouac Camp</div>
                </div>
                <button
                  onClick={() => onOpenExpedition(poe)}
                  className="px-4 py-2 rounded-lg bg-[#FF4D00] hover:bg-[#FF661A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>FULL DOSSIER</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Inclusions Strip */}
            <div className="p-6 rounded-2xl bg-[#0E131C] border border-white/10">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>OFFICIAL ENTRY PACKAGE INCLUSIONS</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> FIM SAFETY PROTOCOL
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Heavy 4x4 Winch Sweep</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trauma Paramedic Unit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>VHF Marshalling Net</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>POE Finisher Trophy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Monsoon Camp & Meals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official 3M Trail Decal</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 Cols): Interactive Roadbook Stages */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Interactive Stage Tab Selector */}
            <div className="p-6 rounded-2xl bg-[#0E131C] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide uppercase flex items-center gap-2">
                  <span>THE 3 CRUCIBLE STAGES</span>
                </h3>
                <span className="text-xs font-mono text-[#FF4D00] bg-[#FF4D00]/10 px-2 py-0.5 rounded border border-[#FF4D00]/30">
                  PEAK ELEVATION: 1,280M
                </span>
              </div>

              {/* Stage Buttons */}
              <div className="space-y-2 mb-5">
                {poe.stages?.map((st, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStageIdx(i)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      activeStageIdx === i
                        ? 'bg-[#151C28] border-[#FF4D00] text-white shadow-lg'
                        : 'bg-[#0A0D14] border-white/5 text-slate-400 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono font-bold uppercase text-slate-400">STAGE 0{i + 1}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{st.name.split(':')[1] || st.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-[#FF4D00]">{st.dist}</div>
                      <div className="text-[10px] text-slate-500 font-mono">TECHNICAL</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Stage Deep-Dive Card */}
              {activeStage && (
                <div className="p-4 rounded-xl bg-[#07090E] border border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-white/5">
                    <span>ELEVATION: {activeStage.elevation || '720M - 1,280M'}</span>
                    <span>GRADIENT: {activeStage.gradient || '38° CLIMB'}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">Terrain Characteristics:</span>
                    <p className="text-slate-200 mt-0.5 font-sans font-medium">{activeStage.terrain}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[11px] flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">MARSHAL BRIEFING: </span>
                      <span className="text-slate-300 font-sans">{activeStage.notes}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Registration Action Card */}
            <div className="p-6 rounded-2xl bg-[#0E131C] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">ALL-INCLUSIVE ENTRY FEE</div>
                  <div className="text-3xl font-bold font-['Bebas_Neue'] text-white">
                    {poe.price} <span className="text-xs font-sans text-slate-400 font-normal">/ rider or rig</span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <div className="text-emerald-400 font-bold">LIMITED GRID</div>
                  <div className="text-slate-400 text-[11px]">38 slots left</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={onOpenRegistration}
                  className="w-full py-3.5 rounded-xl bg-[#FF4D00] hover:bg-[#FF661A] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xl shadow-[#FF4D00]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>RESERVE OFFICIAL TRAIL SLOT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenExpedition(poe)}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>INSPECT FULL ROUTE ROADBOOK</span>
                </button>
              </div>

              <p className="mt-3 text-[11px] text-slate-400 text-center font-mono">
                Includes bivouac camping, sweep recovery, meals, and medical coverage.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
