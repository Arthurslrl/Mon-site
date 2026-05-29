'use client';

import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    desc: 'Perfect for solo professionals getting started.',
    monthly: 0,
    annual: 0,
    cta: 'Get started free',
    ctaStyle: 'bg-white/10 hover:bg-white/15 border border-white/15 text-white',
    highlighted: false,
    features: [
      '1 user',
      '5 active projects',
      'Focus Mode (25 sessions/mo)',
      'Smart Inbox (50 emails/mo)',
      'Basic analytics',
      '5 GB storage',
      'Community support',
    ],
    missing: ['Team Flow Sync', 'AI prioritization', 'Integrations', 'Priority support'],
  },
  {
    name: 'Pro',
    desc: 'Unlock the full power of Flow for individual power users.',
    monthly: 12,
    annual: 9,
    cta: 'Start 14-day free trial',
    ctaStyle: 'bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-xl shadow-indigo-500/25',
    highlighted: true,
    badge: 'Most popular',
    features: [
      'Unlimited projects',
      'Unlimited focus sessions',
      'AI Smart Inbox (unlimited)',
      'Team Flow Sync (up to 5)',
      'Advanced analytics',
      '50 GB storage',
      '20+ integrations',
      'Priority email support',
    ],
    missing: ['Custom AI models', 'SSO/SAML', 'Dedicated success manager'],
  },
  {
    name: 'Team',
    desc: 'Built for high-performing teams that move fast.',
    monthly: 39,
    annual: 29,
    cta: 'Contact sales',
    ctaStyle: 'bg-white/10 hover:bg-white/15 border border-white/15 text-white',
    highlighted: false,
    features: [
      'Unlimited users',
      'Everything in Pro',
      'Unlimited Team Flow Sync',
      'Custom AI models',
      'Admin & audit logs',
      'Unlimited storage',
      'SSO / SAML',
      'Dedicated success manager',
      'SLA 99.99% uptime',
    ],
    missing: [],
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-indigo-400 shrink-0" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-700 shrink-0" aria-hidden="true">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  );
}

export default function FlowPricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-28 px-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            Start free. Upgrade when you need to. No hidden fees, no surprises.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${!annual ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${annual ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
              Annual
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${annual ? 'bg-green-500/20 text-green-600' : 'bg-green-500/10 text-green-400'}`}>
                –25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-indigo-500/15 to-violet-500/10 border border-indigo-500/40 shadow-2xl shadow-indigo-500/10'
                  : 'bg-white/3 border border-white/8'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-indigo-500/30">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.desc}</p>
              </div>

              <div className="mb-7">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    ${annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="text-slate-500 mb-1.5 text-sm">/ month</span>
                </div>
                {annual && plan.monthly > 0 && (
                  <p className="text-xs text-slate-600 mt-1">
                    Billed annually · <span className="line-through">${plan.monthly}/mo</span>
                  </p>
                )}
              </div>

              <a
                href="#"
                className={`block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer mb-7 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>

              <div className="flex-1 space-y-3">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span className="text-sm text-slate-300">{f}</span>
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CrossIcon />
                    <span className="text-sm text-slate-600">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-600 mt-8">
          All plans include a 14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
