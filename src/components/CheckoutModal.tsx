import React, { useState } from 'react';
import { CartItem, PlacedOrder } from '../types/cake';
import confetti from 'canvas-confetti';
import { X, Check, ShieldCheck, Printer, Heart, Clock, MapPin, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  fulfillmentDetails: {
    fulfillmentType: 'pickup' | 'delivery';
    date: string;
    timeSlot: string;
    promoDiscount: number;
    promoCodeApplied: string;
  };
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  fulfillmentDetails,
  onOrderSuccess
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pickup'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = fulfillmentDetails.promoDiscount || 0;
  const deliveryFee = fulfillmentDetails.fulfillmentType === 'delivery' ? 18 : 0;
  const tipAmount = Math.round(((subtotal - discount) * tipPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + tipAmount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert('Please provide your name, email, and phone number.');
      return;
    }
    if (fulfillmentDetails.fulfillmentType === 'delivery' && !address.trim()) {
      alert('Please enter your delivery street address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `VW-${Math.floor(1000 + Math.random() * 9000)}`;
      const order: PlacedOrder = {
        orderNumber,
        createdAt: new Date().toLocaleString(),
        fulfillmentType: fulfillmentDetails.fulfillmentType,
        fulfillmentDate: fulfillmentDetails.date,
        fulfillmentTime: fulfillmentDetails.timeSlot,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        deliveryAddress: address,
        items: [...items],
        subtotal,
        discount,
        deliveryFee,
        tip: tipAmount,
        total: finalTotal,
        giftNote: giftNote.trim() || undefined
      };

      setConfirmedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E7D7C1', '#2C2727', '#F8B4C0']
      });
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200 my-auto animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <span className="text-[11px] uppercase font-mono tracking-widest text-stone-500 font-medium">
              Secure Studio Checkout
            </span>
            <h2 className="font-serif text-2xl text-stone-900 font-medium">
              {confirmedOrder ? 'Reservation Confirmed' : 'Complete Your Celebration Order'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-md hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {confirmedOrder ? (
            /* Order Confirmed State */
            <div className="space-y-6">
              <div className="text-center py-4 space-y-2">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-stone-900">
                  Merci, {confirmedOrder.customerName}!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Your reservation is logged under confirmation <span className="font-mono font-bold text-stone-900">{confirmedOrder.orderNumber}</span>. 
                  A detailed confirmation email was sent to <span className="font-semibold text-stone-800">{confirmedOrder.customerEmail}</span>.
                </p>
              </div>

              {/* Baker Preparation Timeline */}
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-stone-600" />
                    Kitchen Preparation Timeline
                  </span>
                  <span className="text-emerald-700">Scheduled for Fresh Morning Bake</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="p-2 bg-emerald-100/70 border border-emerald-300 rounded font-medium text-emerald-900">
                    1. Confirmed
                  </div>
                  <div className="p-2 bg-stone-200/70 border border-stone-300 rounded text-stone-700">
                    2. Batter Prep
                  </div>
                  <div className="p-2 bg-stone-200/70 border border-stone-300 rounded text-stone-700">
                    3. Hand Decor
                  </div>
                  <div className="p-2 bg-stone-200/70 border border-stone-300 rounded text-stone-700">
                    4. Dispatch
                  </div>
                </div>
              </div>

              {/* Receipt Summary Card */}
              <div className="border border-stone-200 rounded-lg p-4 space-y-3 text-xs bg-white">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="font-semibold text-stone-800">Fulfillment Slot</span>
                  <span className="font-mono text-stone-900">
                    {confirmedOrder.fulfillmentDate} ({confirmedOrder.fulfillmentTime})
                  </span>
                </div>

                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="font-semibold text-stone-800">Method</span>
                  <span>{confirmedOrder.fulfillmentType === 'pickup' ? 'SoHo Studio Pickup (428 Mercer St)' : `Chilled Courier to ${confirmedOrder.deliveryAddress}`}</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="font-semibold text-stone-800 block mb-1">Commissioned Items:</span>
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-stone-600">
                      <span>{it.quantity}x {it.title}</span>
                      <span className="font-mono tabular-nums">${it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between font-serif text-base font-semibold text-stone-900">
                  <span>Total Paid</span>
                  <span className="font-mono tabular-nums text-lg">${confirmedOrder.total}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-semibold border border-stone-300 rounded text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold bg-stone-900 text-white rounded hover:bg-stone-800"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-5 text-xs">
              
              {/* Order Logistics Bar */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-stone-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stone-500" />
                  <div>
                    <span className="font-semibold text-stone-900 block">
                      {fulfillmentDetails.fulfillmentType === 'pickup' ? 'Studio Pickup' : 'Courier Transit'}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {fulfillmentDetails.date} · {fulfillmentDetails.timeSlot}
                    </span>
                  </div>
                </div>
                <span className="font-serif text-sm font-semibold text-stone-900 font-mono">
                  {items.length} items
                </span>
              </div>

              {/* Personal Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                  Recipient Contact Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Madeleine Chen"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      Mobile Phone (for arrival SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(212) 555-0199"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Email Confirmation Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="madeleine@example.com"
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                {fulfillmentDetails.fulfillmentType === 'delivery' && (
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      Delivery Street Address &amp; Apartment/Suite *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 150 Wooster St, Apt 4B, New York, NY 10012"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Handwritten Gift Card Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Wishing you the sweetest year ahead! Love, Charlotte..."
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Baker Team Gratuity */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    Pastry Atelier Team Gratuity
                  </span>
                  <span className="font-mono text-stone-600 tabular-nums">${tipAmount}</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[0, 10, 15, 18].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTipPercent(pct)}
                      className={`py-1.5 rounded border text-xs font-semibold transition-colors ${
                        tipPercent === pct
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {pct === 0 ? 'None' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-2 border-t border-stone-200">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded border text-left text-xs transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <div className="font-semibold">Credit Card / Apple Pay</div>
                    <div className={`text-[10px] ${paymentMethod === 'card' ? 'text-stone-300' : 'text-stone-500'}`}>
                      Instant authorization
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pickup')}
                    className={`p-3 rounded border text-left text-xs transition-colors ${
                      paymentMethod === 'pickup'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <div className="font-semibold">Pay Upon Collection</div>
                    <div className={`text-[10px] ${paymentMethod === 'pickup' ? 'text-stone-300' : 'text-stone-500'}`}>
                      Cash or card in atelier
                    </div>
                  </button>
                </div>
              </div>

              {/* Total breakdown and button */}
              <div className="pt-4 border-t border-stone-200 space-y-2">
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Items Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-700">
                    <span>Promotional Discount</span>
                    <span className="font-mono tabular-nums">-${discount}</span>
                  </div>
                )}
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Chilled Courier Service</span>
                    <span className="font-mono tabular-nums">${deliveryFee}</span>
                  </div>
                )}
                {tipAmount > 0 && (
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Atelier Team Tip</span>
                    <span className="font-mono tabular-nums">${tipAmount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between font-serif text-lg font-semibold text-stone-900">
                  <span>Grand Total</span>
                  <span className="font-mono tabular-nums text-xl">${finalTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                {isSubmitting ? (
                  <span>Reserving Oven Slot...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Confirm Reservation · ${finalTotal}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 text-center">
                <span>Encrypted 256-bit checkout</span>
                <span>·</span>
                <span>Freshness Guaranteed</span>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
