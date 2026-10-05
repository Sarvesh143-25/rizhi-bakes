import React, { useState } from 'react';
import { ATELIER_INFO } from '../data/cakes';
import { MapPin, Clock, Phone, Mail, ChevronDown, ChevronUp, Truck, ShieldAlert } from 'lucide-react';

export const AtelierLocationSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How far in advance should I place my cake order?",
      a: "For our signature celebration cakes, we recommend ordering 48 to 72 hours in advance. For bespoke multi-tiered custom atelier cakes or wedding commissions, we request at least 5 to 7 days notice as our production slots are strictly limited to ensure uncompromising detail."
    },
    {
      q: "What are your delivery areas and logistics?",
      a: "We offer white-glove temperature-controlled courier delivery across Manhattan, Brooklyn, and Western Queens. We also offer weekend event dispatch to Long Island and Westchester. Alternatively, complimentary collection is available at our Mercer Street atelier."
    },
    {
      q: "How should I store and serve my cake?",
      a: "Keep your cake chilled in its presentation box until 1 to 2 hours before serving. Cakes made with real cultured butter taste exceptionally moist and silken when enjoyed at room temperature (around 68°F–70°F)."
    },
    {
      q: "Can you accommodate dietary allergies?",
      a: "Yes. We offer certified gluten-friendly recipes and completely nut-free cakes. While our kitchen follows strict sanitation protocols between batches, please note that gluten and dairy are handled within our facility."
    }
  ];

  return (
    <section id="atelier-visit" className="py-16 sm:py-24 bg-[#F5F2EB] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Atelier Address & Contact */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
                <span>SoHo Atelier &amp; Tasting Room</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
                Visit Velvet &amp; Whisk
              </h2>
              <p className="text-sm text-stone-600 mt-2 font-normal leading-relaxed">
                Step inside our open-plan confectionery studio to pick up your celebration cake, 
                consult on bespoke wedding tiers, or taste our weekly seasonal gateaux.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-xs text-stone-700 bg-white p-4 rounded-lg border border-stone-200">
                <MapPin className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block text-sm">Studio Location</span>
                  <p className="mt-0.5">{ATELIER_INFO.address}</p>
                  <p className="text-stone-500 text-[11px] mt-0.5">Between Prince &amp; Spring Street</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-stone-700 bg-white p-4 rounded-lg border border-stone-200">
                <Clock className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block text-sm">Operating Hours</span>
                  <p className="mt-0.5">{ATELIER_INFO.hours}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 text-xs text-stone-700 bg-white p-3.5 rounded-lg border border-stone-200">
                  <Phone className="w-4 h-4 text-stone-800 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Telephone</span>
                    <span>{ATELIER_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-700 bg-white p-3.5 rounded-lg border border-stone-200">
                  <Mail className="w-4 h-4 text-stone-800 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Concierge Email</span>
                    <span>{ATELIER_INFO.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-900 text-stone-200 rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Truck className="w-4 h-4" />
                <span>Courier Dispatch Guarantee</span>
              </div>
              <p className="text-stone-400 leading-relaxed text-[11px]">
                All deliveries are transported in temperature-shielded climate cases via designated white-glove couriers to guarantee flawless presentation.
              </p>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
                Help &amp; Ordering Questions
              </div>
              <h3 className="font-serif text-2xl text-stone-900">
                Frequently Inquired Inquiries
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-white rounded-lg border border-stone-200 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-stone-900 hover:text-stone-700 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
