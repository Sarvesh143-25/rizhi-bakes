import React from 'react';
import { REVIEWS } from '../data/cakes';
import { Star, Shield, Sparkles, Heart } from 'lucide-react';

export const CraftStorySection: React.FC = () => {
  return (
    <section id="our-craft" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Craft Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
            <span>Philosophy &amp; Provenance</span>
            <span aria-hidden="true">·</span>
            <span>Zero Compromise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 tracking-tight">
            The Purity of Pastry Architecture
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            We believe an unforgettable cake is an interplay between quiet restraint and 
            opulent flavor depth. No artificial extracts, no commercial cake premixes, no shortcut shortening.
          </p>
        </div>

        {/* 4 Pillars of Craft */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          <div className="p-6 bg-white rounded-lg border border-stone-200/80 space-y-2">
            <span className="font-serif text-2xl text-stone-900 font-medium block">01</span>
            <h3 className="font-serif text-lg font-semibold text-stone-900">Normandy Cultured Butter</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Slow-fermented churned butter containing 84% butterfat yields our signature silken swiss meringue buttercream with no greasy residue.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-stone-200/80 space-y-2">
            <span className="font-serif text-2xl text-stone-900 font-medium block">02</span>
            <h3 className="font-serif text-lg font-semibold text-stone-900">Valrhona Grand Cru Cacao</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sourced directly from Tain-l’Hermitage, France. Selected for intense notes of roasted almond, warm woody vanilla, and profound cocoa intensity.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-stone-200/80 space-y-2">
            <span className="font-serif text-2xl text-stone-900 font-medium block">03</span>
            <h3 className="font-serif text-lg font-semibold text-stone-900">Whole Bourbon Pods</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every sponge and pastry cream is infused with real, hand-scraped vanilla seeds from Madagascar and Tahiti, steeped overnight in whole milk.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-stone-200/80 space-y-2">
            <span className="font-serif text-2xl text-stone-900 font-medium block">04</span>
            <h3 className="font-serif text-lg font-semibold text-stone-900">Heirloom Wild Botanicals</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Hand-picked organic Mara des Bois strawberries, French dried lavender blossoms, and untreated edible garden flowers.
            </p>
          </div>

        </div>

        {/* Client Testimonials Section (Attributable proof adjacent to craft claim) */}
        <div className="border-t border-stone-200 pt-16">
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10 gap-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
                Patron Testimonials
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
                Words from Recent Celebrations
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-stone-900">4.97 Average</span>
              <span className="text-stone-400">across 400+ commissions</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(rev => (
              <div 
                key={rev.id} 
                className="bg-white p-6 sm:p-7 rounded-lg border border-stone-200/80 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-xs">
                  <div className="font-semibold text-stone-900">{rev.author}</div>
                  <div className="text-stone-500 text-[11px]">{rev.role}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    {rev.event} · {rev.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
