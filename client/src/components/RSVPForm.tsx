"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitRSVP } from "@/lib/api";
import { Loader2, CheckCircle2 } from "lucide-react";

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    attendance_status: "yes",
    guest_count: 1,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitRSVP(formData);
      setStatus("success");
      setFormData({ name: "", attendance_status: "yes", guest_count: 1, message: "" });
    } catch (error) {
       console.warn("RSVP Submission failed:", error);
       setStatus("error");
    }
  };

  return (
    <section id="rsvp" className="bg-surface py-32 overflow-hidden">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="glass-card p-12 relative"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-serif mb-4">Will You Join Us?</h2>
            <p className="text-on-surface/60 italic">
              Kindly respond by March 1, 2026. We cannot wait to celebrate this special day with our closest family and friends.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="mx-auto text-tertiary w-16 h-16 mb-6" />
                <h3 className="text-3xl mb-4">Thank You!</h3>
                <p className="text-on-surface/60">Your response has been successfully recorded.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-tertiary underline uppercase tracking-widest text-xs"
                >
                  Send another RSVP
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest opacity-60 absolute -top-5 left-0">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-tertiary/20 py-4 focus:border-tertiary outline-none transition-colors font-serif text-xl placeholder:opacity-30"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 relative">
                       <label className="text-[10px] uppercase tracking-widest opacity-60 absolute -top-5 left-0">Attendance Status</label>
                       <select
                         className="w-full bg-transparent border-b border-tertiary/20 py-4 focus:border-tertiary outline-none transition-colors appearance-none font-serif text-lg"
                         value={formData.attendance_status}
                         onChange={(e) => setFormData({ ...formData, attendance_status: e.target.value as any })}
                       >
                         <option value="yes">Accepts with pleasure</option>
                         <option value="no">Declines with regret</option>
                         <option value="maybe">Still deciding</option>
                       </select>
                    </div>

                    <div className="w-full md:w-32 relative">
                        <label className="text-[10px] uppercase tracking-widest opacity-60 absolute -top-5 left-0">Guests</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          className="w-full bg-transparent border-b border-tertiary/20 py-4 focus:border-tertiary outline-none transition-colors font-serif text-xl"
                          value={formData.guest_count}
                          onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                  </div>

                  <div className="relative pt-4">
                    <label className="text-[10px] uppercase tracking-widest opacity-60 absolute top-0 left-0">Your Message (Optional)</label>
                    <textarea
                      placeholder="Dietary requirements, a note for the couple, or your favorite dance song..."
                      className="w-full bg-transparent border-b border-tertiary/20 py-4 focus:border-tertiary outline-none transition-colors font-serif text-lg resize-none h-32 placeholder:opacity-30 pt-8"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    disabled={status === "loading"}
                    className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {status === "loading" && <Loader2 className="animate-spin" size={20} />}
                    <span>{status === "loading" ? "Confirming..." : "Confirm Attendance"}</span>
                  </button>
                  {status === "error" && (
                    <p className="text-red-500 text-xs text-center mt-4">Something went wrong. Please try again.</p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPForm;
