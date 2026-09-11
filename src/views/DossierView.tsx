import React, { useState } from 'react';
import { useArmory } from '../context/ArmoryContext';
import {
  User,
  ShieldCheck,
  FileText,
  Clock,
  Printer,
  Truck,
  Check,
  Building2,
  Trash2,
} from 'lucide-react';

export const DossierView: React.FC = () => {
  const {
    operatorCallsign,
    setOperatorCallsign,
    deliveryBase,
    setDeliveryBase,
    designatedFFL,
    setDesignatedFFL,
    orders,
    triggerToast,
    navigate,
  } = useArmory();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempCallsign, setTempCallsign] = useState<string>(operatorCallsign);
  const [tempBase, setTempBase] = useState<string>(deliveryBase);
  const [selectedOrderWaybill, setSelectedOrderWaybill] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setOperatorCallsign(tempCallsign);
    setDeliveryBase(tempBase);
    setIsEditing(false);
    triggerToast('DOSSIER SYNCHRONIZED', 'Operator identity and coordinates updated.', 'success');
  };

  return (
    <div className="max-w-[88rem] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#141a1f] border border-[#222b35] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#ffc174]" />
            <span className="font-mono text-xs text-[#ffc174] font-semibold tracking-widest uppercase">
              OPERATOR DOSSIER // REQUISITION LOGS
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#e0e3e7] uppercase tracking-wide mt-1">
            Command Center & Dispatched Waybills
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-[#0b0f12] px-3 py-1.5 border border-[#222b35] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#56e5a9] animate-pulse"></span>
            <span className="text-[#56e5a9] font-bold">STATUS: CLEARANCE TIER-1</span>
          </div>
        </div>
      </div>

      {/* Operator Profile Clearance Card */}
      <div className="bg-[#181c1f] border border-[#222b35] p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#222b35] mb-5">
          <h2 className="font-display text-base font-bold text-[#e0e3e7] uppercase flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#56e5a9]" />
            <span>OPERATOR CREDENTIALS & PHYSICAL BASE</span>
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="font-mono text-xs text-[#ffc174] hover:underline"
            >
              [ MODIFY CREDENTIALS ]
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="font-mono text-xs text-[#94a3b8] hover:text-[#e0e3e7]"
            >
              [ CANCEL ]
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="bg-[#0b0f12] p-4 border border-[#222b35]">
              <span className="text-[#94a3b8] text-[10px] uppercase block mb-1">
                OPERATOR CALL-SIGN
              </span>
              <span className="text-[#ffc174] font-bold text-sm block">
                {operatorCallsign}
              </span>
            </div>

            <div className="bg-[#0b0f12] p-4 border border-[#222b35]">
              <span className="text-[#94a3b8] text-[10px] uppercase block mb-1">
                SECURE BASE COORDINATES
              </span>
              <span className="text-[#e0e3e7] font-bold text-xs block leading-relaxed">
                {deliveryBase}
              </span>
            </div>

            <div className="bg-[#0b0f12] p-4 border border-[#222b35]">
              <span className="text-[#94a3b8] text-[10px] uppercase block mb-1">
                DEFAULT CLASS-3 FFL DEPOT
              </span>
              <span className="text-[#56e5a9] font-bold text-xs block leading-relaxed">
                {designatedFFL}
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
            <div>
              <label className="font-mono text-xs text-[#94a3b8] uppercase block mb-1">
                OPERATOR CALL-SIGN:
              </label>
              <input
                type="text"
                value={tempCallsign}
                onChange={(e) => setTempCallsign(e.target.value)}
                className="w-full px-3 py-2 bg-[#0b0f12] border border-[#222b35] text-xs font-mono text-[#e0e3e7] uppercase focus:border-[#f59e0b] outline-none"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-[#94a3b8] uppercase block mb-1">
                SECURE DELIVERY BASE:
              </label>
              <input
                type="text"
                value={tempBase}
                onChange={(e) => setTempBase(e.target.value)}
                className="w-full px-3 py-2 bg-[#0b0f12] border border-[#222b35] text-xs font-mono text-[#e0e3e7] uppercase focus:border-[#f59e0b] outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#f59e0b] text-[#0b0f12] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#ffc174] transition-colors"
            >
              SAVE CREDENTIALS
            </button>
          </form>
        )}
      </div>

      {/* Dispatched Requisition History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#222b35]">
          <h2 className="font-display text-xl font-bold text-[#e0e3e7] uppercase tracking-wide">
            Historic Dispatches & Escrow Manifests ({orders.length})
          </h2>
          <span className="font-mono text-xs text-[#94a3b8]">
            PERSISTED IN LOCAL SECURE STORAGE
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[#181c1f] border border-[#222b35] p-12 text-center space-y-3">
            <FileText className="w-8 h-8 text-[#94a3b8] mx-auto" />
            <h3 className="font-display text-base font-bold text-[#e0e3e7] uppercase">
              NO DISPATCHED REQUISITIONS RECORDED
            </h3>
            <p className="text-xs text-[#94a3b8]">
              Completed orders and encrypted waybills will be permanently logged here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#181c1f] border border-[#222b35] p-5 space-y-4 group hover:border-[#374556] transition-colors"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#222b35]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-[#ffc174]">
                      {order.id}
                    </span>
                    <span className="px-2 py-0.5 bg-[#56e5a9]/10 text-[#56e5a9] border border-[#56e5a9]/30 font-mono text-[10px] font-bold">
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs text-[#94a3b8]">
                    <span>CHRONO: {order.zuluTime}</span>
                    <button
                      onClick={() => window.print()}
                      className="text-[#ffc174] hover:underline flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>PRINT WAYBILL</span>
                    </button>
                  </div>
                </div>

                {/* Logistics Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px] text-[#94a3b8] bg-[#0b0f12] p-3 border border-[#222b35]">
                  <div>
                    <span className="text-[#475569] block">OPERATOR:</span>
                    <span className="text-[#e0e3e7]">{order.callsign}</span>
                  </div>
                  <div>
                    <span className="text-[#475569] block">DELIVERY BASE:</span>
                    <span className="text-[#e0e3e7] truncate block">{order.deliveryBase}</span>
                  </div>
                  <div>
                    <span className="text-[#475569] block">PAYMENT SETTLEMENT:</span>
                    <span className="text-[#56e5a9]">{order.paymentMethod}</span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#94a3b8] uppercase">
                    DISPATCHED UNITS ({order.items.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-[#141a1f] border border-[#222b35] font-mono text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 object-contain bg-[#0b0f12] border border-[#222b35] p-0.5"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[#e0e3e7] truncate text-[11px]">
                            {item.quantity}x {item.name}
                          </span>
                        </div>
                        <span className="text-[#ffc174] font-bold shrink-0 ml-2">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-2 border-t border-[#222b35] font-mono text-xs">
                  <span className="text-[#94a3b8]">SETTLED GROSS PAYABLE:</span>
                  <span className="text-base font-bold text-[#ffc174]">
                    ${order.total.toLocaleString()} USD
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
