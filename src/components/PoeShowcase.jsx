import React from 'react';
import { Flame, Calendar, MapPin, Trophy, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';

export default function PoeShowcase({ expeditions, onOpenExpedition }) {
  const poe = expeditions?.find(e => e.isFlagship || e.id === 'poe-2026') || expeditions?.[0] || {
    id: 'poe-2026',
    title: 'Pune Offroad Expedition (POE 14)',
    dates: 'August 15-16, 2026',
    location: 'Lavasa & Mulshi Valley, Pune',
    price: '₹6,499',
    image: '/images/poe_expedition.jpg',
    stages: [
      { name: 'Stage 1: The Red Mud Gully', dist: '18 KM', terrain: 'Clay Ruts & Trench Drops' },
      { name: 'Stage 2: Boulder Bed Crossing', dist: '12 KM', terrain: 'Submerged River Rocks' },
      { name: 'Stage 3: The Fogline Incline', dist: '22 KM', terrain: 'High-Altitude Mist & Slicks' }
    ]
  };

  return (
    <section id="poe-spotlight" className="py-24 bg-[#080A0E] relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#FF5500]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              FLAGSHIP MONSOON TRADITION • EDITION 14
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              PUNE OFFROAD EXPEDITION <span className="text-[#FF5500]">(POE)</span>
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
              Founded over a decade ago in Pune by off-road veteran <span className="text-white font-medium">Sangram Devekar Patil</span>, POE is Maharashtra's ultimate monsoon crucible for adventure riders and 4x4 drivers.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
            <div className="bg-[#111622] border border-white/10 px-5 py-3 rounded-xl flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#FF5500]" />
              <div>
                <div className="text-xs text-slate-400 font-mono">DATES</div>
                <div className="text-sm font-bold text-white">{poe.dates}</div>
              </div>
            </div>
            <div className="bg-[#111622] border border-white/10 px-5 py-3 rounded-xl flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs text-slate-400 font-mono">LOCATION</div>
                <div className="text-sm font-bold text-white">{poe.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Action Image Showcase (7 Cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src={poe.image || '/images/poe_expedition.jpg'}
                alt="Pune Offroad Expedition Live Action"
                className="w-full h-[320px] sm:h-[440px] lg:h-[540px] xl:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080B] via-transparent to-transparent"></div>
              
              {/* Telemetry Overlay Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0C1017]/90 backdrop-blur-md border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FF5500]/20 border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{poe.title}</div>
                    <div className="text-xs text-slate-400 font-mono">2 Days • 52 KM Extreme Stages • Bivouac Camp</div>
                  </div>
                </div>
                <button
                  onClick={() => onOpenExpedition(poe)}
                  className="px-4 py-2 rounded-lg bg-[#FF5500] hover:bg-[#FF6E1A] text-white text-xs font-bold font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>VIEW DETAILS</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expedition Crucible & Stages (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="p-6 rounded-2xl bg-[#0F1420] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide uppercase flex items-center gap-2">
                  <span>THE CRUCIBLE</span>
                  <span className="text-xs font-mono text-[#FF5500] bg-[#FF5500]/10 px-2 py-0.5 rounded border border-[#FF5500]/30">3 STAGES</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">ELEVATION: 1,280M</span>
              </div>

              {/* Stage breakdown */}
              <div className="space-y-3">
                {poe.stages?.map((st, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF5500]/40 transition-colors">
                    <div className="flex items-center justify-between text-sm font-bold text-white">
                      <span>{st.name}</span>
                      <span className="text-xs font-mono text-[#FF5500]">{st.dist}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]"></span>
                      <span>Terrain: {st.terrain}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions Box */}
            <div className="p-6 rounded-2xl bg-[#0F1420] border border-white/10">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">EVERY EXPEDITION INCLUDES</h4>
              <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Heavy 4x4 Winch Sweep</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>On-Trail Paramedic Unit</span>
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
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>VHF Marshalling Grid</span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono">REGISTRATION FEE</div>
                  <div className="text-2xl font-bold font-['Bebas_Neue'] text-[#FF5500] tracking-wider">
                    {poe.price} <span className="text-xs text-slate-400 font-sans font-normal">/ rig</span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenExpedition(poe)}
                  className="px-6 py-3 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF5500]/25 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>VIEW FULL DOSSIER</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
