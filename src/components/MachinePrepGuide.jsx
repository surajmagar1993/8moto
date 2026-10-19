import React, { useState } from 'react';
import { Wrench, Gauge, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function MachinePrepGuide() {
  const [selectedRig, setSelectedRig] = useState('himalayan');

  const RIGS_DATA = {
    himalayan: {
      name: 'Royal Enfield Himalayan 450 / 411',
      category: 'Adventure Tourer',
      tirePsi: { mud: '20 PSI Front / 22 PSI Rear', rock: '24 PSI Front / 26 PSI Rear' },
      tires: 'Dual-sport knobby (CEAT Gripp-XL or Maxxis Maxxcross recommended)',
      mandatoryProtection: ['Heavy aluminum bash plate', 'Full-wrap metal barkbusters', 'Engine crash guards'],
      essentialSpares: ['Spare clutch cable routed alongside existing', 'Front & rear heavy-duty inner tubes', 'Quick chain link + chain lube'],
      marshalTip: 'Use standing peg position on wet clay. Feather the clutch in 1st/2nd gear rather than braking hard into trenches.'
    },
    ktm: {
      name: 'KTM 390 Adventure / 250 Adventure',
      category: 'Performance ADV',
      tirePsi: { mud: '19 PSI Front / 21 PSI Rear', rock: '25 PSI Front / 27 PSI Rear' },
      tires: 'Off-road knobbies (Metzeler Karoo or Motoz Tractionator)',
      mandatoryProtection: ['Reinforced engine sump guard', 'Handlebar handguards with aluminum backbone', 'Radiator guard'],
      essentialSpares: ['Spare gear shifter & brake lever', 'Tubeless puncture repair plug kit + 12V mini inflator', 'Spare 15A fuses'],
      marshalTip: 'Switch ABS to Off-Road mode to allow rear wheel lockup. Keep revs in the mid-range torque band when scaling wet boulders.'
    },
    xpulse: {
      name: 'Hero Xpulse 200 4V',
      category: 'Light Enduro',
      tirePsi: { mud: '16 PSI Front / 18 PSI Rear', rock: '20 PSI Front / 22 PSI Rear' },
      tires: 'Full knobby off-road pattern (Ralco Motocross or Maxxis)',
      mandatoryProtection: ['Sturdy metal bash plate', 'Reinforced handguards', 'Sponge air filter with oil seal'],
      essentialSpares: ['Spare spark plug + cap', 'Clutch wire', 'Tire spoons & 21-inch front spare tube'],
      marshalTip: 'Its light 158kg weight is your biggest weapon. Stand upright, grip the tank with your knees, and let the 21-inch front wheel carve the ruts.'
    },
    thar: {
      name: 'Mahindra Thar 4x4 (CRDe / mStallion / mHawk)',
      category: '4x4 Rig',
      tirePsi: { mud: '18–20 PSI All Round (Air Down)', rock: '22–24 PSI All Round' },
      tires: 'All-Terrain (AT) or Mud-Terrain (MT) minimum 245/75 R16',
      mandatoryProtection: ['Front & rear rated recovery tow points', 'Underbody transmission skid plate', 'Snorkel recommended for deep rivers'],
      essentialSpares: ['Heavy-duty kinetic snatch strap (8-ton rated)', '2x Soft or bow shackles', 'Air compressor & tire deflator gauge'],
      marshalTip: 'Engage 4L Low-Range before entering deep clay trenches or riverbeds. Never shift gears mid-water crossing.'
    },
    gypsy: {
      name: 'Maruti Gypsy King / Suzuki Jimny 4x4',
      category: 'Light Mountain 4x4',
      tirePsi: { mud: '16–18 PSI (Air Down)', rock: '20–22 PSI' },
      tires: 'Mud-Terrain (MT) or high-profile AT tires',
      mandatoryProtection: ['Chassis-mounted recovery points', 'Transfer case skid guard', 'Waterproof distributor & spark plug sealant'],
      essentialSpares: ['Spare alternator belt', 'Diff breather extension pipes', 'Kinetic tow rope + D-shackles'],
      marshalTip: 'Its lightweight chassis floats over mud where heavier SUVs sink. Maintain gentle steady momentum; avoid wheel spin that digs trenches.'
    }
  };

  const rig = RIGS_DATA[selectedRig];

  return (
    <section id="rig-prep" className="py-20 sm:py-28 bg-[#07090E] relative border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-3">
              <Wrench className="w-3.5 h-3.5 text-[#FF4D00]" />
              TECHNICAL SCRUTINEERING & RIG PREPARATION
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              MACHINE SETUP & <span className="text-[#FF4D00]">TIRE GUIDE</span>
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
              Before setting out on Sahyadri trails, correct machine preparation is the difference between conquering the trail or snapping levers in the mud.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-400">
            <span className="px-3.5 py-2 rounded-xl bg-[#0E131C] border border-white/10 text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#FF4D00]" />
              <span>AIR DOWN STATION AVAILABLE AT BASECAMP</span>
            </span>
          </div>
        </div>

        {/* Machine Selector Tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5 font-mono text-xs">
          {Object.entries(RIGS_DATA).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setSelectedRig(key)}
              className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer font-bold ${
                selectedRig === key
                  ? 'bg-[#FF4D00] border-[#FF4D00] text-white shadow-lg'
                  : 'bg-[#0E131C] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {item.name.split('/')[0]}
            </button>
          ))}
        </div>

        {/* Selected Rig Scrutineering Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#0E131C] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (5 Cols): Rig Overview & Tire Pressures */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[#FF4D00] uppercase font-bold tracking-wider">
                {rig.category}
              </span>
              <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide mt-0.5">
                {rig.name}
              </h3>
              <p className="text-xs text-slate-300 mt-2 font-mono">
                Recommended Tires: <span className="text-white">{rig.tires}</span>
              </p>
            </div>

            {/* Tire Pressure Specs */}
            <div className="p-4 rounded-2xl bg-[#07090E] border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-400 text-[11px] pb-2 border-b border-white/5 font-bold uppercase">
                <Gauge className="w-4 h-4 text-[#FF4D00]" />
                <span>RECOMMENDED TRAIL TIRE PRESSURES (PSI)</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-amber-400 uppercase font-bold">Monsoon Clay / Mud</div>
                  <div className="text-sm font-bold text-white mt-1">{rig.tirePsi.mud}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-blue-400 uppercase font-bold">Basalt Rocks / Scree</div>
                  <div className="text-sm font-bold text-white mt-1">{rig.tirePsi.rock}</div>
                </div>
              </div>
            </div>

            {/* Marshal Advice Note */}
            <div className="p-4 rounded-2xl bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-xs text-slate-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#FF4D00] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#FF4D00] font-mono text-[11px] block uppercase">
                  OFFICIAL MARSHAL TRAIL TIP:
                </span>
                <p className="mt-1 leading-relaxed text-slate-300 font-light">
                  "{rig.marshalTip}"
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (7 Cols): Protection & Spares Checklist */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Mandatory Protection */}
            <div className="p-5 rounded-2xl bg-[#07090E] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white font-bold uppercase pb-2 border-b border-white/5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>MANDATORY PROTECTION</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                {rig.mandatoryProtection.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Essential Spares to Carry */}
            <div className="p-5 rounded-2xl bg-[#07090E] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white font-bold uppercase pb-2 border-b border-white/5">
                <Wrench className="w-4 h-4 text-[#FF4D00]" />
                <span>ESSENTIAL ON-BOARD SPARES</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                {rig.essentialSpares.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrutineering Notice */}
            <div className="sm:col-span-2 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <span className="text-slate-300">
                Have custom mods or unique machine setup questions?
              </span>
              <a
                href="https://wa.me/919822086686?text=Hi%208Moto!%20I%20have%20questions%20about%20prepping%20my%20machine%20for%20the%20trails."
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shrink-0"
              >
                ASK SCRUTINEERING DESK
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
