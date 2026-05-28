'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-indigo-400" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    gradient: 'from-indigo-500/20 to-blue-500/10',
    border: 'border-indigo-500/20',
    glow: 'hover:shadow-indigo-500/10',
    tag: 'Focus',
    title: 'Deep Work Mode',
    desc: 'Block distractions with one click. Flow activates a full focus session with a Pomodoro timer, notification silencing, and ambient soundscapes proven to boost concentration.',
    metrics: [
      { value: '2.4×', label: 'More tasks completed' },
      { value: '47%', label: 'Less context switching' },
    ],
    preview: (
      <div className="mt-5 bg-black/30 rounded-xl p-4 border border-white/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-500">Focus Session · Deep Work</span>
          <span className="text-xs font-mono text-indigo-400">24:37</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
            initial={{ width: '0%' }}
            whileInView={{ width: '60%' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex gap-2 mt-3">
          {['Block apps', 'Quiet hours', 'Soundscape'].map(tag => (
            <span key={tag} className="text-[10px] text-indigo-300/70 bg-indigo-500/10 px-2 py-1 rounded-full border border-indigo-500/15">{tag}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-violet-400" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
    glow: 'hover:shadow-violet-500/10',
    tag: 'AI',
    title: 'Smart Inbox',
    desc: 'Our AI reads your emails, Slack, and notifications — then surfaces only what truly needs your attention, sorted by urgency and context.',
    metrics: [
      { value: '83%', label: 'Fewer interruptions' },
      { value: '3.1h', label: 'Saved per week' },
    ],
    preview: (
      <div className="mt-5 space-y-2">
        {[
          { from: 'Sarah K.', subject: 'Q3 roadmap — needs approval', priority: 'high', time: '2m ago' },
          { from: 'AI Summary', subject: '6 newsletters digested for you', priority: 'low', time: '10m ago' },
          { from: 'Jordan', subject: 'Re: design review', priority: 'med', time: '1h ago' },
        ].map(msg => (
          <div key={msg.from} className="flex items-center gap-3 bg-black/30 rounded-lg px-3 py-2 border border-white/5">
            <div className={`w-2 h-2 rounded-full shrink-0 ${msg.priority === 'high' ? 'bg-red-400' : msg.priority === 'med' ? 'bg-yellow-400' : 'bg-slate-600'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-slate-300 font-medium truncate">{msg.from}</p>
              <p className="text-[10px] text-slate-500 truncate">{msg.subject}</p>
            </div>
            <span className="text-[10px] text-slate-600 shrink-0">{msg.time}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-cyan-400" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    gradient: 'from-cyan-500/20 to-teal-500/10',
    border: 'border-cyan-500/20',
    glow: 'hover:shadow-cyan-500/10',
    tag: 'Team',
    title: 'Team Flow Sync',
    desc: "See your team's real-time focus states, respect deep work windows automatically, and schedule meetings only when everyone is available — without a single message.",
    metrics: [
      { value: '68%', label: 'Fewer unnecessary meetings' },
      { value: '91%', label: 'Team satisfaction score' },
    ],
    preview: (
      <div className="mt-5 bg-black/30 rounded-xl p-3 border border-white/5">
        <p className="text-[10px] text-slate-500 mb-2.5 uppercase tracking-wider">Team status</p>
        <div className="space-y-2">
          {[
            { name: 'Alex M.', state: 'In flow', color: 'bg-green-400', time: '52 min' },
            { name: 'Jamie L.', state: 'Available', color: 'bg-blue-400', time: '' },
            { name: 'Sam K.', state: 'In meeting', color: 'bg-yellow-400', time: '8 min left' },
          ].map(m => (
            <div key={m.name} className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${m.color}`} />
              <span className="text-xs text-slate-300 flex-1">{m.name}</span>
              <span className="text-[10px] text-slate-500">{m.state}</span>
              {m.time && <span className="text-[10px] text-slate-600">{m.time}</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.0, 0.0, 0.2, 1] }}
      className={`group relative bg-white/3 hover:bg-white/5 border ${feature.border} rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl ${feature.glow} cursor-default`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {feature.tag}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
          {feature.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {feature.desc}
        </p>

        <div className="flex gap-6 mb-2">
          {feature.metrics.map(m => (
            <div key={m.label}>
              <p className="text-2xl font-bold text-white">{m.value}</p>
              <p className="text-xs text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>

        {feature.preview}
      </div>
    </motion.article>
  );
}

export default function FlowFeatures() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Everything you need to stay in{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              flow
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Three powerful tools, one seamless experience. Designed to protect your focus, not fragment it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
