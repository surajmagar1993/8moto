import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, ChevronRight, Calendar, Users, ShieldAlert, ArrowRight } from 'lucide-react';
import { ACADEMY_COURSES } from '../data/mockData';

export default function AcademySection({ onOpenRegistration }) {
  const [activeCourseId, setActiveCourseId] = useState(ACADEMY_COURSES[0].id);

  const activeCourse = ACADEMY_COURSES.find(c => c.id === activeCourseId) || ACADEMY_COURSES[0];

  return (
    <section id="academy" className="py-20 sm:py-28 bg-[#07090E] relative border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="w-4 h-4" />
              CERTIFIED RIDING & 4X4 TRAINING
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              8MOTO <span className="text-amber-400">ACADEMY</span>
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
              We don't practice in empty parking lots. We train riders on real Sahyadri clay, scree inclines, and river boulders under the direct mentorship of certified rally marshals.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="px-3 py-1.5 rounded-lg bg-[#111622] border border-white/10 text-white font-bold">
              📍 Panshet Backwaters Training Ground, Pune
            </span>
          </div>
        </div>

        {/* Feature Grid: Hero Image + Interactive Curriculum Selector */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (6 Cols): Training Ground Action Photography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
              <img
                src="/images/academy_clinic.jpg"
                alt="8Moto Riding Academy Live Off-Road Clinic in Sahyadri"
                className="w-full h-[320px] sm:h-[420px] lg:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>EVERY ALTERNATE WEEKEND BATCH</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0C1018]/90 border border-white/10">
                <div className="text-xs font-mono text-amber-400 font-bold">MAX 10 RIDERS PER INSTRUCTOR</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  Individual feedback on clutch feathering, standing posture, and panic-free obstacle recovery.
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-4 rounded-xl bg-[#0E131C] border border-white/10">
                <div className="text-2xl font-bold font-['Bebas_Neue'] text-white">8:1</div>
                <div className="text-[10px] text-slate-400">STUDENT TO COACH RATIO</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0E131C] border border-white/10">
                <div className="text-2xl font-bold font-['Bebas_Neue'] text-amber-400">100%</div>
                <div className="text-[10px] text-slate-400">TERRAIN APPLICATION</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0E131C] border border-white/10">
                <div className="text-2xl font-bold font-['Bebas_Neue'] text-white">1,400+</div>
                <div className="text-[10px] text-slate-400">GRADUATED RIDERS</div>
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols): Course Tier Selector & Syllabus */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Tier Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {ACADEMY_COURSES.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setActiveCourseId(course.id)}
                  className={`p-3 sm:p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    activeCourseId === course.id
                      ? 'bg-[#151C28] border-amber-400 text-white shadow-lg'
                      : 'bg-[#0E131C] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold uppercase text-amber-400">{course.level}</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-1 leading-snug line-clamp-1">{course.title.split(' ')[0]} {course.title.split(' ')[1]}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">{course.price}</div>
                </button>
              ))}
            </div>

            {/* Detailed Course Syllabus Card */}
            <div className="p-6 rounded-2xl bg-[#0E131C] border border-white/10 space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                    {activeCourse.level} • {activeCourse.duration}
                  </span>
                  <h3 className="text-2xl font-['Bebas_Neue'] text-white tracking-wide mt-0.5">
                    {activeCourse.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {activeCourse.tag}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <div className="text-2xl font-bold font-['Bebas_Neue'] text-amber-400">
                    {activeCourse.price}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">Includes Lunch & Certification</div>
                </div>
              </div>

              {/* Curriculum Points */}
              <div>
                <h4 className="text-xs font-mono text-slate-300 uppercase font-bold tracking-wider mb-3">
                  CORE CLINIC SYLLABUS
                </h4>
                <div className="space-y-2.5">
                  {activeCourse.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenRegistration}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>ENROLL IN NEXT CLINIC</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/919822086686?text=Hello%208Moto!%20I%20want%20to%20know%20more%20about%20the%20Riding%20Academy%20batches."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-semibold text-center"
                >
                  ASK COACH
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
