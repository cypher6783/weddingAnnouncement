"use client";

import { useState, useEffect } from "react";

const CountdownItem = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center mx-4 md:mx-8">
    <span className="text-4xl md:text-6xl font-serif mb-1">{value.toString().padStart(2, '0')}</span>
    <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-70">{label}</span>
  </div>
);

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center py-8 border-t border-b border-white/20">
      <CountdownItem value={timeLeft.days} label="Days" />
      <CountdownItem value={timeLeft.hours} label="Hrs" />
      <CountdownItem value={timeLeft.minutes} label="Min" />
      <CountdownItem value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

export default Countdown;
