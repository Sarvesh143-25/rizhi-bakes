import React, { useState } from 'react';
import { ATELIER_INFO } from '../data/cakes';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#1C1917] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-3xl font-medium text-white tracking-tight block">
              Velvet &amp; Whisk
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An artisan cake studio and confectionery atelier dedicated to classical French pastry 
              disciplines and contemporary celebration architecture.
            </p>
            <div className="text-xs text-stone-400 space-y-1 pt-2">
              <p>{ATELIER_INFO.address}</p>
              <p>{ATELIER_INFO.phone}</p>
              <p className="text-stone-500">{ATELIER_INFO.hours}</p>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#signature-cakes" className="hover:text-white transition-colors">
                  Signature Cakes
                </a>
              </li>
              <li>
                <a href="#custom-atelier" className="hover:text-white transition-colors">
                  Custom Cake Atelier
                </a>
              </li>
              <li>
                <a href="#tasting-flight" className="hover:text-white transition-colors">
                  Tasting Flight Box
                </a>
              </li>
              <li>
                <a href="#our-craft" className="hover:text-white transition-colors">
                  Our Ingredients &amp; Craft
                </a>
              </li>
              <li>
                <a href="#atelier-visit" className="hover:text-white transition-colors">
                  Studio Hours &amp; FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Sourcing & Transparency Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Ingredients
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Valrhona Grand Cru Cacao</li>
              <li>Normandy Churned Butter</li>
              <li>Bourbon Vanilla Beans</li>
              <li>Bronte Green Pistachios</li>
              <li>Wild French Botanicals</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Seasonal Releases &amp; Tastings
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive private invitations for our quarterly wedding flight tastings and limited holiday gateaux drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-4 py-2 bg-stone-100 hover:bg-white text-stone-900 text-xs font-semibold rounded transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Merci! You are now subscribed to our seasonal letters.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Allergen Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© 2026 Velvet &amp; Whisk Atelier Inc. All rights reserved.</p>
          <p className="text-center md:text-right max-w-md">
            Prepared in a kitchen that processes dairy, eggs, wheat, tree nuts, and peanuts. 
            All celebration orders are freshly made to commission.
          </p>
        </div>

      </div>
    </footer>
  );
};
