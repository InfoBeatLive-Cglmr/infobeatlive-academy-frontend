import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, PhoneCall, MessageSquareCode, HelpCircle, Copy, Check, Zap,
ExternalLink, ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";

export const SupportPageView: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const phoneNumber = "+1 (800) 555-0199";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zink-900 text-zinc-100 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            Institutional Concierge & Support
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-white mb-4"
          >
            Elite Academic Assistance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg"
          >
            Direct, high-priority channels for technical resolution, administrative queries, and interactive guidance.
          </motion.p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Card 1: Email Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 bg-zinc-800 border border-zinc-700/60 rounded-xl text-amber-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 text-xs font-medium border border-zinc-700/50">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Avg. &lt; 2 Hours
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Official Dispatch Support</h3>
              <h4 className="text-sm font-bold text-yellow-500 mb-3">Send email to: academy@infobeatlive.com</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Transmit detailed technical, curriculum, or billing inquiries directly to our administrative team. Includes 
                priority queuing for enrolled students.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-800/80">
              <a
                href="mailto:academy@infobeatlive.com?subject=Academic%20Support%20Inquiry"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-white font-semibold text-sm transition-all duration-200"
              >
                <span>Dispatch Email Inquiry</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: Instant Phone Calling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 bg-zinc-800 border border-zinc-700/60 rounded-xl text-amber-400 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Operators
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Direct Phone Support</h3>
              <h4 className="text-sm font-bold text-yellow-500 mb-3">Dial call to: +1 (800) 555-0199</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Connect instantly with a live institutional support coordinator for immediate assistance regarding program access, billing, or system diagnostics.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-800/80 flex items-center gap-3">
              <a
                href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors"
              >
                <span>Call Support Center</span>
                <PhoneCall className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopyPhone}
                title="Copy phone number"
                className="p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors border border-zinc-700/50"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* Card 3: AI Concierge & Chat Agent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 bg-zinc-800 border border-zinc-700/60 rounded-xl text-amber-400 group-hover:scale-105 transition-transform">
                  <MessageSquareCode className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                  <Zap className="w-3.5 h-3.5" />
                  Instant Response
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Live Interactive Chat Support</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Engage in real-time chat with our platform agents or request elevation to a technical Specialist for curriculum guidance.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-800/80">
              <button
                onClick={() => alert("Initiating Live Support Agent Session...")}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-white font-semibold text-sm transition-all duration-200"
              >
                <span>Launch Interactive Chat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 4: Knowledge Base & Knowledge Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative group bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 bg-zinc-800 border border-zinc-700/60 rounded-xl text-amber-400 group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 text-xs font-medium border border-zinc-700/50">
                  Self-Service
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Institutional Repository</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Browse complete documentation, accreditation specs, setup manuals, and self-guided resolution protocols across all departments.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-800/80">
              <button
                onClick={() => alert("Redirecting to Knowledge Base Documentation...")}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-white font-semibold text-sm transition-all duration-200"
              >
                <span>Explore Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* SLA & Service Standards Banner */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Guaranteed Service Standard</h4>
              <p className="text-xs text-zinc-400">Enrolled students receive prioritized routing and dedicated resolution SLA.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Dedicated Faculty SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>24/7 Operations</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};