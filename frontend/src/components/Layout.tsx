import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, AlertTriangle, Network, Map, FolderOpen, Brain, 
  TrendingUp, FileText, Settings as SettingsIcon, Bell, ChevronDown, 
  CheckCircle2, Activity, Play, RotateCcw, LogOut, Eye, ShieldCheck,
  Search, Share2, Compass, MapPin, FolderGit2, Cpu, Scale
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WatchlistDrawer } from './WatchlistDrawer';
import { AuditLogModal } from './AuditLogModal';

interface LayoutProps {
  children: React.ReactNode;
}

// Page name map for breadcrumbs
const PAGE_NAMES: Record<string, string> = {
  '/': 'Overview',
  '/cases': 'Case Files',
  '/live': 'Live Alerts',
  '/network': 'Mule Network',
  '/risk': 'Risk Intel',
  '/predictions': 'Next Movement',
  '/cashout': 'Geo Intercept',
  '/alerts': 'Alert Center',
  '/investigation': 'Investigation',
  '/reports': 'Reports',
  '/compare': 'Case Compare',
  '/settings': 'Settings',
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    activeCaseId, 
    setActiveCaseId, 
    cases, 
    alerts, 
    simState, 
    triggerSimulationStep, 
    resetSimulation, 
    toasts,
    setEnteredSimulation
  } = useApp();

  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [caseDropdownOpen, setCaseDropdownOpen] = useState(false);

  // Live clock (real time, updates every second)
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date().toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeAlertsCount = alerts.filter(a => a.status === 'ACTIVE').length;

  // Current page name for breadcrumb
  const currentPage = PAGE_NAMES[location.pathname] || 
    (location.pathname.startsWith('/cases') ? 'Case Files' : 'Overview');

  // Primary nav items per spec
  const navItems = [
    { name: 'Overview',       path: '/',            icon: LayoutDashboard },
    { name: 'Live Alerts',    path: '/live',         icon: AlertTriangle, showDot: activeAlertsCount > 0 },
    { name: 'Mule Network',   path: '/network',      icon: Network },
    { name: 'Geo Intercept',  path: '/cashout',      icon: Map },
    { name: 'Case Files',     path: '/cases',        icon: FolderOpen },
    { name: 'Risk Intel',     path: '/risk',         icon: Brain },
    { name: 'Next Movement',  path: '/predictions',  icon: TrendingUp },
    { name: 'Reports',        path: '/reports',       icon: FileText },
  ];

  // Secondary nav items (kept from original for feature parity)
  const secondaryNavItems = [
    { name: 'Alert Center',   path: '/alerts',       icon: Bell, badge: activeAlertsCount },
    { name: 'Investigation',  path: '/investigation', icon: Search },
    { name: 'Case Compare',   path: '/compare',      icon: Scale },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0A0F1E] text-[#E8EAF6] font-sans antialiased">
      
      {/* ── 1. SIDEBAR (220px fixed left, full height) ── */}
      <aside
        className="flex flex-col shrink-0 select-none z-30 border-r border-[#1E3A5F] bg-[#0A0F1E]"
        style={{ width: '220px' }}
      >
        
        {/* TOP: Logo Area */}
        <div className="px-4 py-4 border-b border-[#1E3A5F]">
          <Link to="/" className="flex items-center gap-2.5">
            {/* Eye + Forward Arrow SVG Logo */}
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 shrink-0">
              <path d="M4 20 C10 8, 30 8, 36 20 C30 32, 10 32, 4 20Z" stroke="#1E88E5" strokeWidth="2" fill="none"/>
              <circle cx="20" cy="20" r="6" fill="#1E88E5" opacity="0.2" stroke="#1E88E5" strokeWidth="1.5"/>
              <circle cx="20" cy="20" r="2.5" fill="#1E88E5"/>
              <path d="M17 20 L23 20 M21 18 L23 20 L21 22" stroke="#E8EAF6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-[#E8EAF6]" style={{ fontFamily: "'Inter', sans-serif" }}>PRAG-DRISHTI</span>
              <span className="text-[9px] text-[#1E88E5] tracking-[0.2em] font-mono mt-0.5">प्राग्दृष्टि</span>
            </div>
          </Link>
        </div>

        {/* PRIMARY NAV */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          
          {/* Primary items */}
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.name === 'Case Files' && location.pathname.startsWith('/cases'));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 rounded-r-md ${
                  isActive 
                    ? 'bg-[#1A2744] border-l-2 border-[#1E88E5] text-[#E8EAF6] font-medium' 
                    : 'text-[#90A4AE] hover:text-[#E8EAF6] hover:bg-[#0D1B2A] border-l-2 border-transparent'
                }`}
                title={item.name}
              >
                <Icon className={`w-4 h-4 shrink-0 stroke-[1.7] ${isActive ? 'text-[#1E88E5]' : ''}`} />
                <span className="truncate text-[13px]">{item.name}</span>
                {'showDot' in item && item.showDot && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse" />
                )}
              </Link>
            );
          })}

          {/* Separator */}
          <div className="mx-4 my-2 border-t border-[#1E3A5F]" />

          {/* Secondary items */}
          {secondaryNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 rounded-r-md ${
                  isActive 
                    ? 'bg-[#1A2744] border-l-2 border-[#1E88E5] text-[#E8EAF6] font-medium' 
                    : 'text-[#90A4AE] hover:text-[#E8EAF6] hover:bg-[#0D1B2A] border-l-2 border-transparent'
                }`}
                title={item.name}
              >
                <Icon className={`w-4 h-4 shrink-0 stroke-[1.7] ${isActive ? 'text-[#1E88E5]' : ''}`} />
                <span className="truncate text-[13px]">{item.name}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-red-500/15 text-red-500 border border-red-500/30 leading-none">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Utility items */}
          <div className="mx-4 my-2 border-t border-[#1E3A5F]" />

          <button
            onClick={() => setIsWatchlistOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#90A4AE] hover:text-[#E8EAF6] hover:bg-[#0D1B2A] cursor-pointer transition-colors duration-150 rounded-r-md border-l-2 border-transparent"
            title="Watchlist"
          >
            <Eye className="w-4 h-4 shrink-0 stroke-[1.7]" />
            <span className="truncate text-[13px]">Watchlist</span>
          </button>

          <button
            onClick={() => setIsAuditOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#90A4AE] hover:text-[#E8EAF6] hover:bg-[#0D1B2A] cursor-pointer transition-colors duration-150 rounded-r-md border-l-2 border-transparent"
            title="Audit Trail"
          >
            <ShieldCheck className="w-4 h-4 shrink-0 stroke-[1.7]" />
            <span className="truncate text-[13px]">Audit Trail</span>
          </button>
        </nav>

        {/* BOTTOM SECTION (mt-auto) */}
        <div className="mt-auto border-t border-[#1E3A5F]">

          {/* Settings */}
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-4 py-2.5 text-xs cursor-pointer transition-colors duration-150 ${
              location.pathname === '/settings'
                ? 'text-[#E8EAF6] bg-[#1A2744]'
                : 'text-[#90A4AE] hover:text-[#E8EAF6] hover:bg-[#0D1B2A]'
            }`}
          >
            <SettingsIcon className="w-4 h-4 shrink-0 stroke-[1.7]" />
            <span className="text-xs">Settings</span>
          </Link>

          {/* Separator + Officer profile */}
          <div className="border-t border-[#1E3A5F] px-4 py-3 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-md bg-[#1A2744] text-[#1E88E5] font-mono text-sm font-semibold flex items-center justify-center shrink-0"
            >
              RS
            </div>
            <div className="overflow-hidden">
              <span className="text-xs text-[#E8EAF6] font-medium block truncate">Insp. R. Sharma</span>
              <span className="text-[10px] text-[#90A4AE] font-mono block truncate">Cyber Division · L3</span>
            </div>
            <button
              onClick={() => setEnteredSimulation(false)}
              className="ml-auto p-1 text-[#90A4AE] hover:text-[#E8EAF6] transition-colors rounded"
              title="Return to Landing"
            >
              <LogOut className="w-3.5 h-3.5 stroke-[1.7]" />
            </button>
          </div>
        </div>

      </aside>

      {/* ── 2. MAIN APPLICATION VIEWPORT ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0F1E]">
        
        {/* HEADER BAR (fixed top, full width, 48px) */}
        <header
          className="bg-[#0A0F1E] border-b border-[#1E3A5F] flex items-center justify-between px-6 shrink-0 z-20"
          style={{ height: '48px' }}
        >
          
          {/* Left: Breadcrumb + Case Selector */}
          <div className="flex items-center gap-4">
            
            {/* Current page breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-[#90A4AE]">
              <span className="text-[#90A4AE]/60">PRAG-DRISHTI</span>
              <span className="text-[#90A4AE]/40">/</span>
              <span className="text-[#E8EAF6] font-medium">{currentPage}</span>
            </div>

            {/* Global Case Switcher */}
            <div className="relative">
              <button
                onClick={() => setCaseDropdownOpen(!caseDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1 bg-[#0D1B2A] hover:bg-[#132D4A] border border-[#1E3A5F] rounded text-xs font-mono transition-colors text-[#E8EAF6]"
              >
                <span className="text-[#90A4AE] text-[10px]">CASE:</span>
                <span className="font-semibold text-[#1E88E5]">{activeCaseId}</span>
                <ChevronDown className="w-3 h-3 text-[#90A4AE] ml-0.5" />
              </button>

              {caseDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg shadow-2xl z-50 py-1 max-h-72 overflow-y-auto text-xs font-sans">
                  <div className="px-3 py-1.5 border-b border-[#1E3A5F] text-[9px] uppercase tracking-widest text-[#90A4AE] font-mono">
                    Select Investigation Case
                  </div>
                  {cases.map((c) => (
                    <button
                      key={c.case_id}
                      onClick={() => {
                        setActiveCaseId(c.case_id);
                        setCaseDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#1A2744] transition-colors ${
                        c.case_id === activeCaseId ? 'bg-[#1E88E5]/10 text-[#1E88E5] font-medium' : 'text-[#90A4AE]'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-mono text-[11px] block">{c.case_id}</span>
                        <span className="text-[10px] text-[#90A4AE]/70 truncate block">{c.fraud_type}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#90A4AE] shrink-0">₹{(c.amount / 1000).toFixed(0)}K</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Simulation Step Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-[#0D1B2A] border border-[#1E3A5F] rounded text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-[#90A4AE] uppercase">STEP {simState.current_step}/5</span>
              <button
                onClick={triggerSimulationStep}
                className="ml-2 px-2 py-0.5 bg-[#1A2744] hover:bg-[#1E88E5]/20 text-[#1E88E5] border border-[#1E3A5F] rounded text-[9px] font-medium flex items-center gap-1 transition-colors"
                title="Advance simulation"
              >
                <Play className="w-2.5 h-2.5" />
                <span>Simulate</span>
              </button>
              <button
                onClick={resetSimulation}
                className="px-1 py-0.5 text-[#90A4AE] hover:text-[#E8EAF6] transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            </div>

          </div>

          {/* Right: Clock, Bell, Avatar */}
          <div className="flex items-center gap-4">
            
            {/* Live clock — JetBrains Mono */}
            <span className="font-mono text-sm text-[#90A4AE] tabular-nums hidden md:inline">
              {clock}
            </span>

            {/* Bell + badge */}
            <button
              onClick={() => navigate('/alerts')}
              className="relative p-1.5 text-[#90A4AE] hover:text-[#E8EAF6] hover:bg-[#0D1B2A] rounded transition-colors"
              title="Alerts"
            >
              <Bell className="w-4 h-4 stroke-[1.7]" />
              {activeAlertsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-mono font-bold flex items-center justify-center leading-none">
                  {activeAlertsCount > 9 ? '9+' : activeAlertsCount}
                </span>
              )}
            </button>

            {/* Mini avatar + name */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#1E3A5F]">
              <div className="w-7 h-7 rounded-md bg-[#1A2744] text-[#1E88E5] font-mono text-[11px] font-semibold flex items-center justify-center">
                RS
              </div>
              <span className="hidden lg:inline text-xs text-[#90A4AE] font-medium">Insp. R. Sharma</span>
            </div>
          </div>

        </header>

        {/* 3. SCROLLABLE WORKSPACE CANVAS */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0A0F1E] relative">
          <div className="max-w-[1500px] mx-auto min-h-full">
            {children}
          </div>
        </main>

      </div>

      {/* ── 4. TOAST NOTIFICATIONS ── */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-xs w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto p-3 rounded-lg bg-[#0D1B2A] border border-[#1E3A5F] shadow-panel text-xs flex items-start gap-2.5"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              {toast.type === 'error' && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
              {toast.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
              {toast.type === 'info' && <Activity className="w-3.5 h-3.5 text-[#1E88E5]" />}
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-[11px] text-[#E8EAF6]">{toast.title}</h5>
              <p className="text-[10.5px] text-[#90A4AE] mt-0.5 leading-snug">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── 5. DRAWERS & MODALS ── */}
      <WatchlistDrawer isOpen={isWatchlistOpen} onClose={() => setIsWatchlistOpen(false)} />
      <AuditLogModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />

    </div>
  );
};

export default Layout;
