import React, { useState } from 'react';
import { Film, Play, Image, Sparkles, X, ChevronRight } from 'lucide-react';
import { MEDIA_GALLERY } from '../data/mockData';

export default function MediaVault() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Expedition', 'Competition', 'Academy'];

  const filteredMedia = MEDIA_GALLERY.filter(item => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <section id="vault" className="py-24 bg-[#080A0E] relative border-t border-white/5">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-2">
              <Film className="w-3.5 h-3.5 text-[#FF5500]" />
              RAW TRAIL ARCHIVE & ACTION REELS
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              TRAIL CINEMA & <span className="text-[#FF5500]">VAULT</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Thirteen years of mud, river crossings, hill climbs, and brotherhood captured across the Sahyadri mountains.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#111622] border border-white/10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  filter === c
                    ? 'bg-[#FF5500] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 group cursor-pointer relative"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080B] via-transparent to-transparent"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#FF5500]/90 backdrop-blur-md flex items-center justify-center text-white shadow-2xl group-hover:scale-125 transition-transform">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded bg-[#080A0E]/80 backdrop-blur-md text-[11px] font-mono text-white border border-white/10">
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="text-xs font-mono text-[#FF5500] mb-1">{item.category}</div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide group-hover:text-[#FF5500] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Video Modal */}
        {activeMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full rounded-2xl bg-[#0E131C] border border-white/15 overflow-hidden shadow-2xl">
              
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#FF5500]" />
                  <span className="font-['Bebas_Neue'] text-xl text-white tracking-wide">
                    {activeMedia.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveMedia(null)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative max-h-[65vh] overflow-hidden">
                <img
                  src={activeMedia.image}
                  alt={activeMedia.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="text-center p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10">
                    <Play className="w-12 h-12 text-[#FF5500] mx-auto fill-current mb-3 animate-pulse" />
                    <div className="text-sm font-bold text-white uppercase tracking-wider">
                      Watch High-Definition Action Reel
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-1">
                      Full 4K Video Premiere on Official 8Moto Bharat YouTube
                    </div>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#FF5500] text-white text-xs font-bold font-mono tracking-wider hover:bg-[#FF6E1A] transition-all"
                    >
                      <span>LAUNCH ON YOUTUBE</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#0A0E15]">
                <p className="text-sm text-slate-300">
                  {activeMedia.caption}
                </p>
                <div className="mt-2 text-xs font-mono text-slate-500">
                  Shot on location: Lavasa & Mulshi Trail Ridges, Pune • 8Moto Media Team
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
