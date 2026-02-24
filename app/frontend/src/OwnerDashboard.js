import { useState, useEffect } from "react";
import {
    Activity,
    PieChart,
    Zap,
    User,
    UserCog,
    TrendingUp,
    AlertTriangle,
    ChevronRight,
    FileText,
    Calendar,
    ArrowLeft,
    Lightbulb,
    MessageSquare,
    HelpCircle,
    LayoutGrid,
    Star,
    Settings,
    Sliders,
    CheckCircle2,
    UtilityPole,
    LandPlot,
    MapPin,
    Plus,
    TrendingDown,
    Clock,
    Users,
    LogOut,
    ChevronLeft,
    ListChecks,
    History,
    BarChart3,
    Settings2,
    LayoutDashboard
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import GlareHover from './GlareHover';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as RechartsTooltip, Cell, AreaChart, Area, CartesianGrid, YAxis } from 'recharts';

// AppColors Mirror from owner_app
const AppColors = {
    primaryGreen: '#22C55E',
    secondaryAmber: '#F59E0B',
    backgroundBlack: '#0B0F0E',
    surfaceGlass: 'rgba(255, 255, 255, 0.06)',
    borderGlass: 'rgba(255, 255, 255, 0.10)',
    textPrimary: '#E5E7EB',
    textMuted: '#9CA3AF',
    accentBlue: '#3B82F6',
    red: '#EF4444',
    graphMuted: 'rgba(148, 163, 184, 0.45)',
    dividerGlass: 'rgba(255, 255, 255, 0.08)',
    surfaceBlack: '#1E1E1E'
};

const defaultTurfs = [
    { id: '1', name: 'Koramangala Arena', location: 'Koramangala, Bangalore', revenue: '₹12,450' },
    { id: '2', name: 'Indiranagar Sports Hub', location: 'Indiranagar, Bangalore', revenue: '₹8,200' },
    { id: '3', name: 'Whitefield Turf Park', location: 'Whitefield, Bangalore', revenue: '₹9,100' },
    { id: '4', name: 'Jayanagar Arena', location: 'Jayanagar, Bangalore', revenue: '₹7,800' },
];

const weeklyData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 6500 },
    { name: 'Wed', revenue: 3000 },
    { name: 'Thu', revenue: 8000 },
    { name: 'Fri', revenue: 11000 },
    { name: 'Sat', revenue: 14500, isHigh: true },
    { name: 'Sun', revenue: 12000 },
];

const revenueHistoryData = [
    { month: 'February', year: 2026, revenue: 145000, growth: 12, isCurrent: true },
    { month: 'January', year: 2026, revenue: 180000, growth: -5 },
    { month: 'December', year: 2025, revenue: 165000, growth: 8 },
    { month: 'November', year: 2025, revenue: 152000, growth: 10 },
    { month: 'October', year: 2025, revenue: 158000, growth: -2 },
    { month: 'September', year: 2025, revenue: 142000, growth: 15 },
    { month: 'August', year: 2025, revenue: 135000, growth: 5 },
    { month: 'July', year: 2025, revenue: 128000, growth: 12 },
];

// Reusable Components Optimized for Screen Real Estate
const Card = ({ children, className = "", onClick, style = {} }) => (
    <div
        onClick={onClick}
        style={style}
        className={`bg-[#1F2933]/20 border border-[#1F2933] rounded-3xl backdrop-blur-xl transition-all h-full ${onClick ? 'cursor-pointer hover:bg-[#1F2933]/30' : ''} ${className}`}
    >
        {children}
    </div>
);

const SectionHeader = ({ title }) => (
    <h3 className="text-[10px] font-black tracking-[0.2em] text-[#9CA3AF] uppercase mb-4">
        {title}
    </h3>
);

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, selectedTurf, onSwitchTurf, onLogout }) => {
    const menuItems = [
        { id: 0, label: 'Boardroom', icon: Activity },
        { id: 1, label: 'Analytics', icon: PieChart },
        { id: 2, label: 'Operations', icon: Zap },
        { id: 3, label: 'Settings', icon: UserCog },
    ];

    return (
        <aside className="w-72 bg-[#0B0F0E] border-r border-[#1F2933] flex flex-col p-8 z-50">
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-[#22C55E] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <LayoutDashboard className="text-black w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-white">NAMMA TURF</h1>
                    <p className="text-[10px] font-black text-[#22C55E] tracking-[0.2em]">OWNER OS</p>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        disabled={!selectedTurf}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${activeTab === item.id
                            ? 'bg-[#22C55E]/10 text-[#22C55E]'
                            : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
                            } ${!selectedTurf ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                        <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto space-y-4 pt-8 border-t border-[#1F2933]">
                {selectedTurf && (
                    <button
                        onClick={onSwitchTurf}
                        className="w-full flex items-center gap-4 px-5 py-3 text-[#9CA3AF] hover:text-white transition-colors"
                    >
                        <LayoutGrid className="w-5 h-5" />
                        <span className="text-sm font-semibold">Switch Property</span>
                    </button>
                )}
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-4 px-5 py-3 text-red-500/80 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-semibold">Terminate Session</span>
                </button>
            </div>
        </aside>
    );
};

const SettingsRow = ({ icon: Icon, label }) => (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/20 transition-all cursor-pointer">
        <div className="flex items-center gap-3">
            <Icon className="text-[#9CA3AF] w-5 h-5" />
            <span className="text-sm font-semibold text-white">{label}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
    </div>
);

// Website Content Views (No Scrolling, Full Utilization)

const DashboardHomeView = ({ turfName, setTab }) => (
    <div className="grid grid-cols-12 gap-8 h-full items-stretch">
        {/* Left Column: Greeting & Main Stats */}
        <div className="col-span-8 flex flex-col gap-8">
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-[#9CA3AF] text-lg font-medium">Welcome Back, Shashanth</p>
                    <h2 className="text-4xl font-semibold text-white tracking-tight mt-1">
                        Status: <span className="text-[#22C55E]">Optimal Operations</span>
                    </h2>
                    <p className="text-xs text-[#22C55E]/80 font-bold mt-2 tracking-widest uppercase">Property: {turfName}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 flex-1">
                <GlareHover borderRadius="24px">
                    <Card className="p-8 flex flex-col justify-between bg-gradient-to-br from-[#22C55E]/10 to-transparent">
                        <div>
                            <SectionHeader title="Monthly Revenue (Feb)" />
                            <h3 className="text-5xl font-bold text-white tracking-tighter">₹1,45,000</h3>
                            <p className="text-sm text-[#9CA3AF] mt-2">+12% from last month</p>
                        </div>
                        <div className="h-32 w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weeklyData}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </GlareHover>

                <div className="grid grid-rows-2 gap-6">
                    <Card className="p-8">
                        <SectionHeader title="Hourly Occupancy" />
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-4xl font-bold text-white tracking-tight">78%</h3>
                                <p className="text-xs text-[#F59E0B] font-bold mt-1">6 SLOTS VACANT</p>
                            </div>
                            <div className="w-16 h-16 rounded-full border-4 border-[#F59E0B]/20 border-t-[#F59E0B] flex items-center justify-center">
                                <span className="text-[10px] font-bold text-[#F59E0B]">PEAK</span>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-8">
                        <SectionHeader title="Daily Revenue" />
                        <h3 className="text-4xl font-bold text-[#22C55E] tracking-tight">₹12,450</h3>
                        <p className="text-xs text-[#9CA3AF] mt-1">TODAY (ESTIMATED)</p>
                    </Card>
                </div>
            </div>
        </div>

        {/* Right Column: Insights & Actions */}
        <div className="col-span-4 flex flex-col gap-6">
            <Card className="p-6 flex-1">
                <SectionHeader title="Intelligence Hub" />
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="p-2 rounded-lg bg-[#22C55E]/10"><TrendingUp className="w-5 h-5 text-[#22C55E]" /></div>
                        <p className="text-sm text-[#E5E7EB] leading-relaxed">Peak slots (6-9 PM) are underpriced by ₹200. Projected revenue gain: ₹14k/mo.</p>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="p-2 rounded-lg bg-red-500/10"><AlertTriangle className="w-5 h-5 text-red-500" /></div>
                        <p className="text-sm text-[#E5E7EB] leading-relaxed">Playo integration latency detected. Performance down by 12%.</p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 h-48">
                <Card onClick={() => setTab(1)} className="p-6 flex flex-col items-center justify-center gap-3">
                    <BarChart3 className="text-[#22C55E] w-8 h-8" />
                    <span className="text-xs font-black tracking-widest text-[#9CA3AF]">REPORTS</span>
                </Card>
                <Card onClick={() => setTab(2)} className="p-6 flex flex-col items-center justify-center gap-3">
                    <Settings2 className="text-[#22C55E] w-8 h-8" />
                    <span className="text-xs font-black tracking-widest text-[#9CA3AF]">REPAIRS</span>
                </Card>
            </div>
        </div>
    </div>
);

const RevenueAnalyticsView = () => (
    <div className="grid grid-cols-12 gap-8 h-full">
        <div className="col-span-8 flex flex-col gap-6">
            <Card className="p-8 flex-1 relative overflow-hidden">
                <div className="absolute top-8 left-8">
                    <SectionHeader title="Growth Index" />
                    <h3 className="text-3xl font-bold text-white tracking-tight">Weekly Inflow</h3>
                </div>
                <div className="h-full pt-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 700 }} />
                            <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} content={({ payload }) => {
                                if (!payload?.length) return null;
                                return <div className="bg-[#111827] border border-white/10 p-4 rounded-2xl shadow-2xl text-white font-bold">₹{payload[0].value.toLocaleString()}</div>
                            }} />
                            <Bar dataKey="revenue" radius={[6, 6, 6, 6]} barSize={40}>
                                {weeklyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.isHigh ? '#22C55E' : 'rgba(148, 163, 184, 0.45)'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>

        <div className="col-span-4 flex flex-col gap-6">
            <Card className="p-8">
                <SectionHeader title="Channel Breakdown" />
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between font-bold text-sm"><span className="text-white">Playo</span><span className="text-[#22C55E]">60%</span></div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full"><div className="h-full bg-[#22C55E] rounded-full w-[60%]" /></div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between font-bold text-sm"><span className="text-white">Walk-ins</span><span className="text-[#F59E0B]">25%</span></div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full"><div className="h-full bg-[#F59E0B] rounded-full w-[25%]" /></div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between font-bold text-sm"><span className="text-white">District</span><span className="text-[#3B82F6]">15%</span></div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full"><div className="h-full bg-[#3B82F6] rounded-full w-[15%]" /></div>
                    </div>
                </div>
            </Card>

            <Card className="p-8 flex-1">
                <SectionHeader title="Fiscal Metrics" />
                <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="flex flex-col justify-center gap-1">
                        <p className="text-[10px] font-bold text-[#9CA3AF]">AVG TICKET</p>
                        <h4 className="text-2xl font-bold text-white">₹1,250</h4>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <p className="text-[10px] font-bold text-[#9CA3AF]">BOOKINGS</p>
                        <h4 className="text-2xl font-bold text-white">428</h4>
                    </div>
                </div>
            </Card>
        </div>
    </div>
);

const OperationsView = () => (
    <div className="grid grid-cols-12 gap-8 h-full">
        <div className="col-span-4 flex flex-col gap-6">
            <Card className="p-8 bg-gradient-to-br from-[#F59E0B]/5 to-transparent">
                <SectionHeader title="Uptime Score" />
                <div className="flex items-center gap-6">
                    <h3 className="text-6xl font-bold text-white">94%</h3>
                    <div className="text-xs font-bold leading-relaxed text-[#9CA3AF]">TRACKING 12 ACTIVE<br />SUBSYSTEMS</div>
                </div>
            </Card>
            <div className="grid grid-rows-2 gap-6 flex-1">
                <Card className="p-8">
                    <SectionHeader title="Active Repairs" />
                    <div className="flex items-baseline gap-2">
                        <h4 className="text-4xl font-bold text-[#F59E0B]">02</h4>
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase">Pending</p>
                    </div>
                </Card>
                <Card className="p-8">
                    <SectionHeader title="New Inquiries" />
                    <div className="flex items-baseline gap-2">
                        <h4 className="text-4xl font-bold text-[#22C55E]">05</h4>
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase">Unread</p>
                    </div>
                </Card>
            </div>
        </div>

        <div className="col-span-8 flex flex-col">
            <Card className="p-0 overflow-hidden flex-1 flex flex-col">
                <div className="p-8 border-b border-[#1F2933]">
                    <SectionHeader title="Operational Register" />
                </div>
                <div className="flex-1 overflow-auto divide-y divide-[#1F2933]">
                    {[
                        { title: 'Floodlight Repair - Pitch 2', status: 'Pending', color: '#F59E0B', icon: Lightbulb, time: '2h ago' },
                        { title: 'Corporate Inquiry - Decathlon', status: 'New', color: '#22C55E', icon: MessageSquare, time: '1h ago' },
                        { title: 'Net Replacement - Pitch 1', status: 'Scheduled', color: '#3B82F6', icon: UtilityPole, time: 'Tomorrow' },
                        { title: 'Refund Request #1245', status: 'Review', color: '#F59E0B', icon: HelpCircle, time: '4h ago' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 hover:bg-white/5 transition-colors group cursor-pointer">
                            <div style={{ backgroundColor: `${item.color}10` }} className="p-3 rounded-2xl">
                                <item.icon style={{ color: item.color }} className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h5 className="text-base font-semibold text-white group-hover:text-[#22C55E] transition-colors">{item.title}</h5>
                                <p className="text-xs text-[#9CA3AF]">{item.time}</p>
                            </div>
                            <div style={{ borderColor: item.color, color: item.color }} className="px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider">
                                {item.status}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
);

const TurfSelectionView = ({ onSelect, onShowHistory, onShowCalendar }) => (
    <div className="flex flex-col gap-6 h-full animate-fade-in relative">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-[#9CA3AF] text-base font-medium">Estate Overview</p>
                <h2 className="text-4xl font-bold text-white tracking-tighter mt-1">Pick Your Property</h2>
            </div>
            <div className="flex gap-3">
                <button onClick={onShowHistory} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-xs font-semibold hover:bg-white/10 transition-all">
                    <ListChecks className="w-3.5 h-3.5" /> Monthly Audit
                </button>
                <button onClick={onShowCalendar} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-xs font-semibold hover:bg-white/10 transition-all">
                    <History className="w-3.5 h-3.5" /> Revenue Diary
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 items-start">
            {defaultTurfs.map((turf) => (
                <Card
                    key={turf.id}
                    onClick={() => onSelect(turf)}
                    className="p-6 group flex flex-col justify-between min-h-[250px]"
                >
                    <div>
                        <div className="p-2.5 bg-[#22C55E]/10 rounded-2xl w-fit group-hover:bg-[#22C55E] group-hover:rotate-12 transition-all duration-500 mb-5">
                            <LandPlot className="text-[#22C55E] w-7 h-7 group-hover:text-black transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#22C55E] transition-colors">{turf.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mt-1.5">
                            <MapPin className="w-3.5 h-3.5" /> {turf.location}
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between pt-5 border-t border-white/5">
                        <div className="text-left">
                            <p className="text-[9px] font-black text-[#9CA3AF] tracking-widest">LIVE INFLOW</p>
                            <p className="text-lg font-bold text-[#22C55E]">{turf.revenue}</p>
                        </div>
                        <ChevronRight className="text-[#9CA3AF] transition-transform group-hover:translate-x-1" />
                    </div>
                </Card>
            ))}
            <div className="border-2 border-dashed border-[#1F2933] rounded-3xl flex flex-col items-center justify-center gap-3 text-[#9CA3AF] hover:border-[#22C55E] hover:text-[#22C55E] transition-all cursor-pointer h-full min-h-[250px]">
                <Plus className="w-8 h-8" />
                <span className="font-bold text-[10px] tracking-widest">EXPAND ESTATE</span>
            </div>
        </div>
    </div>
);

const SelectionInsights = () => (
    <div className="grid grid-cols-3 gap-6 mb-6 overflow-hidden shrink-0">
        <Card className="p-5 bg-gradient-to-br from-[#22C55E]/5 to-transparent">
            <SectionHeader title="CUMULATIVE FEB REV" />
            <h4 className="text-2xl font-bold text-white">₹2,35,000</h4>
            <div className="flex items-center gap-2 text-[10px] text-[#22C55E] mt-1 font-bold"><TrendingUp className="w-3 h-3" /> +15% VS JAN</div>
        </Card>
        <Card className="p-5">
            <SectionHeader title="AVG PROPERTY REVENUE" />
            <h4 className="text-2xl font-bold text-white">₹9,450</h4>
            <p className="text-[10px] text-[#9CA3AF] mt-1">Across 2 active locations</p>
        </Card>
        <Card className="p-5">
            <SectionHeader title="ESTATE REACH" />
            <h4 className="text-2xl font-bold text-white">2.4k</h4>
            <p className="text-[10px] text-[#9CA3AF] mt-1">Unique customers this week</p>
        </Card>
    </div>
);

// Financial History Desktop Layout
const RevenueTimelineView = ({ onBack }) => (
    <div className="h-full flex flex-col gap-8 animate-fade-in relative">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
                <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all group">
                    <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Financial Timeline</h2>
                    <p className="text-sm text-[#9CA3AF]">Tracking multi-property revenue cycles</p>
                </div>
            </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-8 overflow-hidden">
            <Card className="p-0 overflow-hidden flex flex-col h-full">
                <div className="p-6 border-b border-[#1F2933] flex items-center justify-between">
                    <SectionHeader title="Audit Log (2025-26)" />
                    <Badge className="bg-[#22C55E]/20 text-[#22C55E] border-none px-4 py-1">LIVE DATA</Badge>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                    {revenueHistoryData.map((item, i) => (
                        <div key={i} className={`flex items-center gap-6 p-6 rounded-3xl transition-all border ${item.isCurrent ? 'bg-[#22C55E]/5 border-[#22C55E]/30' : 'bg-transparent border-white/5 hover:border-white/10'}`}>
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${item.isCurrent ? 'bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-white/20'}`} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-black text-[#9CA3AF] tracking-widest uppercase">{item.month} {item.year}</p>
                                <h5 className="text-2xl font-bold text-white">₹{item.revenue.toLocaleString()}</h5>
                            </div>
                            <div className={`flex items-center gap-2 font-bold text-sm ${item.growth > 0 ? 'text-[#22C55E]' : 'text-red-500'}`}>
                                {item.growth > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {item.growth}%
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="flex flex-col gap-8">
                <Card className="p-8 bg-gradient-to-br from-[#22C55E]/10 to-transparent flex-1 flex flex-col justify-between">
                    <div>
                        <SectionHeader title="FY 2026 PROJECTION" />
                        <h3 className="text-6xl font-black text-white tracking-tighter mt-4">₹2.4 Cr</h3>
                        <p className="text-lg text-[#22C55E] font-semibold mt-2">Expected Year End Revenue</p>
                    </div>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueHistoryData.slice().reverse()}>
                                <Area type="stepBefore" dataKey="revenue" stroke="#22C55E" strokeWidth={4} fillOpacity={0.1} fill="#22C55E" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    </div>
);

// Interactive Calendar Desktop View
const CalendarView = ({ onBack }) => {
    const [selectedDay, setSelectedDay] = useState(14);
    const daysInMonth = 28;
    const firstDayOffset = 6;
    const days = [];
    for (let i = 0; i < firstDayOffset; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
        <div className="h-full flex flex-col gap-8 animate-fade-in">
            <div className="flex items-center gap-6">
                <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all group">
                    <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Revenue Diary</h2>
                    <p className="text-sm text-[#9CA3AF]">Daily audit of automated inflow</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 flex-1 overflow-hidden">
                <Card className="col-span-8 p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white">February 2026</h3>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-xs font-bold text-[#9CA3AF] uppercase">
                                <div className="w-2 h-2 rounded-full bg-[#22C55E]" /> Optimal
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-xs font-bold text-[#9CA3AF] uppercase">
                                <div className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Low
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-4 flex-1">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-[#9CA3AF] tracking-widest bg-white/5 py-4 rounded-xl">{d}</div>
                        ))}
                        {days.map((day, i) => (
                            <div
                                key={i}
                                onClick={() => day && setSelectedDay(day)}
                                className={`rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${!day ? 'invisible' :
                                    day === selectedDay ? 'bg-[#22C55E]/10 border-[#22C55E] scale-105 shadow-2xl z-10' :
                                        'bg-white/3 border-white/5 hover:border-white/20'
                                    }`}
                            >
                                <span className={`text-lg font-bold ${day === selectedDay ? 'text-[#22C55E]' : 'text-white'}`}>{day}</span>
                                <span className="text-[9px] font-black text-[#9CA3AF]">₹12.4K</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="col-span-4 flex flex-col gap-6">
                    <Card className="p-8 bg-[#22C55E]/5 border-[#22C55E]/20">
                        <SectionHeader title={`Details: ${selectedDay} Feb 2026`} />
                        <h4 className="text-5xl font-black text-white tracking-tighter mt-4">₹12,450</h4>
                        <p className="text-sm text-[#22C55E] font-bold mt-2">PEAK PERFORMANCE DAY</p>
                    </Card>
                    <Card className="p-8 flex-1 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-white/5"><Calendar className="text-[#9CA3AF] w-5 h-5" /></div>
                                <span className="text-sm font-semibold text-white">Bookings</span>
                            </div>
                            <span className="text-xl font-bold text-white">18</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-white/5"><Clock className="text-[#9CA3AF] w-5 h-5" /></div>
                                <span className="text-sm font-semibold text-white">Prime Slots Filled</span>
                            </div>
                            <span className="text-xl font-bold text-white">9/9</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-white/5"><Users className="text-[#9CA3AF] w-5 h-5" /></div>
                                <span className="text-sm font-semibold text-white">New Players</span>
                            </div>
                            <span className="text-xl font-bold text-white">04</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Main Layout
const OwnerDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedTurf, setSelectedTurf] = useState(null);
    const [currentView, setCurrentView] = useState('main'); // 'main', 'history', 'calendar'

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const views = [
        <DashboardHomeView turfName={selectedTurf?.name} setTab={setActiveTab} />,
        <RevenueAnalyticsView />,
        <OperationsView />,
        <div className="grid grid-cols-2 gap-8 h-full">
            <Card className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 rounded-full border-2 border-[#22C55E] p-2 mb-6">
                    <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
                        <User className="w-12 h-12 text-[#22C55E]" />
                    </div>
                </div>
                <h3 className="text-3xl font-bold text-white">Shashanth</h3>
                <p className="text-[#9CA3AF] mt-2 font-medium">+91 98765 43210</p>
                <div className="flex gap-4 mt-8">
                    <button className="px-8 py-3 rounded-2xl bg-white/5 border border-white/5 font-bold hover:bg-white/10 transition-all">EDIT PROFILE</button>
                    <button onClick={onLogout} className="px-8 py-3 rounded-2xl bg-red-500/10 border border-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all">TERMINATE SESS</button>
                </div>
            </Card>
            <div className="grid grid-rows-2 gap-8">
                <Card className="p-10">
                    <SectionHeader title="Turf Config" />
                    <div className="space-y-4">
                        <SettingsRow icon={Sliders} label="Pitch Settings" />
                        <SettingsRow icon={MessageSquare} label="Query Auto-Responder" />
                    </div>
                </Card>
                <Card className="p-10">
                    <SectionHeader title="Global Stats" />
                    <div className="flex items-center gap-8 mt-4">
                        <div className="flex-1 p-6 rounded-3xl bg-white/5 text-center">
                            <p className="text-[10px] font-black text-[#9CA3AF] mb-1">TOTAL REVENUE</p>
                            <h4 className="text-2xl font-bold text-[#22C55E]">₹2.35L</h4>
                        </div>
                        <div className="flex-1 p-6 rounded-3xl bg-white/5 text-center">
                            <p className="text-[10px] font-black text-[#9CA3AF] mb-1">PROPERTIES</p>
                            <h4 className="text-2xl font-bold text-white">04</h4>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    ];

    const handleSelectionReset = () => {
        setSelectedTurf(null);
        setCurrentView('main');
    };

    return (
        <div className={`h-screen w-screen bg-[#0B0F0E] text-[#E5E7EB] flex overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} scrollbar-hide`}>
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            {/* Dynamic Background Blobs */}
            <div className="fixed top-[-200px] left-[-100px] w-[600px] h-[600px] bg-[#22C55E]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-100px] right-[-50px] w-[500px] h-[500px] bg-[#F59E0B]/5 blur-[120px] rounded-full pointer-events-none" />

            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedTurf={selectedTurf}
                onSwitchTurf={handleSelectionReset}
                onLogout={onLogout}
            />

            <main className="flex-1 px-10 py-6 h-full overflow-hidden flex flex-col">
                {!selectedTurf ? (
                    <div className="flex-1 flex flex-col h-full overflow-y-auto scrollbar-hide pr-4">
                        {currentView === 'main' && (
                            <>
                                <SelectionInsights />
                                <div className="flex-1">
                                    <TurfSelectionView
                                        onSelect={setSelectedTurf}
                                        onShowHistory={() => setCurrentView('history')}
                                        onShowCalendar={() => setCurrentView('calendar')}
                                    />
                                </div>
                            </>
                        )}
                        {currentView === 'history' && <RevenueTimelineView onBack={() => setCurrentView('main')} />}
                        {currentView === 'calendar' && <CalendarView onBack={() => setCurrentView('main')} />}
                    </div>
                ) : (
                    <div className={`flex-1 h-full ${activeTab === 0 ? 'overflow-y-auto scrollbar-hide pr-4' : ''}`}>
                        {views[activeTab]}
                    </div>
                )}
            </main>
        </div>
    );
};

export default OwnerDashboard;
