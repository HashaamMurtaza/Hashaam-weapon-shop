import React from 'react';
import { useArmory } from '../context/ArmoryContext';
import { RangeMatrix } from '../components/RangeMatrix';
import {
  Shield,
  Crosshair,
  ArrowUpRight,
  Bookmark,
  Zap,
  CheckCircle2,
  FileCheck,
  Truck,
  Layers,
  ChevronRight,
  Radio,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    products,
    viewProduct,
    navigate,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveCategoryFilter,
  } = useArmory();

  const heroProduct = products.find((p) => p.id === 'VK-714') || products[0];
  const trendingProducts = products.slice(0, 4);

  const categories = [
    {
      id: 'OPTICS',
      name: 'PRECISION OPTICS & THERMAL',
      code: 'SECTOR-01',
      specs: '640x512 VOx // 60Hz Core',
      count: '03 UNITS',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAtUSYIw9EjvN6Rh_OZ216UzI3vzhIVd-4odeZFwTsFkSiG1hxhHsgRTYj27MqhOVlG9mSkpAeYOfzsdLLIa-1em-Xkk7saeb1-2q_Qx4IW1mZn6nPwERUmjNillveJfScr8lAaPFiC444CRgE9Fiken7DDLoY4p7nuGFaJsDcspLKUcRMf-J70h737OXRZcwjamGjIVRQgZ0VfL00GZ2nSqFBSw87mZasHQ_gcdG3vRG7rTfVSDqJGfg',
    },
    {
      id: 'FIREARMS',
      name: 'TACTICAL ARMAMENT & CHASSIS',
      code: 'SECTOR-02',
      specs: '5.56 NATO // Sub-0.3 MOA',
      count: '02 UNITS',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAWqXno5bysVdxewpCkzeud-aoFE9mYFGRJ9nRn0ZiV6Ck23PwTfYyG_xOBXVAzP_U_IoSEvMiUH1hjqLkRa4cein-vFalAhTFMHV6D3jyMMjka5stCgzCEI5G06_9pTpwahHxzqxj92U0Ad54YoJGtyDGf6tmNG0R5BEvt8Ao0OMEvdmad_WqPdNKyTYiZSE41rVtmW8dYkQLSfU0rDj0d6DbQTfYZD-h_UFpw2h8X2y067CS0oVQmrw',
    },
    {
      id: 'ARMOR',
      name: 'BALLISTIC PLATE CARRIERS',
      code: 'SECTOR-03',
      specs: 'NIJ Level IV // Triple Curve',
      count: '02 UNITS',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBd8ZRKCxyPsVwqPOwS9HTUMjAvAIjeAle1bAiQhI2m0vu4hgXLwZemqo0dCpKmfNGqluZaboriHBs9t_pClzMD5STo05_1TlKAlgXCq-jOChnsySG0ixaM-WcS621Tivr8YnsA2rIlY7GfA6astam4eORS-YyMY6jHACVpMjPvOAAvHbb3OLuMXi846adym2uZBmhdUmjwfQzzpu4n5R7ehI0Vm1qZQ_-jwW1E6ROVs6eyv0T39d1M3w',
    },
    {
      id: 'NVG',
      name: 'NIGHT VISION & IR SENSORS',
      code: 'SECTOR-04',
      specs: 'Gen 3+ WP // FOM 2376+',
      count: '02 UNITS',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCVKj03_XryJsBFS6NSdL7GTqdtX6520lMRRF6Pn3PbGNQo9kBDAUfQCSPAhFNz6bWxStkN0wD61WpDVfi5sw5I5Yu5fSqfbIvSHmGwsXWNWFwybNVMKbpbWkYp3vgbd_HeKJP5-osrg5U3shUp0TfEppWUWo3xZCwtyDCrBrU9bTORBHBc8LNOnnGtuOfxkIMNRIcz4-_ytY_dxhgmiOweNC_Nw3GfiNqQMpGmC-dG_xQ3yaeOSf8l-Q',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#141a1f] to-[#101417] border-b border-[#222b35]">
        {/* Reticle grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffc174 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-12 sm:pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#262a2e] border border-[#374556]">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
                <span className="font-mono text-[11px] text-[#ffc174] font-semibold tracking-widest uppercase">
                  FLAGSHIP SPEC // SERIES 2025
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#e0e3e7] uppercase leading-[1.05]">
                  APEX TACTICAL <br />
                  <span className="text-[#ffc174]">MK-IV CARBINE</span>
                </h1>
                <p className="font-mono text-sm sm:text-base text-[#56e5a9] tracking-wider uppercase">
                  // SUB-0.3 MOA TERMINAL BALLISTIC ACCURACY
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-xl">
                Monolithic magnesium upper receiver integrated with zero-backlash titanium bolt carrier group. Engineered for extreme thermal discipline under sustained suppressed fire.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveCategoryFilter('ALL');
                    navigate('catalog');
                  }}
                  className="px-6 py-3.5 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-[#f59e0b]/20"
                >
                  <Crosshair className="w-4 h-4" />
                  <span>EXPLORE ARMORY</span>
                </button>
                <button
                  onClick={() => viewProduct(heroProduct.id)}
                  className="px-6 py-3.5 bg-[#181c1f] hover:bg-[#262a2e] text-[#e0e3e7] border border-[#374556] hover:border-[#ffc174] font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <span>VIEW SPEC SHEET</span>
                  <ArrowUpRight className="w-4 h-4 text-[#ffc174]" />
                </button>
              </div>

              {/* Real-time Diagnostics Bar */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-[#222b35] font-mono text-xs">
                <div className="bg-[#0b0f12] p-2.5 border border-[#222b35]">
                  <span className="text-[#94a3b8] text-[10px] block">BARREL TOLERANCE</span>
                  <span className="text-[#e0e3e7] font-bold text-xs sm:text-sm">±0.00015 MM</span>
                </div>
                <div className="bg-[#0b0f12] p-2.5 border border-[#222b35]">
                  <span className="text-[#94a3b8] text-[10px] block">CHASSIS MASS</span>
                  <span className="text-[#ffc174] font-bold text-xs sm:text-sm">3.18 KG // TI</span>
                </div>
                <div className="bg-[#0b0f12] p-2.5 border border-[#222b35]">
                  <span className="text-[#94a3b8] text-[10px] block">TERMINAL RANGE</span>
                  <span className="text-[#56e5a9] font-bold text-xs sm:text-sm">1,400 METERS</span>
                </div>
              </div>
            </div>

            {/* Right Product Showcase Hero */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              {/* Tactical Crosshair Ring Frame */}
              <div className="w-full aspect-[4/3] bg-[#0b0f12] border border-[#222b35] relative p-4 flex items-center justify-center group">
                {/* Crosshair accents */}
                <div className="absolute top-2 left-2 text-[#94a3b8] font-mono text-[9px]">
                  [CAM 01 // ORDNANCE VIEW]
                </div>
                <div className="absolute top-2 right-2 text-[#56e5a9] font-mono text-[9px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-pulse" />
                  ITAR SECURED
                </div>

                <img
                  src={heroProduct.images[0]}
                  alt="Apex Tactical MK-IV"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Quick Inspect Button Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#101417]/90 backdrop-blur-md border border-[#222b35] p-2.5">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[#ffc174]">DIRECT IMPINGEMENT PLATFORM</span>
                    <span className="font-display text-xs font-bold text-[#e0e3e7]">$2,850.00 USD</span>
                  </div>
                  <button
                    onClick={() => viewProduct(heroProduct.id)}
                    className="px-3 py-1.5 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase transition-colors"
                  >
                    INSPECT UNIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-[#181c1f] border border-[#222b35] p-4 flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#ffc174] shrink-0" />
            <div>
              <div className="font-bold text-[#e0e3e7] uppercase">MIL-SPEC CERTIFIED</div>
              <div className="text-[#94a3b8] text-[11px]">MIL-STD-810H Torture Tested</div>
            </div>
          </div>

          <div className="bg-[#181c1f] border border-[#222b35] p-4 flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-[#56e5a9] shrink-0" />
            <div>
              <div className="font-bold text-[#e0e3e7] uppercase">ITAR COMPLIANT</div>
              <div className="text-[#94a3b8] text-[11px]">Federal Logistics Directives</div>
            </div>
          </div>

          <div className="bg-[#181c1f] border border-[#222b35] p-4 flex items-center gap-3">
            <Truck className="w-6 h-6 text-[#ffc174] shrink-0" />
            <div>
              <div className="font-bold text-[#e0e3e7] uppercase">CLASS-3 FFL ESCROW</div>
              <div className="text-[#94a3b8] text-[11px]">4,200+ Accredited Depots</div>
            </div>
          </div>

          <div className="bg-[#181c1f] border border-[#222b35] p-4 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#56e5a9] shrink-0" />
            <div>
              <div className="font-bold text-[#e0e3e7] uppercase">BALLISTIC GUARANTEE</div>
              <div className="text-[#94a3b8] text-[11px]">10-Yr Structural Integrity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tactical Matrix / Sectors Grid */}
      <section className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#222b35] mb-6">
          <div>
            <span className="font-mono text-xs text-[#ffc174] font-semibold tracking-widest uppercase">
              TACTICAL MATRIX
            </span>
            <h2 className="font-display text-2xl font-bold text-[#e0e3e7] uppercase tracking-wide mt-0.5">
              Mission Ordnance Sectors
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveCategoryFilter('ALL');
              navigate('catalog');
            }}
            className="hidden sm:flex items-center gap-1 font-mono text-xs text-[#ffc174] hover:text-[#f59e0b] uppercase transition-colors"
          >
            <span>VIEW FULL INVENTORY</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setActiveCategoryFilter(cat.id);
                navigate('catalog');
              }}
              className="group relative bg-[#181c1f] border border-[#222b35] hover:border-[#f59e0b] p-4 cursor-pointer transition-all flex flex-col justify-between overflow-hidden min-h-[260px]"
            >
              {/* Background preview image */}
              <div className="absolute inset-0 overflow-hidden opacity-20 group-hover:opacity-35 transition-opacity">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card top */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#ffc174] font-bold">{cat.code}</span>
                <span className="text-[#94a3b8]">{cat.count}</span>
              </div>

              {/* Card bottom */}
              <div className="relative z-10 space-y-1 mt-auto pt-8">
                <span className="font-mono text-[10px] text-[#56e5a9] block">{cat.specs}</span>
                <h3 className="font-display text-base font-bold text-[#e0e3e7] uppercase group-hover:text-[#ffc174] transition-colors leading-snug">
                  {cat.name}
                </h3>
                <div className="pt-2 flex items-center gap-1 text-[#94a3b8] font-mono text-[10px] uppercase group-hover:text-[#e0e3e7]">
                  <span>ACCESS HARDWARE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Spec Hardware */}
      <section className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#222b35] mb-6">
          <div>
            <span className="font-mono text-xs text-[#ffc174] font-semibold tracking-widest uppercase">
              DEPLOYED SPEC HARDWARE
            </span>
            <h2 className="font-display text-2xl font-bold text-[#e0e3e7] uppercase tracking-wide mt-0.5">
              Mission-Ready Allocations
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveCategoryFilter('ALL');
              navigate('catalog');
            }}
            className="font-mono text-xs text-[#94a3b8] hover:text-[#ffc174] uppercase transition-colors flex items-center gap-1"
          >
            <span>DISCOVER ALL (08)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingProducts.map((product) => {
            const inVault = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="bg-[#181c1f] border border-[#222b35] hover:border-[#f59e0b] transition-all flex flex-col justify-between group"
              >
                {/* Image & Badges */}
                <div className="relative bg-[#0b0f12] p-4 aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-[#222b35]">
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                    <span className="px-1.5 py-0.5 bg-[#262a2e] border border-[#374556] font-mono text-[9px] text-[#ffc174] font-semibold uppercase">
                      {product.grade}
                    </span>
                    {product.fflRequired && (
                      <span className="px-1.5 py-0.5 bg-[#f59e0b]/20 border border-[#f59e0b]/50 font-mono text-[9px] text-[#ffc174] font-semibold uppercase">
                        FFL REQ
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2 right-2 z-10 w-8 h-8 border border-[#222b35] flex items-center justify-center transition-colors ${
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
                    <span className="font-mono text-[10px] text-[#94a3b8] uppercase block">
                      SKU: {product.sku}
                    </span>
                    <h3 className="font-display text-sm font-bold text-[#e0e3e7] uppercase group-hover:text-[#ffc174] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#222b35] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#94a3b8] block">ALLOCATION</span>
                      <span className="font-mono text-sm font-bold text-[#ffc174]">
                        ${product.price.toLocaleString()} USD
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3 py-1.5 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
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
      </section>

      {/* Range Data Matrix Interactive Zeroing Solver */}
      <section className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <RangeMatrix />
      </section>

      {/* Federal Escrow & Citizen Acquisition Directive */}
      <section className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="bg-[#141a1f] border border-[#222b35] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#ffc174]" />
              <span className="font-mono text-xs text-[#ffc174] font-semibold tracking-widest uppercase">
                FEDERAL PROCUREMENT PROTOCOL
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#e0e3e7] uppercase">
              Class-3 FFL Direct Depot Escrow
            </h3>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              Regulated receiver assemblies and sound suppressors are transferred exclusively through our accredited network of 4,200+ Class-3 FFL partner dealers. Non-regulated thermal optronics, Level IV armor plates, and tactical gear ship directly to verified residential or command addresses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
            <button
              onClick={() => navigate('checkout')}
              className="px-5 py-3 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider transition-colors text-center"
            >
              LOCATE REGIONAL FFL VAULT
            </button>
            <button
              onClick={() => navigate('dossier')}
              className="px-5 py-3 bg-[#181c1f] hover:bg-[#262a2e] text-[#e0e3e7] border border-[#374556] font-mono text-xs font-semibold uppercase tracking-wider transition-colors text-center"
            >
              ITAR CLEARANCE GUIDE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
