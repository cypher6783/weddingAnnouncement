"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-surface py-20 border-t border-tertiary/10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-script text-5xl text-tertiary mb-12">Julian & Isabella</h2>
        
        <div className="flex justify-center space-x-8 mb-12">
            <a href="#" className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Registry</a>
            <a href="#" className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Contact</a>
            <Link href="/admin" className="text-xs uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Admin</Link>
        </div>

        <p className="text-[10px] uppercase tracking-widest opacity-40">
          © 2026 The Wedding. Forever & Always.
          <br />
          #TheJulianIsabellaWedding • April 14, 2026 • Sonoma, CA
        </p>
      </div>
    </footer>
  );
};

export default Footer;
