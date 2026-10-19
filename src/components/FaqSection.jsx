import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const EXTENDED_FAQS = [
    {
      q: "What types of motorcycles are permitted in the Pune Offroad Expedition (POE)?",
      a: "Adventure motorcycles (KTM 390/250 Adv, Royal Enfield Himalayan 450/411, BMW GS series, Triumph Tiger, Hero Xpulse 200) and purpose-built dirt/enduro motorcycles are eligible. Street bikes, sportbikes, and commuters without dual-sport knobby tires and sump protection are strictly not permitted for safety reasons."
    },
    {
      q: "What happens if my machine stalls, breaks down, or gets stuck in the jungle?",
      a: "8Moto operates dedicated sweep crews with custom Gypsy and Thar 4x4 recovery rigs equipped with 12,000lb Warn winches, kinetic snatch ropes, and mobile mechanics following every batch. If your bike cannot be ridden out, it is secured on our sweep flatbed or winched out to basecamp. No rider or machine is ever left behind on the trail."
    },
    {
      q: "Can stock 4x4 SUVs participate in 8Moto events?",
      a: "Yes! We run separate classes for stock/mildly modified 4x4s (Thar, Gypsy, Jimny, Gurkha, D-Max) with AT tires, and an extreme class for locked/lifted rigs with winches and MT tires. Every vehicle undergoes safety scrutineering before flag-off."
    },
    {
      q: "What mandatory riding gear is inspected during scrutineering?",
      a: "Every motorcycle rider must wear a certified DOT/ECE full-face or off-road helmet, armored riding jacket, armored riding pants, off-road riding boots (or heavy adventure boots with rigid ankle support), and full-finger gloves. Knee braces and chest armor are strongly recommended."
    },
    {
      q: "I am a beginner or intermediate rider. Is POE too extreme for me?",
      a: "POE 14 is a demanding technical expedition. If this is your very first time riding off-road, we strongly recommend attending the 8Moto Riding Academy (Level 1 ADV Dynamics) first at our Panshet training grounds. For moderate riders, our marshals provide spotter guidance at every tricky gully and river crossing."
    },
    {
      q: "What are the food, stay, and camping arrangements during POE?",
      a: "POE includes an overnight mountain bivouac camp with weather-sealed tents, campfire debriefing, hot traditional Maharashtrian meals (pithla bhakri, chicken/veg curries), clean sanitation facilities, and high-protein trail energy rations."
    },
    {
      q: "What medical coverage is on standby in the valley?",
      a: "A dedicated 4x4 trauma ambulance staffed by certified emergency paramedics accompanies the convoy. The medical unit carries splints, trauma kits, oxygen cylinders, and coordinates with local hospitals along the valley corridor via VHF radio."
    }
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#07090E] relative border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF4D00]" />
            TRAIL REGULATIONS & LOGISTICS
          </div>
          <h2 className="text-4xl sm:text-6xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
            FREQUENTLY ASKED <span className="text-[#FF4D00]">QUESTIONS</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm max-w-lg mx-auto font-light leading-relaxed">
            Everything you need to know about vehicle prep, safety gear scrutineering, and trail recovery before setting out.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {EXTENDED_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen 
                    ? 'bg-[#121622] border-[#FF4D00]/50 shadow-xl' 
                    : 'bg-[#0E131C] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#FF4D00] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0E131C] border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-sm font-bold text-white font-mono">HAVE A SPECIFIC RIG OR GROUP INQUIRY?</div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">Direct line to 8Moto Trail Marshals at Pune Basecamp</div>
          </div>
          <a
            href="https://wa.me/919822086686?text=Hi%208Moto%20team!%20I%20have%20questions%20about%20joining%20the%20trails."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>TALK TO TRAIL MARSHAL</span>
          </a>
        </div>

      </div>
    </section>
  );
}
