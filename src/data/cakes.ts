import { CakeProduct } from '../types/cake';

import heroImg from '../assets/images/hero_artisan_cake_studio_1791181910548.jpg';
import raspberryPistachioImg from '../assets/images/cake_raspberry_pistachio_1791181923187.jpg';
import midnightChocolateImg from '../assets/images/cake_midnight_chocolate_1791181936817.jpg';
import earlGreyLavenderImg from '../assets/images/cake_earl_grey_lavender_1791181946826.jpg';
import strawberryChampagneImg from '../assets/images/cake_strawberries_champagne_1791181991912.jpg';
import saltedCaramelImg from '../assets/images/cake_salted_caramel_vanilla_1791182008484.jpg';

export { heroImg };

export const SIGNATURE_CAKES: CakeProduct[] = [
  {
    id: 'raspberry-pistachio-chiffon',
    name: 'Raspberry Pistachio Chiffon',
    category: 'celebration',
    subtitle: 'Sicilian Bronte pistachios, tart wild raspberry coulis & mascarpone silk',
    description: 'An ethereal creation layered with roasted Sicilian pistachio crumb chiffon sponge, tangy wild raspberry compote, and light-as-air whipped Italian mascarpone cream. Finished with fresh heirloom raspberries and crushed emerald pistachios.',
    basePrice: 88,
    image: raspberryPistachioImg,
    servings: '8–10 guests',
    sizes: [
      { label: 'Petite 6"', diameter: '6 inch', serves: '8–10 servings', price: 88 },
      { label: 'Classic 8"', diameter: '8 inch', serves: '14–16 servings', price: 128 },
      { label: 'Grand 10"', diameter: '10 inch', serves: '22–26 servings', price: 175 }
    ],
    flavorProfile: {
      sponge: 'Roasted Bronte Pistachio Chiffon',
      filling: 'Macerated Wild Raspberry Puree & Mascarpone',
      frosting: 'Velvety White Chocolate Pistachio Buttercream'
    },
    dietaryTags: ['Gluten-Friendly', 'Signature'],
    pairingNote: 'Pairs exquisitely with dry sparkling Rosé or chilled Jasmine green tea.',
    allergens: 'Tree nuts (pistachio), Dairy, Eggs. Gluten-friendly recipe prepared in certified facility.',
    rating: 4.96,
    reviewCount: 142,
    isBestseller: true
  },
  {
    id: 'midnight-truffle-espresso',
    name: 'Midnight Truffle & Espresso Ganache',
    category: 'celebration',
    subtitle: '70% Valrhona dark chocolate, espresso silk & cocoa nib crunch',
    description: 'For uncompromising chocolate devotion. Four dense layers of moist dark cocoa cake infused with slow-brewed espresso syrup, filled with whipped dark chocolate truffle ganache, and crowned with hand-rolled espresso truffles and gold dust.',
    basePrice: 94,
    image: midnightChocolateImg,
    servings: '8–10 guests',
    sizes: [
      { label: 'Petite 6"', diameter: '6 inch', serves: '8–10 servings', price: 94 },
      { label: 'Classic 8"', diameter: '8 inch', serves: '14–16 servings', price: 136 },
      { label: 'Grand 10"', diameter: '10 inch', serves: '22–26 servings', price: 188 }
    ],
    flavorProfile: {
      sponge: '70% Valrhona Dark Devil’s Food Cake',
      filling: 'Single-Origin Espresso Truffle Ganache',
      frosting: 'Mirror Gloss Cocoa Glaze & Whipped Fudge'
    },
    dietaryTags: ['Signature'],
    pairingNote: 'Recommended with single malt scotch, stout, or double shot ristretto.',
    allergens: 'Dairy, Eggs, Wheat (Gluten). Produced in a kitchen that handles nuts.',
    rating: 4.98,
    reviewCount: 189,
    isBestseller: true
  },
  {
    id: 'earl-grey-lavender-honey',
    name: 'Earl Grey Lavender & Wild Honey',
    category: 'seasonal',
    subtitle: 'Bergamot-scented crumb, wildflower honey cream & dried lavender blooms',
    description: 'Steeped for 18 hours in whole-leaf Ceylon bergamot tea, this tender sponge is enveloped in French lavender wildflower honey buttercream and punctuated with blackberry coulis. Subtle, floral, and deeply poetic.',
    basePrice: 84,
    image: earlGreyLavenderImg,
    servings: '8–10 guests',
    sizes: [
      { label: 'Petite 6"', diameter: '6 inch', serves: '8–10 servings', price: 84 },
      { label: 'Classic 8"', diameter: '8 inch', serves: '14–16 servings', price: 122 },
      { label: 'Grand 10"', diameter: '10 inch', serves: '22–26 servings', price: 168 }
    ],
    flavorProfile: {
      sponge: 'Infused Whole-Leaf Earl Grey Sponge',
      filling: 'Blackberry Reduction & Wild Honey Curd',
      frosting: 'Provence Lavender Swiss Meringue Buttercream'
    },
    dietaryTags: ['Nut-Free', 'Signature'],
    pairingNote: 'Flawlessly complemented by Silver Needle white tea or delicate champagne.',
    allergens: 'Dairy, Eggs, Wheat (Gluten). Completely nut-free.',
    rating: 4.92,
    reviewCount: 97
  },
  {
    id: 'champagne-wild-strawberry-gateau',
    name: 'Champagne & Wild Strawberry Gateau',
    category: 'wedding',
    subtitle: 'Brut Rosé reduction, Mara des Bois strawberries & white blossom petals',
    description: 'Our premier celebration cake designed for anniversaries, engagements, and high-fashion galas. Delicate vanilla bean génoise soaked in sparkling brut Rosé, layered with fresh Mara des Bois strawberry compote and silk meringue.',
    basePrice: 115,
    image: strawberryChampagneImg,
    servings: '12–14 guests',
    sizes: [
      { label: 'Classic 8"', diameter: '8 inch', serves: '14–16 servings', price: 145 },
      { label: 'Grand 10"', diameter: '10 inch', serves: '22–26 servings', price: 198 },
      { label: 'Two-Tier Wedding', diameter: '6" + 8" tiered', serves: '30–35 servings', price: 340 }
    ],
    flavorProfile: {
      sponge: 'Tahitian Vanilla Génoise with Champagne Soak',
      filling: 'Mara des Bois Strawberries & White Chocolate Pearls',
      frosting: 'Silky Brut Champagne Swiss Buttercream'
    },
    dietaryTags: ['Nut-Free'],
    pairingNote: 'Serve alongside vintage Champagne or Kir Royale.',
    allergens: 'Dairy, Eggs, Wheat (Gluten).',
    rating: 4.99,
    reviewCount: 114,
    isBestseller: true
  },
  {
    id: 'tahitian-salted-caramel-vanilla',
    name: 'Tahitian Vanilla & Fleur de Sel Caramel',
    category: 'celebration',
    subtitle: 'Triple-origin Bourbon vanilla, amber sea salt caramel & honeycomb crunch',
    description: 'Pure, timeless elegance elevated to patisserie perfection. Made with slow-infused Madagascar and Tahitian vanilla beans, hand-stirred copper kettle salted caramel drizzle, and golden honeycomb crisp.',
    basePrice: 86,
    image: saltedCaramelImg,
    servings: '8–10 guests',
    sizes: [
      { label: 'Petite 6"', diameter: '6 inch', serves: '8–10 servings', price: 86 },
      { label: 'Classic 8"', diameter: '8 inch', serves: '14–16 servings', price: 125 },
      { label: 'Grand 10"', diameter: '10 inch', serves: '22–26 servings', price: 172 }
    ],
    flavorProfile: {
      sponge: 'Triple Vanilla Bean Buttermilk Cake',
      filling: 'Copper-Kettle Guérande Fleur de Sel Caramel',
      frosting: 'Light Whipped Bourbon Vanilla Buttercream'
    },
    dietaryTags: ['Nut-Free', 'Signature'],
    pairingNote: 'Wonderful with Earl Grey tea, flat whites, or dessert wine.',
    allergens: 'Dairy, Eggs, Wheat (Gluten). Nut-free recipe.',
    rating: 4.95,
    reviewCount: 164
  }
];

export const TASTING_BOX_ITEM = {
  id: 'curators-tasting-flight',
  title: "The Atelier Tasting Flight",
  subtitle: "Four curated celebration cake quarters in our embossed presentation box",
  price: 48,
  description: "Perfect for couples planning their wedding or dessert connoisseurs curating their celebration menu. Includes generous quarters of Raspberry Pistachio, Midnight Truffle, Earl Grey Lavender, and Salted Vanilla Caramel, with pairing guide and flavor tasting notes.",
  servings: "4 generous portions",
  image: raspberryPistachioImg
};

export const COLOR_PALETTES = [
  { name: 'Pearl Cream', hex: '#FAF7F2', accentHex: '#E5DFD3', description: 'Classic porcelain ivory' },
  { name: 'Blush Rose', hex: '#F7E7E5', accentHex: '#E2C2BE', description: 'Romantic gentle petal' },
  { name: 'Matcha Sage', hex: '#E2E8DE', accentHex: '#BAC6B3', description: 'Botanical muted moss' },
  { name: 'Lavender Haze', hex: '#EBE6F0', accentHex: '#CABFDB', description: 'Delicate floral twilight' },
  { name: 'Warm Terracotta', hex: '#F3E5D8', accentHex: '#D4B499', description: 'Golden sunlit biscuit' },
  { name: 'Noir Espresso', hex: '#2C2727', accentHex: '#524B4B', description: 'Dramatic modern charcoal' }
];

export const SPONGE_OPTIONS = [
  { id: 'vanilla', name: 'Tahitian Vanilla Bean', note: 'Fragrant, tender buttermilk crumb' },
  { id: 'chocolate', name: '70% Valrhona Dark Cocoa', note: 'Deep, rich, and decadent' },
  { id: 'pistachio', name: 'Sicilian Bronte Pistachio', note: 'Nutty, earthy natural green crumb (+$12)' },
  { id: 'earl-grey', name: 'Ceylon Bergamot & Tea', note: 'Aromatic, subtly herbal and refined' },
  { id: 'red-velvet', name: 'Artisan Red Velvet & Buttermilk', note: 'Silky crumb with light cocoa hint' }
];

export const FILLING_OPTIONS = [
  { id: 'caramel', name: 'Salted Fleur de Sel Caramel', note: 'Cooked in copper kettles' },
  { id: 'raspberry', name: 'Macerated Wild Raspberry Puree', note: 'Bright, tart, and vibrant' },
  { id: 'espresso-ganache', name: 'Espresso Truffle Ganache', note: 'Velvety single-origin roast' },
  { id: 'passionfruit', name: 'Tropical Passionfruit Curd', note: 'Exotic citrus punch' },
  { id: 'mascarpone', name: 'Whipped White Chocolate Mascarpone', note: 'Melt-in-mouth cloud texture' }
];

export const FROSTING_FINISHES = [
  { id: 'smooth', name: 'Smooth Velvet Silk', description: 'Impeccable razor-sharp knife edges' },
  { id: 'semi-naked', name: 'Semi-Naked Crumb', description: 'Rustic artisanal glimpse of golden cake layers' },
  { id: 'lambeth', name: 'Vintage Lambeth Piping', description: 'Elaborate royal over-piping and dainty ruffles' },
  { id: 'textured-knife', name: 'Stucco Palette Knife', description: 'Painterly organic hand-sculpted buttercream' }
] as const;

export const ARTISANAL_ACCENTS = [
  { id: 'gold-leaf', name: '24k Edible Gold Leaf Flakes', price: 14 },
  { id: 'edible-florals', name: 'Pressed Edible Blooms & Petals', price: 18 },
  { id: 'macarons', name: 'Handmade French Macarons (x4)', price: 16 },
  { id: 'candied-figs', name: 'Candied Turkish Figs & Thyme', price: 15 },
  { id: 'berries-rosemary', name: 'Fresh Blackberries & Sugared Rosemary', price: 12 },
  { id: 'pearl-dust', name: 'Iridescent Pearl Dust Glow', price: 10 }
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Genevieve Laurent',
    role: 'Editorial Director',
    event: '30th Birthday Gala',
    cake: 'Raspberry Pistachio Chiffon',
    text: 'Without hyperbole, this was the crowning centerpiece of the evening. The crumb was astonishingly tender and the tart raspberry cut through the rich pistachio with masterstroke precision.',
    rating: 5,
    date: 'September 2026'
  },
  {
    id: 'rev-2',
    author: 'Marcus & Julian Thorne',
    role: 'Architectural Designers',
    event: 'Autumn Wedding at The Glasshouse',
    cake: 'Bespoke 3-Tier Champagne Gateau',
    text: 'The cake atelier builder allowed us to visualize the palette with our table linens beforehand. Our guests are still texting us weeks later about the champagne sponge.',
    rating: 5,
    date: 'August 2026'
  },
  {
    id: 'rev-3',
    author: 'Claire Vance',
    role: 'Food & Wine Contributor',
    event: 'Private Dinner Celebration',
    cake: 'Midnight Truffle & Espresso Ganache',
    text: 'A masterclass in Valrhona cacao balance. Not cloyingly sweet like commercial bakeries — deep, resonant, and finished with flawless temper work.',
    rating: 5,
    date: 'October 2026'
  }
];

export const ATELIER_INFO = {
  address: '428 Mercer Street, Soho, New York, NY 10013',
  hours: 'Tuesday – Saturday: 9:00 AM – 6:30 PM · Sunday: 10:00 AM – 4:00 PM (Monday Closed)',
  phone: '(212) 555-0182',
  email: 'atelier@velvetandwhisk.com',
  leadTime: 'Signature cakes require 48 hours notice. Custom tiered atelier cakes require 5 days notice.'
};
