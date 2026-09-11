import React, { useEffect } from 'react';
import { useArmory } from '../context/ArmoryContext';
import { ShieldCheck, AlertTriangle, Info } from 'lucide-react';

export const ToastHUD: React.FC = () => {
  const { toast, triggerToast } = useArmory();

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => {
        // Reset toast
        triggerToast('', '', 'info');
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toast.open, triggerToast]);

  if (!toast.open || !toast.title) return null;

  return (
    <aside
      aria-label="Tactical Notification HUD"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-top-4"
    >
      <div className="bg-[#1c2023]/95 backdrop-blur-xl border border-[#f59e0b]/40 p-3 shadow-2xl flex items-center gap-3">
        <div className="w-9 h-9 bg-[#f59e0b]/20 border border-[#f59e0b]/50 flex items-center justify-center text-[#ffc174] shrink-0">
          {toast.type === 'warn' ? (
            <AlertTriangle className="w-5 h-5 text-[#ffb4ab]" />
          ) : toast.type === 'success' ? (
            <ShieldCheck className="w-5 h-5 text-[#56e5a9]" />
          ) : (
            <Info className="w-5 h-5 text-[#ffc174]" />
          )}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-[#ffc174] font-semibold tracking-widest uppercase">
              {toast.title}
            </span>
            <span className="font-mono text-[10px] text-[#56e5a9] tracking-wider">
              ACK // RECEIVED
            </span>
          </div>
          <span className="text-[13px] text-[#e0e3e7] truncate mt-0.5">
            {toast.message}
          </span>
        </div>
      </div>
    </aside>
  );
};
