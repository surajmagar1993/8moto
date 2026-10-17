import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/mockData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-[#080A0E] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF5500]" />
            TRAIL REGULATIONS & LOGISTICS
          </div>
          <h2 className="text-4xl sm:text-6xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
            FREQUENTLY ASKED <span className="text-[#FF5500]">QUESTIONS</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-lg mx-auto">
            Everything you need to know about vehicle prep, safety gear requirements, and trail protocol before setting out.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen 
                    ? 'bg-[#111622] border-[#FF5500]/50 shadow-xl' 
                    : 'bg-[#0B0F17] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#FF5500] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-sm font-bold text-white">Still have custom rig or group query?</div>
            <div className="text-xs text-slate-400 font-mono">Our trail marshals are available 24/7 on WhatsApp & Phone</div>
          </div>
          <a
            href="https://wa.me/919822086686"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>TALK TO TRAIL MARSHAL</span>
          </a>
        </div>

      </div>
    </section>
  );
}
