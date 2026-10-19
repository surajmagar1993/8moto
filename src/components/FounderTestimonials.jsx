import React from 'react';
import { Quote, ShieldCheck, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function FounderTestimonials() {
  return (
    <section id="founder" className="py-20 sm:py-28 bg-[#090C13] relative border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Founder Spotlight Card */}
        <div className="rounded-3xl bg-[#0E131C] border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Portrait Image (5 Cols) */}
          <div className="lg:col-span-5 relative h-80 sm:h-[480px] lg:h-full min-h-[400px] bg-black">
            <img
              src="/images/founder_sangram.jpg"
              alt="Sangram Devekar Patil - Founder and Lead Marshal of 8Moto"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E131C] via-transparent to-transparent lg:hidden"></div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl lg:hidden">
              <div className="text-sm font-bold text-white">Sangram Devekar Patil</div>
              <div className="text-xs text-[#FF4D00] font-mono">Founder & Lead Marshal • 8Moto Bharat</div>
            </div>
          </div>

          {/* Founder Editorial Story (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] text-xs font-mono font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              LEAD MARSHAL & FOUNDER
            </div>

            <div>
              <h3 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide uppercase leading-none">
                SANGRAM DEVEKAR PATIL
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Pioneering Sahyadri Off-Road Expeditions Since 2012 • Pune, Maharashtra
              </p>
            </div>

            {/* Direct Quote */}
            <div className="relative pl-6 border-l-2 border-[#FF4D00] text-slate-200 text-sm sm:text-base leading-relaxed italic font-light">
              <Quote className="w-8 h-8 text-[#FF4D00]/20 absolute -top-4 -left-3 -z-10" />
              "We didn't build 8Moto to be an event company. We built it because we were tired of sanitized Sunday breakfast rides on straight highways. Real riding happens when the tarmac ends, the monsoon arrives, and you're axle-deep in red clay with five riders pushing your bike out together. That brotherhood is earned."
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              With over 14 years of mapping uncharted single-track trails across Lavasa, Mulshi, Varandha, and Konkan, Sangram has trained over 1,400+ adventure riders and pioneered the legendary Pune Offroad Expedition (POE). His focus on winch recovery, route reconnaissance, and paramedic presence has maintained an unbroken safety record.
            </p>

            {/* Key Marshal Credentials */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#07090E] border border-white/5">
                <div className="text-slate-400 text-[10px]">TRAILS CHARTED</div>
                <div className="text-base font-bold text-white mt-0.5">5,200+ KM</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07090E] border border-white/5">
                <div className="text-slate-400 text-[10px]">RIDERS MENTORED</div>
                <div className="text-base font-bold text-[#FF4D00] mt-0.5">3,800+</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07090E] border border-white/5 col-span-2 sm:col-span-1">
                <div className="text-slate-400 text-[10px]">SAFETY RECORD</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">100% Sweep</div>
              </div>
            </div>

          </div>

        </div>

        {/* Real Rider Voices / Community Testimonials */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                FROM THE TRAIL COMMUNITY
              </div>
              <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide uppercase mt-1">
                RIDERS WHO CONQUERED THE SAHYADRI
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Verified POE & Academy Finishers
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0E131C] border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-white/5">
                    <span className="text-[#FF4D00] font-bold">{t.role}</span>
                    <span className="text-slate-400 text-[11px]">{t.rig}</span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="text-sm font-bold text-white font-mono">{t.name}</div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Rider</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
