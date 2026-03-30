"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-surface/80 backdrop-blur-xl py-4 shadow-ambient" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="font-script text-3xl md:text-4xl text-tertiary">
          The Wedding
        </Link>
        
        <div className="hidden md:flex space-x-12 items-center">
          {["Our Story", "Moments", "Event Details"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm uppercase tracking-widest hover:text-tertiary transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link href="#rsvp" className="btn-primary py-2 px-6 text-sm">
            RSVP
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
