import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-black/50 border-t border-white/5 pt-16 pb-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-gradient-emerald rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-lg">D62</span>
                </div>
                <span className="font-bold text-2xl tracking-tight">
                  DWICH<span className="text-emerald-400">62</span>
                </span>
              </motion.div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              La meilleure street food du 62. Tacos, burgers, kebabs et plus encore, 
              préparés avec passion et des ingrédients frais.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/menu', label: 'Notre Menu' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/50 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm">
                  123 Rue de la Gastronomie<br />
                  62000 Arras
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a 
                  href="tel:+33321123456" 
                  className="text-white/50 hover:text-emerald-400 transition-colors text-sm"
                >
                  03 21 12 34 56
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm">
                  Lun - Sam: 11h - 23h<br />
                  Dim: 12h - 22h
                </span>
              </li>
            </ul>
          </div>
          
          {/* Social & Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-6">Suivez-nous</h3>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/70" />
                </motion.a>
              ))}
            </div>
            <p className="text-white/30 text-xs">
              Suivez-nous pour les offres exclusives et nouveautés !
            </p>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © {currentYear} DWICH62. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/30 hover:text-white/50 transition-colors text-sm">
                Mentions légales
              </a>
              <a href="#" className="text-white/30 hover:text-white/50 transition-colors text-sm">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
