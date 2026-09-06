import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, ArrowRight, TrendingUp, AlertTriangle, 
  MapPin, Clock, CheckCircle2, ChevronRight, Zap, RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SVGNetworkGraph } from '../components/SVGNetworkGraph';

export const Overview: React.FC = () => {
  const navigate = useNavigate();
  const { cases, alerts, liveEvents, activeCaseId, setActiveCaseId, triggerSimulationStep, simState } = useApp();

  const activeCase = cases.find(c => c.case_id === activeCaseId) || cases[0];
  const totalFundsAtRisk = cases.reduce((sum, c) => sum + (c.amount || 0), 0);
  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL');

  // Session expiry countdown (30-minute session from page load)
  const [sessionExpiry, setSessionExpiry] = useState<Date>(() => {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 30);
    return expiry;
  });
  const [sessionTimeLeft, setSessionTimeLeft] = useState('30:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = sessionExpiry.getTime() - now.getTime();
      if (diff <= 0) {
        setSessionTimeLeft('00:00');
        clearInterval(interval);
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setSessionTimeLeft(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionExpiry]);

  // Stat cards data (derived from existing WebSocket/context data)
  const statCards = [
    {
      label: 'ACTIVE CHAINS',
      value: cases.filter(c => c.current_status !== 'RESOLVED').length || 23,
      color: 'text-red-500',
      borderColor: 'border-l-red-500',
    },
    {
      label: 'FLAGGED VPAs',
      value: alerts.length || 147,
      color: 'text-amber-500',
      borderColor: 'border-l-amber-500',
    },
    {
      label: 'PREDICTED ATMs',
      value: 7,
      color: 'text-amber-500',
      borderColor: 'border-l-amber-500',
    },
    {
      label: 'RESOLVED TODAY',
      value: cases.filter(c => c.current_status === 'RESOLVED').length || 12,
      color: 'text-green-500',
      borderColor: 'border-l-green-500',
    },
  ];

  // Interactive Overview Network Topology: Victim -> A -> B -> C/D -> ATM
  const overviewNodes = [
    { id: '30291488102', label: 'Victim (SBI)', type: 'VICTIM' as const, riskScore: 5, x: 80, y: 180, holder_name: 'Ramesh Chandra' },
    { id: 'MULE-A457', label: 'MULE-A457 (Canara)', type: 'MULE' as const, riskScore: 99, x: 230, y: 180, holder_name: 'Mohammad Farooq' },
    { id: 'MULE-B821', label: 'MULE-B821 (PNB)', type: 'MULE' as const, riskScore: 78, x: 390, y: 90, holder_name: 'Karan Malhotra' },
    { id: 'MULE-C912', label: 'MULE-C912 (Union)', type: 'MULE' as const, riskScore: 95, x: 390, y: 270, holder_name: 'Sunil Dutt Gowda' },
    { id: 'ATM-Z03', label: 'ATM-Z03 (Dadar West)', type: 'ATM' as const, riskScore: 95, x: 550, y: 270, holder_name: 'ATM Cluster 03' },
  ];

  const overviewEdges = [
    { id: 'e1', source: '30291488102', target: 'MULE-A457', amount: 100000, type: 'UPI', riskScore: 99 },
    { id: 'e2', source: 'MULE-A457', target: 'MULE-B821', amount: 60000, type: 'IMPS', riskScore: 78 },
    { id: 'e3', source: 'MULE-A457', target: 'MULE-C912', amount: 40000, type: 'IMPS', riskScore: 85 },
    { id: 'e4', source: 'MULE-C912', target: 'ATM-Z03', amount: 40000, type: 'ATM_WITHDRAWAL', riskScore: 95 }
  ];

  // Risk-level to left-border color mapping for alert badges
  const riskBorderColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'border-l-red-500';
      case 'HIGH': return 'border-l-orange-500';
      case 'WARNING': return 'border-l-amber-500';
      case 'INFO': return 'border-l-blue-500';
      default: return 'border-l-[#1E3A5F]';
    }
  };

  const riskTextColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-500';
      case 'HIGH': return 'text-orange-500';
      case 'WARNING': return 'text-amber-500';
      case 'INFO': return 'text-blue-400';
      default: return 'text-[#90A4AE]';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-text-primary font-sans pb-10">

      {/* ── PAGE HEADER ── */}
      <div>
        <h1 className="text-xl font-bold text-[#E8EAF6]">PRAG-DRISHTI — Command Intelligence Center</h1>
        <p className="text-xs text-[#90A4AE] tracking-wide mt-1">Real-time cybercrime prediction & mule chain intelligence</p>
      </div>

      {/* ── 1. STAT CARDS ROW ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 border-l-4 ${card.borderColor}`}
          >
            <span className="text-xs uppercase tracking-widest text-[#90A4AE] block mb-2">
              {card.label}
            </span>
            <span className={`font-mono text-3xl font-semibold ${card.color} block`}>
              {card.value}
            </span>
          </div>
        ))}
      </section>

      {/* ── 2. HERO: HEADLINE + LIVE DAG ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Headline & Pitch (4 cols) */}
        <div className="lg:col-span-4 bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#90A4AE]">
                PROACTIVE SURVEILLANCE GATEWAY
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-light tracking-tight text-text-primary leading-[1.15]">
              See where the money<br />
              <span className="font-semibold text-white">is moving next.</span>
            </h1>

            <p className="text-sm text-[#90A4AE] leading-relaxed max-w-xl">
              Prag-Drishti continuously traces suspicious fund movement, identifies abnormal account behaviour and estimates potential next movements and cash-out risk.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-5">
            <button
              onClick={triggerSimulationStep}
              className="px-4 py-2.5 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Generate Next Transaction</span>
            </button>

            <button
              onClick={() => navigate('/cases')}
              className="px-4 py-2.5 bg-[#0D1B2A] hover:bg-[#132D4A] border border-[#1E3A5F] text-[#90A4AE] hover:text-white text-xs font-medium rounded-lg transition-colors"
            >
              Explore Cases ({cases.length})
            </button>
          </div>
        </div>

        {/* Right Live Interactive Flow Graph (8 cols) — DAG animation container restyled only */}
        <div className="lg:col-span-8 bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-3 space-y-3 flex flex-col">
          <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-2 px-1">
            <span className="text-xs uppercase tracking-widest text-[#90A4AE]">Live Fund Layering Topology</span>
            <span className="font-mono text-[10px] text-[#1E88E5]">Case CF-2026-00421</span>
          </div>

          <div className="h-[250px] w-full">
            <SVGNetworkGraph
              nodes={overviewNodes}
              edges={overviewEdges}
              onSelectNode={(id) => {
                setActiveCaseId('CF-2026-00421');
                navigate('/network');
              }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-[#90A4AE] px-1">
            <span>Flow: <strong className="text-white">Victim</strong> &rarr; <strong className="text-white">A457</strong> &rarr; <strong className="text-white">B821/C912</strong> &rarr; <strong className="text-white">ATM-Z03</strong></span>
            <span className="text-[#1E88E5]">100% Traceable</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-[#1E3A5F] pt-3">
            <div className="bg-[#091522] border border-[#1E3A5F] rounded-md px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] uppercase tracking-wider text-[#90A4AE]">Exposure traced</span>
                <span className="text-[10px] font-mono text-emerald-400">100%</span>
              </div>
              <div className="h-1 rounded-full bg-[#1A2744] overflow-hidden">
                <div className="h-full w-full rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="bg-[#091522] border border-[#1E3A5F] rounded-md px-3 py-2">
              <span className="text-[9px] uppercase tracking-wider text-[#90A4AE] block mb-1">Active hops</span>
              <span className="font-mono text-sm text-white">04 <span className="text-[10px] text-[#90A4AE]">/ 05 entities</span></span>
            </div>
            <div className="bg-[#091522] border border-red-500/30 rounded-md px-3 py-2">
              <span className="text-[9px] uppercase tracking-wider text-[#90A4AE] block mb-1">Cash-out forecast</span>
              <span className="font-mono text-sm text-red-400">20-40 <span className="text-[10px] text-[#90A4AE]">min</span></span>
            </div>
          </div>
        </div>

      </section>

      {/* ── 3. OPERATIONAL TRIAGE & TELEMETRY ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Priority Intelligence Action */}
        <div className="lg:col-span-5 bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#90A4AE]">PRIORITY INTELLIGENCE</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-red-500/10 text-red-500 border border-red-500/30">
                CRITICAL RISK 91%
              </span>
            </div>

            <div>
              <span className="font-mono font-semibold text-sm text-[#1E88E5] block">Case CF-2026-00421</span>
              <span className="text-xs text-[#90A4AE]">UPI Social Engineering Fraud</span>
            </div>

            <div className="text-xs text-[#90A4AE] leading-relaxed bg-[#060D18] p-3 rounded-lg border-l-4 border-l-red-500 border border-[#1E3A5F]">
              "<strong className="text-white">₹40,000</strong> may reach a cash-out stage at <strong className="text-white">ATM Cluster 03 (Dadar West)</strong> within the next <strong className="text-white">20–40 minutes</strong>."
            </div>
          </div>

          <button
            onClick={() => {
              setActiveCaseId('CF-2026-00421');
              navigate('/cases');
            }}
            className="w-full py-2.5 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open Case Workspace</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Real-Time Telemetry Event Stream */}
        <div className="lg:col-span-7 bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-2">
            <span className="text-xs uppercase tracking-widest text-[#90A4AE] flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#1E88E5] stroke-[1.7]" />
              Real-Time Event Console
            </span>
            <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STREAMING ACTIVE
            </span>
          </div>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 text-xs font-mono">
            {liveEvents.slice(0, 6).map((evt, idx) => (
              <div
                key={idx}
                className={`p-3 bg-[#060D18] border border-[#1E3A5F] rounded-lg border-l-4 ${riskBorderColor(evt.risk_level)} space-y-1`}
              >
                <div className="flex items-center justify-between text-[9.5px]">
                  <span className={`font-medium ${riskTextColor(evt.risk_level)}`}>{evt.event_type}</span>
                  <span className="text-[#90A4AE]">{evt.timestamp}</span>
                </div>
                <p className="text-[11px] text-[#90A4AE] font-sans leading-snug">
                  {evt.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── 4. FIXED BOTTOM SECURITY BAR ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6"
        style={{
          height: '32px',
          backgroundColor: '#060D18',
          borderTop: '1px solid #1E3A5F',
          fontSize: '11px',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#90A4AE',
        }}
      >
        <span>🔒 PRAG-DRISHTI | AES-256 | JWT RBAC | Hyperledger Audit | SIH26184</span>
        <span>Session expires: {sessionTimeLeft}</span>
      </div>

    </div>
  );
};

export default Overview;
