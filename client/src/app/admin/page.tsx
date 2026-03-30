"use client";

import { useState, useEffect } from "react";
import { getRSVPs } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Users, CheckCircle, XCircle, HelpCircle, Loader2, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedSession = sessionStorage.getItem("admin-auth");
    if (savedSession === "true") {
      setIsLoggedIn(true);
      fetchRSVPs();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchRSVPs = async () => {
    setLoading(true);
    try {
      // Use the hardcoded password or the one from state
      const authPass = sessionStorage.getItem("admin-pass") || password;
      const { data } = await getRSVPs(authPass);
      setRsvps(data);
      setIsLoggedIn(true);
      sessionStorage.setItem("admin-auth", "true");
      sessionStorage.setItem("admin-pass", authPass);
      setError("");
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.error || "Invalid password or server error");
      setIsLoggedIn(false);
      sessionStorage.removeItem("admin-auth");
      sessionStorage.removeItem("admin-pass");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRSVPs();
  };

  const stats = {
    total: rsvps.reduce((acc, curr) => acc + (curr.guest_count || 0), 0),
    responses: rsvps.length,
    yes: rsvps.filter(r => r.attendance_status === 'yes').length,
    no: rsvps.filter(r => r.attendance_status === 'no').length,
    maybe: rsvps.filter(r => r.attendance_status === 'maybe').length,
  };

  if (loading && !isLoggedIn) {
     return (
       <div className="h-screen flex items-center justify-center bg-surface">
         <Loader2 className="animate-spin text-tertiary" size={48} />
       </div>
     );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-ambient p-10 text-center"
        >
          <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-tertiary">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-serif mb-2">Admin Access</h1>
          <p className="text-on-surface/60 text-sm mb-8 italic">Please enter your secret password to view the guest list.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-surface-low border-b-2 border-tertiary/20 py-4 px-4 focus:border-tertiary outline-none transition-colors font-serif text-xl pr-12"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface/40 hover:text-tertiary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-xs font-medium"
              >
                {error}
              </motion.p>
            )}

            <button type="submit" className="btn-primary w-full py-4 rounded-xl flex items-center justify-center space-x-2">
              <ShieldCheck size={20} />
              <span>Unlock Dashboard</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-low p-8 md:p-12 pb-32">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
             <h1 className="text-4xl font-serif mb-2">Guest Management</h1>
             <p className="text-on-surface/60">Manage your wedding guest list and responses.</p>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={fetchRSVPs}
              className="text-tertiary underline uppercase tracking-widest text-[10px] hover:opacity-70 transition-opacity"
            >
              Refresh Data
            </button>
            <button 
              onClick={() => {
                sessionStorage.removeItem("admin-auth");
                sessionStorage.removeItem("admin-pass");
                setIsLoggedIn(false);
                setRsvps([]);
              }}
              className="text-red-500 underline uppercase tracking-widest text-[10px] hover:opacity-70 transition-opacity"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
           {[
             { label: "Total Guests", value: stats.total, icon: Users },
             { label: "Responses", value: stats.responses, icon: CheckCircle },
             { label: "Attending", value: stats.yes, icon: CheckCircle, color: "text-green-600" },
             { label: "Declined", value: stats.no, icon: XCircle, color: "text-red-600" },
             { label: "Maybe", value: stats.maybe, icon: HelpCircle, color: "text-amber-600" },
           ].map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-6 rounded-2xl shadow-ambient"
             >
                <stat.icon size={20} className={`mb-4 opacity-40 ${stat.color || ''}`} />
                <div className="text-3xl font-serif mb-1">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest opacity-60">{stat.label}</div>
             </motion.div>
           ))}
        </div>

        {/* RSVPs Table */}
        <div className="bg-white rounded-3xl shadow-ambient overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-surface-highest/50 border-b border-surface-low">
                   <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-60">Guest Name</th>
                   <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-60">Status</th>
                   <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-60 text-center">Guests</th>
                   <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-60">Message</th>
                   <th className="px-8 py-6 text-[10px] uppercase tracking-widest opacity-60 text-right">Date Received</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-surface-low">
                 {rsvps.map((rsvp, i) => (
                   <tr key={i} className="hover:bg-surface-low/30 transition-colors group">
                     <td className="px-8 py-6 font-serif text-lg">{rsvp.name}</td>
                     <td className="px-8 py-6">
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                          rsvp.attendance_status === 'yes' ? 'bg-green-100 text-green-700' :
                          rsvp.attendance_status === 'no' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {rsvp.attendance_status === 'yes' ? 'Attending' : 
                           rsvp.attendance_status === 'no' ? 'Declined' : 'Maybe'}
                        </span>
                     </td>
                     <td className="px-8 py-6 text-center font-medium">{rsvp.guest_count}</td>
                     <td className="px-8 py-6 text-sm text-on-surface/70 italic max-w-sm">
                        <div className="line-clamp-2" title={rsvp.message}>
                          {rsvp.message || <span className="opacity-30">No note provided</span>}
                        </div>
                     </td>
                     <td className="px-8 py-6 text-[11px] opacity-40 text-right whitespace-nowrap">
                        {new Date(rsvp.created_at).toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                     </td>
                   </tr>
                 ))}
                 {rsvps.length === 0 && (
                   <tr>
                     <td colSpan={5} className="px-8 py-24 text-center">
                        <div className="opacity-40 italic flex flex-col items-center">
                           <Users size={48} className="mb-4 opacity-20" />
                           <p>Your guest list is currently empty.</p>
                        </div>
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
}

