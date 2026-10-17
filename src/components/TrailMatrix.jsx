import React, { useState } from 'react';
import { Compass, Mountain, MapPin, ChevronRight, Video } from 'lucide-react';

export default function TrailMatrix({ expeditions, onOpenExpedition }) {
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const expList = expeditions || [];
  const filtered = expList.filter(exp => {
    if (filterDifficulty === 'all') return true;
    return exp.difficultyLevel === parseInt(filterDifficulty, 10);
  });

  return (
    <section id="expeditions" className="py-24 bg-[#06080B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-2">
              <Compass className="w-3.5 h-3.5 text-[#FF5500]" />
              SAHYADRI & WESTERN GHATS ROUTE MATRIX
            </div>
            <h2 className="text-4xl sm:text-6xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              EXPEDITIONS & <span className="text-[#FF5500]">TRAILS</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Curated off-road expeditions graded by technical severity. Every expedition is fully marshalled with mechanical and medical recovery escorts.
            </p>
          </div>

          {/* Difficulty Filters */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0F1420] border border-white/10">
            <button
              onClick={() => setFilterDifficulty('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                filterDifficulty === 'all'
                  ? 'bg-[#FF5500] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              ALL TRAILS ({expList.length})
            </button>
            <button
              onClick={() => setFilterDifficulty('1')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                filterDifficulty === '1'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              🟢 LEVEL 1 (NOVICE)
            </button>
            <button
              onClick={() => setFilterDifficulty('2')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                filterDifficulty === '2'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              🟡 LEVEL 2 (MODERATE)
            </button>
            <button
              onClick={() => setFilterDifficulty('3')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                filterDifficulty === '3'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              🔴 LEVEL 3 (EXTREME)
            </button>
          </div>
        </div>

        {/* Expeditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-[#FF5500]/50"
            >
              {/* Image banner */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.image || '/images/hero_monsoon.jpg'}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1017] via-[#0C1017]/40 to-transparent"></div>
                
                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#0C1017]/90 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-white">
                    {exp.tag}
                  </span>
                  {exp.isFlagship && (
                    <span className="px-2.5 py-1 rounded-md bg-[#FF5500] text-xs font-mono font-bold text-white shadow-lg">
                      POE EVENT
                    </span>
                  )}
                  {exp.videoUrl && (
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <Video className="w-3 h-3" /> VIDEO
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border backdrop-blur-md ${
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
                    <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                    {exp.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mountain className="w-3.5 h-3.5 text-slate-400" />
                    {exp.elevation}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide group-hover:text-[#FF5500] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Terrain & Category Chips */}
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500 font-mono">Terrain:</span>
                      <span className="text-slate-300">{exp.terrain}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500 font-mono">Compatible:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.category?.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[11px] text-slate-300 font-mono">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stages Profile */}
                  {exp.stages?.length > 0 && (
                    <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                        <span>TRAIL STAGES</span>
                        <span>{exp.duration}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {exp.stages.slice(0, 3).map((st, i) => (
                          <div key={i} className="text-center p-2 rounded bg-black/40 border border-white/5">
                            <div className="text-[10px] text-slate-400 truncate">{st.name.split(':')[1] || st.name}</div>
                            <div className="text-xs font-bold text-[#FF5500] font-mono">{st.dist}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Price & Action */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase">Entry Fee</div>
                    <div className="text-2xl font-bold font-['Bebas_Neue'] text-white">
                      {exp.price} <span className="text-xs text-slate-400 font-sans font-normal">/ rig</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenExpedition(exp)}
                    className="px-5 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-semibold text-xs tracking-wider font-mono transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-[#FF5500]/20"
                  >
                    <span>EXPLORE DOSSIER</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
