// HPI 1.7-G
import React, { useState, useRef, useEffect } from 'react';
import { useMember } from '@/integrations';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  Shield, 
  Zap, 
  ChevronRight, 
  Activity, 
  Lock, 
  Globe, 
  Cpu, 
  ArrowRight,
  Terminal,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// --- Mock Data for Visualizations (Purely Decorative) ---
const MOCK_CHART_DATA = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
];

const TICKER_ITEMS = [
  "BTC-USD +2.4%", "ETH-USD -1.2%", "EXP-TRACKER ONLINE", "SYSTEM SECURE", "QUANTUM CORE ACTIVE", "DATA ENCRYPTED", "SYNC COMPLETE"
];

export default function HomePage() {
  const { isAuthenticated, actions } = useMember();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/expenses');
    } else {
      actions.login();
    }
  };

  // --- Scroll Progress for Parallax ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const rotateGrid = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-clip selection:bg-accent-teal/30 selection:text-accent-teal font-paragraph relative">
      
      {/* Global Background Grid & Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <motion.div 
          style={{ y: yBackground, rotateX: rotateGrid }}
          className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_800px_at_50%_-100px,#00FFFF,transparent)]" 
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://static.wixstatic.com/media/0e4ba9_c7408475fe9344ada956a9a703d0f7a3~mv2.png?originWidth=1152&originHeight=576" 
             alt="Quantum Background" 
             className="w-full h-full object-cover opacity-10 mix-blend-screen"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="container relative z-10 px-6 grid lg:grid-cols-12 gap-12 items-center w-full max-w-[120rem]">
          {/* Hero Text */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-teal/30 bg-accent-teal/5 text-accent-teal text-xs font-heading tracking-widest uppercase mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
                System v2.0 Online
              </div>
              <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                QUANTUM <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-accent-magenta">FINANCE</span>
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed border-l-2 border-accent-magenta/50 pl-6">
                Transcending traditional expense tracking. Enter a new dimension of financial clarity with real-time analytics, military-grade encryption, and a zero-latency interface.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-6"
            >
              <Button
                onClick={handleGetStarted}
                className="group relative overflow-hidden bg-accent-teal text-primary-foreground font-heading text-lg px-10 py-8 rounded-none clip-path-polygon hover:bg-accent-teal/90 transition-all"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isAuthenticated ? 'ENTER DASHBOARD' : 'INITIALIZE SYSTEM'}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
              
              {!isAuthenticated && (
                <Button
                  onClick={actions.login}
                  variant="outline"
                  className="group border-accent-magenta text-accent-magenta font-heading text-lg px-10 py-8 rounded-none hover:bg-accent-magenta/10 transition-all"
                  style={{ clipPath: 'polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)' }}
                >
                  SECURE LOGIN
                </Button>
              )}
            </motion.div>
          </div>

          {/* Hero Visual - Abstract Dashboard */}
          <div className="lg:col-span-5 relative h-[600px] hidden lg:block perspective-1000">
            <HeroDashboardVisual />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll to Scan</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-accent-teal to-transparent" />
        </motion.div>
      </section>

      {/* --- INFINITE TICKER --- */}
      <div className="w-full bg-background border-y border-white/5 py-4 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-4 mx-8 text-sm font-paragraph text-muted-foreground/60">
              <Activity className="w-3 h-3 text-accent-teal" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* --- STICKY NARRATIVE SECTION --- */}
      <section className="relative w-full max-w-[120rem] mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Left: Sticky Visual */}
          <div className="hidden lg:block relative h-[200vh]">
            <div className="sticky top-32 w-full h-[600px] bg-background/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-magenta/5" />
              
              {/* Dynamic Content inside Sticky Container */}
              <div className="relative h-full w-full p-8 flex flex-col">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="font-paragraph text-xs text-muted-foreground">SYSTEM_MONITOR.EXE</div>
                </div>
                
                <div className="flex-1 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_CHART_DATA}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#4A4A6A" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#4A4A6A" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1A2E', borderColor: '#00FFFF', color: '#fff' }}
                        itemStyle={{ color: '#00FFFF' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#00FFFF" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-10 bg-background/80 backdrop-blur border border-accent-magenta/30 p-4 rounded-lg shadow-[0_0_20px_rgba(255,0,255,0.2)]"
                  >
                    <div className="text-xs text-muted-foreground mb-1">Monthly Cap</div>
                    <div className="text-xl font-heading text-accent-magenta">$12,450.00</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Scrolling Content */}
          <div className="flex flex-col gap-[40vh] py-[10vh]">
            <FeatureBlock 
              icon={Wallet}
              title="Hyper-Speed Tracking"
              description="Record expenses at the speed of thought. Our optimized database ensures zero-latency inputs and instant categorization."
              color="text-accent-teal"
            />
            <FeatureBlock 
              icon={Shield}
              title="Quantum Encryption"
              description="Your financial data is secured with military-grade AES-256 encryption. Privacy is not an option; it is the default state."
              color="text-accent-magenta"
            />
            <FeatureBlock 
              icon={Zap}
              title="Predictive Analytics"
              description="AI-driven algorithms analyze your spending patterns to forecast future expenses and optimize your budget automatically."
              color="text-accent-teal"
            />
            <FeatureBlock 
              icon={Globe}
              title="Global Sync"
              description="Access your financial command center from any node in the network. Real-time synchronization across all devices."
              color="text-accent-magenta"
            />
          </div>
        </div>
      </section>

      {/* --- FULL BLEED IMAGE BREAK --- */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image 
            src="https://static.wixstatic.com/media/0e4ba9_e2b7b8452fdd401e9211f3aa534f5905~mv2.png?originWidth=1920&originHeight=1280" 
            alt="Abstract Data Flow" 
            className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
          />
          <div className="absolute inset-0 bg-background/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-2xl">
              DATA IS THE NEW <span className="text-accent-teal">CURRENCY</span>
            </h2>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Stop guessing. Start knowing. Visualize your financial flow with absolute precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- GRID FEATURES --- */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-32">
        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-3xl">
          {[
            { title: "Real-time Sync", icon: Activity, desc: "Instant database updates." },
            { title: "Secure Vault", icon: Lock, desc: "End-to-end encryption." },
            { title: "Smart Categories", icon: Terminal, desc: "Auto-tagging system." },
            { title: "Export Data", icon: ArrowRight, desc: "CSV & PDF reports." },
            { title: "Budget Alerts", icon: BarChart3, desc: "Custom threshold notifications." },
            { title: "Cloud Backup", icon: Cpu, desc: "Redundant storage nodes." },
          ].map((item, idx) => (
            <div key={idx} className="group relative bg-background p-12 hover:bg-white/[0.02] transition-colors">
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <item.icon className="w-6 h-6 text-accent-teal" />
              </div>
              <h3 className="font-heading text-2xl mb-4 text-foreground group-hover:text-accent-teal transition-colors">{item.title}</h3>
              <p className="font-paragraph text-sm text-muted-foreground">{item.desc}</p>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-teal/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent-teal/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1),transparent_70%)]" />
        
        <div className="container relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-heading text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              READY TO UPGRADE?
            </h2>
            <p className="font-paragraph text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the financial revolution. Initialize your personal quantum ledger today.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <Button
                onClick={handleGetStarted}
                className="h-16 px-12 bg-accent-magenta hover:bg-accent-magenta/80 text-white font-heading text-xl rounded-full shadow-[0_0_30px_rgba(255,0,255,0.4)] hover:shadow-[0_0_50px_rgba(255,0,255,0.6)] transition-all duration-300"
              >
                {isAuthenticated ? 'ACCESS TERMINAL' : 'START FREE TRIAL'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* Custom Styles for specific effects */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .clip-path-polygon {
          clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

// --- Sub-Components ---

function FeatureBlock({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-4 p-8 border-l-2 border-white/10 hover:border-accent-teal transition-colors bg-gradient-to-r from-white/[0.02] to-transparent"
    >
      <div className={`p-3 w-fit rounded-lg bg-white/5 ${color}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-heading text-3xl font-bold">{title}</h3>
      <p className="font-paragraph text-muted-foreground leading-relaxed text-lg">
        {description}
      </p>
    </motion.div>
  );
}

function HeroDashboardVisual() {
  return (
    <motion.div 
      initial={{ rotateX: 20, rotateY: -20, opacity: 0 }}
      animate={{ rotateX: 10, rotateY: -10, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full h-full"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Main Card */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border border-accent-teal/30 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.15)] p-6 flex flex-col gap-4 transform transition-transform hover:translate-z-10">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="w-32 h-4 bg-white/10 rounded animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-accent-teal/20" />
        </div>
        <div className="flex-1 grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white/5 rounded-lg border border-white/5 p-4">
            <div className="w-full h-full flex items-end gap-2">
              {[40, 70, 50, 90, 60, 80].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  className="flex-1 bg-gradient-to-t from-accent-teal/50 to-accent-teal rounded-t-sm"
                />
              ))}
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <div className="flex-1 bg-accent-magenta/10 rounded-lg border border-accent-magenta/20 p-4 flex flex-col justify-center items-center">
              <div className="text-accent-magenta font-heading text-2xl">$4k</div>
              <div className="text-[10px] text-muted-foreground">SPENT</div>
            </div>
            <div className="flex-1 bg-accent-teal/10 rounded-lg border border-accent-teal/20 p-4 flex flex-col justify-center items-center">
              <div className="text-accent-teal font-heading text-2xl">+12%</div>
              <div className="text-[10px] text-muted-foreground">SAVED</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements behind/around */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-10 top-20 w-48 h-32 bg-background/90 backdrop-blur border border-white/20 rounded-xl p-4 shadow-2xl z-20"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded bg-accent-magenta/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-accent-magenta" />
          </div>
          <div className="text-sm font-heading">Alert</div>
        </div>
        <div className="text-xs text-muted-foreground">Budget threshold reached for category: <span className="text-white">Tech</span></div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-10 bottom-20 w-56 h-24 bg-background/90 backdrop-blur border border-accent-teal/30 rounded-xl p-4 shadow-2xl z-20 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-full border-2 border-accent-teal flex items-center justify-center">
          <Shield className="w-5 h-5 text-accent-teal" />
        </div>
        <div>
          <div className="text-sm font-heading text-accent-teal">Secure</div>
          <div className="text-xs text-muted-foreground">Encryption Active</div>
        </div>
      </motion.div>
    </motion.div>
  );
}