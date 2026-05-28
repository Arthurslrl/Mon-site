'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FlowCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-28 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1] }}
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-violet-600/20 to-cyan-600/20 border border-indigo-500/20 rounded-3xl" />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <motion.div
              className="absolute top-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 65%)', filter: 'blur(50px)' }}
              animate={{ x: [-20, 20, -20], y: [-15, 15, -15] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-[-20%] right-[-10%] w-[350px] h-[350px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 65%)', filter: 'blur(50px)' }}
              animate={{ x: [15, -15, 15], y: [10, -10, 10] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-yellow-400" aria-hidden="true">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              Join 50,000+ professionals already in flow
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5"
            >
              Your best work starts
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                with Flow
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg text-white/60 max-w-md mx-auto mb-10"
            >
              Free to start. No credit card required. Set up in under 2 minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/35 px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all duration-200"
                aria-label="Email address"
              />
              <button
                type="button"
                className="bg-white text-slate-900 hover:bg-white/90 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer shadow-xl whitespace-nowrap"
              >
                Start for free
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xs text-white/30 mt-4"
            >
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
