import React, { useState } from 'react';
import { TASTING_BOX_ITEM } from '../data/cakes';
import { CartItem } from '../types/cake';
import { Check, Sparkles, Box, Compass, HeartHandshake } from 'lucide-react';

interface TastingFlightSectionProps {
  onAddToCart: (item: CartItem) => void;
}

export const TastingFlightSection: React.FC<TastingFlightSectionProps> = ({
  onAddToCart
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddFlight = () => {
    const item: CartItem = {
      id: `tasting-flight-${Date.now()}`,
      type: 'tasting_box',
      title: TASTING_BOX_ITEM.title,
      subtitle: TASTING_BOX_ITEM.subtitle,
      price: TASTING_BOX_ITEM.price,
      quantity: 1,
      image: TASTING_BOX_ITEM.image,
      details: {
        size: 'Presentation Box',
        servings: TASTING_BOX_ITEM.servings
      }
    };
    onAddToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="tasting-flight" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#1C1917] text-stone-100 rounded-xl overflow-hidden border border-stone-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Column: Tasting Box Story */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
                <Box className="w-3.5 h-3.5" />
                <span>Wedding &amp; Celebration Concierge</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight text-balance">
                The Atelier Tasting Flight Box
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl font-normal">
                Curated especially for couples planning their wedding centerpiece, or for hostesses 
                desiring an intimate multi-course dessert flight. Four generous slice quarters presented 
                in our embossed midnight box with silk ribbon and sommelier pairing notes.
              </p>

              {/* 4 Flight Flavors List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-stone-900/80 rounded border border-stone-800 space-y-0.5">
                  <span className="font-serif text-sm font-medium text-amber-200">01. Raspberry Pistachio</span>
                  <p className="text-stone-400 text-[11px]">Bronte pistachio crumb &amp; wild raspberry coulis</p>
                </div>
                <div className="p-3 bg-stone-900/80 rounded border border-stone-800 space-y-0.5">
                  <span className="font-serif text-sm font-medium text-amber-200">02. Midnight Truffle</span>
                  <p className="text-stone-400 text-[11px]">70% Valrhona dark ganache &amp; roasted espresso</p>
                </div>
                <div className="p-3 bg-stone-900/80 rounded border border-stone-800 space-y-0.5">
                  <span className="font-serif text-sm font-medium text-amber-200">03. Earl Grey Lavender</span>
                  <p className="text-stone-400 text-[11px]">Bergamot infusion &amp; Provence wildflower honey</p>
                </div>
                <div className="p-3 bg-stone-900/80 rounded border border-stone-800 space-y-0.5">
                  <span className="font-serif text-sm font-medium text-amber-200">04. Salted Caramel Vanilla</span>
                  <p className="text-stone-400 text-[11px]">Bourbon vanilla bean &amp; fleur de sel kettle drizzle</p>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-stone-400 block">Flight Box Set</span>
                  <span className="font-serif text-2xl text-white font-mono tabular-nums">
                    ${TASTING_BOX_ITEM.price}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddFlight}
                  className={`w-full sm:w-auto px-7 py-3 text-xs font-semibold tracking-wider uppercase rounded transition-all duration-200 flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-stone-100 text-stone-900'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>Order Tasting Flight Box</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-stone-400 flex items-center gap-2">
                <HeartHandshake className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Wedding couples receive a $48 credit applied directly to their final tier cake order.</span>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[340px] bg-stone-900">
              <img
                src={TASTING_BOX_ITEM.image}
                alt="Artisan cake tasting flight box presentation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-950/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 bg-stone-950/80 backdrop-blur-sm border border-stone-700/80 px-3 py-1.5 rounded text-[11px] text-stone-300">
                Freshly Chilled &amp; Sealed
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
