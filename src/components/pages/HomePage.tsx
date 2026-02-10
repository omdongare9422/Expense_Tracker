import React from 'react';
import { useMember } from '@/integrations';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  PieChart,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const { isAuthenticated, actions } = useMember();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/expenses');
    } else {
      actions.login();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-secondary-foreground text-xs font-medium tracking-wide uppercase mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Smart Finance V1.0
                </div>
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
                  Master Your <br />
                  <span className="text-primary">Financial Future</span>
                </h1>
                <p className="font-paragraph text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
                  Effortlessly track expenses, analyze spending habits, and optimize your budget with our intuitive and secure platform.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  {!isAuthenticated && (
                    <Button
                      onClick={actions.login}
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto text-lg px-8 h-14 rounded-full border-border hover:bg-secondary/50"
                    >
                      Log In
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-border bg-card"
              >
                <div className="aspect-[4/3] bg-muted/20 relative flex items-center justify-center overflow-hidden">
                  {/* Abstract UI Representation */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/20" />
                  <div className="w-3/4 h-3/4 bg-background rounded-xl shadow-xl flex flex-col p-6 z-10 border border-border/50">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-24 h-4 bg-muted/40 rounded animate-pulse" />
                      <div className="w-8 h-8 rounded-full bg-primary/10" />
                    </div>
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1 h-24 rounded-lg bg-primary/5 border border-primary/10" />
                      <div className="flex-1 h-24 rounded-lg bg-secondary/20 border border-border" />
                    </div>
                    <div className="space-y-3">
                      <div className="w-full h-12 rounded-lg bg-muted/10" />
                      <div className="w-full h-12 rounded-lg bg-muted/10" />
                      <div className="w-full h-12 rounded-lg bg-muted/10" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGE SECTION --- */}
      <section className="py-10 border-y border-border bg-muted/30">
        <div className="container px-6 mx-auto text-center">
          <p className="text-sm font-medium text-muted-foreground mb-6">TRUSTED BY FORWARD-THINKING INDIVIDUALS</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60">
            {['Stripe', 'Revenue', 'Monarch', 'Y-Combinator'].map((bg, i) => (
              <div key={i} className="flex items-center gap-2 font-bold text-xl text-foreground">
                <div className="w-6 h-6 rounded bg-foreground/20" /> {bg}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-background">
        <div className="container px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-foreground">Everything you need to manage expenses</h2>
            <p className="text-lg text-muted-foreground">Stop relying on spreadsheets. Our platform gives you the visibility and control you need.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={PieChart}
              title="Visual Analytics"
              description="Understand where your money goes with beautiful, interactive charts and comprehensive breakdowns."
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Tracking"
              description="Log expenses instantly from any device. Your data syncs automatically across all platforms."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Bank-Grade Security"
              description="Your financial data is encrypted and protected with industry-leading security standards."
            />
          </div>
        </div>
      </section>

      {/* --- PREVIEW SECTION --- */}
      <section className="py-24 bg-secondary/10">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff0855?q=80&w=2072&auto=format&fit=crop"
                  alt="Dashboard Preview"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
              <h3 className="text-secondary-foreground font-medium mb-2 uppercase tracking-warns">Analyze & Optimize</h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading text-foreground">
                Turn data into insights
              </h2>
              <ul className="space-y-6">
                {[
                  "Track spending by category and date",
                  "Set monthly budgets and get alerts",
                  "Export reports for tax season",
                  "Manage subscriptions in one place"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-primary">
        <div className="container px-6 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-foreground font-heading">
            Ready to take control?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Join thousands of users who are already managing their finances smarter, not harder.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            variant="secondary"
            className="text-lg px-10 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            {isAuthenticated ? 'Open Dashboard' : 'Start Your Free Trial'}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow duration-300">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-3 font-heading text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
