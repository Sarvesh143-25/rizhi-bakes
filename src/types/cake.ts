export type DietaryTag = 'Gluten-Friendly' | 'Nut-Free' | 'Vegan' | 'Dairy-Free' | 'Signature';

export interface CakeProduct {
  id: string;
  name: string;
  category: 'celebration' | 'wedding' | 'petite' | 'seasonal';
  subtitle: string;
  description: string;
  basePrice: number;
  image: string;
  altImage?: string;
  servings: string;
  sizes: {
    label: string;
    diameter: string;
    serves: string;
    price: number;
  }[];
  flavorProfile: {
    sponge: string;
    filling: string;
    frosting: string;
  };
  dietaryTags: DietaryTag[];
  pairingNote: string;
  allergens: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
}

export type TierCount = 1 | 2 | 3;

export interface CustomCakeConfig {
  tiers: TierCount;
  spongeFlavor: string;
  fillingFlavor: string;
  frostingFinish: 'smooth' | 'semi-naked' | 'lambeth' | 'textured-knife';
  colorPalette: {
    name: string;
    hex: string;
    accentHex: string;
  };
  accents: string[];
  inscriptionText: string;
  inscriptionStyle: 'calligraphy' | 'serif' | 'minimal';
  servingOccasion: string;
  specialRequests: string;
}

export interface CartItem {
  id: string;
  type: 'signature' | 'custom' | 'tasting_box';
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image?: string;
  details: {
    size?: string;
    servings?: string;
    inscription?: string;
    customConfig?: CustomCakeConfig;
    dietaryNotes?: string;
  };
}

export interface PlacedOrder {
  orderNumber: string;
  createdAt: string;
  fulfillmentType: 'pickup' | 'delivery';
  fulfillmentDate: string;
  fulfillmentTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tip: number;
  total: number;
  giftNote?: string;
}
