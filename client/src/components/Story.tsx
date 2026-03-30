"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Story = () => {
  return (
    <section id="our-story" className="section-container bg-surface overflow-hidden">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="md:col-span-5 z-10"
        >
          <span className="font-script text-tertiary text-4xl mb-2 block">The Beginning</span>
          <h2 className="text-5xl md:text-6xl mb-8 leading-tight">
            A journey that started with a single look.
          </h2>
          <div className="space-y-6 text-lg text-on-surface/80 leading-relaxed font-sans">
            <p>
              Seven years ago, amidst the bustling energy of a lazy afternoon in Paris, 
              Julian and Isabella crossed paths at a small bookstore in Le Marais.
            </p>
            <p>
              What began as a brief conversation about vintage poetry transformed into 
              a lifetime of shared sunsets and quiet morning coffees.
            </p>
          </div>
        </motion.div>

        {/* Image Content - Asymmetric Bleed */}
        <motion.div
           initial={{ opacity: 0, x: 50, scale: 1.05 }}
           whileInView={{ opacity: 1, x: 0, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2 }}
           className="md:col-span-7 relative"
        >
          <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-ambient">
            <Image
              src="/images/story.png"
              alt="Julian and Isabella in Paris"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Accent Element */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-surface-low rounded-full -z-10 blur-3xl opacity-60" />
        </motion.div>
      </div>

      <div className="mt-32 grid md:grid-cols-12 gap-12 items-center flex-row-reverse">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="md:col-span-6 md:order-2"
        >
          <div className="aspect-[16/10] relative rounded-2xl overflow-hidden shadow-ambient mb-8">
            <Image
              src="/images/reception.png"
              alt="The Proposal"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:col-span-6 md:order-1"
        >
           <h3 className="text-3xl mb-4 italic">The Proposal</h3>
           <p className="text-lg text-on-surface/80 leading-relaxed">
             Under the velvet sky of the Amalfi Coast, Julian asked the question that would 
             change their lives forever. It wasn't about the grand gesture, but the promise 
             of a thousand small moments yet to come.
           </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
