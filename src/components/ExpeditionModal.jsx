import React, { useState } from 'react';
import { X, Calendar, MapPin, Mountain, ShieldCheck, CheckCircle2, MessageSquare, Play, Send } from 'lucide-react';
import { submitInquiry } from '../services/api';

export default function ExpeditionModal({ expedition, isOpen, onClose, whatsappNumber = '919822086686' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen || !expedition) return null;

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number');
      return;
    }

    setIsSending(true);
    await submitInquiry({
      ...formData,
      expeditionId: expedition.id,
      expeditionTitle: expedition.title
    });
    setIsSending(false);
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello 8Moto Team! I am interested in joining "${expedition.title}" (${expedition.dates}). My machine is ${formData.vehicle || 'my bike/4x4'}. Please share the registration details and requirements.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-[#0D121B] border border-white/15 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#111724] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#FF5500] text-white text-[11px] font-mono font-bold">
              {expedition.tag}
            </span>
            <span className="text-xs font-mono text-slate-400">
              EXPEDITION DOSSIER
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Hero Media (Video or Image) */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10">
            {expedition.videoUrl ? (
              <video
                src={expedition.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={expedition.image}
                alt={expedition.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D121B] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-['Bebas_Neue'] text-3xl sm:text-5xl text-white tracking-wide uppercase drop-shadow">
                  {expedition.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                    {expedition.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    {expedition.dates}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mountain className="w-3.5 h-3.5 text-slate-400" />
                    {expedition.elevation}
                  </span>
                </div>
              </div>

              <div className="font-['Bebas_Neue'] text-3xl text-[#FF5500]">
                {expedition.price} <span className="text-xs font-sans text-slate-400">/ rig</span>
              </div>
            </div>
          </div>

          {/* Details & Stages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Cols: Overview & Stages */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide mb-2">
                  EXPEDITION OVERVIEW
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {expedition.description}
                </p>
              </div>

              {/* Compatible Vehicles */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  COMPATIBLE VEHICLE CLASSES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expedition.category?.map((c, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                      🏍️ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stages List */}
              {expedition.stages?.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-[#FF5500] uppercase font-bold tracking-wider mb-3">
                    TRAIL STAGES & ELEVATION
                  </h4>
                  <div className="space-y-2.5">
                    {expedition.stages.map((st, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-[#080A0E] border border-white/5">
                        <div className="flex items-center justify-between text-sm font-bold text-white">
                          <span>{st.name}</span>
                          <span className="text-xs font-mono text-[#FF5500]">{st.dist}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Terrain: {st.terrain}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gear Requirements */}
              {expedition.gear?.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    MANDATORY SAFETY GEAR
                  </h4>
                  <div className="space-y-1.5">
                    {expedition.gear.map((g, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Cols: Inquiry & Contact Form */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#080A0E] border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide mb-1">
                  JOIN THIS EXPEDITION
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Send your rig details to the trail marshals or connect directly via WhatsApp.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmitInquiry} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Shinde"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-xs focus:border-[#FF5500] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">WhatsApp Mobile *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-xs focus:border-[#FF5500] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Machine Model (Bike or 4x4)</label>
                      <input
                        type="text"
                        placeholder="e.g. Himalayan 450 / Thar 4x4"
                        value={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-xs focus:border-[#FF5500] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Message / Questions</label>
                      <textarea
                        rows={2}
                        placeholder="Any queries regarding tires, fuel, or camping..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-xs focus:border-[#FF5500] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#FF5500]/25"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSending ? 'SENDING INQUIRY...' : 'SEND TRAIL INQUIRY'}</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 mx-auto" />
                    <div className="font-bold">INQUIRY RECEIVED!</div>
                    <p className="text-[11px] text-slate-300">
                      Our trail marshals will contact you via WhatsApp with the itinerary and briefing pack.
                    </p>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>DIRECT WHATSAPP INQUIRY</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
