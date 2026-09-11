import React, { useState } from 'react';
import { useArmory } from '../context/ArmoryContext';
import {
  ArrowLeft,
  Shield,
  Crosshair,
  Star,
  Check,
  Bookmark,
  Share2,
  AlertTriangle,
  Minus,
  Plus,
  ShoppingBag,
  Zap,
  Eye,
  Radio,
  FileText,
  Lock,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    navigate,
    addToCart,
    toggleWishlist,
    isInWishlist,
    triggerToast,
  } = useArmory();

  const product =
    products.find((p) => p.id === selectedProductId) ||
    products.find((p) => p.id === 'APX-900') ||
    products[0];

  const inVault = isInWishlist(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [thermalMode, setThermalMode] = useState<boolean>(false);
  const [selectedMount, setSelectedMount] = useState<string>(
    product.mountOptions?.[0] || 'Standard Interface'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colorOptions?.[0]?.name || 'Stealth Black'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [itarAgreed, setItarAgreed] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'specs' | 'itar' | 'deployment'>('specs');

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('SECURE LINK COPIED', 'Hardware telemetry link copied to clipboard.', 'info');
    }
  };

  const handleDeploy = () => {
    if (product.isITAR && !itarAgreed) {
      triggerToast('ITAR AGREEMENT REQUIRED', 'You must verify ITAR compliance checkbox.', 'warn');
      return;
    }
    addToCart(product, quantity, selectedMount, selectedColor);
  };

  return (
    <div className="max-w-[88rem] mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Back Button & Top Navigation Breadcrumbs */}
      <div className="flex items-center justify-between font-mono text-xs text-[#94a3b8] pb-3 border-b border-[#222b35]">
        <button
          onClick={() => navigate('catalog')}
          className="flex items-center gap-2 hover:text-[#ffc174] uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>[ RETURN TO ARSENAL ]</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">SECTOR: {product.category}</span>
          <span className="hidden sm:inline">//</span>
          <span className="text-[#ffc174] font-semibold">SKU: {product.sku}</span>
          <button
            onClick={handleShare}
            className="w-8 h-8 border border-[#222b35] bg-[#141a1f] hover:border-[#f59e0b] hover:text-[#ffc174] flex items-center justify-center transition-colors ml-2"
            title="Share Hardware Dossier"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Spec Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Visual Inspection & Thermal Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Inspection Viewport */}
          <div className="relative w-full aspect-[4/3] bg-[#0b0f12] border border-[#222b35] overflow-hidden flex items-center justify-center group">
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 font-mono text-[9px] text-[#94a3b8] z-20">
              [HUD-OPTIC-CAM 01 // 60HZ]
            </div>
            <div className="absolute top-2 right-2 font-mono text-[9px] text-[#56e5a9] z-20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-pulse"></span>
              SENSOR ACTIVE
            </div>

            {/* Thermal Simulator Mode Toggle Button */}
            <button
              onClick={() => setThermalMode(!thermalMode)}
              className={`absolute bottom-3 right-3 z-30 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border backdrop-blur-md transition-all ${
                thermalMode
                  ? 'bg-[#56e5a9] text-[#0b0f12] border-[#56e5a9] shadow-[0_0_15px_rgba(86,229,169,0.5)]'
                  : 'bg-[#181c1f]/90 text-[#ffc174] border-[#374556] hover:border-[#ffc174]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{thermalMode ? 'THERMAL FLIR // ENGAGED' : 'ENGAGE THERMAL MODE'}</span>
            </button>

            {/* Thermal Simulator HUD Overlays when Active */}
            {thermalMode && (
              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                {/* Green/Cyan Infrared Grid and Scanline */}
                <div className="absolute inset-0 bg-[#00ff88]/10 mix-blend-color-dodge animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#56e5a9]/10 to-transparent w-full h-12 animate-scanline"></div>

                {/* Reticle Overlay Crosshair SVG */}
                <svg className="w-64 h-64 text-[#56e5a9] opacity-80" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="100" cy="100" r="2" fill="currentColor" />
                  <line x1="20" y1="100" x2="80" y2="100" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="120" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="100" y1="20" x2="100" y2="80" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="100" y1="120" x2="100" y2="180" stroke="currentColor" strokeWidth="1.5" />
                  <text x="105" y="70" fill="currentColor" fontSize="8" fontFamily="monospace">600M // 0.3 MOA</text>
                  <text x="105" y="135" fill="currentColor" fontSize="8" fontFamily="monospace">VOx NETD &lt;20mK</text>
                </svg>

                {/* Bottom Left Thermal Telemetry */}
                <div className="absolute bottom-3 left-3 bg-[#0b0f12]/90 border border-[#56e5a9]/50 p-2 font-mono text-[9px] text-[#56e5a9] space-y-0.5">
                  <div>PALETTE: WHITE-HOT / IR</div>
                  <div>FPS: 60.00 HZ</div>
                  <div>AMB: 18.4°C // RANGE: 2,400M</div>
                </div>
              </div>
            )}

            {/* Product Image */}
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-contain p-6 transition-all duration-500 ${
                thermalMode
                  ? 'filter invert hue-rotate-90 contrast-200 saturate-150 brightness-110'
                  : 'group-hover:scale-105'
              }`}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Angle Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setThermalMode(false);
                }}
                className={`w-20 h-20 bg-[#0b0f12] border shrink-0 p-1 transition-all overflow-hidden flex items-center justify-center ${
                  activeImageIndex === idx
                    ? 'border-[#f59e0b] shadow-md shadow-[#f59e0b]/20'
                    : 'border-[#222b35] hover:border-[#374556]'
                }`}
              >
                <img
                  src={img}
                  alt={`Angle view ${idx + 1}`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {/* Defense Trust Credentials */}
          <div className="bg-[#181c1f] border border-[#222b35] p-4 grid grid-cols-3 gap-3 font-mono text-center text-xs">
            <div className="border-r border-[#222b35] pr-2">
              <span className="text-[#94a3b8] text-[10px] block">CRITICAL CLASS</span>
              <span className="text-[#ffc174] font-bold">{product.grade}</span>
            </div>
            <div className="border-r border-[#222b35] pr-2">
              <span className="text-[#94a3b8] text-[10px] block">ITAR STATUS</span>
              <span className={product.isITAR ? 'text-[#ffb4ab] font-bold' : 'text-[#56e5a9] font-bold'}>
                {product.isITAR ? 'REGULATED // US ONLY' : 'CONUS UNRESTRICTED'}
              </span>
            </div>
            <div>
              <span className="text-[#94a3b8] text-[10px] block">STRUCTURAL LIFE</span>
              <span className="text-[#56e5a9] font-bold">10-YR GUARANTEE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Spec Detail, Configuration & Primary Action Dock (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Badges */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
              <span className="px-2 py-0.5 bg-[#262a2e] text-[#ffc174] border border-[#374556] font-semibold">
                STATUS: FIELD READY
              </span>
              {product.isITAR && (
                <span className="px-2 py-0.5 bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/30 font-semibold">
                  ITAR RESTRICTED
                </span>
              )}
              {product.fflRequired && (
                <span className="px-2 py-0.5 bg-[#f59e0b]/10 text-[#ffc174] border border-[#f59e0b]/40 font-semibold">
                  FFL REQUIRED
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#e0e3e7] uppercase leading-tight">
              {product.name}
            </h1>

            {/* Rating & Review Counter */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="flex items-center text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[#e0e3e7] font-bold">{product.rating}</span>
              <span className="text-[#94a3b8]">({product.reviewCount} OPERATORS)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#141a1f] border border-[#222b35] p-4 space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs text-[#94a3b8]">NET ALLOCATION COST:</span>
              <span className="font-mono text-2xl font-bold text-[#ffc174]">
                ${product.price.toLocaleString()} USD
              </span>
            </div>
            <div className="font-mono text-[11px] text-[#94a3b8]">
              Or 4 interest-free installments of ${(product.price / 4).toFixed(2)} USD with Gov/Mil Net-30.
            </div>
            <div className="pt-2 text-[11px] text-[#56e5a9] font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9]"></span>
              {product.leadTime}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
            {product.longDescription}
          </p>

          {/* Hardware Configuration Selectors */}
          <div className="space-y-4 pt-2 border-t border-[#222b35]">
            {/* Mount Option */}
            {product.mountOptions && product.mountOptions.length > 0 && (
              <div>
                <label className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider block mb-1.5">
                  // MOUNT INTERFACE:
                </label>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {product.mountOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedMount(opt)}
                      className={`p-2.5 text-left border transition-colors ${
                        selectedMount === opt
                          ? 'bg-[#181c1f] border-[#f59e0b] text-[#ffc174]'
                          : 'bg-[#0b0f12] border-[#222b35] text-[#94a3b8] hover:text-[#e0e3e7]'
                      }`}
                    >
                      <div className="text-[11px] font-semibold">{opt}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cerakote Finish / Color */}
            {product.colorOptions && product.colorOptions.length > 0 && (
              <div>
                <label className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider block mb-1.5">
                  // CERAKOTE FINISH:
                </label>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {product.colorOptions.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setSelectedColor(col.name)}
                      className={`p-2.5 text-left border flex items-center gap-2 transition-colors ${
                        selectedColor === col.name
                          ? 'bg-[#181c1f] border-[#f59e0b] text-[#ffc174]'
                          : 'bg-[#0b0f12] border-[#222b35] text-[#94a3b8] hover:text-[#e0e3e7]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-none border border-[#374556] shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold truncate">{col.name}</div>
                        <div className="text-[9px] text-[#94a3b8] truncate">{col.code}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technical Data Matrix Table Accordion */}
          <div className="border border-[#222b35] bg-[#0b0f12]">
            <div className="flex border-b border-[#222b35] font-mono text-xs">
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-2.5 text-center uppercase tracking-wider transition-colors ${
                  activeTab === 'specs'
                    ? 'bg-[#181c1f] text-[#ffc174] border-b-2 border-[#f59e0b]'
                    : 'text-[#94a3b8] hover:text-[#e0e3e7]'
                }`}
              >
                DATA MATRIX
              </button>
              <button
                onClick={() => setActiveTab('itar')}
                className={`flex-1 py-2.5 text-center uppercase tracking-wider transition-colors ${
                  activeTab === 'itar'
                    ? 'bg-[#181c1f] text-[#ffc174] border-b-2 border-[#f59e0b]'
                    : 'text-[#94a3b8] hover:text-[#e0e3e7]'
                }`}
              >
                ITAR DIRECTIVES
              </button>
            </div>

            <div className="p-4 text-xs">
              {activeTab === 'specs' ? (
                <div className="space-y-2 font-mono">
                  {product.technicalMatrix.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between py-1.5 px-2 border-b border-[#222b35]/60 ${
                        item.highlight ? 'bg-[#181c1f] text-[#ffc174]' : 'text-[#94a3b8]'
                      }`}
                    >
                      <span className="text-[11px]">{item.label}</span>
                      <span className="text-[11px] font-bold text-[#e0e3e7] text-right">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 font-mono text-[11px] text-[#94a3b8]">
                  <p className="leading-relaxed">
                    This unit requires formal compliance with 22 U.S.C. 2778. Under federal law, foreign resale, transshipment, or disclosure to non-US persons without Department of State authorization is strictly prohibited.
                  </p>
                  <label className="flex items-start gap-2 p-2 bg-[#181c1f] border border-[#374556] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={itarAgreed}
                      onChange={(e) => setItarAgreed(e.target.checked)}
                      className="accent-[#f59e0b] w-4 h-4 mt-0.5 cursor-pointer"
                    />
                    <span className="text-[#e0e3e7]">
                      I verify I am a US citizen or legal permanent resident authorized for Tier-1 defense articles.
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Primary Action Dock */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#222b35] bg-[#0b0f12]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-[#94a3b8] hover:text-[#e0e3e7] hover:bg-[#181c1f]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-mono text-sm font-bold text-[#e0e3e7]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-[#94a3b8] hover:text-[#e0e3e7] hover:bg-[#181c1f]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleDeploy}
                className="flex-1 py-3.5 px-4 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <Zap className="w-4 h-4" />
                <span>DEPLOY TO ARSENAL</span>
              </button>

              {/* Bookmark to Vault */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                  inVault
                    ? 'bg-[#f59e0b] border-[#f59e0b] text-[#0b0f12]'
                    : 'bg-[#181c1f] border-[#222b35] text-[#94a3b8] hover:text-[#ffc174] hover:border-[#f59e0b]'
                }`}
                title={inVault ? 'Remove from Vault' : 'Save to Vault'}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-[#94a3b8]">
              <Lock className="w-3.5 h-3.5 text-[#56e5a9]" />
              <span>AES-256 ZERO-KNOWLEDGE LOGISTICAL ENCRYPTION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
