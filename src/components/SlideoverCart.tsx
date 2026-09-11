import React from 'react';
import { useArmory } from '../context/ArmoryContext';
import { X, Trash2, Plus, Minus, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';

export const SlideoverCart: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartTax,
    cartTotal,
    navigate,
    viewProduct,
  } = useArmory();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101417] border-l border-[#222b35] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#0b0f12] border-b border-[#222b35] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#56e5a9] animate-pulse"></span>
                <span className="font-mono text-xs text-[#56e5a9] tracking-widest uppercase">
                  ENCRYPTED SESSION // ACTIVE
                </span>
              </div>
              <h2 className="font-display text-lg font-bold text-[#e0e3e7] uppercase tracking-wide mt-0.5">
                ORDNANCE MANIFEST
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-8 h-8 border border-[#222b35] bg-[#141a1f] hover:border-[#f59e0b] hover:text-[#ffc174] text-[#94a3b8] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-14 h-14 border border-[#222b35] bg-[#141a1f] flex items-center justify-center text-[#94a3b8] mb-3">
                  <ShieldAlert className="w-7 h-7 text-[#94a3b8]" />
                </div>
                <p className="font-mono text-xs text-[#ffc174] tracking-wider uppercase mb-1">
                  ARSENAL RACK EMPTY
                </p>
                <p className="text-xs text-[#94a3b8] max-w-xs mb-6">
                  No ballistic hardware or tactical electronics allocated to this session manifest.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('catalog');
                  }}
                  className="px-4 py-2 bg-[#f59e0b] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#ffc174] transition-colors"
                >
                  BROWSE ORDNANCE CATALOG
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#94a3b8] pb-1 border-b border-[#222b35]">
                  <span>ALLOCATED UNITS ({cart.length})</span>
                  <button
                    onClick={clearCart}
                    className="text-[#ffb4ab] hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    PURGE ALL
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#181c1f] border border-[#222b35] p-3 flex gap-3 group hover:border-[#374556] transition-colors"
                    >
                      {/* Image Thumbnail */}
                      <div
                        onClick={() => {
                          setIsCartDrawerOpen(false);
                          viewProduct(item.productId);
                        }}
                        className="w-20 h-20 bg-[#0b0f12] border border-[#222b35] shrink-0 cursor-pointer overflow-hidden flex items-center justify-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & Controls */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h3
                              onClick={() => {
                                setIsCartDrawerOpen(false);
                                viewProduct(item.productId);
                              }}
                              className="font-display text-xs font-bold text-[#e0e3e7] uppercase leading-tight hover:text-[#ffc174] cursor-pointer line-clamp-1"
                            >
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#94a3b8] hover:text-[#ffb4ab] transition-colors p-0.5"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="font-mono text-[10px] text-[#94a3b8] truncate mt-0.5">
                            SKU: {item.sku}
                          </p>

                          {(item.mount || item.color) && (
                            <p className="font-mono text-[10px] text-[#ffc174] truncate">
                              {item.mount || ''} {item.color ? `// ${item.color}` : ''}
                            </p>
                          )}

                          {item.fflRequired && (
                            <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#f59e0b]/10 border border-[#f59e0b]/40 font-mono text-[9px] text-[#ffc174] font-semibold">
                              FFL REGISTRATION REQUIRED
                            </span>
                          )}
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#222b35]">
                          <div className="flex items-center border border-[#222b35] bg-[#0b0f12]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-[#94a3b8] hover:text-[#e0e3e7] hover:bg-[#181c1f] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs font-bold text-[#e0e3e7]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#94a3b8] hover:text-[#e0e3e7] hover:bg-[#181c1f] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="font-mono text-xs font-bold text-[#e0e3e7]">
                            ${(item.price * item.quantity).toLocaleString()} USD
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer Financial Audit Ledger */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#0b0f12] border-t border-[#222b35] space-y-3">
              <div className="space-y-1.5 font-mono text-xs text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>ORDNANCE SUBTOTAL:</span>
                  <span className="text-[#e0e3e7]">${cartSubtotal.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>BALLISTIC HAZMAT FREIGHT:</span>
                  <span className="text-[#56e5a9] font-semibold">$0.00 (MIL-SPEC COMPLIMENTARY)</span>
                </div>
                <div className="flex justify-between">
                  <span>DOD JURISDICTION TAX (6.25%):</span>
                  <span className="text-[#e0e3e7]">${cartTax.toLocaleString()} USD</span>
                </div>
                <div className="pt-2 border-t border-[#222b35] flex justify-between text-sm font-bold">
                  <span className="text-[#e0e3e7]">GROSS PAYABLE:</span>
                  <span className="text-[#ffc174] font-mono">${cartTotal.toLocaleString()} USD</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('checkout');
                }}
                className="w-full py-3 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>PROCEED TO DISPATCH CLEARANCE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-[#94a3b8]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#56e5a9]" />
                <span>AES-256 ENCRYPTED ESCROW PROTOCOL</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
