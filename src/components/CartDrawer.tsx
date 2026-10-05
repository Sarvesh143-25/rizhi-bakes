import React, { useState } from 'react';
import { CartItem } from '../types/cake';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Calendar, MapPin, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: (details: {
    fulfillmentType: 'pickup' | 'delivery';
    date: string;
    timeSlot: string;
    promoDiscount: number;
    promoCodeApplied: string;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  
  // Default date: 2 days in future
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 2);
  const formattedDefaultDate = defaultDate.toISOString().split('T')[0];

  const [fulfillmentDate, setFulfillmentDate] = useState(formattedDefaultDate);
  const [timeSlot, setTimeSlot] = useState('11:00 AM – 2:00 PM');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo ? Math.round((subtotal * appliedPromo.percent) / 100) : 0;
  const deliveryFee = fulfillmentType === 'delivery' && items.length > 0 ? 18 : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (code === 'SWEET10' || code === 'WELCOME10') {
      setAppliedPromo({ code, percent: 10 });
      setPromoInput('');
    } else {
      setPromoError('Invalid promotional code. Try "SWEET10"');
    }
  };

  const handleCheckoutClick = () => {
    onProceedCheckout({
      fulfillmentType,
      date: fulfillmentDate,
      timeSlot,
      promoDiscount: discount,
      promoCodeApplied: appliedPromo ? appliedPromo.code : ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-stone-700" />
              <h2 className="font-serif text-xl font-medium text-stone-900">Your Confectionery Bag</h2>
              <span className="text-xs text-stone-500 font-mono">({items.reduce((s, i) => s + i.quantity, 0)})</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-md hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-stone-800">Your bag is currently empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our signature creations or design a bespoke layered cake in our interactive atelier.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white rounded hover:bg-stone-800"
                  >
                    Explore Confections
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3.5 bg-stone-50/60 rounded-lg border border-stone-200/80 space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-base font-semibold text-stone-900">{item.title}</h4>
                        <p className="text-stone-500 text-[11px] mt-0.5">{item.subtitle}</p>
                        
                        {item.details.inscription && (
                          <div className="mt-1 text-[11px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded inline-block">
                            <span className="font-medium">Plaque:</span> "{item.details.inscription}"
                          </div>
                        )}

                        {item.details.customConfig && (
                          <div className="mt-1 text-[10px] text-stone-500 space-y-0.5">
                            <div>Finish: {item.details.customConfig.frostingFinish}</div>
                            {item.details.customConfig.accents.length > 0 && (
                              <div>Accents: {item.details.customConfig.accents.join(', ')}</div>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-stone-300 rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold tabular-nums text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-serif text-sm font-semibold text-stone-900 font-mono tabular-nums">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Fulfillment Selector */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Fulfillment Logistics
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('pickup')}
                      className={`p-2.5 rounded-md border text-left text-xs transition-colors ${
                        fulfillmentType === 'pickup'
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-semibold">SoHo Pickup</div>
                      <div className={`text-[10px] ${fulfillmentType === 'pickup' ? 'text-stone-300' : 'text-stone-500'}`}>
                        Complimentary
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillmentType('delivery')}
                      className={`p-2.5 rounded-md border text-left text-xs transition-colors ${
                        fulfillmentType === 'delivery'
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-semibold">White-Glove Van</div>
                      <div className={`text-[10px] ${fulfillmentType === 'delivery' ? 'text-stone-300' : 'text-stone-500'}`}>
                        +$18 Chilled Courier
                      </div>
                    </button>
                  </div>

                  {/* Date & Time Selection */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">
                        Bake Date
                      </label>
                      <input
                        type="date"
                        value={fulfillmentDate}
                        min={formattedDefaultDate}
                        onChange={(e) => setFulfillmentDate(e.target.value)}
                        className="w-full px-2 py-1.5 border border-stone-200 rounded text-xs text-stone-800 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">
                        Arrival Window
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-2 py-1.5 border border-stone-200 rounded text-xs text-stone-800 bg-white"
                      >
                        <option value="10:00 AM – 1:00 PM">10:00 AM – 1:00 PM</option>
                        <option value="1:30 PM – 4:30 PM">1:30 PM – 4:30 PM</option>
                        <option value="4:30 PM – 6:30 PM">4:30 PM – 6:30 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Promo Code Form */}
                <div className="pt-2">
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SWEET10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-stone-200 rounded bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-medium rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {appliedPromo && (
                    <div className="mt-1 text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Code {appliedPromo.code} applied (10% discount)</span>
                    </div>
                  )}
                  {promoError && (
                    <div className="mt-1 text-[11px] text-rose-600">{promoError}</div>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Bottom Summary & Checkout Button */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900 font-semibold">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span className="font-mono tabular-nums font-semibold">-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{fulfillmentType === 'pickup' ? 'SoHo Studio Pickup' : 'Courier Transit'}</span>
                  <span className="font-mono tabular-nums text-stone-900 font-semibold">
                    {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-semibold text-stone-900">
                  <span className="font-serif text-base">Estimated Total</span>
                  <span className="font-mono tabular-nums font-serif text-lg">${total}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Reservation &amp; Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-stone-400">
                Freshly baked to order. Cancellations honored up to 48 hours prior to bake slot.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
