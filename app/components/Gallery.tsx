'use client';

import Image from 'next/image';
import { useState } from 'react';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&q=80',
    alt: 'Pizza margherita artisanale – Pizzeria Loulou Valras-Plage',
    caption: 'Margherita',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop&q=80',
    alt: 'Four à bois artisanal – pizza cuite à 450°C',
    caption: 'Notre four à bois',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&q=80',
    alt: 'Préparation artisanale de la pizza – pâte maison',
    caption: 'Pâtes maison',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=400&fit=crop&q=80',
    alt: 'Part de pizza avec garnitures fraîches',
    caption: 'Ingrédients frais',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&q=80',
    alt: 'Terrasse du restaurant – Valras-Plage bord de mer',
    caption: 'Notre terrasse',
    span: '',
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<null | typeof photos[0]>(null);

  return (
    <section id="galerie" aria-labelledby="gallery-title" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F9F3E5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="block w-6 h-px bg-[#4A7040]" aria-hidden="true" />
            <p
              className="text-[#C41E1E] text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Galerie
            </p>
            <span className="block w-6 h-px bg-[#C41E1E]" aria-hidden="true" />
          </div>
          <h2
            id="gallery-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C0A00] tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Dans notre cuisine
          </h2>
          <p
            className="mt-4 text-[#7C4A1E]/70 max-w-md mx-auto text-[15px] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Du four à bois à votre table — chaque pizza est un moment de pure authenticité.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 auto-rows-[160px] sm:auto-rows-[200px]">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${photo.span}`}
              onClick={() => setLightbox(photo)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-semibold">{photo.caption}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          <div
            className="relative max-w-4xl max-h-[80vh] w-full aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src.replace('w=600&h=400', 'w=1200&h=800').replace('w=800&h=600', 'w=1200&h=800')}
              alt={lightbox.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Fermer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
