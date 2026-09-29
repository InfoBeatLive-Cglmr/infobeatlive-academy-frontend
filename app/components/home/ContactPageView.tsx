import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Building2, 
  Globe 
} from "lucide-react";

interface ContactFormData {
  fullName: string;
  email: string;
  reason: string;
  message: string;
}

const REASON_OPTIONS = [
  "Select a reason...",
  "Academic Admissions & Enrollment",
  "Institutional Partnerships",
  "Enterprise & Corporate Learning",
  "Research & Faculty Collaborations",
  "Technical & Platform Support",
  "General Inquiry"
];

export const ContactPageView: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    reason: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ fullName: "", email: "", reason: "", message: "" });
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-zink-900 text-zinc-100 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            Direct Engagement
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-white mb-4"
          >
            Connect with Academic Admissions & Administration
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg"
          >
            Reach our institutional coordinators, admissions representatives, and faculty leadership directly.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form Side (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl font-bold text-white mb-2">Submit an Official Dispatch</h2>
            <p className="text-zinc-400 text-sm mb-8">
              Fill out the parameters below. Our response team reviews incoming communications strictly within institutional working hours.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Dispatch Transmitted</h3>
                <p className="text-zinc-300 text-sm mb-6">
                  Thank you. Your message has been logged. An academic officer will reach out to your provided email address.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g., Prof. Alexander Vance"
                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Email Address <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="a.vance@institution.edu"
                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Reason for Contact <span className="text-amber-500">*</span>
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm appearance-none cursor-pointer"
                  >
                    {REASON_OPTIONS.map((opt, idx) => (
                      <option key={idx} value={idx === 0 ? "" : opt} disabled={idx === 0} className="bg-zinc-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Statement / Message <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide detailed context regarding your academic inquiry or program requirements..."
                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-lg shadow-amber-500/10 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Transmission...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Details & Map Placeholder Side (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Direct Communication Channels */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">
                Institutional Contact Points
              </h3>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Official Inquiry Email</p>
                  <a
                    href="mailto:academy@infobeatlive.com"
                    className="text-white hover:text-amber-400 font-medium text-base transition-colors"
                  >
                    academy@infobeatlive.com
                  </a>
                  <p className="text-xs text-zinc-500 mt-1">Monitored 24/7 for active academic dispatches.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Administration Phone</p>
                  <a
                    href="tel:+18005550199"
                    className="text-white hover:text-amber-400 font-medium text-base transition-colors"
                  >
                    +1 (800) 555-0199
                  </a>
                  <p className="text-xs text-zinc-500 mt-1">Mon–Fri, 08:00 – 18:00 EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Global Headquarters</p>
                  <p className="text-white font-medium text-sm">
                    InfoBeatLive Academic Headquarters<br />
                    100 Innovation Parkway, Suite 700<br />
                    Cambridge, MA 02142, USA
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Campus Location Matrix</span>
                </div>
                <span className="text-xs text-zinc-500 font-mono">42.3601° N, 71.0589° W</span>
              </div>

              <div className="relative w-full h-48 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center overflow-hidden group">
                {/* Stylized grid mesh for architectural map look */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
                <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />

                <div className="relative z-10 text-center p-4">
                  <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-xs font-semibold text-white">Cambridge Technology Hub</p>
                  <p className="text-[11px] text-zinc-500">Physical & Virtual Instruction Infrastructure</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};