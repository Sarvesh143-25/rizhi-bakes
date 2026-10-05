import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { heroImg } from '../data/cakes';

interface HeroProps {
  onExploreCakes: () => void;
  onOpenCustomBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCakes,
  onOpenCustomBuilder
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Proposition */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quiet text kicker with typographic separator (No pill badges) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
              <span>Artisan Pâtisserie</span>
              <span aria-hidden="true">·</span>
              <span>SoHo Studio</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2019</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.08] tracking-tight text-balance">
              Handcrafted cakes for life’s rare and luminous milestones.
            </h1>

            {/* Subtitle prose */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
              Slow-churned Normandy butter, 70% Valrhona cacao, and seasonal botanical infusions. 
              Designed in our Mercer Street atelier, baked fresh to order for weddings, galas, and quiet celebrations.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExploreCakes}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-stone-900 hover:bg-stone-800 rounded transition-all duration-150 whitespace-nowrap shadow-sm hover:shadow"
              >
                <span>Explore Signature Cakes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomBuilder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-stone-900 bg-white hover:bg-stone-100 border border-stone-300 rounded transition-all duration-150 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#C59B27]" />
                <span>Bespoke Cake Atelier</span>
              </button>
            </div>

            {/* Claim-to-Proof Adjacency: Trust markers adjacent to CTA */}
            <div className="pt-6 border-t border-stone-200/90 grid grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                  <Clock className="w-3.5 h-3.5 text-stone-700" />
                  <span>48h Lead Time</span>
                </div>
                <p className="text-stone-500 leading-tight">Fresh morning bake</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                  <Award className="w-3.5 h-3.5 text-stone-700" />
                  <span>Pure Valrhona</span>
                </div>
                <p className="text-stone-500 leading-tight">100% natural butter</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Chilled Transit</span>
                </div>
                <p className="text-stone-500 leading-tight">NYC white-glove courier</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden border border-stone-200 shadow-xl bg-stone-100 group">
              <img
                src={heroImg}
                alt="Exquisite artisanal multi-tiered celebration cake on marble table with fresh florals"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle caption overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent p-4 sm:p-6 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-stone-300">Featured Commission</p>
                  <p className="font-serif text-lg sm:text-xl text-stone-100">Bespoke 3-Tier Wild Flora &amp; Meringue</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-stone-300 block">Atelier Tasting</span>
                  <span className="text-xs font-mono font-medium text-amber-200">Reservations Open</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative framing accent */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[#EFE8DC] -z-10 rounded-lg pointer-events-none hidden sm:block" />
          </div>

        </div>
      </div>
    </section>
  );
};
