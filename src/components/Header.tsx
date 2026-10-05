import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenCustomBuilder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenCustomBuilder
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single element brand wordmark in display face */}
        <a 
          href="#" 
          className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap"
        >
          Velvet &amp; Whisk
        </a>

        {/* Zone 2: 4-6 text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <a href="#signature-cakes" className="hover:text-stone-950 transition-colors py-1 relative hover:underline underline-offset-8 decoration-stone-400">
            Signature Cakes
          </a>
          <a href="#custom-atelier" className="hover:text-stone-950 transition-colors py-1 relative hover:underline underline-offset-8 decoration-stone-400">
            Cake Atelier
          </a>
          <a href="#tasting-flight" className="hover:text-stone-950 transition-colors py-1 relative hover:underline underline-offset-8 decoration-stone-400">
            Tasting Flight
          </a>
          <a href="#our-craft" className="hover:text-stone-950 transition-colors py-1 relative hover:underline underline-offset-8 decoration-stone-400">
            Our Craft
          </a>
          <a href="#atelier-visit" className="hover:text-stone-950 transition-colors py-1 relative hover:underline underline-offset-8 decoration-stone-400">
            Atelier Visit
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCustomBuilder}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider uppercase text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded transition-colors whitespace-nowrap"
          >
            Design Cake
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-mono tabular-nums">
              {cartCount > 0 ? `$${cartTotal.toFixed(0)}` : 'Bag'}
            </span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-[11px] font-mono font-bold bg-[#D4AF37] text-stone-950 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-3 text-base font-medium text-stone-800">
            <a 
              href="#signature-cakes" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Signature Cakes
            </a>
            <a 
              href="#custom-atelier" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Custom Cake Atelier
            </a>
            <a 
              href="#tasting-flight" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              The Tasting Flight
            </a>
            <a 
              href="#our-craft" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Our Ingredients &amp; Craft
            </a>
            <a 
              href="#atelier-visit" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Atelier Location &amp; Hours
            </a>
          </nav>
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomBuilder();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold tracking-wider uppercase text-stone-900 bg-stone-200 hover:bg-stone-300 rounded"
            >
              Open Bespoke Atelier
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
