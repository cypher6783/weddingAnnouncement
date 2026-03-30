"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

/**
 * Premium Gallery Slider Component
 * A center-focused, interactive gallery experience with autoplay and tactile transitions.
 */
const Gallery = () => {
  const images = [
    { src: "/images/gallery_ceremony.png", alt: "Ceremony", caption: "The Vow Under the Golden Sun" },
    { src: "/images/hero.png", alt: "Julian & Isabella", caption: "A Love That Transcends" },
    { src: "/images/gallery_travel.png", alt: "Paris", caption: "Moonlit Streets of Paris" },
    { src: "/images/reception.png", alt: "Rehearsal", caption: "Laughter Over Vineyard Nights" },
    { src: "/images/gallery_dance.png", alt: "The First Dance", caption: "Lost in Our Own Symphony" },
    { src: "/images/story.png", alt: "Engaged", caption: "The Day You Said Yes" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Autoplay Logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  // Scroll/Wheel Navigation Logic
  const lastScrollTime = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 600) return; // 600ms debounce for premium feel

    const sensitivity = 30;
    if (Math.abs(e.deltaX) > sensitivity || Math.abs(e.deltaY) > sensitivity) {
      if (e.deltaX > sensitivity || e.deltaY > sensitivity) {
        handleNext();
      } else {
        handlePrev();
      }
      lastScrollTime.current = now;
    }
  };

  return (
    <section id="moment-gallery" className="bg-surface py-32 overflow-hidden relative">
      <div className="section-container pb-0">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            className="font-sans uppercase tracking-[0.4em] text-[10px] md:text-xs text-on-surface mb-4 block"
          >
            OUR GALLERY
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif text-[#1a1a1a] mb-6"
          >
            Capturing Forever
          </motion.h2>
          <div className="w-24 h-px bg-tertiary/30 mx-auto" />
        </div>
      </div>

      <div 
        className="relative px-0 md:px-12 outline-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onWheel={handleWheel}
      >
        <div className="flex items-center justify-center relative min-h-[500px] md:min-h-[700px]">
          <AnimatePresence mode="popLayout" initial={false}>
            {images.map((img, i) => {
              const position = (i - activeIndex + images.length) % images.length;
              
              // Only render adjacent images for performance and focus
              if (position > 2 && position < images.length - 2) return null;

              const isCenter = position === 0;
              const isLeft = position === images.length - 1;
              const isRight = position === 1;

              return (
                <motion.div
                  key={i}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                    if (swipe && offset.x > 0) {
                      handlePrev();
                    } else if (swipe && offset.x < 0) {
                      handleNext();
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.8, x: isLeft ? -300 : isRight ? 300 : 0 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale: isCenter ? 1 : 0.85,
                    x: isCenter ? 0 : isLeft ? "-90%" : isRight ? "90%" : 0,
                    zIndex: isCenter ? 20 : 10,
                  }}
                  whileHover={{ cursor: isCenter ? 'grab' : 'pointer' }}
                  whileTap={{ cursor: isCenter ? 'grabbing' : 'pointer' }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                  className={`absolute w-[85vw] md:w-[600px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ${
                    !isCenter ? "filter blur-[2px] pointer-events-none" : ""
                  }`}
                  onClick={() => isCenter ? null : setActiveIndex(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority={isCenter}
                  />
                  {isCenter && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    >
                      <span className="text-white/60 text-[10px] uppercase tracking-widest block mb-1">Moment {i + 1}</span>
                      <h3 className="text-white font-serif text-2xl md:text-3xl italic">{img.caption}</h3>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 md:px-24 z-30 pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-tertiary hover:bg-white transition-all pointer-events-auto shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-tertiary hover:bg-white transition-all pointer-events-auto shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Improved Pagination Progress */}
        <div className="flex justify-center mt-12 space-x-3 items-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="group py-4 px-2"
            >
              <div className={`h-1 rounded-full transition-all duration-500 overflow-hidden ${
                i === activeIndex ? "w-10 bg-tertiary" : "w-2 bg-tertiary/20 group-hover:bg-tertiary/40"
              }`}>
                {i === activeIndex && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-tertiary"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-tertiary/40 to-transparent mb-8" />
          <p className="font-script text-4xl md:text-5xl text-tertiary/80 mb-4">
            And the story continues...
          </p>
          <p className="font-sans uppercase tracking-[0.3em] text-[10px] opacity-40">
            April 14, 2026 • Sonoma Valley
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
