"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Countdown from "./Countdown";

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Julian & Isabella"
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="font-sans uppercase tracking-[0.4em] text-xs md:text-sm mb-4 block">
            ARE GETTING MARRIED
          </span>
          <h1 className="font-script text-7xl md:text-9xl mb-4">
            Julian & Isabella
          </h1>
          <p className="font-serif text-xl md:text-2xl italic">
            April 14, 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <Countdown targetDate="2026-04-14T16:00:00" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-60"
      >
        <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-white" />
      </motion.div>
    </section>
  );
};

export default Hero;
