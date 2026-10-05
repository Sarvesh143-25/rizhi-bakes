import React, { useState, useEffect } from 'react';
import { CakeProduct, CartItem } from '../types/cake';
import { X, Check, Star, ShieldCheck, HeartHandshake, Wine, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  cake: CakeProduct | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  cake,
  onClose,
  onAddToCart
}) => {
  if (!cake) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [inscription, setInscription] = useState('');
  const [includeCandles, setIncludeCandles] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const selectedSize = cake.sizes[selectedSizeIndex] || cake.sizes[0];
  const unitPrice = selectedSize.price + (includeCandles ? 6 : 0);
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const item: CartItem = {
      id: `${cake.id}-${selectedSize.label}-${Date.now()}`,
      type: 'signature',
      title: cake.name,
      subtitle: `${selectedSize.label} (${selectedSize.serves})`,
      price: unitPrice,
      quantity,
      image: cake.image,
      details: {
        size: selectedSize.label,
        servings: selectedSize.serves,
        inscription: inscription.trim() || undefined,
        dietaryNotes: cake.dietaryTags.join(', ')
      }
    };
    onAddToCart(item);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden border border-stone-200 my-auto animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 rounded-full border border-stone-200 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Cake Imagery & Details */}
          <div className="md:col-span-6 bg-stone-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div>
              <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-stone-200 border border-stone-200/80 mb-6">
                <img
                  src={cake.image}
                  alt={cake.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Flavor Profile Breakdown */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-mono tracking-widest text-stone-500 font-medium">
                  Flavor Construction
                </h4>
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex gap-2">
                    <span className="font-semibold text-stone-900 w-20 shrink-0">Sponge:</span>
                    <span>{cake.flavorProfile.sponge}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-stone-900 w-20 shrink-0">Core:</span>
                    <span>{cake.flavorProfile.filling}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-stone-900 w-20 shrink-0">Frosting:</span>
                    <span>{cake.flavorProfile.frosting}</span>
                  </div>
                </div>

                {/* Pairing Note */}
                <div className="pt-3 border-t border-stone-200/70 text-xs text-stone-600 flex items-start gap-2">
                  <Wine className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <p><span className="font-semibold text-stone-800">Sommelier Pairing:</span> {cake.pairingNote}</p>
                </div>
              </div>
            </div>

            {/* Allergen disclosure */}
            <div className="mt-6 pt-4 border-t border-stone-200/70 text-[11px] text-stone-500">
              <span className="font-semibold text-stone-700">Allergen Notice:</span> {cake.allergens}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span className="capitalize">{cake.category}</span>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1 text-stone-700 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>{cake.rating}</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{cake.reviewCount} Reviews</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                  {cake.name}
                </h2>
                
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {cake.description}
                </p>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Select Size &amp; Servings
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {cake.sizes.map((s, idx) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 text-left border rounded-md transition-all text-xs ${
                        selectedSizeIndex === idx
                          ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <div className="font-semibold">{s.label}</div>
                      <div className={`text-[11px] mt-0.5 ${selectedSizeIndex === idx ? 'text-stone-300' : 'text-stone-500'}`}>
                        {s.serves}
                      </div>
                      <div className={`font-mono tabular-nums font-semibold mt-1 text-sm ${selectedSizeIndex === idx ? 'text-amber-200' : 'text-stone-900'}`}>
                        ${s.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Plaque Inscription */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="inscription-input" className="text-xs font-semibold text-stone-800">
                    Complimentary Dark Chocolate Plaque Inscription
                  </label>
                  <span className="text-[11px] text-stone-400">Optional · Max 35 chars</span>
                </div>
                <input
                  id="inscription-input"
                  type="text"
                  maxLength={35}
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  placeholder="e.g., Happy 30th Birthday Elise!"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-800 placeholder:text-stone-400"
                />
              </div>

              {/* Taper Candles Add-on */}
              <div className="p-3 bg-stone-50 rounded-md border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <div className="text-xs font-semibold text-stone-800">Gold Dipped Beeswax Birthday Candles</div>
                    <div className="text-[11px] text-stone-500">Box of 6 slender artisanal tapers (+$6)</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeCandles}
                  onChange={(e) => setIncludeCandles(e.target.checked)}
                  className="w-4 h-4 text-stone-900 rounded border-stone-300 focus:ring-stone-800"
                />
              </div>

            </div>

            {/* Bottom Contiguous Buy Action */}
            <div className="pt-6 mt-6 border-t border-stone-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center border border-stone-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900 text-sm font-semibold"
                  >
                    −
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-semibold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block">Total</span>
                  <span className="font-serif text-2xl font-semibold text-stone-900 font-mono tabular-nums">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                  isSuccess
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                }`}
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Your Bag</span>
                  </>
                ) : (
                  <span>Add to Bag · ${totalPrice}</span>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                  Bespoke Handcrafted
                </span>
                <span className="flex items-center gap-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-stone-600" />
                  Satisfaction Assured
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
