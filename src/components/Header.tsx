import { useMember } from '@/integrations';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Wallet } from 'lucide-react';
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
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="font-heading text-lg font-semibold text-foreground">
            SmartFinance
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors ${location.pathname === link.href
                  ? 'text-primary'
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
            <div className="w-20 h-9 bg-muted rounded-md animate-pulse"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                {member?.profile?.nickname || member?.contact?.firstName || 'User'}
              </span>
              <Button
                onClick={actions.logout}
                variant="outline"
                size="sm"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              onClick={actions.login}
              size="sm"
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
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${location.pathname === link.href
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="pt-4 border-t border-border">
                {isLoading ? (
                  <div className="w-full h-9 bg-muted rounded-md animate-pulse"></div>
                ) : isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-muted-foreground">
                      {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                    </div>
                    <Button
                      onClick={() => {
                        actions.logout();
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
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
                    className="w-full"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
