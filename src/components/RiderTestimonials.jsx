import React from 'react';
import { CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function RiderTestimonials() {
  return (
    <section id="community" className="py-20 sm:py-28 bg-[#090C13] relative border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              AUTHENTIC RIDER COMMUNITY
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              RIDERS WHO CONQUERED <span className="text-[#FF4D00]">THE SAHYADRI</span>
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
              Real reviews from adventure motorcyclists and 4x4 drivers who tackled the Pune Offroad Expedition and extreme Sahyadri trail traverses.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="px-3 py-1.5 rounded-lg bg-[#111622] border border-white/10 text-white font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>100% VERIFIED FINISHERS</span>
            </span>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#0E131C] border border-white/10 flex flex-col justify-between space-y-5 hover:border-[#FF4D00]/40 transition-colors relative group"
            >
              <div>
                {/* Role and Rig Badge */}
                <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-white/5">
                  <span className="text-[#FF4D00] font-bold uppercase tracking-wider">{t.role}</span>
                  <span className="text-slate-400 text-[11px] bg-white/5 px-2 py-0.5 rounded">{t.rig}</span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  "{t.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white font-mono">{t.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Pune, Maharashtra</div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Finisher</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
