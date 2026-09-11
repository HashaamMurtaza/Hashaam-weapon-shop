import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, CartItem, OrderRecord, ViewMode } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastState {
  open: boolean;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warn';
}

interface ArmoryContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: OrderRecord[];
  activeView: ViewMode;
  selectedProductId: string | null;
  isCartDrawerOpen: boolean;
  toast: ToastState;
  operatorCallsign: string;
  deliveryBase: string;
  designatedFFL: string;
  activeCategoryFilter: string;
  setOperatorCallsign: (val: string) => void;
  setDeliveryBase: (val: string) => void;
  setDesignatedFFL: (val: string) => void;
  setActiveCategoryFilter: (val: string) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  navigate: (view: ViewMode, productId?: string) => void;
  viewProduct: (productId: string) => void;
  addToCart: (product: Product, quantity?: number, mount?: string, color?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  triggerToast: (title: string, message: string, type?: 'success' | 'info' | 'warn') => void;
  dispatchOrder: (orderInfo?: Partial<OrderRecord>) => OrderRecord;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  cartCount: number;
}

const ArmoryContext = createContext<ArmoryContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'valkyrie_cart_data';
const VAULT_STORAGE_KEY = 'valkyrie_vault_data';
const ORDERS_STORAGE_KEY = 'valkyrie_orders_history';
const PROFILE_STORAGE_KEY = 'valkyrie_operator_profile';

const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-init-1',
    productId: 'VK-714',
    name: 'VK-714 SPECTRE CARBINE',
    sku: 'VK-714-SP-CARB',
    price: 2850,
    quantity: 1,
    image: PRODUCTS[0].images[0],
    mount: 'QD PICATINNY MIL-STD-1913',
    color: 'Stealth Matte Black',
    fflRequired: true,
    category: 'FIREARMS',
  },
  {
    id: 'cart-init-2',
    productId: 'SPECTER-HOLO',
    name: 'SPECTER MULTI-RETICLE HOLOGRAPHIC OPTIC',
    sku: 'SPEC-H1-HOLO',
    price: 780,
    quantity: 1,
    image: PRODUCTS[4].images[0],
    mount: 'Quick-Detach Picatinny Lever',
    color: 'Stealth Black',
    fflRequired: false,
    category: 'OPTICS',
  },
];

const INITIAL_WISHLIST: string[] = ['APX-900', 'AEGIS-IV', 'BNVD-STRYKE'];

export const ArmoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [activeView, setActiveView] = useState<ViewMode>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('APX-900');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');

  const [operatorCallsign, setOperatorCallsign] = useState<string>('GHOST-LEADER // K. REEVES');
  const [deliveryBase, setDeliveryBase] = useState<string>('SECTOR 04 - HANGAR 12B, NEVADA RANGE 51');
  const [designatedFFL, setDesignatedFFL] = useState<string>('TITAN DEFENSE DEPOT (FFL #9-88-1294)');

  const [toast, setToast] = useState<ToastState>({
    open: false,
    title: '',
    message: '',
    type: 'info',
  });

  // Load from LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(VAULT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_WISHLIST;
    } catch {
      return INITIAL_WISHLIST;
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Sample baseline initial deployed order
      return [
        {
          id: '#TX-8829-DEPLOYED',
          timestamp: '2025-05-18 14:32:09',
          zuluTime: '2025-05-18 14:32:09 ZULU',
          callsign: 'GHOST-LEADER // K. REEVES',
          deliveryBase: 'SECTOR 04 - HANGAR 12B, NEVADA RANGE 51',
          fflDealer: 'TITAN DEFENSE DEPOT (FFL #9-88-1294)',
          items: [
            {
              id: 'sample-1',
              productId: 'APX-900',
              name: 'APX-900 PRO THERMAL RECON OPTIC',
              sku: 'APX-900-TH-BLK',
              price: 2850,
              quantity: 1,
              image: PRODUCTS[1].images[0],
              mount: 'Quick-Detach (QD) Lever',
              color: 'Stealth Black',
              fflRequired: false,
              category: 'OPTICS',
            },
          ],
          subtotal: 2850,
          tax: 178.12,
          total: 3028.12,
          paymentMethod: 'CIPHER TOKEN // ACCELERATED',
          status: 'DISPATCHED',
        },
      ];
    } catch {
      return [];
    }
  });

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [orders]);

  const triggerToast = (title: string, message: string, type: 'success' | 'info' | 'warn' = 'info') => {
    setToast({ open: true, title, message, type });
  };

  const navigate = (view: ViewMode, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, mount?: string, color?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.mount === (mount || product.mountOptions?.[0]) && item.color === (color || product.colorOptions?.[0]?.name)
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          quantity,
          image: product.images[0],
          mount: mount || product.mountOptions?.[0],
          color: color || product.colorOptions?.[0]?.name,
          fflRequired: product.fflRequired,
          category: product.category,
        };
        return [...prevCart, newItem];
      }
    });

    triggerToast(
      'ORDNANCE ALLOCATED',
      `${product.name} locked into tactical manifest.`,
      'success'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => {
      const removed = prev.find((item) => item.id === cartItemId);
      if (removed) {
        triggerToast('MANIFEST PURGED', `${removed.name} detached from ordnance manifest.`, 'warn');
      }
      return prev.filter((item) => item.id !== cartItemId);
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
    triggerToast('ORDNANCE PURGED', 'Armory rack completely cleared.', 'warn');
  };

  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    const prodName = product ? product.name : 'Hardware unit';

    setWishlist((prev) => {
      if (prev.includes(productId)) {
        triggerToast('VAULT REMOVAL', `${prodName} purged from classified archive.`, 'warn');
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast('VAULT SECURED', `${prodName} cataloged into personal armory vault.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const cartTax = useMemo(() => Number((cartSubtotal * 0.0625).toFixed(2)), [cartSubtotal]);
  const cartTotal = useMemo(() => cartSubtotal + cartTax, [cartSubtotal, cartTax]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const dispatchOrder = (orderInfo?: Partial<OrderRecord>): OrderRecord => {
    const randHex = Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const orderId = `#TX-${randHex}-DEPLOYED`;
    const zulu = now.toISOString().replace('T', ' ').substring(0, 19) + ' ZULU';

    const newOrder: OrderRecord = {
      id: orderId,
      timestamp: now.toLocaleString(),
      zuluTime: zulu,
      callsign: orderInfo?.callsign || operatorCallsign,
      deliveryBase: orderInfo?.deliveryBase || deliveryBase,
      fflDealer: orderInfo?.fflDealer || designatedFFL,
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      total: cartTotal,
      paymentMethod: orderInfo?.paymentMethod || 'CIPHER TOKEN // ACCELERATED',
      status: 'DISPATCHED',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart after checkout
    triggerToast('DISPATCH AUTHORIZED', `Requisition ticket ${orderId} locked & encrypted.`, 'success');
    return newOrder;
  };

  return (
    <ArmoryContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        activeView,
        selectedProductId,
        isCartDrawerOpen,
        toast,
        operatorCallsign,
        deliveryBase,
        designatedFFL,
        activeCategoryFilter,
        setOperatorCallsign,
        setDeliveryBase,
        setDesignatedFFL,
        setActiveCategoryFilter,
        setIsCartDrawerOpen,
        navigate,
        viewProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        triggerToast,
        dispatchOrder,
        cartSubtotal,
        cartTax,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </ArmoryContext.Provider>
  );
};

export const useArmory = () => {
  const context = useContext(ArmoryContext);
  if (!context) {
    throw new Error('useArmory must be used within an ArmoryProvider');
  }
  return context;
};
