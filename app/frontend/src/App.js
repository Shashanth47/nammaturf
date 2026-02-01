import { useState, useEffect, useRef } from "react";
import "@/App.css";
import axios from "axios";
import {
  Calendar,
  Users,
  BarChart3,
  Phone,
  Globe,
  Footprints,
  TrendingUp,
  Clock,
  Wrench,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Building2,
  Mail,
  MapPin,
  Send,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Antigravity from './Antigravity';
import GlareHover from './GlareHover';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Scroll animation hook
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

// Logo Component
const Logo = () => (
  <div className="flex items-center gap-2">
    <img
      src="/nama_turF_LOGO.png"
      alt="Namma Turf"
      className="h-32 w-auto object-contain"
    />
  </div>
);

// Navbar Component
const Navbar = ({ onDemoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ['home', 'features', 'analytics', 'pricing', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-blur border-b border-[#1F2933]' : ''
        }`}
      data-testid="navbar"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation - Pill Style */}
          <div className="hidden md:flex items-center nav-pill px-2 py-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-pill-item px-4 py-1.5 rounded-full text-sm font-medium ${activeSection === item.id ? 'active' : 'text-[#9CA3AF]'
                  }`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors"
              data-testid="login-btn"
            >
              Login
            </button>
            <Button
              onClick={onDemoClick}
              className="btn-primary px-4 py-2 rounded-full text-sm font-medium"
              data-testid="request-demo-btn"
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mobile-menu absolute top-full left-0 right-0 border-t border-[#1F2933]">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${activeSection === item.id ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'text-[#9CA3AF]'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 space-y-2">
              <button className="w-full text-left px-4 py-3 text-sm font-medium text-[#9CA3AF]">
                Login
              </button>
              <Button
                onClick={onDemoClick}
                className="w-full btn-primary py-3 rounded-lg text-sm font-medium"
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Dashboard Mockup Components
const ManagerDashboard = () => (
  <div className="dashboard-card w-[280px] md:w-[320px] animate-float" style={{ animationDelay: '0s' }}>
    <GlareHover
      width="100%"
      height="100%"
      glareColor="#ffffff"
      glareOpacity={0.15}
      borderRadius="16px"
      glareSize={150}
      borderColor="transparent"
      background="transparent"
    >
      <div className="p-4 w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-[#9CA3AF]">Manager View</span>
          <span className="text-xs text-[#22C55E]">Live</span>
        </div>
        <h4 className="text-sm font-semibold mb-3">Today&apos;s Slots</h4>
        <div className="space-y-2">
          {[
            { time: '6:00 AM', type: 'Walk-in', status: 'done' },
            { time: '7:00 AM', type: 'Online', status: 'done' },
            { time: '8:00 AM', type: 'Call', status: 'current' },
            { time: '9:00 AM', type: 'Online', status: 'upcoming' },
            { time: '10:00 AM', type: 'Walk-in', status: 'upcoming' },
          ].map((slot, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-2 rounded-lg text-xs ${slot.status === 'current' ? 'bg-[#22C55E]/10 border border-[#22C55E]/30' :
                slot.status === 'done' ? 'bg-[#1F2933]/50' : 'bg-[#1F2933]/30'
                }`}
            >
              <span className={slot.status === 'done' ? 'text-[#9CA3AF]' : 'text-white'}>{slot.time}</span>
              <Badge className={`text-[10px] px-2 py-0.5 ${slot.type === 'Walk-in' ? 'bg-blue-500/20 text-blue-400 border-0' :
                slot.type === 'Online' ? 'bg-[#22C55E]/20 text-[#22C55E] border-0' :
                  'bg-orange-500/20 text-orange-400 border-0'
                }`}>
                {slot.type}
              </Badge>
              {slot.status === 'current' && <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#1F2933]">
          <div className="flex justify-between text-xs">
            <span className="text-[#9CA3AF]">Occupancy</span>
            <span className="text-[#22C55E] font-semibold">78%</span>
          </div>
          <div className="mt-2 h-2 bg-[#1F2933] rounded-full overflow-hidden">
            <div className="h-full w-[78%] bg-gradient-to-r from-[#22C55E] to-[#2DD4BF] rounded-full"></div>
          </div>
        </div>
      </div>
    </GlareHover>
  </div>
);

const OwnerDashboard = () => (
  <div className="dashboard-card w-[300px] md:w-[340px] animate-float" style={{ animationDelay: '0.5s' }}>
    <GlareHover
      width="100%"
      height="100%"
      glareColor="#ffffff"
      glareOpacity={0.15}
      borderRadius="16px"
      glareSize={150}
      borderColor="transparent"
      background="transparent"
    >
      <div className="p-4 w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-[#9CA3AF]">Owner Analytics</span>
          <span className="text-xs text-[#9CA3AF]">Dec 2025</span>
        </div>
        <div className="mb-4">
          <span className="text-2xl font-bold">₹4,82,500</span>
          <span className="text-xs text-[#22C55E] ml-2">+12.5%</span>
        </div>
        {/* Simple Chart */}
        <div className="h-24 flex items-end gap-1">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-[#22C55E]/80 to-[#22C55E]/30 rounded-t"
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-[#1F2933]/50 rounded-lg p-2 text-center">
            <div className="text-xs text-[#9CA3AF]">Peak Hours</div>
            <div className="text-sm font-semibold">6-9 PM</div>
          </div>
          <div className="bg-[#1F2933]/50 rounded-lg p-2 text-center">
            <div className="text-xs text-[#9CA3AF]">Utilization</div>
            <div className="text-sm font-semibold text-[#22C55E]">82%</div>
          </div>
          <div className="bg-[#1F2933]/50 rounded-lg p-2 text-center">
            <div className="text-xs text-[#9CA3AF]">Bookings</div>
            <div className="text-sm font-semibold">1,247</div>
          </div>
        </div>
      </div>
    </GlareHover>
  </div>
);

const MLPredictionCard = () => (
  <div className="dashboard-card w-[200px] animate-float accent-glow" style={{ animationDelay: '1s' }}>
    <GlareHover
      width="100%"
      height="100%"
      glareColor="#ffffff"
      glareOpacity={0.15}
      borderRadius="16px"
      glareSize={120}
      borderColor="transparent"
      background="transparent"
    >
      <div className="p-3 w-full h-full">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
          <span className="text-xs text-[#2DD4BF]">ML Insight</span>
        </div>
        <p className="text-xs text-[#9CA3AF] mb-2">Optimal price for Saturday evening</p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold">₹1,800</span>
          <span className="text-xs text-[#22C55E]">+₹200</span>
        </div>
        <div className="mt-2 text-[10px] text-[#9CA3AF]">Based on 94% confidence</div>
      </div>
    </GlareHover>
  </div>
);

const AlertCard = ({ icon: Icon, title, color }) => (
  <div className="dashboard-card w-[180px]">
    <GlareHover
      width="100%"
      height="100%"
      glareColor="#ffffff"
      glareOpacity={0.15}
      borderRadius="16px"
      glareSize={100}
      borderColor="transparent"
      background="transparent"
    >
      <div className="p-3 w-full h-full">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-xs font-medium">{title}</span>
        </div>
      </div>
    </GlareHover>
  </div>
);

// Hero Section
const HeroSection = ({ onDemoClick }) => (
  <section id="home" className="pt-20 md:pt-24 pb-16 md:pb-24 px-6 md:px-12" data-testid="hero-section">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column - Content */}
        <div className="animate-fade-in-up">
          <div className="badge-pill inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-3 h-3" />
            The Operating System for Sports Turfs
          </div>

          <h1 className="hero-title font-bold mb-6 leading-tight">
            Run your turf like a{' '}
            <span className="italic-accent">business</span>, not a register
          </h1>

          <p className="text-base md:text-lg text-[#9CA3AF] mb-8 max-w-lg leading-relaxed">
            Centralize walk-ins, calls, and online bookings in one system.
            Give managers operational control and owners real-time analytics
            with ML-driven insights.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={onDemoClick}
              className="btn-primary px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2"
              data-testid="hero-get-started-btn"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="btn-outline px-6 py-3 rounded-full text-sm font-semibold"
              data-testid="hero-view-demo-btn"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Right Column - Dashboard Mockups */}
        {/* Right Column - Dashboard Mockups */}
        <div className="relative h-[400px] md:h-[500px] dashboard-glow">
          <div className="absolute top-0 right-[-10px] lg:right-[-30px] z-10 scale-95">
            <OwnerDashboard />
          </div>
          <div className="absolute top-[140px] left-[20px] lg:left-[10px] z-20 scale-95">
            <ManagerDashboard />
          </div>
          <div className="absolute bottom-[60px] right-[10px] lg:right-[20px] z-30 scale-90">
            <MLPredictionCard />
          </div>
          <div className="absolute bottom-[10px] left-[40px] z-10 scale-90">
            <AlertCard icon={Wrench} title="Maintenance Due" color="text-orange-400" />
          </div>
          <div className="absolute bottom-[-20px] right-[40px] z-10 hidden md:block scale-90">
            <AlertCard icon={TrendingUp} title="High Demand Slot" color="text-[#22C55E]" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Trusted By Section
const TrustedBySection = () => (
  <section className="py-12 md:py-16 px-6 md:px-12 border-y border-[#1F2933]" data-testid="trusted-section">
    <div className="max-w-[1200px] mx-auto">
      <p className="text-center text-sm text-[#9CA3AF] mb-8">Built for modern turf operators</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {[
          { icon: Building2, label: 'Multi-location Turfs' },
          { icon: Users, label: 'Sports Academies' },
          { icon: Shield, label: 'Private Arenas' },
          { icon: Globe, label: 'Franchise Operators' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-[#9CA3AF]/60 hover:text-[#9CA3AF] transition-colors">
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, visual }) => (
  <Card className="card-surface feature-card p-6 h-full animate-on-scroll">
    <div className="mb-6">{visual}</div>
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#22C55E]" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-[#9CA3AF] leading-relaxed">{description}</p>
  </Card>
);

// Timeline Visual
const TimelineVisual = () => (
  <div className="bg-[#1F2933]/30 rounded-xl p-4 h-32">
    <div className="flex gap-2 h-full">
      {['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'].map((time, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end">
          <div
            className={`rounded-t ${i === 4 || i === 5 ? 'bg-[#22C55E]' :
              i === 2 || i === 3 ? 'bg-[#22C55E]/60' : 'bg-[#22C55E]/30'
              }`}
            style={{ height: `${[40, 60, 70, 75, 95, 90][i]}%` }}
          ></div>
          <span className="text-[10px] text-[#9CA3AF] mt-1 text-center">{time}</span>
        </div>
      ))}
    </div>
  </div>
);

// Split Dashboard Visual
const SplitDashboardVisual = () => (
  <div className="bg-[#1F2933]/30 rounded-xl p-3 h-32 grid grid-cols-2 gap-2">
    <div className="bg-[#0B0F0E]/50 rounded-lg p-2">
      <div className="text-[10px] text-[#9CA3AF] mb-1">Manager</div>
      <div className="space-y-1">
        <div className="h-2 bg-[#22C55E]/30 rounded w-full"></div>
        <div className="h-2 bg-[#22C55E]/50 rounded w-3/4"></div>
        <div className="h-2 bg-[#22C55E]/20 rounded w-5/6"></div>
      </div>
    </div>
    <div className="bg-[#0B0F0E]/50 rounded-lg p-2">
      <div className="text-[10px] text-[#9CA3AF] mb-1">Owner</div>
      <div className="flex items-end gap-1 h-12">
        {[30, 50, 40, 70, 60].map((h, i) => (
          <div key={i} className="flex-1 bg-[#2DD4BF]/50 rounded-t" style={{ height: `${h}%` }}></div>
        ))}
      </div>
    </div>
  </div>
);

// Analytics Visual
const AnalyticsVisual = () => (
  <div className="bg-[#1F2933]/30 rounded-xl p-4 h-32 relative overflow-hidden">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      <path
        d="M 0 60 Q 30 50 50 40 T 100 35 T 150 25 T 200 20"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        className="chart-line"
      />
      <path
        d="M 0 60 Q 30 50 50 40 T 100 35 T 150 25 T 200 20 L 200 80 L 0 80 Z"
        fill="url(#lineGrad)"
        fillOpacity="0.1"
      />
      {/* Prediction line (dashed) */}
      <path
        d="M 150 25 Q 175 18 200 15"
        fill="none"
        stroke="#2DD4BF"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
    <div className="absolute bottom-3 right-3 flex items-center gap-1">
      <Sparkles className="w-3 h-3 text-[#2DD4BF]" />
      <span className="text-[10px] text-[#2DD4BF]">ML Prediction</span>
    </div>
  </div>
);

// Features Section
const FeaturesSection = () => (
  <section id="features" className="py-16 md:py-24 px-6 md:px-12" data-testid="features-section">
    <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-12 md:mb-16 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Everything needed to <span className="italic-accent">operate</span>, optimize, and scale your turf
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Calendar}
          title="All bookings. One system."
          description="Walk-in, call, and online bookings unified. No double bookings, no manual chaos. Real-time slot management across all channels."
          visual={<TimelineVisual />}
        />
        <FeatureCard
          icon={Users}
          title="Built for both ground staff and decision-makers"
          description="Managers handle day-to-day operations. Owners track performance remotely. Role-based access keeps everyone focused."
          visual={<SplitDashboardVisual />}
        />
        <FeatureCard
          icon={BarChart3}
          title="Data-driven pricing & performance"
          description="ML predicts optimal pricing, peak demand windows, and underutilized slots. Make decisions backed by data, not guesswork."
          visual={<AnalyticsVisual />}
        />
      </div>
    </div>
  </section>
);

// Analytics & ML Section
const AnalyticsSection = () => (
  <section id="analytics" className="py-16 md:py-24 px-6 md:px-12 bg-[#111827]/30" data-testid="analytics-section">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-on-scroll">
          <Badge className="badge-pill mb-4">
            <Sparkles className="w-3 h-3 mr-1" /> ML-Powered
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Revenue intelligence that <span className="italic-accent">pays for itself</span>
          </h2>
          <p className="text-[#9CA3AF] mb-6 leading-relaxed">
            Our ML engine analyzes booking patterns, weather data, local events, and historical trends
            to suggest optimal pricing. Increase revenue by up to 25% with dynamic pricing recommendations.
          </p>
          <ul className="space-y-3">
            {[
              'Dynamic pricing suggestions based on demand',
              'Peak hour identification and slot optimization',
              'Revenue forecasting with 94% accuracy',
              'Competitor analysis and market positioning',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-on-scroll delay-200">
          <div className="dashboard-card card-large p-6 accent-glow">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold">Revenue Intelligence</h4>
              <Badge className="bg-[#2DD4BF]/20 text-[#2DD4BF] border-0 text-xs">Live</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1F2933]/50 rounded-xl p-4">
                <div className="text-xs text-[#9CA3AF] mb-1">This Month</div>
                <div className="text-2xl font-bold">₹4.8L</div>
                <div className="text-xs text-[#22C55E]">+18% vs last month</div>
              </div>
              <div className="bg-[#1F2933]/50 rounded-xl p-4">
                <div className="text-xs text-[#9CA3AF] mb-1">ML Revenue Gain</div>
                <div className="text-2xl font-bold text-[#2DD4BF]">₹72K</div>
                <div className="text-xs text-[#9CA3AF]">From pricing optimization</div>
              </div>
            </div>
            <div className="h-40 flex items-end gap-1">
              {[65, 72, 58, 80, 68, 90, 75, 85, 62, 95, 78, 88, 70, 92, 66, 82, 74, 86, 69, 91].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#22C55E] to-[#2DD4BF]/50 rounded-t transition-all"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Infrastructure & Maintenance Section
const MaintenanceSection = () => (
  <section className="py-16 md:py-24 px-6 md:px-12" data-testid="maintenance-section">
    <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-12 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Infrastructure that <span className="italic-accent">protects</span> your investment
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Track maintenance schedules, log repairs, monitor turf condition, and understand
          how downtime impacts your revenue. No more surprise breakdowns.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Wrench, title: 'Repair Tracking', desc: 'Log and track all repairs with cost analysis', color: 'text-orange-400' },
          { icon: Clock, title: 'Maintenance Logs', desc: 'Schedule preventive maintenance automatically', color: 'text-blue-400' },
          { icon: Shield, title: 'Turf Condition', desc: 'Monitor wear and tear with condition scores', color: 'text-[#22C55E]' },
          { icon: AlertCircle, title: 'Downtime Impact', desc: 'See exactly how maintenance affects revenue', color: 'text-red-400' },
        ].map((item, i) => (
          <Card key={i} className="card-surface p-5 animate-on-scroll" style={{ animationDelay: `${i * 100}ms` }}>
            <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
            <h4 className="font-semibold mb-2">{item.title}</h4>
            <p className="text-xs text-[#9CA3AF]">{item.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// Pricing Section
const PricingSection = ({ onDemoClick }) => (
  <section id="pricing" className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden" data-testid="pricing-section">
    {/* Background Animation */}
    <div className="absolute inset-0 z-0">
      <Antigravity
        count={300}
        magnetRadius={6}
        ringRadius={7}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={1.5}
        lerpSpeed={0.05}
        color="#39FF14"
        autoAnimate
        particleVariance={1}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={3}
        particleShape="capsule"
        fieldStrength={10}
      />
      <div className="absolute inset-0 bg-[#0B0F0E]/40 backdrop-blur-[1px] pointer-events-none"></div>
    </div>

    <div className="max-w-[1200px] mx-auto relative z-10 pointer-events-none">
      <div className="text-center mb-12 animate-on-scroll pointer-events-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-[#9CA3AF]">No hidden fees. Scale as you grow.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          {
            name: 'Starter',
            price: '₹2,999',
            period: '/month',
            desc: 'Perfect for single turf operators',
            features: ['1 Turf', 'Unified booking system', 'Basic analytics', 'Email support'],
            featured: false,
          },
          {
            name: 'Professional',
            price: '₹7,999',
            period: '/month',
            desc: 'For growing turf businesses',
            features: ['Up to 5 Turfs', 'ML pricing suggestions', 'Advanced analytics', 'Maintenance tracking', 'Priority support'],
            featured: true,
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            desc: 'For large-scale operators',
            features: ['Unlimited Turfs', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee', 'On-premise option'],
            featured: false,
          },
        ].map((plan, i) => (
          <div key={i} className="animate-on-scroll pointer-events-auto relative" style={{ animationDelay: `${i * 100}ms` }}>
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-[#0B0F0E] text-[11px] font-semibold px-3 py-1 rounded-full z-20 shadow-lg">
                Most Popular
              </div>
            )}
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.15} /* Reduced for subtlety */
              glareAngle={-30}
              glareSize={200}
              transitionDuration={800}
              background="transparent"
              borderRadius="12px"
            >
              <Card
                className={`card-surface pricing-card p-6 h-full ${plan.featured ? 'featured' : ''}`}
                style={{
                  background: 'rgba(11, 15, 14, 0.3)', /* More transparent for glass effect */
                  border: 'none', /* Let GlareHover handle border or keep it subtle */
                }}
                data-testid={`pricing-${plan.name.toLowerCase()}`}
              >
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-[#9CA3AF]">{plan.period}</span>
                </div>
                <p className="text-xs text-[#9CA3AF] mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={onDemoClick}
                  className={`w-full py-3 rounded-lg text-sm font-medium ${plan.featured ? 'btn-primary' : 'btn-outline'
                    }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </Card>
            </GlareHover>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// FAQ Section
const FAQSection = () => {
  const faqs = [
    {
      q: 'How does Namma Turf handle walk-in bookings?',
      a: 'Managers can quickly log walk-in customers through the app in seconds. The system automatically checks availability, prevents double bookings, and syncs with online/call bookings in real-time.',
    },
    {
      q: 'Can I use Namma Turf for multiple locations?',
      a: 'Yes! Our Professional and Enterprise plans support multiple turfs. You get a unified dashboard to manage all locations, with individual analytics for each turf.',
    },
    {
      q: 'How accurate is the ML pricing suggestion?',
      a: 'Our ML model achieves 94% accuracy in revenue prediction. It analyzes historical data, local events, weather patterns, and competitor pricing to suggest optimal rates.',
    },
    {
      q: 'Is there a mobile app for managers?',
      a: 'Yes, we have dedicated mobile apps for both iOS and Android. Managers can handle all operations on-the-go, while owners can track performance from anywhere.',
    },
    {
      q: 'What kind of support do you offer?',
      a: 'Starter plans include email support. Professional plans get priority support with 4-hour response time. Enterprise customers get a dedicated account manager and phone support.',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12" data-testid="faq-section">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="card-surface rounded-xl px-6 border-0 animate-on-scroll"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#9CA3AF] pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ onDemoClick }) => (
  <section id="contact" className="py-16 md:py-24 px-6 md:px-12 bg-[#111827]/30" data-testid="contact-section">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready to transform your turf operations?
          </h2>
          <p className="text-[#9CA3AF] mb-8">
            Get in touch with our team for a personalized demo. See how Namma Turf
            can help you increase revenue and streamline operations.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <div className="text-sm text-[#9CA3AF]">Email</div>
                <div className="font-medium">hello@nammaturf.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <div className="text-sm text-[#9CA3AF]">Phone</div>
                <div className="font-medium">+91 98765 43210</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <div className="text-sm text-[#9CA3AF]">Office</div>
                <div className="font-medium">Bangalore, India</div>
              </div>
            </div>
          </div>
        </div>

        <Card className="card-surface card-large p-6 animate-on-scroll delay-200">
          <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
          <ContactForm />
        </Card>
      </div>
    </div>
  </section>
);

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-[#22C55E] mx-auto mb-4" />
        <h4 className="font-semibold mb-2">Message Sent!</h4>
        <p className="text-sm text-[#9CA3AF]">We&apos;ll get back to you within 24 hours.</p>
        <Button
          onClick={() => setSubmitted(false)}
          className="mt-4 btn-outline px-4 py-2 rounded-lg text-sm"
        >
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-dark w-full px-4 py-3 rounded-lg text-sm"
          required
          data-testid="contact-name-input"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input-dark w-full px-4 py-3 rounded-lg text-sm"
          required
          data-testid="contact-email-input"
        />
      </div>
      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        className="input-dark w-full px-4 py-3 rounded-lg text-sm"
        required
        data-testid="contact-subject-input"
      />
      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="input-dark w-full px-4 py-3 rounded-lg text-sm min-h-[120px] resize-none"
        required
        data-testid="contact-message-input"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
        data-testid="contact-submit-btn"
      >
        {isSubmitting ? (
          <>
            <div className="spinner"></div>
            Sending...
          </>
        ) : (
          <>
            Send Message <Send className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
};

// Demo Request Modal
const DemoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    turfs_count: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/demo-request`, formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting demo request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      turfs_count: '',
      message: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111827] border-[#1F2933] max-w-md" data-testid="demo-modal">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex justify-center pb-2">
            <img
              src="/nama_turF_LOGO.png"
              alt="Namma Turf"
              className="h-10 w-auto object-contain"
            />
          </DialogTitle>
          <DialogDescription className="text-[#9CA3AF] text-center">
            Experience the future of turf management. Schedule your personalized demo today.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-[#22C55E] mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Demo Request Received!</h4>
            <p className="text-sm text-[#9CA3AF] mb-6">
              Our team will reach out within 24 hours to schedule your personalized demo.
            </p>
            <Button onClick={resetForm} className="btn-primary px-6 py-2 rounded-lg">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="demo-form">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-dark w-full px-4 py-3 rounded-lg text-sm"
              required
              data-testid="demo-name-input"
            />
            <input
              type="email"
              placeholder="Work Email *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-dark w-full px-4 py-3 rounded-lg text-sm"
              required
              data-testid="demo-email-input"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="input-dark w-full px-4 py-3 rounded-lg text-sm"
                data-testid="demo-company-input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-dark w-full px-4 py-3 rounded-lg text-sm"
                data-testid="demo-phone-input"
              />
            </div>
            <select
              value={formData.turfs_count}
              onChange={(e) => setFormData({ ...formData, turfs_count: e.target.value })}
              className="input-dark w-full px-4 py-3 rounded-lg text-sm"
              data-testid="demo-turfs-select"
            >
              <option value="">Number of Turfs</option>
              <option value="1">1 Turf</option>
              <option value="2-5">2-5 Turfs</option>
              <option value="6-10">6-10 Turfs</option>
              <option value="10+">10+ Turfs</option>
            </select>
            <textarea
              placeholder="Tell us about your requirements (optional)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input-dark w-full px-4 py-3 rounded-lg text-sm min-h-[80px] resize-none"
              data-testid="demo-message-input"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              data-testid="demo-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Request Demo <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Footer Component
const Footer = () => (
  <footer className="py-12 px-6 md:px-12 border-t border-[#1F2933]" data-testid="footer">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <Logo />
          <p className="text-sm text-[#9CA3AF] mt-4">
            India&apos;s first Turf Operating System. Built for modern sports infrastructure.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            {['Features', 'Pricing', 'Analytics', 'Integrations'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="footer-link text-sm">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
              <li key={item}>
                <a href="#" className="footer-link text-sm">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <li key={item}>
                <a href="#" className="footer-link text-sm">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-divider mb-8"></div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-[#9CA3AF]">
          © 2025 Namma Turf. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#9CA3AF]">Made with</span>
          <span className="text-[#22C55E]">♥</span>
          <span className="text-sm text-[#9CA3AF]">in Bangalore</span>
        </div>
      </div>
    </div>
  </footer>
);

// Main App Component
function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useScrollAnimation();

  return (
    <div className="min-h-screen" data-testid="namma-turf-app">
      <Navbar onDemoClick={() => setIsDemoModalOpen(true)} />

      <main>
        <HeroSection onDemoClick={() => setIsDemoModalOpen(true)} />
        <TrustedBySection />
        <FeaturesSection />
        <AnalyticsSection />
        <MaintenanceSection />
        <PricingSection onDemoClick={() => setIsDemoModalOpen(true)} />
        <FAQSection />
        <ContactSection onDemoClick={() => setIsDemoModalOpen(true)} />
      </main>

      <Footer />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}

export default App;
