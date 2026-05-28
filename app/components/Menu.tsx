'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Item = { name: string; desc: string; price: string; tag?: string };
type Category = { id: string; label: string; items: Item[] };

const categories: Category[] = [
  {
    id: 'pizzas',
    label: 'Nos Pizzas',
    items: [
      { name: 'Margherita', desc: 'Sauce tomate, mozzarella fior di latte, basilic frais', price: '11€' },
      { name: 'Reine', desc: 'Sauce tomate, mozzarella, jambon blanc, champignons de Paris', price: '13€' },
      { name: 'La Loulou', desc: 'Sauce tomate, mozzarella, chorizo, poivrons grillés, olives, anchois', price: '15€', tag: 'Spécialité' },
      { name: '4 Fromages', desc: 'Mozzarella, gorgonzola, comté, chèvre frais, miel de fleurs', price: '14€' },
      { name: 'Royale Saumon', desc: 'Crème fraîche, mozzarella, saumon fumé, câpres, citron confit', price: '16€' },
      { name: 'Paysanne', desc: 'Crème fraîche, mozzarella, lardons fumés, pommes de terre, romarin', price: '14€' },
      { name: 'Végétarienne', desc: 'Sauce tomate, mozzarella, aubergines, courgettes, poivrons, roquette', price: '13€' },
      { name: 'Calzone', desc: 'Pizza pliée, mozzarella, jambon, champignons, sauce tomate maison', price: '14€' },
      { name: 'Diavola', desc: 'Sauce tomate, mozzarella, salami piquant, piments frais, huile d\'olive', price: '13€' },
      { name: 'Tartufo', desc: 'Crème de truffe, mozzarella, champignons shiitake, parmesan 24 mois', price: '18€', tag: 'Premium' },
    ],
  },
  {
    id: 'entrees',
    label: 'Entrées',
    items: [
      { name: 'Bruschetta (x3)', desc: 'Tomates marinées, basilic, ail, huile d\'olive extra vierge', price: '7€' },
      { name: 'Burrata Maison', desc: 'Burrata crémeuse, tomates cerises, basilic, réduction balsamique', price: '10€', tag: 'Coup de cœur' },
      { name: 'Antipasti', desc: 'Charcuteries italiennes, olives marinées, grissinis, pickles maison', price: '12€' },
      { name: 'Salade César', desc: 'Romaine, parmesan, croûtons maison, anchois, sauce César authentique', price: '9€' },
      { name: 'Soupe de Poisson', desc: 'Filets de rouget, moules, crème safranée, rouille maison', price: '11€', tag: 'Du jour' },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts & Boissons',
    items: [
      { name: 'Tiramisu Maison', desc: 'Mascarpone, biscuits savoiards, café expresso, cacao amer', price: '6€', tag: 'Fait maison' },
      { name: 'Panna Cotta', desc: 'Crème vanille, coulis de fruits rouges de saison', price: '5€' },
      { name: 'Calzone Nutella', desc: 'Pâte à pizza, Nutella fondant, amandes effilées, sucre glace', price: '7€' },
      { name: 'Gelato (2 boules)', desc: 'Parfums du jour : pistache, stracciatella, citron de Sicile, fraise', price: '5€' },
      { name: 'Café Expresso', desc: 'Blend 100% arabica torréfié en Italie', price: '2€' },
      { name: 'Limonade Maison', desc: 'Citrons frais, menthe, sirop de canne, eau pétillante', price: '4€' },
    ],
  },
];


export default function Menu() {
  const [active, setActive] = useState('pizzas');
  const current = categories.find((c) => c.id === active)!;

  return (
    <section id="menu" className="py-24 px-6 bg-[#FFFBEB]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#DC2626] font-semibold text-sm uppercase tracking-widest mb-3">Notre Carte</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-[#450A0A]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Les Saveurs de Loulou
          </h2>
          <p className="mt-4 text-[#78350F] max-w-md mx-auto">
            Toutes nos pizzas sont préparées à la commande dans notre four à bois, avec des ingrédients sélectionnés chaque matin.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                active === cat.id
                  ? 'bg-[#DC2626] text-white shadow-md shadow-[#DC2626]/20'
                  : 'bg-[#FEF2F2] text-[#450A0A] hover:bg-[#DC2626]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {current.items.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.0, 0.0, 0.2, 1] }}
                className="flex items-start justify-between gap-4 bg-[#FEF2F2] rounded-2xl p-5 hover:shadow-md hover:shadow-[#DC2626]/10 transition-shadow duration-200 cursor-default group border border-transparent hover:border-[#DC2626]/10"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#450A0A] text-base group-hover:text-[#DC2626] transition-colors duration-200" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="bg-[#CA8A04] text-white text-xs px-2 py-0.5 rounded-full font-medium shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#78350F] leading-relaxed">{item.desc}</p>
                </div>
                <p className="font-bold text-[#DC2626] text-lg shrink-0" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.price}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <p className="text-center text-sm text-[#78350F]/70 mt-10">
          Allergènes disponibles sur demande · Supplément pâte sans gluten +2€
        </p>
      </div>
    </section>
  );
}
