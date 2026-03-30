"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";

const EventCard = ({ title, time, location, address, icon: Icon }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-10 rounded-2xl shadow-ambient text-center group hover:-translate-y-2 transition-transform duration-500"
  >
    <div className="w-16 h-16 bg-surface-low rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary/10 transition-colors">
      <Icon className="text-tertiary w-8 h-8" />
    </div>
    <h3 className="text-2xl mb-4">{title}</h3>
    <div className="space-y-2 text-on-surface/70">
      <div className="flex items-center justify-center space-x-2">
        <Clock size={16} />
        <span className="text-sm uppercase tracking-widest">{time}</span>
      </div>
      <p className="font-medium text-on-surface">{location}</p>
      <p className="text-sm">{address}</p>
    </div>
  </motion.div>
);

const EventDetails = () => {
  return (
    <section id="event-details" className="bg-surface-low py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="font-sans uppercase tracking-[0.4em] text-xs mb-4 block opacity-60">OUR CELEBRATION</span>
          <h2 className="text-5xl md:text-6xl mb-6 font-serif">Tuesday, April 14, 2026</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <EventCard
            title="The Ceremony"
            time="4:00 PM - 5:00 PM"
            location="St. Jude's Garden Chapel"
            address="123 Willow Lane, Sonoma, CA"
            icon={Calendar}
          />
          <EventCard
            title="The Reception"
            time="6:00 PM - 11:00 PM"
            location="The Silver Stone Vineyard"
            address="456 Vineyard Way, Sonoma, CA"
            icon={MapPin}
          />
          <EventCard
            title="The Farewell"
            time="11:30 PM"
            location="Vines & Roses Ballroom"
            address="789 Valley View Dr, Sonoma, CA"
            icon={Clock}
          />
        </div>

        <div className="mt-20 glass-card p-12 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 max-w-lg">
            <h3 className="text-3xl mb-4 font-serif">Finding Your Way</h3>
            <p className="text-on-surface/70 mb-6">
              The venue is located in the heart of Sonoma Valley. For those traveling from afar, we recommend staying at the Estate Lodge.
            </p>
            <div className="space-y-4">
               <div className="flex items-center space-x-3 text-tertiary">
                 <MapPin size={20} />
                 <span>Sonoma Valley, California</span>
               </div>
               <div className="flex items-center space-x-3 text-tertiary">
                 <Clock size={20} />
                 <span>Complimentary Valet Provided</span>
               </div>
            </div>
            <button className="btn-primary mt-10">Get Directions</button>
          </div>
          
          <div className="w-full md:w-1/2 aspect-video bg-surface-highest rounded-xl overflow-hidden relative shadow-inner">
             {/* Mock Map Placeholder */}
             <div className="absolute inset-0 flex items-center justify-center opacity-30 grayscale">
                <MapPin size={48} />
             </div>
             <div className="absolute inset-0 bg-gradient-to-tr from-tertiary/5 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
