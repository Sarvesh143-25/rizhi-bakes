/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CakeProduct, CartItem, PlacedOrder } from './types/cake';
import { SIGNATURE_CAKES, TASTING_BOX_ITEM } from './data/cakes';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCakes } from './components/FeaturedCakes';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomCakeBuilder } from './components/CustomCakeBuilder';
import { TastingFlightSection } from './components/TastingFlightSection';
import { CraftStorySection } from './components/CraftStorySection';
import { AtelierLocationSection } from './components/AtelierLocationSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('velvet_whisk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCake, setSelectedCake] = useState<CakeProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutFulfillmentDetails, setCheckoutFulfillmentDetails] = useState<{
    fulfillmentType: 'pickup' | 'delivery';
    date: string;
    timeSlot: string;
    promoDiscount: number;
    promoCodeApplied: string;
  }>({
    fulfillmentType: 'pickup',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    timeSlot: '11:00 AM – 2:00 PM',
    promoDiscount: 0,
    promoCodeApplied: ''
  });

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('velvet_whisk_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart', e);
    }
  }, [cartItems]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      // Check if existing identical signature cake item exists
      const existingIndex = prev.findIndex(i => 
        i.title === item.title && 
        i.details.size === item.details.size && 
        i.details.inscription === item.details.inscription &&
        i.type === item.type
      );
      if (existingIndex > -1 && item.type === 'signature') {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + item.quantity
        };
        return next;
      }
      return [...prev, item];
    });
  };

  const handleQuickAdd = (cake: CakeProduct) => {
    const quickItem: CartItem = {
      id: `${cake.id}-quick-${Date.now()}`,
      type: 'signature',
      title: cake.name,
      subtitle: `${cake.sizes[0].label} (${cake.sizes[0].serves})`,
      price: cake.basePrice,
      quantity: 1,
      image: cake.image,
      details: {
        size: cake.sizes[0].label,
        servings: cake.sizes[0].serves,
        dietaryNotes: cake.dietaryTags.join(', ')
      }
    };
    handleAddToCart(quickItem);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleProceedCheckout = (details: {
    fulfillmentType: 'pickup' | 'delivery';
    date: string;
    timeSlot: string;
    promoDiscount: number;
    promoCodeApplied: string;
  }) => {
    setCheckoutFulfillmentDetails(details);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: PlacedOrder) => {
    // Clear cart on successful confirmed placement
    setCartItems([]);
  };

  const scrollToCustomAtelier = () => {
    const el = document.getElementById('custom-atelier');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSignatureCakes = () => {
    const el = document.getElementById('signature-cakes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#E7D7C1] selection:text-stone-900">
      
      {/* Navigation Top Bar Contract */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomBuilder={scrollToCustomAtelier}
      />

      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <Hero
          onExploreCakes={scrollToSignatureCakes}
          onOpenCustomBuilder={scrollToCustomAtelier}
        />

        {/* Signature Collection Grid & Filtering */}
        <FeaturedCakes
          onSelectCake={(cake) => setSelectedCake(cake)}
          onQuickAdd={handleQuickAdd}
          onOpenCustomBuilder={scrollToCustomAtelier}
        />

        {/* Interactive Bespoke Cake Atelier */}
        <CustomCakeBuilder
          onAddToCart={(item) => {
            handleAddToCart(item);
            setIsCartOpen(true);
          }}
        />

        {/* Curated Tasting Flight Box */}
        <TastingFlightSection
          onAddToCart={(item) => {
            handleAddToCart(item);
            setIsCartOpen(true);
          }}
        />

        {/* Purity of Craft & Verified Testimonials */}
        <CraftStorySection />

        {/* Physical Atelier Visit & Inquiries */}
        <AtelierLocationSection />
      </main>

      {/* Sophisticated Editorial Footer */}
      <Footer />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        cake={selectedCake}
        onClose={() => setSelectedCake(null)}
        onAddToCart={(item) => {
          handleAddToCart(item);
          setIsCartOpen(true);
        }}
      />

      {/* Cart Drawer Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Checkout and Order Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        fulfillmentDetails={checkoutFulfillmentDetails}
        onOrderSuccess={handleOrderSuccess}
      />

    </div>
  );
}
