import React, { useState } from 'react';
import { X, Calendar, MapPin, Mountain, ShieldCheck, CheckCircle2, MessageSquare, Send, ArrowRight } from 'lucide-react';
import { submitInquiry } from '../services/api';
import Captcha from './Captcha';

export default function ExpeditionModal({ expedition, isOpen, onClose, whatsappNumber = '919822086686', onOpenRegistration }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  if (!isOpen || !expedition) return null;

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number');
      return;
    }
    if (!captchaVerified) {
      setCaptchaError(true);
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
    `Hello 8Moto Team! I am interested in joining "${expedition.title}" (${expedition.dates || 'Upcoming'}). My machine is ${formData.vehicle || 'my bike/4x4'}. Please share the registration details and requirements.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#0D121B] border border-white/15 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col font-sans">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#111724] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded bg-[#FF4D00] text-white text-[11px] font-mono font-bold uppercase">
              {expedition.tag}
            </span>
            <span className="text-xs font-mono text-slate-400">
              OFFICIAL ROUTE ROADBOOK DOSSIER
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
          
          {/* Hero Media Banner */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 bg-black">
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
                src={expedition.image || '/images/hero_monsoon.jpg'}
                alt={expedition.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D121B] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-['Bebas_Neue'] text-3xl sm:text-5xl text-white tracking-wide uppercase leading-none drop-shadow">
                  {expedition.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF4D00]" />
                    {expedition.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    {expedition.dates || 'Season 2026'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mountain className="w-3.5 h-3.5 text-slate-400" />
                    {expedition.elevation}
                  </span>
                </div>
              </div>

              <div className="font-['Bebas_Neue'] text-3xl text-[#FF4D00]">
                {expedition.price} <span className="text-xs font-sans text-slate-400">/ rig</span>
              </div>
            </div>
          </div>

          {/* Details & Inquiry Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Cols: Overview & Stages */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide mb-1.5 uppercase">
                  TRAIL PROFILE & OVERVIEW
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {expedition.description}
                </p>
              </div>

              {/* Compatible Vehicles */}
              <div>
                <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                  ELIGIBLE MACHINE CATEGORIES
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
                  <h4 className="text-[11px] font-mono text-[#FF4D00] uppercase font-bold tracking-wider mb-2.5">
                    STAGE BREAKDOWN & DISTANCE
                  </h4>
                  <div className="space-y-2">
                    {expedition.stages.map((st, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-[#07090E] border border-white/5 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">{st.name}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 font-light">Terrain: {st.terrain}</div>
                        </div>
                        <span className="font-mono font-bold text-[#FF4D00] shrink-0">{st.dist}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Sweep Guarantee */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-light">
                  Full mechanical 4x4 recovery sweep, paramedic presence, and bivouac catering included in registration.
                </span>
              </div>
            </div>

            {/* Right 5 Cols: Inquiry Form */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#07090E] border border-white/10 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide uppercase mb-1">
                  JOIN THIS EXPEDITION
                </h3>
                <p className="text-xs text-slate-400 font-light mb-4">
                  Send your rig details to the trail marshals or connect directly via WhatsApp.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmitInquiry} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Rider Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Shinde"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-xs focus:border-[#FF4D00] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">WhatsApp Mobile *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98220 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-xs focus:border-[#FF4D00] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Machine Model (Bike or 4x4)</label>
                      <input
                        type="text"
                        placeholder="e.g. Himalayan 450 / Thar 4x4"
                        value={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-xs focus:border-[#FF4D00] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Questions / Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Any queries regarding tires, fuel, or camping..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/10 text-white text-xs focus:border-[#FF4D00] focus:outline-none"
                      />
                    </div>

                    {/* Anti-Spam Security Captcha */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <Captcha
                        onVerify={(isValid) => {
                          setCaptchaVerified(isValid);
                          if (isValid) setCaptchaError(false);
                        }}
                        hasError={captchaError}
                        resetTrigger={isOpen}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3 rounded-xl bg-[#FF4D00] hover:bg-[#FF661A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D00]/25"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSending ? 'DISPATCHING...' : 'DISPATCH INQUIRY TO MARSHALS'}</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 mx-auto" />
                    <div className="font-bold">INQUIRY RECEIVED!</div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Our trail marshals will contact you via WhatsApp with the full briefing pack.
                    </p>
                  </div>
                )}
              </div>

              {/* Direct Digital Pass or WhatsApp Action */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                {onOpenRegistration && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenRegistration(expedition.id);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#FF661A] text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>RESERVE OFFICIAL TRAIL PASS</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 text-center"
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
