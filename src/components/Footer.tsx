import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-accent-teal/20 bg-background/80 backdrop-blur-xl">
      <div className="max-w-[100rem] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-teal to-accent-magenta rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl text-foreground">
                Quantum Expense
              </span>
            </div>
            <p className="font-paragraph text-sm text-muted-foreground max-w-md mb-4">
              Experience the future of financial management with our cutting-edge expense tracking system. Built with advanced technology for modern users.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/50 backdrop-blur-xl rounded-lg border border-accent-teal/20 flex items-center justify-center hover:border-accent-teal/40 transition-all"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-accent-teal transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/50 backdrop-blur-xl rounded-lg border border-accent-teal/20 flex items-center justify-center hover:border-accent-teal/40 transition-all"
              >
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-accent-teal transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/50 backdrop-blur-xl rounded-lg border border-accent-teal/20 flex items-center justify-center hover:border-accent-teal/40 transition-all"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-accent-teal transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="font-paragraph text-sm text-muted-foreground hover:text-accent-teal transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/expenses"
                  className="font-paragraph text-sm text-muted-foreground hover:text-accent-teal transition-colors"
                >
                  Expenses
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="font-paragraph text-sm text-muted-foreground hover:text-accent-teal transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-sm text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#documentation"
                  className="font-paragraph text-sm text-muted-foreground hover:text-accent-teal transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="font-paragraph text-sm text-muted-foreground hover:text-accent-teal transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="font-paragraph text-sm text-muted-foreground hover:text-accent-teal transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="font-paragraph text-sm text-muted-foreground hover:text-accent-teal transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-accent-teal/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-muted-foreground">
              © {currentYear} Quantum Expense Tracker. All rights reserved.
            </p>
            <p className="font-paragraph text-sm text-muted-foreground">
              Built with <span className="text-accent-magenta">♥</span> using cutting-edge technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
