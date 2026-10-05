import React, { useState, useMemo } from 'react';
import { CakeProduct, DietaryTag } from '../types/cake';
import { SIGNATURE_CAKES } from '../data/cakes';
import { CakeCard } from './CakeCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface FeaturedCakesProps {
  onSelectCake: (cake: CakeProduct) => void;
  onQuickAdd: (cake: CakeProduct) => void;
  onOpenCustomBuilder: () => void;
}

export const FeaturedCakes: React.FC<FeaturedCakesProps> = ({
  onSelectCake,
  onQuickAdd,
  onOpenCustomBuilder
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCakes = useMemo(() => {
    return SIGNATURE_CAKES.filter((cake) => {
      // Category match
      if (activeCategory !== 'all' && cake.category !== activeCategory) {
        return false;
      }
      // Dietary filter match
      if (dietaryFilter !== 'all') {
        const hasTag = cake.dietaryTags.some(tag => 
          tag.toLowerCase().includes(dietaryFilter.toLowerCase())
        );
        if (!hasTag) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = cake.name.toLowerCase().includes(query);
        const matchesSub = cake.subtitle.toLowerCase().includes(query);
        const matchesFlavors = Object.values(cake.flavorProfile).some(val => 
          val.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesSub && !matchesFlavors) return false;
      }
      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  return (
    <section id="signature-cakes" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
              <span>Collection 2026</span>
              <span aria-hidden="true">·</span>
              <span>Hand-Finished to Order</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Signature Patisserie Cakes
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Baked within hours of your pickup or courier delivery using seasonal ingredients and organic botanicals.
            </p>
          </div>

          <button
            onClick={onOpenCustomBuilder}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-900 bg-stone-100 hover:bg-stone-200 px-4 py-2.5 rounded border border-stone-300 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Need Custom Flavors? Open Atelier</span>
          </button>
        </div>

        {/* Filter Bar: Segmented controls (Allowed by Section 1.A) + Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Creations ({SIGNATURE_CAKES.length})
            </button>
            <button
              onClick={() => setActiveCategory('celebration')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === 'celebration'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Celebration &amp; Birthdays
            </button>
            <button
              onClick={() => setActiveCategory('wedding')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === 'wedding'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tiered &amp; Wedding
            </button>
            <button
              onClick={() => setActiveCategory('seasonal')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === 'seasonal'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Seasonal Botanicals
            </button>
          </div>

          {/* Search & Dietary Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Dietary Selector */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={dietaryFilter}
                onChange={(e) => setDietaryFilter(e.target.value)}
                className="bg-white border border-stone-200 text-stone-800 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-stone-400"
              >
                <option value="all">All Dietary Preferences</option>
                <option value="nut-free">Nut-Free Kitchen Safe</option>
                <option value="gluten">Gluten-Friendly Recipes</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavors, pistachio, cocoa..."
                className="w-full sm:w-56 pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filteredCakes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCakes.map((cake) => (
              <CakeCard
                key={cake.id}
                cake={cake}
                onSelect={onSelectCake}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-stone-200 p-12 text-center max-w-md mx-auto my-8">
            <p className="font-serif text-2xl text-stone-800 mb-2">No cakes match your criteria</p>
            <p className="text-xs text-stone-500 mb-6">
              Try adjusting your dietary filter or search terms, or build a custom cake with our master baker.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
