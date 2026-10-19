import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, ShieldCheck, ArrowRight, MessageSquare, Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EXPEDITIONS } from '../data/mockData';
import { submitInquiry } from '../services/api';

export default function RegistrationModal({ isOpen, onClose, defaultExpeditionId }) {
  const [selectedExp, setSelectedExp] = useState(defaultExpeditionId || 'poe-2026');
  const [category, setCategory] = useState('adv'); // adv, 4x4, academy
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Pune',
    vehicle: '',
    experience: 'intermediate',
    bloodGroup: 'B+',
    emergencyContact: '',
    agreedTerms: false
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passCode, setPassCode] = useState('');

  if (!isOpen) return null;

  const expObj = EXPEDITIONS.find(e => e.id === selectedExp) || EXPEDITIONS[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.vehicle) {
      alert('Please fill in your name, phone, and machine details.');
      return;
    }
    if (!formData.agreedTerms) {
      alert('Please accept the trail safety waiver.');
      return;
    }

    setIsSubmitting(true);
    const generatedCode = '8M-POE26-' + Math.floor(1000 + Math.random() * 9000);
    setPassCode(generatedCode);

    // Save to GoDaddy backend API
    try {
      await submitInquiry({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        vehicle: formData.vehicle,
        experience: formData.experience,
        bloodGroup: formData.bloodGroup,
        emergencyContact: formData.emergencyContact,
        expeditionId: selectedExp,
        expeditionTitle: expObj.title,
        passCode: generatedCode,
        category: category
      });
    } catch (err) {
      console.log('Error submitting inquiry to API:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF4D00', '#F59E0B', '#10B981', '#FFFFFF']
      });
    } catch (err) {
      // ignore
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello 8Moto Marshals! I have registered for "${expObj.title}". Pass Code: ${passCode}. Rider: ${formData.name}, Rig: ${formData.vehicle}. Please confirm my briefing pack.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative max-w-xl w-full my-auto rounded-3xl bg-[#0D121B] border border-white/15 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#111723]">
          <div>
            <div className="text-[10px] font-mono text-[#FF4D00] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5" />
              <span>OFFICIAL 8MOTO TRAIL REGISTRATION</span>
            </div>
            <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide mt-0.5">
              {isSuccess ? 'TRAIL PASS ISSUED & CONFIRMED' : 'RESERVE YOUR EXPEDITION SLOT'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form or Confirmed Pass */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-xs">
            
            {/* Expedition Selector */}
            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1 font-bold">
                SELECT EXPEDITION / CLINIC
              </label>
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:border-[#FF4D00] focus:outline-none font-mono"
              >
                {EXPEDITIONS.map(exp => (
                  <option key={exp.id} value={exp.id}>
                    {exp.title} ({exp.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Class Selector */}
            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1 font-bold">
                VEHICLE ENTRY CLASS
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCategory('adv')}
                  className={`p-2.5 rounded-xl border text-xs font-mono text-center cursor-pointer transition-all ${
                    category === 'adv' 
                      ? 'bg-[#FF4D00]/20 border-[#FF4D00] text-white font-bold' 
                      : 'bg-[#07090E] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  🏍️ ADV Bike
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('enduro')}
                  className={`p-2.5 rounded-xl border text-xs font-mono text-center cursor-pointer transition-all ${
                    category === 'enduro' 
                      ? 'bg-[#FF4D00]/20 border-[#FF4D00] text-white font-bold' 
                      : 'bg-[#07090E] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  🏁 Dirt / Enduro
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('4x4')}
                  className={`p-2.5 rounded-xl border text-xs font-mono text-center cursor-pointer transition-all ${
                    category === '4x4' 
                      ? 'bg-[#FF4D00]/20 border-[#FF4D00] text-white font-bold' 
                      : 'bg-[#07090E] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  🚙 4x4 SUV
                </button>
              </div>
            </div>

            {/* Rider & Machine Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Shinde"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:border-[#FF4D00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  WHATSAPP MOBILE *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98220 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:border-[#FF4D00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  MACHINE MODEL & MODS *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Himalayan 450 / Thar CRDe"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:border-[#FF4D00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  EMERGENCY CONTACT & BLOOD GRP
                </label>
                <input
                  type="text"
                  placeholder="e.g. B+ | +91 98111 22233"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:border-[#FF4D00] focus:outline-none"
                />
              </div>
            </div>

            {/* Safety Waiver Checkbox */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreedTerms}
                  onChange={(e) => setFormData({ ...formData, agreedTerms: e.target.checked })}
                  className="mt-0.5 rounded accent-[#FF4D00]"
                />
                <span className="leading-relaxed">
                  I agree to wear certified DOT/ECE helmet and riding boots, obey marshal instructions, and respect the natural trail environment.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#FF4D00] hover:bg-[#FF661A] text-white font-bold text-xs tracking-wider uppercase font-mono shadow-xl shadow-[#FF4D00]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'GENERATING PASS...' : 'CONFIRM ENTRY & ISSUE PASS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        ) : (
          /* Official Digital Motorsport Pass */
          <div className="p-6 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">
                ENTRY RECORDED IN MARSHAL LOG
              </div>
              <h4 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide mt-0.5">
                SEE YOU ON THE TRAIL, {formData.name.toUpperCase()}!
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 font-light">
                Your entry slot is secured. Trail GPX coordinates and safety briefing pack will be shared on WhatsApp ({formData.phone}).
              </p>
            </div>

            {/* Credential Pass Card */}
            <div className="p-5 rounded-2xl bg-[#07090E] border-2 border-[#FF4D00] text-left relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-['Bebas_Neue'] text-xl text-white">8MOTO BHARAT</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-[#FF4D00] text-white font-mono font-bold">
                    OFFICIAL PASS
                  </span>
                </div>
                <span className="font-mono text-xs text-[#FF4D00] font-bold">
                  {passCode}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs font-mono">
                <div>
                  <div className="text-slate-500 text-[10px]">RIDER NAME</div>
                  <div className="text-white font-bold truncate">{formData.name}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">REGISTERED RIG</div>
                  <div className="text-white font-bold truncate">{formData.vehicle}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">EVENT</div>
                  <div className="text-[#FF4D00] font-bold truncate">{expObj.title}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">BASECAMP</div>
                  <div className="text-white font-bold truncate">{expObj.location}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Winch Sweep & Paramedic Backed</span>
                </div>
                <div className="p-1 rounded bg-white text-black">
                  <QrCode className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <a
                href={`https://wa.me/919822086686?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONFIRM ON WHATSAPP</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all cursor-pointer"
              >
                DONE
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
