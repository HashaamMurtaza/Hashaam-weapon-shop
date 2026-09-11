import React, { useState, useEffect } from 'react';
import { useArmory } from '../context/ArmoryContext';
import { Shield, Search, Bookmark, ShoppingBag, User, Radio, ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    navigate,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setActiveCategoryFilter,
  } = useArmory();

  const [zuluClock, setZuluClock] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [quickQuery, setQuickQuery] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setZuluClock(
        d.toISOString().substring(11, 19) + ' Z'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate('catalog');
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Telemetry Feed Ticker */}
      <div className="w-full bg-[#0b0f12] border-b border-[#222b35] px-4 py-1 flex items-center justify-between text-[11px] font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-ping"></span>
          <span className="text-[#56e5a9] tracking-widest uppercase">
            CATALOG FEED ACTIVE
          </span>
          <span className="hidden sm:inline text-[#475569]">//</span>
          <span className="hidden sm:inline text-[#94a3b8]">ORDNANCE SYNC: 100%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1 text-[#ffc174] bg-[#262a2e] px-2 py-0.5 border border-[#374556]">
            MIL-SPEC 810-H COMPLIANT
          </span>
          <span className="text-[#94a3b8]">
            CHRONO: <span className="text-[#e0e3e7] font-bold">{zuluClock}</span>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 w-full z-40 bg-[#0b0f12]/95 backdrop-blur-xl border-b border-[#222b35] shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
        <div className="max-w-[88rem] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 bg-[#181c1f] border border-[#374556] group-hover:border-[#f59e0b] flex items-center justify-center transition-colors">
              <Shield className="w-5 h-5 text-[#ffc174] group-hover:text-[#f59e0b] transition-colors" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg tracking-tight font-bold text-[#e0e3e7] uppercase">
                  VALKYRIE
                </span>
                <span className="font-mono text-xs text-[#ffc174] font-semibold uppercase">
                  // ARMS
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-pulse"></span>
                <span className="font-mono text-[10px] text-[#94a3b8] tracking-widest">
                  CIPHER: DEFCON 4
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
            <button
              onClick={() => navigate('home')}
              className={`px-3 py-2 transition-colors border-b-2 ${
                activeView === 'home'
                  ? 'text-[#ffc174] border-[#f59e0b] bg-[#181c1f]'
                  : 'text-[#94a3b8] border-transparent hover:text-[#e0e3e7] hover:bg-[#181c1f]/50'
              }`}
            >
              [ INTEL // BRIEF ]
            </button>
            <button
              onClick={() => {
                setActiveCategoryFilter('ALL');
                navigate('catalog');
              }}
              className={`px-3 py-2 transition-colors border-b-2 ${
                activeView === 'catalog'
                  ? 'text-[#ffc174] border-[#f59e0b] bg-[#181c1f]'
                  : 'text-[#94a3b8] border-transparent hover:text-[#e0e3e7] hover:bg-[#181c1f]/50'
              }`}
            >
              [ ARSENAL CATALOG ]
            </button>
            <button
              onClick={() => navigate('vault')}
              className={`px-3 py-2 transition-colors border-b-2 ${
                activeView === 'vault'
                  ? 'text-[#ffc174] border-[#f59e0b] bg-[#181c1f]'
                  : 'text-[#94a3b8] border-transparent hover:text-[#e0e3e7] hover:bg-[#181c1f]/50'
              }`}
            >
              [ GEAR VAULT ]
            </button>
            <button
              onClick={() => navigate('dossier')}
              className={`px-3 py-2 transition-colors border-b-2 ${
                activeView === 'dossier'
                  ? 'text-[#ffc174] border-[#f59e0b] bg-[#181c1f]'
                  : 'text-[#94a3b8] border-transparent hover:text-[#e0e3e7] hover:bg-[#181c1f]/50'
              }`}
            >
              [ DOSSIER // LOGS ]
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              aria-label="Search Armory"
              onClick={() => {
                navigate('catalog');
                setSearchOpen(!searchOpen);
              }}
              className="w-10 h-10 border border-[#222b35] bg-[#141a1f] flex items-center justify-center text-[#94a3b8] hover:text-[#ffc174] hover:border-[#f59e0b] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist / Vault */}
            <button
              aria-label="Gear Vault"
              onClick={() => navigate('vault')}
              className="relative w-10 h-10 border border-[#222b35] bg-[#141a1f] flex items-center justify-center text-[#94a3b8] hover:text-[#ffc174] hover:border-[#f59e0b] transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#262a2e] border border-[#f59e0b] text-[#ffc174] font-mono text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length < 10 ? `0${wishlist.length}` : wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Slideover Drawer Trigger */}
            <button
              aria-label="Armory Cart"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative w-10 h-10 border border-[#222b35] bg-[#141a1f] flex items-center justify-center text-[#94a3b8] hover:text-[#ffc174] hover:border-[#f59e0b] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#f59e0b] text-[#0b0f12] font-mono text-[10px] font-bold flex items-center justify-center">
                  {cartCount < 10 ? `0${cartCount}` : cartCount}
                </span>
              )}
            </button>

            {/* Operator Dossier / Profile Avatar */}
            <button
              aria-label="Operator Dossier"
              onClick={() => navigate('dossier')}
              className="w-8 h-8 rounded-full bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] flex items-center justify-center ml-1 transition-colors shadow-sm"
              title="Operator Dossier"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Navigation Footer Dock */}
      <nav aria-label="Mobile Navigation Dock" className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-[#0b0f12]/95 backdrop-blur-xl border-t border-[#222b35] pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
        <div className="flex justify-around items-center h-14 px-2">
          <button
            onClick={() => navigate('home')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-11 transition-colors ${
              activeView === 'home' ? 'text-[#ffc174]' : 'text-[#94a3b8] hover:text-[#e0e3e7]'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span className="font-mono text-[10px] tracking-wider uppercase">INTEL</span>
          </button>

          <button
            onClick={() => {
              setActiveCategoryFilter('ALL');
              navigate('catalog');
            }}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-11 transition-colors ${
              activeView === 'catalog' ? 'text-[#ffc174]' : 'text-[#94a3b8] hover:text-[#e0e3e7]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="font-mono text-[10px] tracking-wider uppercase">ARSENAL</span>
          </button>

          <button
            onClick={() => navigate('vault')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-11 transition-colors ${
              activeView === 'vault' ? 'text-[#ffc174]' : 'text-[#94a3b8] hover:text-[#e0e3e7]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="font-mono text-[10px] tracking-wider uppercase">VAULT</span>
          </button>

          <button
            onClick={() => navigate('dossier')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-11 transition-colors ${
              activeView === 'dossier' ? 'text-[#ffc174]' : 'text-[#94a3b8] hover:text-[#e0e3e7]'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="font-mono text-[10px] tracking-wider uppercase">DOSSIER</span>
          </button>
        </div>
      </nav>
    </>
  );
};
