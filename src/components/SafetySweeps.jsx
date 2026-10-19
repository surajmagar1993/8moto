import React from 'react';
import { ShieldCheck, Wrench, Radio, Compass, HeartPulse, CheckCircle2 } from 'lucide-react';
import { SAFETY_PILLARS } from '../data/mockData';

export default function SafetySweeps() {
  const iconMap = {
    ShieldAlert: HeartPulse,
    Wrench: Wrench,
    Radio: Radio,
    Navigation: Compass
  };

  return (
    <section id="safety" className="py-20 sm:py-28 bg-[#0B0F17] relative border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              100% RECOVERY RECORD • NO RIDER LEFT BEHIND
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              TRAIL SAFETY & <span className="text-emerald-400">WINCH SWEEP</span>
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
              Extreme off-roading carries real risk. That's why every 8Moto expedition is backed by dedicated 4x4 recovery rigs, certified paramedics, and off-grid radio communications.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-400">
            <span className="px-3.5 py-2 rounded-xl bg-[#121824] border border-white/10 text-white font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE VHF RADIO FREQUENCY MARSHALLED</span>
            </span>
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Recovery Photograph Showcase (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
              <img
                src="/images/trail_recovery.jpg"
                alt="8Moto Riverbed Recovery with Marshal and Winch Gypsy 4x4"
                className="w-full h-[320px] sm:h-[440px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>ACTIVE TRAIL RECON & SAFETY UNIT</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0C1018]/90 border border-white/10">
                <div className="text-xs font-mono text-[#FF4D00] font-bold">14 YEARS ZERO CRITICAL INCIDENT RECORD</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  Every river crossing, rock crawl, and clay gully is manned by experienced sweep marshals equipped with 12,000lb Warn winches.
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid (6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SAFETY_PILLARS.map((pillar, idx) => {
              const IconComp = iconMap[pillar.icon] || ShieldCheck;
              return (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-[#0E131C] border border-white/10 hover:border-emerald-500/40 transition-colors space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-['Bebas_Neue'] text-xl text-white tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Standard Protocol</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
