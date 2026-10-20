import React from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function TrailTicker({ onOpenRegistration }) {
  return (
    <div className="bg-[#0B0F17] border-b border-white/10 text-xs font-mono py-2.5 px-4 overflow-hidden relative z-40">
      <div className="max-w-[1720px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        
        {/* Left: Live Trail Dispatch */}
        <div className="flex items-center gap-2.5 truncate">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FF4D00]/15 text-[#FF4D00] text-[10px] font-bold uppercase tracking-wider shrink-0 border border-[#FF4D00]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse"></span>
            LIVE BULLETIN
          </span>
          <p className="text-slate-300 text-[11px] sm:text-xs truncate">
            <span className="text-white font-medium">SAHYADRI MONSOON RECON:</span> POE 14 Mulshi river crossing checked • Water depth 42cm • 38 slots remaining for Aug 15–16
          </p>
        </div>

        {/* Right: Quick Action & Basecamp Status */}
        <div className="flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VHF MARSHAL NET ACTIVE</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <button
            onClick={onOpenRegistration}
            className="text-[#FF4D00] hover:text-white font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>RESERVE TRAIL SLOT</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
