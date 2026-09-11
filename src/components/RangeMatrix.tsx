import React, { useState, useMemo } from 'react';
import { useArmory } from '../context/ArmoryContext';
import { Compass, Wind, Target, Activity, Send, Check } from 'lucide-react';

export const RangeMatrix: React.FC = () => {
  const { triggerToast } = useArmory();

  const [caliber, setCaliber] = useState<'5.56' | '7.62'>('5.56');
  const [distance, setDistance] = useState<number>(650); // meters
  const [windSpeed, setWindSpeed] = useState<number>(12); // mph
  const [elevation, setElevation] = useState<number>(2400); // ft ASL
  const [isTransmitted, setIsTransmitted] = useState<boolean>(false);

  // Ballistics approximations
  const telemetry = useMemo(() => {
    const is556 = caliber === '5.56';
    const muzzleVel = is556 ? 2850 : 2600; // fps
    const bc = is556 ? 0.372 : 0.496; // G1 BC

    // Density altitude adjustment factor
    const daFactor = 1 - (elevation / 10000) * 0.08;

    // Drop in MILs
    const dropMil = Number(
      ((distance / 100) ** 1.75 * (is556 ? 0.72 : 0.65) * daFactor).toFixed(1)
    );
    const dropMoa = Number((dropMil * 3.438).toFixed(1));

    // Wind drift in MILs at 90 deg full value
    const windMil = Number(
      ((distance / 100) * (windSpeed / 10) * (is556 ? 0.42 : 0.34) * daFactor).toFixed(1)
    );

    // Flight time in seconds
    const flightTime = Number(((distance / (muzzleVel * 0.3048)) * 1.35).toFixed(2));

    // Terminal velocity & energy
    const retainedEnergy = Math.round(
      (is556 ? 1350 : 2580) * Math.exp(-0.0016 * distance * (1 / bc))
    );

    return {
      dropMil,
      dropMoa,
      windMil,
      flightTime,
      retainedEnergy,
    };
  }, [caliber, distance, windSpeed, elevation]);

  const handleTransmit = () => {
    setIsTransmitted(true);
    triggerToast(
      'TELEMETRY TRANSMITTED',
      `Ballistic solution [${distance}M // Drop: -${telemetry.dropMil} MIL] injected into connected optic.`,
      'success'
    );
    setTimeout(() => setIsTransmitted(false), 3000);
  };

  return (
    <div className="w-full bg-[#181c1f] border border-[#222b35] p-5 sm:p-7 relative overflow-hidden">
      {/* Decorative reticle watermark */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 border border-[#262a2e] rounded-full pointer-events-none opacity-40 flex items-center justify-center">
        <div className="w-48 h-48 border border-dashed border-[#374556] rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-[#222b35] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#ffc174]" />
              <span className="font-mono text-xs text-[#ffc174] font-semibold tracking-widest uppercase">
                RANGE DATA MATRIX // BALLISTIC ENGINE
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#e0e3e7] uppercase tracking-wide mt-1">
              Zeroing & Atmospheric Solver
            </h3>
          </div>

          {/* Caliber Pill Selector */}
          <div className="flex items-center bg-[#0b0f12] border border-[#222b35] p-1">
            <button
              onClick={() => setCaliber('5.56')}
              className={`px-3 py-1.5 font-mono text-xs font-semibold uppercase transition-colors ${
                caliber === '5.56'
                  ? 'bg-[#f59e0b] text-[#0b0f12]'
                  : 'text-[#94a3b8] hover:text-[#e0e3e7]'
              }`}
            >
              5.56 NATO // 77GR OTM
            </button>
            <button
              onClick={() => setCaliber('7.62')}
              className={`px-3 py-1.5 font-mono text-xs font-semibold uppercase transition-colors ${
                caliber === '7.62'
                  ? 'bg-[#f59e0b] text-[#0b0f12]'
                  : 'text-[#94a3b8] hover:text-[#e0e3e7]'
              }`}
            >
              7.62 NATO // 175GR BTHP
            </button>
          </div>
        </div>

        {/* Interactive Controls & Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Sliders Area (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Range Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs mb-1.5">
                <span className="text-[#94a3b8] flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#ffc174]" />
                  TARGET DISTANCE:
                </span>
                <span className="text-[#ffc174] font-bold">{distance} METERS</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                step="25"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-[#f59e0b] bg-[#0b0f12] h-2 rounded-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#94a3b8] mt-1">
                <span>100 M (CQB)</span>
                <span>600 M (ENGAGEMENT)</span>
                <span>1,200 M (TERMINAL)</span>
              </div>
            </div>

            {/* Crosswind Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs mb-1.5">
                <span className="text-[#94a3b8] flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#56e5a9]" />
                  90° CROSSWIND VELOCITY:
                </span>
                <span className="text-[#56e5a9] font-bold">{windSpeed} MPH</span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="w-full accent-[#56e5a9] bg-[#0b0f12] h-2 rounded-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#94a3b8] mt-1">
                <span>0 MPH (CALM)</span>
                <span>15 MPH (MODERATE)</span>
                <span>35 MPH (GALE)</span>
              </div>
            </div>

            {/* Atmospheric Elevation Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs mb-1.5">
                <span className="text-[#94a3b8] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#e0e3e7]" />
                  BAROMETRIC ELEVATION (ASL):
                </span>
                <span className="text-[#e0e3e7] font-bold">{elevation.toLocaleString()} FT</span>
              </div>
              <input
                type="range"
                min="0"
                max="9000"
                step="200"
                value={elevation}
                onChange={(e) => setElevation(Number(e.target.value))}
                className="w-full accent-[#94a3b8] bg-[#0b0f12] h-2 rounded-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#94a3b8] mt-1">
                <span>0 FT (SEA LEVEL)</span>
                <span>4,500 FT (PLATEAU)</span>
                <span>9,000 FT (ALPINE)</span>
              </div>
            </div>
          </div>

          {/* Telemetry Output HUD (5 cols) */}
          <div className="lg:col-span-5 bg-[#0b0f12] border border-[#222b35] p-4 flex flex-col justify-between">
            <div className="border-b border-[#222b35] pb-2 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#94a3b8] uppercase">
                CALCULATED FIRING SOLUTION
              </span>
              <span className="font-mono text-[10px] text-[#56e5a9] bg-[#56e5a9]/10 px-2 py-0.5 border border-[#56e5a9]/30">
                STATUS: SYNCED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-3">
              {/* Drop */}
              <div className="bg-[#141a1f] p-3 border border-[#222b35]">
                <span className="font-mono text-[10px] text-[#94a3b8] uppercase block">
                  ELEVATION DROP
                </span>
                <span className="font-mono text-xl font-bold text-[#ffc174] mt-0.5 block">
                  -{telemetry.dropMil} MIL
                </span>
                <span className="font-mono text-[10px] text-[#94a3b8]">
                  (-{telemetry.dropMoa} MOA)
                </span>
              </div>

              {/* Windage */}
              <div className="bg-[#141a1f] p-3 border border-[#222b35]">
                <span className="font-mono text-[10px] text-[#94a3b8] uppercase block">
                  WINDAGE HOLD
                </span>
                <span className="font-mono text-xl font-bold text-[#56e5a9] mt-0.5 block">
                  {telemetry.windMil} MIL L
                </span>
                <span className="font-mono text-[10px] text-[#94a3b8]">
                  (HOLD LEFT)
                </span>
              </div>

              {/* Time of flight */}
              <div className="bg-[#141a1f] p-3 border border-[#222b35]">
                <span className="font-mono text-[10px] text-[#94a3b8] uppercase block">
                  FLIGHT DURATION
                </span>
                <span className="font-mono text-lg font-bold text-[#e0e3e7] mt-0.5 block">
                  {telemetry.flightTime}s
                </span>
                <span className="font-mono text-[10px] text-[#94a3b8]">
                  TIME TO TARGET
                </span>
              </div>

              {/* Terminal Energy */}
              <div className="bg-[#141a1f] p-3 border border-[#222b35]">
                <span className="font-mono text-[10px] text-[#94a3b8] uppercase block">
                  TERMINAL ENERGY
                </span>
                <span className="font-mono text-lg font-bold text-[#e0e3e7] mt-0.5 block">
                  {telemetry.retainedEnergy}
                </span>
                <span className="font-mono text-[10px] text-[#94a3b8]">
                  FT-LBS DELIVERED
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleTransmit}
              disabled={isTransmitted}
              className={`w-full py-2.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                isTransmitted
                  ? 'bg-[#56e5a9]/20 border-[#56e5a9] text-[#56e5a9]'
                  : 'bg-[#f59e0b] hover:bg-[#ffc174] border-transparent text-[#0b0f12]'
              }`}
            >
              {isTransmitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>CALIBRATION TRANSMITTED // 100%</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT CALIBRATION TO OPTIC</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
