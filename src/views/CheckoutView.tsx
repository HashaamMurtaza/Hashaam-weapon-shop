import React, { useState } from 'react';
import { useArmory } from '../context/ArmoryContext';
import { OrderRecord } from '../types';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Building2,
  FileCheck2,
  Printer,
  CheckCircle,
  AlertCircle,
  Radio,
  ArrowRight,
  Send,
  X,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartTax,
    cartTotal,
    clearCart,
    operatorCallsign,
    setOperatorCallsign,
    deliveryBase,
    setDeliveryBase,
    designatedFFL,
    setDesignatedFFL,
    dispatchOrder,
    navigate,
  } = useArmory();

  const [paymentMethod, setPaymentMethod] = useState<string>('CIPHER TOKEN');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  const fflDealers = [
    'TITAN DEFENSE DEPOT (FFL #9-88-1294) - LAS VEGAS, NV',
    'APEX TACTICAL ESCROW (FFL #4-21-9981) - DALLAS, TX',
    'SIERRA STRAT ARMORY (FFL #8-52-4011) - COLORADO SPRINGS, CO',
    'BLACKWATCH VAULT DYNAMICS (FFL #1-14-3802) - TAMPA, FL',
    'VALKYRIE PRIMARY PROVING GROUND (FFL #7-99-0012) - RENO, NV',
  ];

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('You must acknowledge legal clearance before ordnance dispatch.');
      return;
    }
    if (cart.length === 0) {
      alert('No hardware currently allocated in loadout.');
      return;
    }

    setIsAuthorizing(true);
    setTimeout(() => {
      const order = dispatchOrder({
        callsign: operatorCallsign,
        deliveryBase,
        fflDealer: designatedFFL,
        paymentMethod,
      });
      setIsAuthorizing(false);
      setCompletedOrder(order);
    }, 1400);
  };

  const handlePrintWaybill = () => {
    window.print();
  };

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 border border-[#222b35] bg-[#141a1f] mx-auto flex items-center justify-center text-[#ffc174]">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-[#e0e3e7] uppercase">
          NO ORDNANCE ALLOCATED FOR DISPATCH
        </h2>
        <p className="text-xs text-[#94a3b8] max-w-md mx-auto">
          Your active session manifest is empty. Allocate weapons platforms, thermal sights, or ballistic plate carriers from the catalog first.
        </p>
        <button
          onClick={() => navigate('catalog')}
          className="px-6 py-3 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
        >
          EXPLORE ORDNANCE CATALOG
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[88rem] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#141a1f] border border-[#222b35] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#56e5a9] animate-pulse"></span>
            <span className="font-mono text-xs text-[#56e5a9] tracking-widest uppercase">
              LOGISTICAL ESCROW PROTOCOL // LEVEL 4
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#e0e3e7] uppercase tracking-wide mt-1">
            Tactical Clearance & Ordnance Dispatch
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-[#94a3b8]">
          <div className="bg-[#0b0f12] px-3 py-1.5 border border-[#222b35] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#ffc174]" />
            <span>SHA-256 CIPHER SECURED</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Fast Payment, Operator Clearance & Delivery Coordinates (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tactical Express Payment Protocols */}
          <div className="bg-[#181c1f] border border-[#222b35] p-5 space-y-3">
            <span className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider block">
              // TACTICAL ACCELERATED PROTOCOLS
            </span>
            <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('CIPHER TOKEN')}
                className={`py-3 px-2 border text-center transition-all ${
                  paymentMethod === 'CIPHER TOKEN'
                    ? 'bg-[#262a2e] border-[#f59e0b] text-[#ffc174] font-bold shadow-md'
                    : 'bg-[#0b0f12] border-[#222b35] text-[#94a3b8] hover:text-[#e0e3e7]'
                }`}
              >
                <div className="text-[11px]">CIPHER TOKEN</div>
                <div className="text-[9px] text-[#56e5a9] mt-0.5">INSTANT (0-FEE)</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('FLEET CARD')}
                className={`py-3 px-2 border text-center transition-all ${
                  paymentMethod === 'FLEET CARD'
                    ? 'bg-[#262a2e] border-[#f59e0b] text-[#ffc174] font-bold shadow-md'
                    : 'bg-[#0b0f12] border-[#222b35] text-[#94a3b8] hover:text-[#e0e3e7]'
                }`}
              >
                <div className="text-[11px]">FLEET CARD</div>
                <div className="text-[9px] text-[#94a3b8] mt-0.5">MIL / GOV NET-30</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('USDC VAULT')}
                className={`py-3 px-2 border text-center transition-all ${
                  paymentMethod === 'USDC VAULT'
                    ? 'bg-[#262a2e] border-[#f59e0b] text-[#ffc174] font-bold shadow-md'
                    : 'bg-[#0b0f12] border-[#222b35] text-[#94a3b8] hover:text-[#e0e3e7]'
                }`}
              >
                <div className="text-[11px]">USDC VAULT</div>
                <div className="text-[9px] text-[#94a3b8] mt-0.5">ON-CHAIN ESCROW</div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthorize} className="bg-[#181c1f] border border-[#222b35] p-5 sm:p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-[#e0e3e7] uppercase pb-2 border-b border-[#222b35]">
              Logistical Clearance Coordinates
            </h2>

            {/* Operator Call-Sign */}
            <div>
              <label className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider block mb-1.5">
                OPERATOR CALL-SIGN / LEGAL IDENTITY *
              </label>
              <input
                type="text"
                required
                value={operatorCallsign}
                onChange={(e) => setOperatorCallsign(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0f12] border border-[#222b35] focus:border-[#f59e0b] text-xs font-mono text-[#e0e3e7] uppercase outline-none"
                placeholder="E.G. GHOST-LEADER // K. REEVES"
              />
            </div>

            {/* Secure Physical Base Coordinates */}
            <div>
              <label className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider block mb-1.5">
                PHYSICAL DELIVERY BASE / STREET COORDINATES *
              </label>
              <input
                type="text"
                required
                value={deliveryBase}
                onChange={(e) => setDeliveryBase(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0f12] border border-[#222b35] focus:border-[#f59e0b] text-xs font-mono text-[#e0e3e7] uppercase outline-none"
                placeholder="E.G. SECTOR 04 - HANGAR 12B, NEVADA RANGE 51"
              />
              <span className="font-mono text-[10px] text-[#94a3b8] mt-1 block">
                Non-regulated accessories, optics, and armor ship directly to this address.
              </span>
            </div>

            {/* Designated FFL Vault Selector */}
            <div>
              <label className="font-mono text-xs text-[#ffc174] uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                <span>DESIGNATED CLASS-3 FFL DEALER DEPOT (FOR REGULATED ARTICLES) *</span>
                <span className="text-[#56e5a9] text-[10px]">VERIFIED CITADEL</span>
              </label>
              <select
                value={designatedFFL}
                onChange={(e) => setDesignatedFFL(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0f12] border border-[#222b35] focus:border-[#f59e0b] text-xs font-mono text-[#e0e3e7] uppercase outline-none cursor-pointer"
              >
                {fflDealers.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <span className="font-mono text-[10px] text-[#94a3b8] mt-1 block">
                Firearms and sound suppressors will be transferred via Form 4473 through this designated partner facility.
              </span>
            </div>

            {/* Terms Agreement */}
            <div className="p-3 bg-[#0b0f12] border border-[#222b35] space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="accent-[#f59e0b] w-4 h-4 mt-0.5 cursor-pointer"
                />
                <span className="font-mono text-xs text-[#e0e3e7] leading-relaxed">
                  I certify under penalty of perjury that I am authorized to acquire these defense articles, meet all local/state/federal age and background qualifications, and agree to ITAR non-export covenants.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAuthorizing}
              className="w-full py-4 bg-[#f59e0b] hover:bg-[#ffc174] disabled:opacity-50 text-[#0b0f12] font-mono text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl"
            >
              {isAuthorizing ? (
                <>
                  <Radio className="w-4 h-4 animate-spin" />
                  <span>COMMENCING ENCRYPTED CLEARANCE PROTOCOL...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>AUTHORIZE & DISPATCH LOADOUT (${cartTotal.toLocaleString()} USD)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Tactical Armory Manifest & Financial Audit Ledger (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#181c1f] border border-[#222b35] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#222b35]">
              <h2 className="font-display text-base font-bold text-[#e0e3e7] uppercase">
                LOADOUT MANIFEST ({cart.length})
              </h2>
              <button
                onClick={() => navigate('catalog')}
                className="font-mono text-xs text-[#ffc174] hover:underline"
              >
                + ADD UNITS
              </button>
            </div>

            {/* List of items */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0b0f12] border border-[#222b35] p-3 flex gap-3 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain border border-[#222b35] p-1 bg-[#141a1f] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xs font-bold text-[#e0e3e7] uppercase truncate">
                      {item.name}
                    </h3>
                    <div className="font-mono text-[10px] text-[#94a3b8] truncate">
                      QTY: {item.quantity} × ${item.price.toLocaleString()}
                    </div>
                    {item.mount && (
                      <div className="font-mono text-[9px] text-[#ffc174] truncate">
                        {item.mount} {item.color ? `// ${item.color}` : ''}
                      </div>
                    )}
                  </div>
                  <div className="font-mono text-xs font-bold text-[#e0e3e7] shrink-0">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Ledger */}
            <div className="space-y-2 pt-3 border-t border-[#222b35] font-mono text-xs text-[#94a3b8]">
              <div className="flex justify-between">
                <span>BASE ORDNANCE SUBTOTAL:</span>
                <span className="text-[#e0e3e7]">${cartSubtotal.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span>HAZMAT & BALLISTIC FREIGHT:</span>
                <span className="text-[#56e5a9] font-bold">$0.00 (MIL-SPEC FREE)</span>
              </div>
              <div className="flex justify-between">
                <span>DOD JURISDICTION TAX (6.25%):</span>
                <span className="text-[#e0e3e7]">${cartTax.toLocaleString()} USD</span>
              </div>
              <div className="pt-2 border-t border-[#222b35] flex justify-between text-base font-bold">
                <span className="text-[#e0e3e7]">GROSS PAYABLE:</span>
                <span className="text-[#ffc174]">${cartTotal.toLocaleString()} USD</span>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="bg-[#141a1f] border border-[#222b35] p-4 space-y-2 font-mono text-xs text-[#94a3b8]">
            <div className="flex items-center gap-2 text-[#56e5a9]">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>FFL ESCROW GUARANTEED UNDER 18 U.S.C. 922</span>
            </div>
            <div className="flex items-center gap-2 text-[#ffc174]">
              <Truck className="w-4 h-4 shrink-0" />
              <span>CONUS ARMORED FREIGHT TRACKING DISPATCHED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatched Requisition Modal */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#101417] border border-[#f59e0b] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => {
                setCompletedOrder(null);
                navigate('dossier');
              }}
              className="absolute top-4 right-4 w-8 h-8 border border-[#222b35] bg-[#141a1f] text-[#94a3b8] hover:text-[#e0e3e7] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#222b35] pb-4">
              <div className="w-12 h-12 bg-[#56e5a9]/20 border border-[#56e5a9] flex items-center justify-center text-[#56e5a9]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-xs text-[#56e5a9] font-bold uppercase">
                  CLEARANCE AUTHORIZED // ORDNANCE COMMITTED
                </div>
                <h2 className="font-display text-2xl font-bold text-[#e0e3e7] uppercase tracking-wide">
                  REQUISITION TICKET: {completedOrder.id}
                </h2>
              </div>
            </div>

            {/* Waybill Details */}
            <div className="bg-[#0b0f12] border border-[#222b35] p-4 font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-[#222b35] pb-1.5">
                <span className="text-[#94a3b8]">ZULU DISPATCH TIME:</span>
                <span className="text-[#e0e3e7] font-bold">{completedOrder.zuluTime}</span>
              </div>
              <div className="flex justify-between border-b border-[#222b35] pb-1.5">
                <span className="text-[#94a3b8]">OPERATOR CALLSIGN:</span>
                <span className="text-[#ffc174] font-bold">{completedOrder.callsign}</span>
              </div>
              <div className="flex justify-between border-b border-[#222b35] pb-1.5">
                <span className="text-[#94a3b8]">FFL ESCROW DEPOT:</span>
                <span className="text-[#e0e3e7] text-right font-bold max-w-xs">{completedOrder.fflDealer}</span>
              </div>
              <div className="flex justify-between border-b border-[#222b35] pb-1.5">
                <span className="text-[#94a3b8]">DIRECT BASE COORDINATES:</span>
                <span className="text-[#e0e3e7] text-right max-w-xs">{completedOrder.deliveryBase}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span className="text-[#e0e3e7]">GROSS SETTLED:</span>
                <span className="text-[#56e5a9]">${completedOrder.total.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Dispatched Hardware Items */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#94a3b8] uppercase">
                DISPATCHED HARDWARE UNITS ({completedOrder.items.length})
              </span>
              <div className="space-y-1.5">
                {completedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between font-mono text-xs bg-[#181c1f] p-2 border border-[#222b35]">
                    <span className="text-[#e0e3e7]">{item.quantity}x {item.name}</span>
                    <span className="text-[#ffc174]">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handlePrintWaybill}
                className="flex-1 py-3 bg-[#181c1f] hover:bg-[#262a2e] text-[#e0e3e7] border border-[#374556] font-mono text-xs font-semibold uppercase flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-[#ffc174]" />
                <span>PRINT ENCRYPTED WAYBILL</span>
              </button>
              <button
                onClick={() => {
                  setCompletedOrder(null);
                  navigate('dossier');
                }}
                className="flex-1 py-3 bg-[#f59e0b] hover:bg-[#ffc174] text-[#0b0f12] font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>OPEN OPERATOR DOSSIER</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
