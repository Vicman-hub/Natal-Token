import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import icon from "../assets/icon.png";

// central config
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/presale", label: "Presale" },
  { to: "/airdrop", label: "Airdrop" },
  { to: "/roadmap", label: "Roadmap" },
];

const BUY_URL =
  "https://pancakeswap.finance/add/BNB/0x6167D85E83C147E25B35b2445CBB9C2EB90673b1/500?chain=bsc";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={icon}
            alt="Natal Token"
            className="w-24 sm:w-32 md:w-40 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Buy Button (FIXED) */}
          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-primary text text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-soft hover:opacity-90 transition-opacity"
          >
            Buy NATAL
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden text-foreground"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-4 p-4">

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${
                    isActive(link.to)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Buy Button (same behavior) */}
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="gradient-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold text-center shadow-soft hover:opacity-90 transition-opacity"
              >
                Buy NATAL
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;