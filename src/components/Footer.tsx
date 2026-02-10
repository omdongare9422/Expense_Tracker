import { Link } from 'react-router-dom';
import { Wallet, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="font-heading text-lg font-semibold text-foreground">
                SmartFinance
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Empowering you to make smarter financial decisions with powerful tracking and analytics.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://github.com" icon={Github} />
              <SocialLink href="https://twitter.com" icon={Twitter} />
              <SocialLink href="https://linkedin.com" icon={Linkedin} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/expenses" label="Expenses" />
              <FooterLink to="/features" label="Features" />
              <FooterLink to="/pricing" label="Pricing" />
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/careers" label="Careers" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} SmartFinance Inc. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <span className="text-red-500">♥</span> for better finances.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

function FooterLink({ to, label }: { to: string, label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        {label}
      </Link>
    </li>
  );
}
