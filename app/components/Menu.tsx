'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Item = { name: string; desc: string; price: string; tag?: string };
type Category = { id: string; label: string; items: Item[] };

const categories: Category[] = [
  {
    id: 'signatures',
    label: 'Nos Pizzas',
    items: [
      { name: 'Margherita', desc: 'Sauce tomate maison, mozzarella, basilic frais', price: '10€' },
      { name: 'La Sergio', desc: 'Sauce tomate, mozzarella, chorizo, poivrons grillés, olives noires', price: '13€', tag: 'Spécialité' },
      { name: 'Reine', desc: 'Sauce tomate, mozzarella, jambon blanc, champignons de Paris', price: '11€' },
      { name: '4 Saisons', desc: 'Sauce tomate, mozzarella, jambon, champignons, artichaut, olives', price: '13€' },
      { name: 'Végétarienne', desc: 'Sauce tomate, mozzarella, poivrons, courgettes, aubergines, roquette', price: '11€' },
      { name: 'Diavola', desc: 'Sauce tomate, mozzarella, salami piquant, piments, huile pimentée', price: '12€' },
      { name: 'Calzone', desc: 'Pizza pliée, jambon blanc, mozzarella, champignons, sauce tomate', price: '13€' },
      { name: 'Bolognaise', desc: 'Sauce tomate, viande hachée maison, mozzarella, oignons dorés', price: '13€' },
    ],
  },
  {
    id: 'poissons',
    label: 'Poissons & Mer',
    items: [
      { name: 'Royale Saumon', desc: 'Crème fraîche, mozzarella, saumon fumé, câpres, citron', price: '14€', tag: 'Coup de cœur' },
      { name: 'Fruits de Mer', desc: 'Sauce tomate, mozzarella, crevettes, moules, calamars, ail', price: '15€', tag: 'Spécialité' },
      { name: 'Thon Oignons', desc: 'Sauce tomate, mozzarella, thon, oignons rouges, olives', price: '12€' },
      { name: 'Anchois', desc: 'Sauce tomate, mozzarella, filets d\'anchois, câpres, herbes de Provence', price: '12€' },
      { name: 'Nordique', desc: 'Crème fraîche, mozzarella, saumon fumé, avocat, citron vert, aneth', price: '15€' },
    ],
  },
  {
    id: 'charcuterie',
    label: 'Charcuterie & Viandes',
    items: [
      { name: 'Paysanne', desc: 'Crème fraîche, mozzarella, lardons fumés, pommes de terre, romarin', price: '13€' },
      { name: 'Forestière', desc: 'Crème fraîche, mozzarella, champignons, lardons, ail, persil', price: '13€' },
      { name: 'Chorizo Miel', desc: 'Sauce tomate, mozzarella, chorizo, miel d\'acacia, piment d\'Espelette', price: '13€', tag: 'Nouveau' },
      { name: 'Romaine', desc: 'Sauce tomate, mozzarella, anchois, olives, câpres, lardons, ail', price: '13€' },
      { name: 'Jambon Chèvre', desc: 'Sauce tomate, mozzarella, jambon sec, chèvre frais, miel, noix', price: '14€' },
      { name: '4 Fromages', desc: 'Mozzarella, gorgonzola, chèvre, emmental, miel de fleurs', price: '14€' },
    ],
  },
];

export default function Menu() {
  const [active, setActive] = useState('signatures');
  const current = categories.find((c) => c.id === active)!;

  function tagColor(tag: string) {
    if (tag === 'Spécialité') return 'bg-[#CC1F1F] text-white';
    if (tag === 'Coup de cœur') return 'bg-[#16A34A] text-white';
    if (tag === 'Nouveau') return 'bg-[#D97706] text-white';
    return 'bg-[#7C4528] text-white';
  }

  return (
    <section id="menu" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#CC1F1F] font-semibold text-sm uppercase tracking-widest mb-3">Notre Carte</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-[#1C0800]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Pizzas de Sergio
          </h2>
          <p className="mt-4 text-[#7C4528] max-w-md mx-auto">
            Pâte fine et croustillante, préparée à la commande avec des ingrédients frais choisis chaque matin.
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
                  ? 'bg-[#CC1F1F] text-white shadow-md shadow-[#CC1F1F]/20'
                  : 'bg-[#FFF5ED] text-[#1C0800] hover:bg-[#CC1F1F]/10'
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
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(28,8,0,0.10)' }}
                className="flex items-start justify-between gap-4 bg-[#FFF5ED] rounded-2xl p-5 transition-colors duration-200 cursor-default group border border-transparent hover:border-[#CC1F1F]/15"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3
                      className="font-semibold text-[#1C0800] text-base group-hover:text-[#CC1F1F] transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${tagColor(item.tag)}`}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#7C4528] leading-relaxed">{item.desc}</p>
                </div>
                <p className="font-bold text-[#CC1F1F] text-lg shrink-0" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.price}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <p className="text-center text-sm text-[#7C4528]/70 mt-10">
          Toutes nos pizzas sont disponibles en livraison · Allergènes disponibles sur demande
        </p>
      </div>
    </section>
  );
}
