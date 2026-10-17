import React from 'react';
import { Award, CheckCircle2, ChevronRight, UserCheck, ShieldCheck, Flame } from 'lucide-react';
import { ACADEMY_COURSES, BRAND_INFO } from '../data/mockData';

export default function Academy({ onOpenBooking }) {
  return (
    <section id="academy" className="py-24 bg-[#080A0E] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] text-xs font-mono font-bold uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            PROFESSIONAL OFF-ROAD CLINIC & MASTERCLASSES
          </div>
          <h2 className="text-4xl sm:text-6xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
            8MOTO <span className="text-[#FF5500]">OFF-ROAD ACADEMY</span>
          </h2>
          <p className="mt-3 text-slate-300 text-base font-light">
            Stop fearing steep drops, loose gravel, and deep ruts. Our certified master instructors break down the physics of off-road control for ADVs, dirt bikes, and 4x4 overland rigs.
          </p>
        </div>

        {/* Lead Instructor Feature Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#121824] via-[#0E131C] to-[#0A0D14] border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF5500] mb-2">
                <UserCheck className="w-4 h-4" />
                HEAD COACH & LEAD MARSHAL
              </div>
              <h3 className="text-3xl font-['Bebas_Neue'] text-white tracking-wide">
                SANGRAM DEVEKAR PATIL
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-4">
                Founder, 8Moto Bharat • Master Trainer & Expedition Pioneer
              </p>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-light">
                "Off-roading isn't about raw power or spinning tires until you're buried up to the axle. It's about weight transfer, clutch finesse, reading the contour of the dirt, and having the discipline to walk the trail before riding it."
              </p>
              
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 13+ Years Trail Experience
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/5">
                  <Flame className="w-3.5 h-3.5 text-[#FF5500]" /> 1,200+ Riders Certified
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Pioneer of POE Expedition
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-xl overflow-hidden border border-white/10 shadow-xl">
              <img
                src="/images/academy_training.jpg"
                alt="8Moto Academy Training Session"
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>

          </div>
        </div>

        {/* Academy Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ACADEMY_COURSES.map((course) => (
            <div
              key={course.id}
              className="glass-card rounded-2xl p-7 border border-white/10 flex flex-col justify-between hover:border-[#FF5500]/50 relative group"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-[#FF5500]/15 text-[#FF5500] text-xs font-mono font-bold">
                  {course.level}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-[11px] font-mono text-slate-300 border border-white/5">
                  {course.badge}
                </span>
              </div>

              <div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide group-hover:text-[#FF5500] transition-colors leading-tight">
                  {course.title}
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-1 mb-5">
                  {course.tag}
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-6 text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>Duration:</span>
                  <span className="text-white font-bold">{course.duration}</span>
                </div>

                {/* Highlights */}
                <div className="space-y-3 mb-6">
                  {course.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Course Fee</div>
                  <div className="text-2xl font-bold font-['Bebas_Neue'] text-white">
                    {course.price}
                  </div>
                </div>

                <a
                  href={`https://wa.me/919822086686?text=${encodeURIComponent(`Hello 8Moto Academy! I would like to inquire about enrolling in ${course.title} (${course.level}). Please share the next schedule.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#FF5500] text-white hover:shadow-lg hover:shadow-[#FF5500]/30 transition-all font-mono text-xs font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <span>INQUIRE COURSE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
