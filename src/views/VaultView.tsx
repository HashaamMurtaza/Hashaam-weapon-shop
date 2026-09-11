import React from 'react';
import { useArmory } from '../context/ArmoryContext';
import { Bookmark, Zap, Trash2, ArrowLeft, ShieldAlert } from 'lucide-react';

export const VaultView: React.FC = () => {
  const {
    products,
    wishlist,
    toggleWishlist,
    addToCart,
    viewProduct,
    navigate,
  } = useArmory();

  const vaultProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-[88rem] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-[#141a1f] border border-[#222b35] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#ffc174]" />
            <span className="font-mono text-xs text-[#ffc174] font-semibold tracking-widest uppercase">
              GEAR VAULT // CLASSIFIED WATCHLIST
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#e0e3e7] uppercase tracking-wide mt-1">
            Personal Armory Vault
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-[#0b0f12] px-3 py-1.5 border border-[#222b35]">
            <span className="text-[#94a3b8]">SAVED HARDWARE: </span>
            <span className="text-[#ffc174] font-bold">
              {vaultProducts.length < 10 ? `0${vaultProducts.length}` : vaultProducts.length} UNITS
            </span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {vaultProducts.length === 0 ? (
        <div className="bg-[#181c1f] border border-[#222b35] p-16 text-center space-y-4">
          <div className="w-16 h-16 border border-[#222b35] bg-[#0b0f12] mx-auto flex items-center justify-center text-[#94a3b8]">
            <ShieldAlert className="w-8 h-8 text-[#ffc174]" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-[#e0e3e7] uppercase">
              YOUR PERSONAL VAULT IS CURRENTLY EMPTY
            </h3>
            <p className="font-mono text-xs text-[#94a3b8] max-w-md mx-auto mt-1">
              Mark tactical hardware, thermal optronics, or plate carriers with the bookmark icon in the catalog to monitor inventory.
            </p>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className="px-6 py-3 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
          >
            EXPLORE ORDNANCE CATALOG
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {vaultProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#181c1f] border border-[#222b35] hover:border-[#f59e0b] transition-all flex flex-col justify-between group"
            >
              {/* Image */}
              <div className="relative bg-[#0b0f12] p-5 aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-[#222b35]">
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 bg-[#262a2e] border border-[#374556] font-mono text-[9px] text-[#ffc174] font-semibold uppercase">
                    {product.grade}
                  </span>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2.5 right-2.5 z-10 w-8 h-8 bg-[#141a1f] border border-[#222b35] hover:border-[#ffb4ab] text-[#ffb4ab] flex items-center justify-center transition-colors"
                  title="Remove from Vault"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => viewProduct(product.id)}
                  className="w-full h-full object-contain cursor-pointer group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div onClick={() => viewProduct(product.id)} className="cursor-pointer space-y-1">
                  <span className="font-mono text-[10px] text-[#94a3b8] uppercase block">
                    SKU: {product.sku}
                  </span>
                  <h3 className="font-display text-sm font-bold text-[#e0e3e7] uppercase group-hover:text-[#ffc174] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#94a3b8] line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-3 border-t border-[#222b35] flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#94a3b8] block">NET ALLOCATION</span>
                    <span className="font-mono text-sm font-bold text-[#ffc174]">
                      ${product.price.toLocaleString()} USD
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-3.5 py-2 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>ALLOCATE</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
