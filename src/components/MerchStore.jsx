import React, { useState } from 'react';
import { ShoppingBag, Check, Shield, Sparkles } from 'lucide-react';
import { MERCH_PRODUCTS } from '../data/mockData';

export default function MerchStore({ onOpenBooking }) {
  const [cartCount, setCartCount] = useState(0);
  const [addedItem, setAddedItem] = useState(null);

  const handleAddToCart = (item) => {
    setCartCount(prev => prev + 1);
    setAddedItem(item.name);
    setTimeout(() => {
      setAddedItem(null);
    }, 2500);
  };

  return (
    <section id="merch" className="py-24 bg-[#06080B] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-2">
              <ShoppingBag className="w-3.5 h-3.5 text-[#FF5500]" />
              OFFICIAL 8MOTO APPAREL & RECOVERY GEAR
            </div>
            <h2 className="text-4xl sm:text-6xl font-['Bebas_Neue'] text-white tracking-wide uppercase leading-none">
              PRO SHOP & <span className="text-[#FF5500]">GEAR</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Engineered specifically for the brutal monsoon trails. Mud-shedding fabrics, certified recovery rigging, and authentic 8Moto merchandise.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[#111622] border border-white/10 flex items-center gap-2 text-xs font-mono text-slate-300">
              <ShoppingBag className="w-4 h-4 text-[#FF5500]" />
              <span>TRAIL PACK:</span>
              <span className="font-bold text-[#FF5500]">{cartCount} ITEMS</span>
            </div>
          </div>
        </div>

        {/* Added to cart toast */}
        {addedItem && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Added "{addedItem}" to your order package!
            </span>
            <span className="text-slate-400">Ships across India</span>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MERCH_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between group hover:border-[#FF5500]/40"
            >
              <div>
                <div className="h-44 rounded-xl bg-gradient-to-br from-[#161D2C] to-[#0A0D14] flex items-center justify-center p-4 relative overflow-hidden mb-4 border border-white/5">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500] group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#080A0E]/80 text-[10px] font-mono text-slate-300 border border-white/10">
                    {prod.badge}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#FF5500] uppercase tracking-wider mb-1">
                  {prod.category}
                </div>
                <h3 className="font-bold text-white text-base leading-tight mb-2">
                  {prod.name}
                </h3>

                <div className="flex flex-wrap gap-1 mb-4">
                  {prod.sizes.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="font-['Bebas_Neue'] text-2xl text-white">
                  {prod.price}
                </div>
                <button
                  onClick={() => handleAddToCart(prod)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF5500] text-white text-xs font-mono font-medium transition-all cursor-pointer hover:shadow-lg hover:shadow-[#FF5500]/20 flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
