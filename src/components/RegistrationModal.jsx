import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, Sparkles, ShieldCheck, Download, AlertTriangle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EXPEDITIONS } from '../data/mockData';

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
  const [passCode, setPassCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.vehicle) {
      alert('Please fill in your name, phone, and machine details.');
      return;
    }
    if (!formData.agreedTerms) {
      alert('Please accept the trail safety waiver.');
      return;
    }

    const randomCode = '8M-POE26-' + Math.floor(1000 + Math.random() * 9000);
    setPassCode(randomCode);
    setIsSuccess(true);

    // Fire fireworks celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF5500', '#F59E0B', '#10B981', '#FFFFFF']
      });
    } catch (err) {
      // fallback
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative max-w-xl w-full my-8 rounded-3xl bg-[#0D121B] border border-white/15 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#111723]">
          <div>
            <div className="text-[11px] font-mono text-[#FF5500] font-bold uppercase tracking-wider">
              8MOTO OFFICIAL REGISTRATION
            </div>
            <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
              {isSuccess ? 'OFF-ROAD PASS CONFIRMED' : 'RESERVE YOUR TRAIL PASS'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Expedition Selector */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                SELECT EXPEDITION / CLINIC
              </label>
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#080A0E] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none"
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
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                VEHICLE ENTRY CLASS
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCategory('adv')}
                  className={`p-3 rounded-xl border text-xs font-mono text-center cursor-pointer transition-all ${
                    category === 'adv' 
                      ? 'bg-[#FF5500]/20 border-[#FF5500] text-white font-bold' 
                      : 'bg-[#080A0E] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  🏍️ ADV Bike
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('enduro')}
                  className={`p-3 rounded-xl border text-xs font-mono text-center cursor-pointer transition-all ${
                    category === 'enduro' 
                      ? 'bg-[#FF5500]/20 border-[#FF5500] text-white font-bold' 
                      : 'bg-[#080A0E] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  🏁 Dirt / Enduro
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('4x4')}
                  className={`p-3 rounded-xl border text-xs font-mono text-center cursor-pointer transition-all ${
                    category === '4x4' 
                      ? 'bg-[#FF5500]/20 border-[#FF5500] text-white font-bold' 
                      : 'bg-[#080A0E] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  🚙 4x4 SUV
                </button>
              </div>
            </div>

            {/* Rider & Machine Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Patil"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080A0E] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  WHATSAPP MOBILE *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080A0E] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  MACHINE MODEL & MODS *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Himalayan 450 / Thar CRDe"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080A0E] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  OFF-ROAD EXPERIENCE
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080A0E] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none"
                >
                  <option value="novice">First Time on Trail (Novice)</option>
                  <option value="intermediate">Moderate Trail Experience (1-2 Yrs)</option>
                  <option value="veteran">Hard Enduro / POE Veteran (3+ Yrs)</option>
                </select>
              </div>
            </div>

            {/* Safety Declaration */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreedTerms}
                  onChange={(e) => setFormData({ ...formData, agreedTerms: e.target.checked })}
                  className="mt-1 rounded accent-[#FF5500]"
                />
                <span>
                  I confirm that I will wear mandatory ECE/DOT helmet & boots, follow 8Moto trail marshal directions, and obey safety recovery protocols.
                </span>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#FF5500] hover:bg-[#FF6E1A] text-white font-bold text-sm tracking-wider uppercase font-mono shadow-xl shadow-[#FF5500]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>CONFIRM ENTRY & ISSUE PASS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        ) : (
          /* Confirmed Digital Pass */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-widest">
                OFFICIAL ENTRY SECURED
              </div>
              <h4 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide mt-1">
                SEE YOU ON THE TRAIL, {formData.name.toUpperCase()}!
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-2">
                Your slot is reserved. A confirmation with GPX trail coordinates and safety briefing pack has been sent to your WhatsApp ({formData.phone}).
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="p-5 rounded-2xl bg-[#080A0E] border-2 border-[#FF5500] text-left relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-['Bebas_Neue'] text-xl text-white">8MOTO BHARAT</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF5500] text-white font-mono font-bold">
                    VALIDATED PASS
                  </span>
                </div>
                <span className="font-mono text-xs text-[#FF5500] font-bold">
                  {passCode}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <div className="text-slate-500 text-[10px]">RIDER NAME</div>
                  <div className="text-white font-bold">{formData.name}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">REGISTERED RIG</div>
                  <div className="text-white font-bold">{formData.vehicle}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">EVENT</div>
                  <div className="text-[#FF5500] font-bold">Pune Offroad Expedition</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">LOCATION</div>
                  <div className="text-white font-bold">Lavasa Valley, Pune</div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Medical & Sweep Fleet Covered</span>
                </div>
                <div className="p-1 rounded bg-white text-black">
                  <QrCode className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => alert(`Trail Pass #${passCode} saved to your device!`)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>SAVE DIGITAL PASS</span>
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-[#FF5500] text-white text-xs font-mono font-bold transition-all cursor-pointer"
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
