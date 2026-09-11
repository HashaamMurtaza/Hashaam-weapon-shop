import React from 'react';
import { FilterState } from '../types';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  totalCount,
}) => {
  if (!isOpen) return null;

  const platforms = [
    { id: 'ALL', label: 'ALL PLATFORMS' },
    { id: '5.56', label: '5.56 NATO' },
    { id: '7.62', label: '7.62 / .308' },
    { id: 'GEAR', label: 'ARMOR & BLADES' },
    { id: 'MULTI', label: 'MULTI-CALIBER' },
  ];

  const handleReset = () => {
    setFilters({
      category: 'ALL',
      platform: 'ALL',
      maxPrice: 5000,
      inStockOnly: false,
      searchQuery: '',
      sortBy: 'critical',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#101417] border-l border-[#222b35] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 bg-[#0b0f12] border-b border-[#222b35] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#ffc174]" />
              <h3 className="font-display text-base font-bold text-[#e0e3e7] uppercase">
                ORDNANCE FILTERS
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 border border-[#222b35] bg-[#141a1f] text-[#94a3b8] hover:text-[#ffc174] hover:border-[#f59e0b] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Options */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Caliber / Platform */}
            <div>
              <label className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider block mb-2">
                // PLATFORM / CALIBER
              </label>
              <div className="space-y-1.5 font-mono text-xs">
                {platforms.map((p) => {
                  const active = filters.platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setFilters((prev) => ({ ...prev, platform: p.id }))}
                      className={`w-full px-3 py-2 text-left border flex items-center justify-between transition-colors ${
                        active
                          ? 'bg-[#181c1f] border-[#f59e0b] text-[#ffc174]'
                          : 'bg-[#0b0f12] border-[#222b35] text-[#94a3b8] hover:text-[#e0e3e7]'
                      }`}
                    >
                      <span>{p.label}</span>
                      {active && <Check className="w-3.5 h-3.5 text-[#f59e0b]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Cap Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs mb-2">
                <label className="text-[#94a3b8] uppercase tracking-wider">
                  // MAX ALLOCATION CAP
                </label>
                <span className="text-[#ffc174] font-bold">
                  ${filters.maxPrice.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="5000"
                step="100"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                }
                className="w-full accent-[#f59e0b] bg-[#0b0f12] h-2 rounded-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#94a3b8] mt-1">
                <span>$300</span>
                <span>$2,500</span>
                <span>$5,000</span>
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div className="pt-2 border-t border-[#222b35]">
              <label className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider block mb-2">
                // INVENTORY STATUS
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-[#0b0f12] border border-[#222b35] p-3 hover:border-[#374556]">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                  }
                  className="accent-[#f59e0b] w-4 h-4 cursor-pointer"
                />
                <span className="font-mono text-xs text-[#e0e3e7]">
                  IMMEDIATE FIELD DISPATCH ONLY (IN STOCK)
                </span>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-[#0b0f12] border-t border-[#222b35] space-y-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              SHOW {totalCount} QUALIFIED UNITS
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2 bg-[#181c1f] hover:bg-[#262a2e] text-[#94a3b8] hover:text-[#e0e3e7] border border-[#222b35] font-mono text-xs uppercase flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              RESET SPEC FILTERS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
