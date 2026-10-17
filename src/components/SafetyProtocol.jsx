import React from 'react';
import { ShieldCheck, Wrench, Radio, Compass, AlertCircle, Quote } from 'lucide-react';
import { SAFETY_PILLARS, TESTIMONIALS } from '../data/mockData';

export default function SafetyProtocol() {
  const getIcon = (type) => {
    switch (type) {
      case 'ShieldAlert':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#FF5500]" />;
      case 'Radio':
        return <Radio className="w-6 h-6 text-amber-400" />;
      default:
        return <Compass className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="safety" className="py-24 bg-[#06080B] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            ZERO COMPROMISE STANDARDS
          </div>
          <h2 className="text-4xl sm:text-6xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
            TRAIL SAFETY & <span className="text-emerald-400">MARSHAL FLEET</span>
          </h2>
          <p className="mt-3 text-slate-300 text-base font-light">
            We venture into valleys with zero cellular reception and raging flash streams. Our military-grade safety infrastructure guarantees that every participant returns home safely.
          </p>
        </div>

        {/* Safety Pillars 4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAFETY_PILLARS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0D121B] border border-white/10 hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active on all trails</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials from Real Riders */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide uppercase">
              VOICES FROM THE <span className="text-[#FF5500]">MUD</span>
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Real stories from riders and drivers who conquered the Pune Offroad Expedition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-7 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#FF5500]/40 mb-4" />
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-[11px] font-mono text-[#FF5500]">{t.rig}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
