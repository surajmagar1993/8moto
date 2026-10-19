import React, { useState } from 'react';
import { Compass, Mountain, MapPin, ChevronRight, Video, Gauge, ArrowRight } from 'lucide-react';

export default function TrailMatrix({ expeditions, onOpenExpedition, onOpenRegistration }) {
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const expList = expeditions || [];
  const filtered = expList.filter(exp => {
    if (filterDifficulty === 'all') return true;
    return exp.difficultyLevel === parseInt(filterDifficulty, 10);
  });

  return (
    <section id="expeditions" className="py-20 sm:py-28 bg-[#07090E] relative border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-3">
              <Compass className="w-3.5 h-3.5 text-[#FF4D00]" />
              SAHYADRI & WESTERN GHATS ROUTE MATRIX
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              EXPEDITIONS & <span className="text-[#FF4D00]">TRAILS</span>
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl font-light">
              Curated off-road expeditions graded by technical severity. Every route is audited 48 hours prior and fully marshalled with mechanical winch and trauma paramedic escorts.
            </p>
          </div>

          {/* Difficulty Filters */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0E131C] border border-white/10 font-mono text-xs">
            <button
              onClick={() => setFilterDifficulty('all')}
              className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                filterDifficulty === 'all'
                  ? 'bg-[#FF4D00] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              ALL TRAILS ({expList.length})
            </button>
            <button
              onClick={() => setFilterDifficulty('1')}
              className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                filterDifficulty === '1'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              🟢 LEVEL 1 (NOVICE)
            </button>
            <button
              onClick={() => setFilterDifficulty('2')}
              className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                filterDifficulty === '2'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              🟡 LEVEL 2 (MODERATE)
            </button>
            <button
              onClick={() => setFilterDifficulty('3')}
              className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                filterDifficulty === '3'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              🔴 LEVEL 3 (EXTREME)
            </button>
          </div>
        </div>

        {/* Expeditions Grid (Spacious: 1 col on mobile, 2 cols on tablet, 3 on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="rally-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-[#FF4D00]/60 transition-all bg-[#0E131C]"
            >
              {/* Image banner */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-black">
                <img
                  src={exp.image || '/images/hero_monsoon.jpg'}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E131C] via-[#0E131C]/30 to-transparent"></div>
                
                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-[11px] font-mono font-bold text-white">
                    {exp.tag}
                  </span>
                  {exp.isFlagship && (
                    <span className="px-2.5 py-1 rounded-md bg-[#FF4D00] text-[11px] font-mono font-bold text-white shadow-lg">
                      ANNUAL FLAGSHIP
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border ${
                    exp.difficultyLevel === 1 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                      : exp.difficultyLevel === 2 
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-red-500/20 text-red-400 border-red-500/40'
                  }`}>
                    {exp.difficulty}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF4D00]" />
                    {exp.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mountain className="w-3.5 h-3.5 text-slate-400" />
                    {exp.elevation}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide group-hover:text-[#FF4D00] transition-colors leading-none">
                    {exp.title}
                  </h3>
                  
                  <p className="mt-2.5 text-xs text-slate-300 leading-relaxed font-light">
                    {exp.description}
                  </p>

                  {/* Terrain & Category Chips */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">TERRAIN:</span>
                      <span className="text-slate-200 font-medium">{exp.terrain}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">ELIGIBLE:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.category?.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-slate-300 font-mono">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stages Quick Profile */}
                  {exp.stages?.length > 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-[#07090E] border border-white/10">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                        <span>STAGE PROFILE</span>
                        <span>{exp.duration}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {exp.stages.slice(0, 2).map((st, i) => (
                          <div key={i} className="p-2 rounded bg-white/5 border border-white/5">
                            <div className="text-[10px] text-slate-400 truncate">{st.name.split(':')[1] || st.name}</div>
                            <div className="text-xs font-bold text-[#FF4D00] font-mono">{st.dist}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Price & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase">ENTRY FEE</div>
                    <div className="text-2xl font-bold font-['Bebas_Neue'] text-white">
                      {exp.price} <span className="text-xs text-slate-400 font-sans font-normal">/ rig</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenExpedition(exp)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>DOSSIER</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={onOpenRegistration}
                      className="px-4 py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#FF661A] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-[#FF4D00]/20 transition-all cursor-pointer"
                    >
                      BOOK
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
