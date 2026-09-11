import React from 'react';
import { useArmory } from '../context/ArmoryContext';
import { Shield, Lock, FileText, Globe, AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, setActiveCategoryFilter } = useArmory();

  return (
    <footer className="w-full bg-[#0b0f12] border-t border-[#222b35] text-[#94a3b8] pt-12 pb-24 md:pb-12 text-xs">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        {/* Compliance Notice Banner */}
        <div className="bg-[#141a1f] border border-[#ffc174]/20 p-4 mb-10 flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="w-9 h-9 bg-[#ffc174]/10 border border-[#ffc174]/30 flex items-center justify-center text-[#ffc174] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 text-[11px] leading-relaxed">
            <span className="font-mono text-[#ffc174] font-semibold uppercase mr-1">
              ITAR & ATF EXPORT COMPLIANCE NOTICE:
            </span>
            Certain defense articles, precision thermal recon optics, and tactical hardware shown are subject to the International Traffic in Arms Regulations (ITAR, 22 CFR Parts 120-130) and Export Administration Regulations (EAR, 15 CFR Parts 730-774). FFL registration is strictly validated for regulated receiver assemblies.
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#181c1f] border border-[#374556] flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#ffc174]" />
              </div>
              <span className="font-display font-bold text-base text-[#e0e3e7] uppercase tracking-wider">
                VALKYRIE // ARMS
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Precision military-grade weapon platforms, thermal optronics, and Level IV ballistic defense solutions engineered for professional operators.
            </p>
            <div className="font-mono text-[11px] text-[#ffc174] space-y-1">
              <div>CAGE CODE: <span className="text-[#e0e3e7]">9XK84</span></div>
              <div>DUNS NUMBER: <span className="text-[#e0e3e7]">08-119-4822</span></div>
              <div>DEFCON STATUS: <span className="text-[#56e5a9]">DEFCON 4 // NOMINAL</span></div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-[#e0e3e7] uppercase tracking-wider mb-3 pb-1 border-b border-[#222b35]">
              // ORDNANCE SECTORS
            </h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>
                <button
                  onClick={() => {
                    setActiveCategoryFilter('OPTICS');
                    navigate('catalog');
                  }}
                  className="hover:text-[#ffc174] transition-colors"
                >
                  Optics & Thermal Recon [APX-900]
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategoryFilter('FIREARMS');
                    navigate('catalog');
                  }}
                  className="hover:text-[#ffc174] transition-colors"
                >
                  Direct Impingement Carbines [VK-714]
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategoryFilter('ARMOR');
                    navigate('catalog');
                  }}
                  className="hover:text-[#ffc174] transition-colors"
                >
                  Level IV Ceramic Plate Carriers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategoryFilter('NVG');
                    navigate('catalog');
                  }}
                  className="hover:text-[#ffc174] transition-colors"
                >
                  Gen 3+ Articulating Night Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategoryFilter('EDC');
                    navigate('catalog');
                  }}
                  className="hover:text-[#ffc174] transition-colors"
                >
                  MagnaCut Tactical Fixed Blades
                </button>
              </li>
            </ul>
          </div>

          {/* Directives */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-[#e0e3e7] uppercase tracking-wider mb-3 pb-1 border-b border-[#222b35]">
              // LOGISTICAL CLEARANCE
            </h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li className="flex items-center gap-1.5 hover:text-[#ffc174] cursor-pointer" onClick={() => navigate('checkout')}>
                <Lock className="w-3 h-3 text-[#ffc174]" />
                <span>Class-3 FFL Vault Routing</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-[#ffc174] cursor-pointer" onClick={() => navigate('dossier')}>
                <FileText className="w-3 h-3 text-[#ffc174]" />
                <span>End-User ITAR Certification</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-[#ffc174] cursor-pointer" onClick={() => navigate('dossier')}>
                <Globe className="w-3 h-3 text-[#ffc174]" />
                <span>CONUS Armored Freight Transit</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-[#ffc174] cursor-pointer" onClick={() => navigate('dossier')}>
                <Shield className="w-3 h-3 text-[#56e5a9]" />
                <span>10-Year Ballistic Integrity Warranty</span>
              </li>
            </ul>
          </div>

          {/* Armory Vault Access */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-[#e0e3e7] uppercase tracking-wider mb-3 pb-1 border-b border-[#222b35]">
              // OPERATOR DISPATCH
            </h4>
            <p className="text-xs text-[#94a3b8] mb-3">
              Need immediate unit allocation or municipal fleet procurement? Contact our secure dispatch desk.
            </p>
            <div className="bg-[#181c1f] p-3 border border-[#222b35] font-mono text-[11px] space-y-1">
              <div>FREQ: <span className="text-[#ffc174]">SEC-NET 144.825 MHz</span></div>
              <div>SIP: <span className="text-[#e0e3e7]">dispatch@valkyriearms.mil</span></div>
              <div>BASE: <span className="text-[#e0e3e7]">Reno Defense Complex, NV</span></div>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="pt-6 border-t border-[#222b35] flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#94a3b8]">
          <div>
            © {new Date().getFullYear()} VALKYRIE ARMS CORP. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#e0e3e7] cursor-pointer" onClick={() => navigate('dossier')}>SECURITY MANIFEST</span>
            <span>//</span>
            <span className="hover:text-[#e0e3e7] cursor-pointer" onClick={() => navigate('dossier')}>ATF FORM 4473 REGS</span>
            <span>//</span>
            <span className="text-[#56e5a9]">ENCRYPTED WITH SHA-256</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
