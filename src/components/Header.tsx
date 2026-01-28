import { useMember } from '@/integrations';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    ...(isAuthenticated ? [{ href: '/expenses', label: 'Expenses' }] : []),
    ...(isAuthenticated ? [{ href: '/profile', label: 'Profile' }] : []),
  ];

  return (
    <header className="w-full border-b border-accent-teal/20 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-teal to-accent-magenta rounded-lg flex items-center justify-center group-hover:opacity-80 transition-opacity">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl text-foreground hidden sm:block">
              Quantum Expense
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-paragraph text-sm transition-colors ${
                  location.pathname === link.href
                    ? 'text-accent-teal'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="w-20 h-10 bg-muted/20 rounded-lg animate-pulse"></div>
            ) : isAuthenticated ? (
              <>
                <span className="font-paragraph text-sm text-muted-foreground">
                  {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                </span>
                <Button
                  onClick={actions.logout}
                  variant="outline"
                  className="border-accent-magenta text-accent-magenta font-paragraph text-sm px-4 py-2 rounded-lg hover:bg-accent-magenta/10 transition-all"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={actions.login}
                className="bg-gradient-to-r from-accent-teal to-accent-magenta text-primary-foreground font-paragraph text-sm px-6 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-4 py-6 border-t border-accent-teal/20 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-paragraph text-sm transition-colors ${
                      location.pathname === link.href
                        ? 'text-accent-teal'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-accent-teal/20">
                  {isLoading ? (
                    <div className="w-full h-10 bg-muted/20 rounded-lg animate-pulse"></div>
                  ) : isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="font-paragraph text-sm text-muted-foreground">
                        {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                      </div>
                      <Button
                        onClick={() => {
                          actions.logout();
                          setMobileMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full border-accent-magenta text-accent-magenta font-paragraph text-sm px-4 py-2 rounded-lg hover:bg-accent-magenta/10 transition-all"
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        actions.login();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-accent-teal to-accent-magenta text-primary-foreground font-paragraph text-sm px-6 py-2 rounded-lg hover:opacity-90 transition-all"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
