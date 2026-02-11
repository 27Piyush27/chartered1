import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationBell } from "@/components/NotificationBell";

export const Navigation = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, role, signOut, loading } = useAuth();

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("darkMode", String(newDark));
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
    ...((role === "admin" || role === "ca") ? [{ name: "Admin", path: "/admin" }] : []),
  ];

  const displayName = profile?.name || user?.email?.split("@")[0] || "";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/60 backdrop-blur-xl backdrop-saturate-150 border-b border-border/30 shadow-subtle"
          : "bg-background/80 backdrop-blur-sm border-b border-border/50"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-xl font-medium tracking-tight transition-all duration-300 group-hover:tracking-normal">
              GMR<span className="text-accent">&</span>Associates
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-colors duration-300 link-underline relative ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            
            {!loading && user ? (
              <div className="flex items-center gap-4">
                <NotificationBell />
                <span className="text-sm text-muted-foreground">{displayName}</span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : !loading ? (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/auth?signup=true">Get Started</Link>
                </Button>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm py-2 block transition-colors ${
                      location.pathname === link.path
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <button
                  onClick={toggleTheme}
                  className="text-sm text-muted-foreground flex items-center gap-2"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {isDark ? "Light" : "Dark"} Mode
                </button>
              </div>
              
              {!loading && user ? (
                <Button onClick={handleLogout} variant="outline" className="w-full">
                  Sign Out
                </Button>
              ) : !loading ? (
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/auth">Login</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth?signup=true">Get Started</Link>
                  </Button>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
