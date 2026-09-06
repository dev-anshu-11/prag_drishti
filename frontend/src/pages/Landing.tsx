import React from 'react';
import { ArrowRight, Activity, Cpu, Zap, MapPin, AlertTriangle, ChevronRight, Shield, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Terminal log lines for the scrolling animation
const TERMINAL_LINES = [
  { time: '22:41:07', tag: 'ALERT', text: 'VPA raj***@okaxis → Score: 0.94', color: '#EF5350' },
  { time: '22:41:09', tag: 'CHAIN', text: '7 mule accounts linked', color: '#FFA726' },
  { time: '22:41:11', tag: 'PREDICT', text: 'ATM Kanpur — ETA 23:14 ±8min', color: '#42A5F5' },
  { time: '22:41:14', tag: 'FREEZE', text: 'NPCI request sent → Account frozen', color: '#66BB6A' },
  { time: '22:41:16', tag: 'ARREST', text: 'Fraudster apprehended — Case closed', color: '#43A047' },
  { time: '22:41:19', tag: 'SCAN', text: 'NEFT sweep: 34 accounts flagged', color: '#FFA726' },
  { time: '22:41:22', tag: 'ML', text: 'Isolation Forest anomaly Δ=0.89', color: '#42A5F5' },
  { time: '22:41:25', tag: 'GEO', text: 'ATM cluster Dadar West — 3 hits', color: '#EF5350' },
  { time: '22:41:28', tag: 'CHAIN', text: 'Layer 3 dispersal detected', color: '#FFA726' },
  { time: '22:41:31', tag: 'FREEZE', text: 'Account MULE-C912 frozen', color: '#66BB6A' },
];

export const Landing: React.FC = () => {
  const { setEnteredSimulation, setActiveCaseId } = useApp();

  const handleEnter = (caseId?: string) => {
    if (caseId) setActiveCaseId(caseId);
    setEnteredSimulation(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#E8EAF6] relative overflow-hidden selection:bg-[#1E88E5]/20 selection:text-[#1E88E5] font-sans">

      {/* ── STICKY HEADER (48px) ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10 border-b border-[#1E3A5F]"
        style={{ height: '48px', backgroundColor: '#0A0F1E' }}
      >
        {/* Left: PRAG-DRISHTI logo + branding */}
        <div className="flex items-center gap-3">
          {/* Eye + Forward Arrow SVG Logo */}
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 shrink-0">
            <path d="M4 20 C10 8, 30 8, 36 20 C30 32, 10 32, 4 20Z" stroke="#1E88E5" strokeWidth="2" fill="none"/>
            <circle cx="20" cy="20" r="6" fill="#1E88E5" opacity="0.2" stroke="#1E88E5" strokeWidth="1.5"/>
            <circle cx="20" cy="20" r="2.5" fill="#1E88E5"/>
            <path d="M17 20 L23 20 M21 18 L23 20 L21 22" stroke="#E8EAF6" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-[#E8EAF6]" style={{ fontFamily: "'Inter', sans-serif" }}>PRAG-DRISHTI</span>
            <span className="text-[10px] text-[#1E88E5] tracking-widest font-mono">प्राग्दृष्टि</span>
          </div>
        </div>

        {/* Right: Enter Workstation button */}
        <button
          onClick={() => handleEnter()}
          className="border border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
        >
          <span>Enter Workstation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* ── HERO SECTION (full viewport height) ── */}
      <main className="relative min-h-[calc(100vh-48px)] flex items-center">

        {/* Subtle ambient glow */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#1E88E5]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-16">

          {/* LEFT CONTENT (7 cols) */}
          <div className="lg:col-span-7 space-y-8">

            {/* Top label */}
            <span className="text-xs uppercase tracking-[0.3em] text-[#1E88E5] font-mono">
              SMART INDIA HACKATHON 2026 — SIH26184
            </span>

            {/* Main heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Verdana', sans-serif" }}
            >
              <span className="text-[#E8EAF6]">SEE TOMORROW'S FRAUD</span>
              <br />
              <span className="text-[#1E88E5]">TODAY.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-[#90A4AE] max-w-xl leading-relaxed">
              PRAG-DRISHTI predicts where fraud money will be withdrawn — 30 minutes before it happens.<br />
              <span className="text-[#E8EAF6] font-medium">Proactive. Explainable. Court-admissible.</span>
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => handleEnter('CF-2026-00421')}
                className="bg-[#1E88E5] hover:bg-[#1565C0] text-white rounded-md px-8 py-3 text-base font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <span>Enter Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Metric Chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded px-4 py-2 text-xs font-mono text-[#90A4AE]">
                <span className="text-[#1E88E5] font-bold">99.4%</span> Anomaly Precision
              </div>
              <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded px-4 py-2 text-xs font-mono text-[#90A4AE]">
                <span className="text-[#1E88E5] font-bold">30 Min</span> Advance Warning
              </div>
              <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded px-4 py-2 text-xs font-mono text-[#90A4AE]">
                <span className="text-[#1E88E5] font-bold">₹0</span> Licensing Cost
              </div>
              <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded px-4 py-2 text-xs font-mono text-[#90A4AE]">
                <span className="text-[#1E88E5] font-bold">81%</span> Cash-Out Confidence
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Terminal box (5 cols, absolutely positioned feel) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg overflow-hidden relative terminal-scanline">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1E3A5F]">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] font-mono text-[#90A4AE] ml-2 uppercase tracking-widest">
                  prag-drishti — live intercept feed
                </span>
              </div>

              {/* Terminal body with CSS-only scrolling animation */}
              <div className="h-[280px] overflow-hidden relative px-4 py-3">
                <div className="terminal-scroll-animation">
                  {/* Duplicate the lines for seamless loop */}
                  {[...TERMINAL_LINES, ...TERMINAL_LINES].map((line, idx) => (
                    <div key={idx} className="py-1.5 flex items-start gap-2 font-mono text-xs">
                      <span className="text-[#546E7A] shrink-0">{line.time}</span>
                      <span
                        className="shrink-0 font-semibold"
                        style={{ color: line.color, minWidth: '64px' }}
                      >
                        [{line.tag}]
                      </span>
                      <span className="text-[#43A047]">{line.text}</span>
                    </div>
                  ))}
                </div>

                {/* Fade edges */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0D1B2A] to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0D1B2A] to-transparent pointer-events-none z-10" />
              </div>
            </div>

            {/* Decorative glow behind terminal */}
            <div className="absolute -inset-4 bg-[#1E88E5]/3 rounded-2xl blur-2xl pointer-events-none -z-10" />
          </div>

        </div>
      </main>

      {/* ── CAPABILITIES GRID (3 columns) ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#1E88E5] font-mono">
            CORE CAPABILITIES
          </span>
          <h2 className="text-2xl font-bold text-[#E8EAF6] mt-2 tracking-tight" style={{ fontFamily: "'Verdana', sans-serif" }}>
            Intelligence Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 space-y-3">
            <Activity className="w-5 h-5 text-[#1E88E5] stroke-[1.7]" />
            <h3 className="text-sm font-semibold text-[#E8EAF6]">Multi-Bank Flow Reconstruction</h3>
            <p className="text-xs text-[#90A4AE] leading-relaxed">
              Directed Acyclic Graph (DAG) generation tracing IMPS, UPI, and RTGS transit paths across banking nodes in real-time.
            </p>
          </div>

          <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 space-y-3">
            <Cpu className="w-5 h-5 text-[#1E88E5] stroke-[1.7]" />
            <h3 className="text-sm font-semibold text-[#E8EAF6]">Explainable Mule Risk AI</h3>
            <p className="text-xs text-[#90A4AE] leading-relaxed">
              No black-box models. Transparent mathematical point weights: velocity (+24), multiple senders (+19), and splitting (+14).
            </p>
          </div>

          <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 space-y-3">
            <Zap className="w-5 h-5 text-[#1E88E5] stroke-[1.7]" />
            <h3 className="text-sm font-semibold text-[#E8EAF6]">Destination Forecasting</h3>
            <p className="text-xs text-[#90A4AE] leading-relaxed">
              Markov transition models and sequential heuristics calculate probability-ranked next accounts before fund dissipation.
            </p>
          </div>

          <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 space-y-3">
            <MapPin className="w-5 h-5 text-[#1E88E5] stroke-[1.7]" />
            <h3 className="text-sm font-semibold text-[#E8EAF6]">Geospatial Interception</h3>
            <p className="text-xs text-[#90A4AE] leading-relaxed">
              Dark Leaflet mapping pinpoints high-risk ATM clusters and coordinates patrol alerts to block cash extraction.
            </p>
          </div>

          <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 space-y-3">
            <Shield className="w-5 h-5 text-[#1E88E5] stroke-[1.7]" />
            <h3 className="text-sm font-semibold text-[#E8EAF6]">Blockchain Evidence Chain</h3>
            <p className="text-xs text-[#90A4AE] leading-relaxed">
              Hyperledger-anchored audit trail with SHA-256 IPFS signatures. Court-admissible under Section 65B IT Act.
            </p>
          </div>

          <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-5 space-y-3">
            <Lock className="w-5 h-5 text-[#1E88E5] stroke-[1.7]" />
            <h3 className="text-sm font-semibold text-[#E8EAF6]">Smart Contract Freeze</h3>
            <p className="text-xs text-[#90A4AE] leading-relaxed">
              Multi-signature consensus locks execute on flagged mule accounts within seconds via NPCI freeze pipeline.
            </p>
          </div>

        </div>

        {/* Disclaimer / Simulation Notice */}
        <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-[#90A4AE]">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              <strong className="text-[#E8EAF6]">SIMULATION NOTICE:</strong> Synthetic banking trails built for Smart India Hackathon evaluation.
            </span>
          </div>
          <button
            onClick={() => handleEnter()}
            className="text-[#1E88E5] hover:text-white font-medium text-xs shrink-0 transition-colors"
          >
            Enter Workstation &rarr;
          </button>
        </div>
      </section>

      {/* ── SANSKRIT MEANING CARD ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-10">
        <div className="bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg p-6 text-center space-y-3">
          <span className="text-2xl font-bold text-[#1E88E5]" style={{ fontFamily: 'serif' }}>
            प्राग्दृष्टि
          </span>
          <div className="flex items-center justify-center gap-3 text-sm text-[#90A4AE]">
            <span>प्राग् = Forward / Before</span>
            <span className="text-[#1E3A5F]">|</span>
            <span>दृष्टि = Vision / Sight</span>
            <span className="text-[#1E3A5F]">|</span>
            <span>Together = Proactive Intelligence</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1E3A5F] py-6 text-center text-xs font-mono text-[#90A4AE]">
        <p>PRAG-DRISHTI &copy; 2026. Proactive Financial Cybercrime Intelligence Platform &middot; SIH26184</p>
      </footer>

    </div>
  );
};

export default Landing;
