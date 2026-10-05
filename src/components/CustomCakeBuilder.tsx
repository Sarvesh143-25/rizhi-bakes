import React, { useState, useMemo } from 'react';
import { 
  CustomCakeConfig, 
  TierCount, 
  CartItem 
} from '../types/cake';
import { 
  COLOR_PALETTES, 
  SPONGE_OPTIONS, 
  FILLING_OPTIONS, 
  FROSTING_FINISHES, 
  ARTISANAL_ACCENTS 
} from '../data/cakes';
import { Sparkles, Check, Info, Cake as CakeIcon, Palette, Layers, Award } from 'lucide-react';

interface CustomCakeBuilderProps {
  onAddToCart: (item: CartItem) => void;
  onClose?: () => void;
}

export const CustomCakeBuilder: React.FC<CustomCakeBuilderProps> = ({
  onAddToCart
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [tiers, setTiers] = useState<TierCount>(2);
  const [selectedSponge, setSelectedSponge] = useState(SPONGE_OPTIONS[0].id);
  const [selectedFilling, setSelectedFilling] = useState(FILLING_OPTIONS[1].id);
  const [frostingFinish, setFrostingFinish] = useState<'smooth' | 'semi-naked' | 'lambeth' | 'textured-knife'>('lambeth');
  const [colorIndex, setColorIndex] = useState(1); // Default Blush Rose
  const [selectedAccents, setSelectedAccents] = useState<string[]>(['gold-leaf', 'edible-florals']);
  const [inscriptionText, setInscriptionText] = useState('Happy Celebration');
  const [inscriptionStyle, setInscriptionStyle] = useState<'calligraphy' | 'serif' | 'minimal'>('calligraphy');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const selectedPalette = COLOR_PALETTES[colorIndex];

  // Price Calculation
  const baseTierPrice = tiers === 1 ? 110 : tiers === 2 ? 245 : 440;
  const spongeExtra = selectedSponge === 'pistachio' ? 14 : 0;
  const accentsCost = selectedAccents.reduce((acc, currId) => {
    const found = ARTISANAL_ACCENTS.find(a => a.id === currId);
    return acc + (found ? found.price : 0);
  }, 0);
  const totalPrice = baseTierPrice + spongeExtra + accentsCost;

  const servingsCount = tiers === 1 ? '10–12 Guests' : tiers === 2 ? '28–32 Guests' : '60–70 Guests';

  const toggleAccent = (id: string) => {
    setSelectedAccents(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddCustomCake = () => {
    const config: CustomCakeConfig = {
      tiers,
      spongeFlavor: SPONGE_OPTIONS.find(s => s.id === selectedSponge)?.name || '',
      fillingFlavor: FILLING_OPTIONS.find(f => f.id === selectedFilling)?.name || '',
      frostingFinish,
      colorPalette: selectedPalette,
      accents: selectedAccents.map(id => ARTISANAL_ACCENTS.find(a => a.id === id)?.name || id),
      inscriptionText: inscriptionText.trim(),
      inscriptionStyle,
      servingOccasion: 'Celebration',
      specialRequests: specialRequests.trim()
    };

    const cartItem: CartItem = {
      id: `custom-cake-${Date.now()}`,
      type: 'custom',
      title: `Bespoke ${tiers}-Tier ${selectedPalette.name} Cake`,
      subtitle: `${servingsCount} · ${config.spongeFlavor} with ${config.fillingFlavor}`,
      price: totalPrice,
      quantity: 1,
      details: {
        size: `${tiers}-Tier Celebration`,
        servings: servingsCount,
        inscription: inscriptionText.trim() || undefined,
        customConfig: config
      }
    };

    onAddToCart(cartItem);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="custom-atelier" className="py-16 sm:py-24 bg-[#F5F2EB] border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
            <span>Bespoke Commissioning</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Studio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 tracking-tight">
            The Custom Cake Atelier
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-normal">
            Configure your bespoke multi-tiered cake in real time. Select your tier architecture, 
            flavor pairings, hand-piped finishes, and fine confectionery accents.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Interactive Visual Cake Canvas */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm sticky top-24">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100 text-xs text-stone-500">
              <span className="font-mono uppercase tracking-wider font-semibold text-stone-800">
                Live Atelier Preview
              </span>
              <span>{servingsCount}</span>
            </div>

            {/* Cake SVG Simulation Canvas */}
            <div className="relative aspect-square max-h-[380px] w-full flex items-center justify-center bg-[#FAF8F5] rounded border border-stone-200/80 p-4 overflow-hidden">
              
              <svg 
                viewBox="0 0 400 420" 
                className="w-full h-full max-h-[340px] drop-shadow-md select-none transition-all duration-300"
              >
                {/* Cake Pedestal / Stand */}
                <ellipse cx="200" cy="380" rx="140" ry="16" fill="#EAE5DC" stroke="#D3CBC0" strokeWidth="2" />
                <path d="M170 380 L185 410 L215 410 L230 380 Z" fill="#D8CFBF" />
                <rect x="160" y="408" width="80" height="6" rx="3" fill="#C2B7A5" />

                {/* Tier 1 (Bottom Tier - Always Present) */}
                <g className="transition-all duration-300">
                  {/* Tier 1 Body */}
                  <rect 
                    x="90" 
                    y="270" 
                    width="220" 
                    height="95" 
                    rx="10" 
                    fill={selectedPalette.hex} 
                    stroke={selectedPalette.accentHex} 
                    strokeWidth="2" 
                  />
                  
                  {/* Semi-naked crumb peek effect */}
                  {frostingFinish === 'semi-naked' && (
                    <g opacity="0.35">
                      <path d="M100 290 Q150 295 200 290 T300 295" stroke="#C49B5B" strokeWidth="3" strokeDasharray="8 6" fill="none" />
                      <path d="M100 325 Q150 330 200 325 T300 330" stroke="#C49B5B" strokeWidth="3.5" strokeDasharray="12 8" fill="none" />
                    </g>
                  )}

                  {/* Lambeth Ruffle Piping Effect */}
                  {frostingFinish === 'lambeth' && (
                    <g stroke={selectedPalette.accentHex} strokeWidth="2.5" fill="none" opacity="0.85">
                      <path d="M92 285 Q115 305 138 285 Q161 305 184 285 Q207 305 230 285 Q253 305 276 285 Q299 305 308 285" />
                      <path d="M92 315 Q115 330 138 315 Q161 330 184 315 Q207 330 230 315 Q253 330 276 315 Q299 330 308 315" />
                    </g>
                  )}

                  {/* Textured knife marks */}
                  {frostingFinish === 'textured-knife' && (
                    <g stroke={selectedPalette.accentHex} strokeWidth="1.5" opacity="0.6" strokeLinecap="round">
                      <line x1="105" y1="285" x2="160" y2="288" />
                      <line x1="220" y1="287" x2="285" y2="284" />
                      <line x1="130" y1="320" x2="190" y2="322" />
                      <line x1="210" y1="325" x2="270" y2="321" />
                    </g>
                  )}
                  {/* Tier 1 Top Rim */}
                  <ellipse cx="200" cy="270" rx="110" ry="12" fill={selectedPalette.accentHex} opacity="0.4" />
                </g>

                {/* Tier 2 (Middle/Top Tier - Present if tiers >= 2) */}
                {tiers >= 2 && (
                  <g className="transition-all duration-300">
                    <rect 
                      x="125" 
                      y="180" 
                      width="150" 
                      height="90" 
                      rx="8" 
                      fill={selectedPalette.hex} 
                      stroke={selectedPalette.accentHex} 
                      strokeWidth="2" 
                    />

                    {frostingFinish === 'semi-naked' && (
                      <g opacity="0.35">
                        <path d="M135 210 Q175 215 215 210 T265 215" stroke="#C49B5B" strokeWidth="3" strokeDasharray="7 5" fill="none" />
                        <path d="M135 240 Q175 245 215 240 T265 245" stroke="#C49B5B" strokeWidth="3" strokeDasharray="9 6" fill="none" />
                      </g>
                    )}

                    {frostingFinish === 'lambeth' && (
                      <g stroke={selectedPalette.accentHex} strokeWidth="2.5" fill="none" opacity="0.85">
                        <path d="M128 198 Q148 214 168 198 Q188 214 208 198 Q228 214 248 198 Q268 214 272 198" />
                        <path d="M128 230 Q148 242 168 230 Q188 242 208 230 Q228 242 248 230 Q268 242 272 230" />
                      </g>
                    )}

                    {frostingFinish === 'textured-knife' && (
                      <g stroke={selectedPalette.accentHex} strokeWidth="1.5" opacity="0.6" strokeLinecap="round">
                        <line x1="135" y1="205" x2="185" y2="208" />
                        <line x1="205" y1="210" x2="255" y2="206" />
                      </g>
                    )}
                    <ellipse cx="200" cy="180" rx="75" ry="9" fill={selectedPalette.accentHex} opacity="0.4" />
                  </g>
                )}

                {/* Tier 3 (Top Tier - Present if tiers === 3) */}
                {tiers === 3 && (
                  <g className="transition-all duration-300">
                    <rect 
                      x="155" 
                      y="105" 
                      width="90" 
                      height="75" 
                      rx="6" 
                      fill={selectedPalette.hex} 
                      stroke={selectedPalette.accentHex} 
                      strokeWidth="2" 
                    />

                    {frostingFinish === 'lambeth' && (
                      <path d="M157 122 Q172 135 187 122 Q202 135 217 122 Q232 135 243 122" stroke={selectedPalette.accentHex} strokeWidth="2" fill="none" opacity="0.85" />
                    )}

                    <ellipse cx="200" cy="105" rx="45" ry="6" fill={selectedPalette.accentHex} opacity="0.4" />
                  </g>
                )}

                {/* Accents Overlays */}

                {/* 24k Gold Leaf Flakes */}
                {selectedAccents.includes('gold-leaf') && (
                  <g fill="#E5C158" opacity="0.95">
                    <polygon points="120,290 128,287 124,296 116,294" />
                    <polygon points="270,305 277,301 273,311 265,308" />
                    <polygon points="145,210 152,207 149,215 142,213" />
                    <polygon points="240,225 247,222 243,230 236,228" />
                    {tiers === 3 && <polygon points="180,130 186,128 183,135 178,133" />}
                  </g>
                )}

                {/* Fresh Edible Blooms */}
                {selectedAccents.includes('edible-florals') && (
                  <g>
                    {/* Flower cluster 1 on bottom tier ledge */}
                    <circle cx="115" cy="270" r="8" fill="#F8B4C0" />
                    <circle cx="110" cy="265" r="6" fill="#F5C0C8" />
                    <circle cx="120" cy="266" r="6" fill="#E89AA8" />
                    <circle cx="115" cy="269" r="3" fill="#FDF3B0" />

                    {/* Flower cluster on top */}
                    {tiers === 1 && (
                      <g>
                        <circle cx="200" cy="264" r="9" fill="#F8B4C0" />
                        <circle cx="192" cy="260" r="7" fill="#F5C0C8" />
                        <circle cx="208" cy="260" r="7" fill="#E89AA8" />
                        <circle cx="200" cy="262" r="3.5" fill="#FDF3B0" />
                      </g>
                    )}
                    {tiers >= 2 && (
                      <g>
                        <circle cx="265" cy="182" r="8" fill="#F8B4C0" />
                        <circle cx="260" cy="177" r="6" fill="#F5C0C8" />
                        <circle cx="270" cy="177" r="6" fill="#E89AA8" />
                        <circle cx="265" cy="180" r="3" fill="#FDF3B0" />
                      </g>
                    )}
                    {tiers === 3 && (
                      <g>
                        <circle cx="200" cy="102" r="8" fill="#F8B4C0" />
                        <circle cx="194" cy="98" r="6" fill="#F5C0C8" />
                        <circle cx="206" cy="98" r="6" fill="#E89AA8" />
                        <circle cx="200" cy="100" r="3" fill="#FDF3B0" />
                      </g>
                    )}
                  </g>
                )}

                {/* French Macarons */}
                {selectedAccents.includes('macarons') && (
                  <g>
                    <ellipse cx="280" cy="275" rx="10" ry="6" fill="#D6C4B2" stroke="#BAA591" strokeWidth="1" />
                    <ellipse cx="276" cy="268" rx="9" ry="5" fill="#E8CAD1" stroke="#CDACB5" strokeWidth="1" />
                  </g>
                )}

                {/* Blackberries & Sugared Rosemary */}
                {selectedAccents.includes('berries-rosemary') && (
                  <g>
                    <path d="M125 272 Q135 255 145 268" stroke="#526E48" strokeWidth="2.5" fill="none" />
                    <circle cx="130" cy="270" r="5" fill="#2E1C38" />
                    <circle cx="137" cy="272" r="4.5" fill="#24142D" />
                  </g>
                )}

                {/* Plaque with Inscription */}
                {inscriptionText.trim() && (
                  <g>
                    <rect 
                      x="120" 
                      y="330" 
                      width="160" 
                      height="26" 
                      rx="4" 
                      fill="#2C1B14" 
                      stroke="#C5A059" 
                      strokeWidth="1.5" 
                      filter="drop-shadow(0 2px 3px rgba(0,0,0,0.25))"
                    />
                    <text 
                      x="200" 
                      y="347" 
                      textAnchor="middle" 
                      fill="#F6E7C4" 
                      fontSize="10" 
                      fontFamily={inscriptionStyle === 'calligraphy' ? 'Cormorant Garamond, serif' : inscriptionStyle === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'}
                      fontStyle={inscriptionStyle === 'calligraphy' ? 'italic' : 'normal'}
                      fontWeight="600"
                    >
                      {inscriptionText.length > 25 ? inscriptionText.slice(0, 25) + '...' : inscriptionText}
                    </text>
                  </g>
                )}

              </svg>
            </div>

            {/* Spec summary block below canvas */}
            <div className="mt-4 p-3 bg-stone-50 rounded border border-stone-200/70 text-xs text-stone-600 space-y-1">
              <div className="flex justify-between font-semibold text-stone-800">
                <span>{tiers} Tier Configuration</span>
                <span className="font-mono tabular-nums text-stone-900">${totalPrice}</span>
              </div>
              <div className="text-[11px] text-stone-500">
                {selectedPalette.name} · {frostingFinish} finish · {selectedAccents.length} artisan accents
              </div>
            </div>

          </div>

          {/* Right Column: Step-by-Step Atelier Controls */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm space-y-8">
            
            {/* Steps Navigation Bar */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                {[
                  { num: 1, label: 'Tier & Size' },
                  { num: 2, label: 'Flavors' },
                  { num: 3, label: 'Finish & Color' },
                  { num: 4, label: 'Accents & Plaque' }
                ].map(step => (
                  <button
                    key={step.num}
                    onClick={() => setActiveStep(step.num)}
                    className={`px-3 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                      activeStep === step.num
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {step.num}. {step.label}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 1: Tier Architecture */}
            {activeStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-serif text-xl font-medium text-stone-900 mb-1">
                    Select Tier Architecture
                  </h3>
                  <p className="text-xs text-stone-500">
                    Every tier is composed of four delicate sponge layers and three generous fillings.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { count: 1 as TierCount, label: 'Single Grand Tier', desc: '6" round · 10–12 servings', price: 110 },
                    { count: 2 as TierCount, label: 'Two Tier Centerpiece', desc: '6" + 8" round · 28–32 servings', price: 245 },
                    { count: 3 as TierCount, label: 'Three Tier Monumental', desc: '6" + 8" + 10" · 60–70 servings', price: 440 }
                  ].map(t => (
                    <button
                      key={t.count}
                      type="button"
                      onClick={() => setTiers(t.count)}
                      className={`p-4 text-left border rounded-lg transition-all ${
                        tiers === t.count
                          ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <div className="font-semibold text-sm">{t.label}</div>
                      <div className={`text-xs mt-1 ${tiers === t.count ? 'text-stone-300' : 'text-stone-500'}`}>
                        {t.desc}
                      </div>
                      <div className={`font-mono tabular-nums font-semibold mt-2 text-sm ${tiers === t.count ? 'text-amber-200' : 'text-stone-900'}`}>
                        ${t.price}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    All tiered commissions include internal bamboo dowels and a sturdy presentation board 
                    for effortless banquet table transport.
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white rounded hover:bg-stone-800"
                  >
                    Next: Sponge &amp; Fillings →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Sponge & Fillings */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-serif text-xl font-medium text-stone-900 mb-1">
                    Select Sponge &amp; Filling Symphony
                  </h3>
                  <p className="text-xs text-stone-500">
                    Handmade fresh from organic farm eggs, churned Normandy butter, and whole botanical pods.
                  </p>
                </div>

                {/* Sponge selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Sponge Foundation
                  </label>
                  <div className="space-y-2">
                    {SPONGE_OPTIONS.map(sponge => (
                      <label
                        key={sponge.id}
                        className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors text-xs ${
                          selectedSponge === sponge.id
                            ? 'border-stone-900 bg-stone-100 font-medium'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="sponge"
                            checked={selectedSponge === sponge.id}
                            onChange={() => setSelectedSponge(sponge.id)}
                            className="text-stone-900 focus:ring-stone-800"
                          />
                          <div>
                            <span className="text-stone-900 font-semibold">{sponge.name}</span>
                            <span className="text-stone-500 block text-[11px]">{sponge.note}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filling selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Interior Core Filling (3 Layered Strata)
                  </label>
                  <div className="space-y-2">
                    {FILLING_OPTIONS.map(filling => (
                      <label
                        key={filling.id}
                        className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors text-xs ${
                          selectedFilling === filling.id
                            ? 'border-stone-900 bg-stone-100 font-medium'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="filling"
                            checked={selectedFilling === filling.id}
                            onChange={() => setSelectedFilling(filling.id)}
                            className="text-stone-900 focus:ring-stone-800"
                          />
                          <div>
                            <span className="text-stone-900 font-semibold">{filling.name}</span>
                            <span className="text-stone-500 block text-[11px]">{filling.note}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white rounded hover:bg-stone-800"
                  >
                    Next: Exterior Finish &amp; Color →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Finish & Color Palette */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-serif text-xl font-medium text-stone-900 mb-1">
                    Exterior Frosting &amp; Palette Tone
                  </h3>
                  <p className="text-xs text-stone-500">
                    Whipped Swiss meringue buttercream with natural botanical food tints.
                  </p>
                </div>

                {/* Frosting Finish */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Frosting Architecture &amp; Texture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {FROSTING_FINISHES.map(finish => (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setFrostingFinish(finish.id as any)}
                        className={`p-3 text-left border rounded-md transition-all text-xs ${
                          frostingFinish === finish.id
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                        }`}
                      >
                        <div className="font-semibold">{finish.name}</div>
                        <div className={`text-[11px] mt-0.5 ${frostingFinish === finish.id ? 'text-stone-300' : 'text-stone-500'}`}>
                          {finish.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Color Hue Palette
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {COLOR_PALETTES.map((palette, idx) => (
                      <button
                        key={palette.name}
                        type="button"
                        onClick={() => setColorIndex(idx)}
                        className={`p-2.5 flex items-center gap-2.5 border rounded-md text-left transition-all ${
                          colorIndex === idx
                            ? 'border-stone-900 ring-2 ring-stone-900/10'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <span 
                          className="w-5 h-5 rounded-full border border-stone-300 shadow-inner shrink-0" 
                          style={{ backgroundColor: palette.hex }}
                        />
                        <div className="truncate">
                          <div className="text-xs font-medium text-stone-900 truncate">{palette.name}</div>
                          <div className="text-[10px] text-stone-500 truncate">{palette.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white rounded hover:bg-stone-800"
                  >
                    Next: Accents &amp; Inscription →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Accents & Inscription */}
            {activeStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-serif text-xl font-medium text-stone-900 mb-1">
                    Artisanal Accents &amp; Plaque
                  </h3>
                  <p className="text-xs text-stone-500">
                    Adorn your cake with pastry jewels and custom calligraphy.
                  </p>
                </div>

                {/* Accents Checkboxes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Botanical &amp; Confectionery Accents
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ARTISANAL_ACCENTS.map(accent => {
                      const isSelected = selectedAccents.includes(accent.id);
                      return (
                        <button
                          key={accent.id}
                          type="button"
                          onClick={() => toggleAccent(accent.id)}
                          className={`p-3 text-left border rounded-md transition-all text-xs flex items-center justify-between ${
                            isSelected
                              ? 'border-stone-900 bg-stone-100 font-medium'
                              : 'border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center text-white ${
                              isSelected ? 'bg-stone-900 border-stone-900' : 'border-stone-300'
                            }`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span className="text-stone-800">{accent.name}</span>
                          </div>
                          <span className="font-mono tabular-nums text-stone-600">+${accent.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inscription Plaque Input */}
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="custom-inscription" className="text-xs font-semibold text-stone-800">
                      Hand-Lettered Dark Chocolate Plaque
                    </label>
                    <span className="text-[11px] text-stone-400">Included complimentary</span>
                  </div>

                  <input
                    id="custom-inscription"
                    type="text"
                    maxLength={32}
                    value={inscriptionText}
                    onChange={(e) => setInscriptionText(e.target.value)}
                    placeholder="e.g. Always &amp; Forever · Arthur &amp; Claire"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />

                  {/* Lettering style */}
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <span className="text-[11px] text-stone-500 font-medium">Style:</span>
                    {(['calligraphy', 'serif', 'minimal'] as const).map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setInscriptionStyle(style)}
                        className={`px-2 py-0.5 rounded capitalize text-[11px] ${
                          inscriptionStyle === style
                            ? 'bg-stone-900 text-white font-medium'
                            : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="special-requests" className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Atelier Requests &amp; Allergies
                  </label>
                  <textarea
                    id="special-requests"
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g., Please incorporate soft blush silk ribbon, keep top tier separate until cake cutting..."
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Finalize Action */}
            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-500 block">Total Atelier Investment</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-semibold text-stone-900 font-mono tabular-nums">
                    ${totalPrice}
                  </span>
                  <span className="text-xs text-stone-500">({servingsCount})</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddCustomCake}
                className={`w-full sm:w-auto px-8 py-3.5 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Commission Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Add Bespoke Creation to Bag</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
