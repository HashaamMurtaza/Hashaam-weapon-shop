import React, { useState, useMemo } from 'react';
import { useArmory } from '../context/ArmoryContext';
import { FilterDrawer } from '../components/FilterDrawer';
import { FilterState } from '../types';
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  Zap,
  ArrowUpDown,
  X,
  Shield,
  Layers,
  ChevronDown,
} from 'lucide-react';

export const CatalogView: React.FC = () => {
  const {
    products,
    viewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    activeCategoryFilter,
    setActiveCategoryFilter,
  } = useArmory();

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const [filters, setFilters] = useState<FilterState>({
    category: activeCategoryFilter || 'ALL',
    platform: 'ALL',
    maxPrice: 5000,
    inStockOnly: false,
    searchQuery: '',
    sortBy: 'critical',
  });

  // Keep category in sync with context if changed via header/footer
  React.useEffect(() => {
    if (activeCategoryFilter !== filters.category) {
      setFilters((prev) => ({ ...prev, category: activeCategoryFilter }));
    }
  }, [activeCategoryFilter]);

  const categoryTabs = [
    { id: 'ALL', label: 'ALL ORDNANCE', count: products.length },
    {
      id: 'OPTICS',
      label: 'OPTICS & SIGHTS',
      count: products.filter((p) => p.category === 'OPTICS').length,
    },
    {
      id: 'FIREARMS',
      label: 'FIREARMS & SUPPRESSORS',
      count: products.filter((p) => p.category === 'FIREARMS').length,
    },
    {
      id: 'ARMOR',
      label: 'PLATE CARRIERS',
      count: products.filter((p) => p.category === 'ARMOR').length,
    },
    {
      id: 'NVG',
      label: 'COMMS & NVG',
      count: products.filter((p) => p.category === 'NVG').length,
    },
    {
      id: 'EDC',
      label: 'TACTICAL BLADES',
      count: products.filter((p) => p.category === 'EDC').length,
    },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category
        if (filters.category !== 'ALL' && product.category !== filters.category) {
          return false;
        }
        // Platform
        if (filters.platform !== 'ALL' && product.platform !== filters.platform) {
          return false;
        }
        // Price
        if (product.price > filters.maxPrice) {
          return false;
        }
        // In Stock
        if (filters.inStockOnly && product.stockStatus === 'low') {
          return false;
        }
        // Search Query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchSku = product.sku.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchSku && !matchDesc && !matchCat) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'velocity') return b.velocityScore - a.velocityScore;
        return b.criticalScore - a.criticalScore;
      });
  }, [products, filters]);

  const activeFilterCount =
    (filters.platform !== 'ALL' ? 1 : 0) +
    (filters.maxPrice < 5000 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.category !== 'ALL' ? 1 : 0);

  return (
    <div className="max-w-[88rem] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Live Telemetry Scan HUD Header */}
      <div className="bg-[#141a1f] border border-[#222b35] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#56e5a9] animate-pulse"></span>
            <span className="font-mono text-xs text-[#56e5a9] tracking-widest uppercase">
              LIVE TELEMETRY SCAN // ARSENAL CATALOG
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#e0e3e7] uppercase tracking-wide mt-1">
            Tactical Ordnance Inventory
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-[#0b0f12] px-3 py-1.5 border border-[#222b35]">
            <span className="text-[#94a3b8]">QUALIFIED UNITS: </span>
            <span className="text-[#ffc174] font-bold">
              {filteredProducts.length < 10 ? `0${filteredProducts.length}` : filteredProducts.length}
            </span>
          </div>
          <div className="bg-[#0b0f12] px-3 py-1.5 border border-[#222b35] hidden sm:block">
            <span className="text-[#94a3b8]">CLEARANCE: </span>
            <span className="text-[#56e5a9] font-bold">TIER-1 CITIZEN</span>
          </div>
        </div>
      </div>

      {/* Tactical Search & Category Bar */}
      <div className="space-y-4">
        {/* Search & Sort Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Tactical Search Input (7 cols) */}
          <div className="md:col-span-7 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="// SCAN SERIAL, CALIBER, OR UNIT..."
              className="w-full pl-10 pr-10 py-3 bg-[#0b0f12] border border-[#222b35] focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-xs font-mono text-[#e0e3e7] placeholder-[#475569] uppercase outline-none transition-colors"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94a3b8] hover:text-[#e0e3e7]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Drawer Trigger (2 cols) */}
          <div className="md:col-span-2">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-full h-full py-3 px-3 bg-[#181c1f] hover:bg-[#262a2e] border border-[#222b35] hover:border-[#f59e0b] text-[#e0e3e7] font-mono text-xs uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#ffc174]" />
              <span>FILTERS ({activeFilterCount})</span>
            </button>
          </div>

          {/* Sort Selector (3 cols) */}
          <div className="md:col-span-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94a3b8]">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className="w-full pl-9 pr-8 py-3 bg-[#0b0f12] border border-[#222b35] focus:border-[#f59e0b] text-xs font-mono text-[#e0e3e7] uppercase appearance-none outline-none cursor-pointer"
            >
              <option value="critical">SORT: MISSION CRITICAL</option>
              <option value="velocity">SORT: HIGHEST VELOCITY</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#94a3b8]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map((tab) => {
            const isActive = filters.category === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, category: tab.id }));
                  setActiveCategoryFilter(tab.id);
                }}
                className={`px-3.5 py-2 font-mono text-xs uppercase tracking-wider whitespace-nowrap border transition-colors ${
                  isActive
                    ? 'bg-[#f59e0b] border-[#f59e0b] text-[#0b0f12] font-bold shadow-sm'
                    : 'bg-[#181c1f] border-[#222b35] text-[#94a3b8] hover:text-[#e0e3e7] hover:border-[#374556]'
                }`}
              >
                {tab.label} [{tab.count < 10 ? `0${tab.count}` : tab.count}]
              </button>
            );
          })}
        </div>

        {/* Active Filter Badges Strip */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
            <span className="text-[#94a3b8]">APPLIED CONSTRAINTS:</span>
            {filters.category !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#262a2e] text-[#ffc174] border border-[#374556]">
                SECTOR: {filters.category}
                <button
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'ALL' }));
                    setActiveCategoryFilter('ALL');
                  }}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.platform !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#262a2e] text-[#ffc174] border border-[#374556]">
                PLATFORM: {filters.platform}
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, platform: 'ALL' }))}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.maxPrice < 5000 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#262a2e] text-[#ffc174] border border-[#374556]">
                MAX: ${filters.maxPrice}
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, maxPrice: 5000 }))}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#262a2e] text-[#56e5a9] border border-[#374556]">
                DISPATCH READY ONLY
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, inStockOnly: false }))}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setFilters({
                  category: 'ALL',
                  platform: 'ALL',
                  maxPrice: 5000,
                  inStockOnly: false,
                  searchQuery: '',
                  sortBy: 'critical',
                });
                setActiveCategoryFilter('ALL');
              }}
              className="text-[#ffb4ab] hover:underline ml-2"
            >
              PURGE ALL FILTERS
            </button>
          </div>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#141a1f] border border-[#222b35] p-16 text-center space-y-4">
          <div className="w-16 h-16 border border-[#222b35] bg-[#0b0f12] mx-auto flex items-center justify-center text-[#94a3b8]">
            <Search className="w-8 h-8 text-[#ffc174]" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-[#e0e3e7] uppercase">
              NO MATCHING ORDNANCE DETECTED
            </h3>
            <p className="font-mono text-xs text-[#94a3b8] max-w-md mx-auto mt-1">
              Adjust search parameters, release price ceiling constraints, or reset caliber filters.
            </p>
          </div>
          <button
            onClick={() => {
              setFilters({
                category: 'ALL',
                platform: 'ALL',
                maxPrice: 5000,
                inStockOnly: false,
                searchQuery: '',
                sortBy: 'critical',
              });
              setActiveCategoryFilter('ALL');
            }}
            className="px-5 py-2.5 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const inVault = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="bg-[#181c1f] border border-[#222b35] hover:border-[#f59e0b] transition-all flex flex-col justify-between group"
              >
                {/* Image Showcase */}
                <div className="relative bg-[#0b0f12] p-5 aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-[#222b35]">
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                    <span className="px-2 py-0.5 bg-[#262a2e] border border-[#374556] font-mono text-[9px] text-[#ffc174] font-semibold uppercase">
                      {product.grade}
                    </span>
                    {product.fflRequired && (
                      <span className="px-2 py-0.5 bg-[#f59e0b]/20 border border-[#f59e0b]/50 font-mono text-[9px] text-[#ffc174] font-semibold uppercase">
                        FFL REQ
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 border border-[#222b35] flex items-center justify-center transition-colors ${
                      inVault
                        ? 'bg-[#f59e0b] text-[#0b0f12]'
                        : 'bg-[#141a1f] text-[#94a3b8] hover:text-[#ffc174] hover:border-[#f59e0b]'
                    }`}
                    title={inVault ? 'Remove from Vault' : 'Save to Vault'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onClick={() => viewProduct(product.id)}
                    className="w-full h-full object-contain cursor-pointer group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div onClick={() => viewProduct(product.id)} className="cursor-pointer space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#94a3b8]">
                      <span>SKU: {product.sku}</span>
                      <span className="text-[#56e5a9]">{product.stockCount} UNITS ALLOCATED</span>
                    </div>

                    <h3 className="font-display text-sm font-bold text-[#e0e3e7] uppercase group-hover:text-[#ffc174] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Primary Specification Teaser */}
                  <div className="bg-[#0b0f12] p-2 border border-[#222b35] font-mono text-[10px] text-[#94a3b8] flex items-center justify-between">
                    <span>SPEC HIGHLIGHT:</span>
                    <span className="text-[#e0e3e7] font-semibold truncate ml-2">
                      {product.technicalMatrix[0].label}: {product.technicalMatrix[0].value}
                    </span>
                  </div>

                  {/* Pricing & Add to Cart */}
                  <div className="pt-3 border-t border-[#222b35] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#94a3b8] block">NET ALLOCATION</span>
                      <span className="font-mono text-base font-bold text-[#ffc174]">
                        ${product.price.toLocaleString()} USD
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-2 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>ACQUIRE</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filter Drawer Component */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        totalCount={filteredProducts.length}
      />
    </div>
  );
};
