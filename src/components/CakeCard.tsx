import React, { useState } from 'react';
import { CakeProduct } from '../types/cake';
import { Star, Plus, Check } from 'lucide-react';

interface CakeCardProps {
  cake: CakeProduct;
  onSelect: (cake: CakeProduct) => void;
  onQuickAdd: (cake: CakeProduct) => void;
}

export const CakeCard: React.FC<CakeCardProps> = ({
  cake,
  onSelect,
  onQuickAdd
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(cake);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article 
      onClick={() => onSelect(cake)}
      className="group cursor-pointer flex flex-col bg-white border border-stone-200/90 rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-stone-800"
    >
      {/* Product Image (65-75% visual weight) */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={cake.image}
            alt={cake.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-6 text-center text-stone-500">
            <span className="font-serif text-xl italic text-stone-700">{cake.name}</span>
            <span className="text-xs text-stone-400 mt-1">Artisan Patisserie</span>
          </div>
        )}

        {/* Quick Add Overlay Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            aria-label={`Quick add ${cake.name} 6 inch to bag`}
            className="w-full py-2.5 px-3 bg-stone-900/90 hover:bg-stone-900 text-white backdrop-blur-sm text-xs font-semibold tracking-wider uppercase rounded shadow flex items-center justify-center gap-1.5 transition-colors"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add (6" · ${cake.basePrice})</span>
              </>
            )}
          </button>
        </div>

        {/* Quiet Bestseller tag top right (Natural unboxed text) */}
        {cake.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase text-stone-800 border border-stone-200/80 rounded-sm">
            Atelier Bestseller
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Zero-Pill Metadata Discipline */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
            <span className="capitalize">{cake.category}</span>
            <span aria-hidden="true">·</span>
            <span>{cake.servings}</span>
            {cake.dietaryTags.includes('Gluten-Friendly') && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-700">GF Available</span>
              </>
            )}
          </div>

          <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
            {cake.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
            {cake.subtitle}
          </p>
        </div>

        {/* Rating and Price Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-stone-600">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="font-semibold text-stone-900">{cake.rating}</span>
            <span className="text-stone-400">({cake.reviewCount})</span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-stone-400 mr-1">from</span>
            <span className="font-serif text-lg font-semibold text-stone-900 font-mono tabular-nums">
              ${cake.basePrice}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
