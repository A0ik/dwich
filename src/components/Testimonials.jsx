import React from 'react';
import { motion } from 'framer-motion';

// Données des témoignages
const defaultTestimonials = [
  {
    text: "Meilleur tacos de la région ! La sauce fromagère est incroyable et les viandes sont toujours fraîches. Je recommande le XL 3 viandes !",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    name: "Thomas D.",
    role: "Client fidèle"
  },
  {
    text: "Service rapide, équipe sympa et surtout des burgers qui envoient du lourd. Le Giant est devenu mon préféré !",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    name: "Marie L.",
    role: "Cliente régulière"
  },
  {
    text: "Livraison toujours à l'heure et les plats arrivent chauds. Le kebab est authentique, ça me rappelle mes voyages !",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    name: "Karim B.",
    role: "Client livraison"
  },
  {
    text: "L'assiette 3 viandes est généreuse et délicieuse. Parfait pour un repas complet. Les frites sont croustillantes !",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    name: "Sophie M.",
    role: "Cliente satisfaite"
  },
  {
    text: "J'ai testé beaucoup de restaurants du coin, DWICH62 reste mon numéro 1. Qualité constante depuis des années.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    name: "Pierre R.",
    role: "Client depuis 2018"
  },
  {
    text: "Le menu enfant est parfait pour mes petits ! Ils adorent les nuggets et le Capri Sun. Et la surprise fait toujours plaisir.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    name: "Émilie V.",
    role: "Maman comblée"
  },
];

export const TestimonialsColumn = ({ className, testimonials, duration = 15 }) => {
  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div 
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] 
                           hover:border-emerald-500/30 transition-colors max-w-xs w-full" 
                key={`${index}-${i}`}
              >
                <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                <div className="flex items-center gap-3 mt-4">
                  <img 
                    width={40} 
                    height={40} 
                    src={image} 
                    alt={name} 
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500/30" 
                  />
                  <div className="flex flex-col">
                    <div className="font-medium text-white text-sm">{name}</div>
                    <div className="text-white/40 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials({ testimonials = defaultTestimonials }) {
  // Diviser les témoignages en 3 colonnes
  const column1 = testimonials.slice(0, 2);
  const column2 = testimonials.slice(2, 4);
  const column3 = testimonials.slice(4, 6);
  
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Ce que disent nos clients
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Des milliers de clients satisfaits nous font confiance depuis 2015
          </p>
        </motion.div>

        {/* Testimonials columns */}
        <div className="relative h-[600px] overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          
          {/* Columns */}
          <div className="flex justify-center gap-6 h-full">
            <TestimonialsColumn 
              testimonials={column1} 
              duration={18}
              className="hidden md:block"
            />
            <TestimonialsColumn 
              testimonials={column2} 
              duration={22}
            />
            <TestimonialsColumn 
              testimonials={column3} 
              duration={16}
              className="hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
