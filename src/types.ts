export interface ProductSpec {
  [key: string]: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'OPTICS' | 'FIREARMS' | 'ARMOR' | 'NVG' | 'EDC';
  categoryLabel: string;
  platform: '5.56' | '7.62' | 'GEAR' | 'MULTI';
  price: number;
  rating: number;
  reviewCount: number;
  stockStatus: 'in' | 'allocated' | 'low';
  stockCount: number;
  grade: string;
  leadTime: string;
  description: string;
  longDescription: string;
  images: string[];
  specs: ProductSpec;
  technicalMatrix: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  isITAR: boolean;
  fflRequired: boolean;
  criticalScore: number;
  velocityScore: number;
  mountOptions?: string[];
  colorOptions?: {
    id: string;
    name: string;
    hex: string;
    code: string;
  }[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  mount?: string;
  color?: string;
  fflRequired?: boolean;
  category: string;
}

export interface OrderRecord {
  id: string;
  timestamp: string;
  zuluTime: string;
  callsign: string;
  deliveryBase: string;
  fflDealer: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'DISPATCHED' | 'INSPECTION' | 'IN_TRANSIT';
}

export type ViewMode = 'home' | 'catalog' | 'detail' | 'checkout' | 'vault' | 'dossier';

export interface FilterState {
  category: string;
  platform: string;
  maxPrice: number;
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: 'critical' | 'velocity' | 'price-desc' | 'price-asc';
}
