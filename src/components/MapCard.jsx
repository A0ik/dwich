import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Clock, Phone } from 'lucide-react';
import { MAP_LINK, RESTAURANT_CONFIG } from '../utils/constants';

export default function MapCard() {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2">
            {/* Info section */}
            <div className="p-8 md:p-10 bg-gradient-to-br from-emerald-600 to-emerald-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Nous trouver</h2>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Adresse</p>
                    <p className="text-white/80 text-sm">{RESTAURANT_CONFIG.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Horaires</p>
                    <p className="text-white/80 text-sm">Lun - Sam: 11h - 23h</p>
                    <p className="text-white/80 text-sm">Dimanche: 12h - 22h</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Téléphone</p>
                    <a 
                      href={`tel:${RESTAURANT_CONFIG.phone.replace(/\s/g, '')}`}
                      className="text-white/80 text-sm hover:text-white transition-colors"
                    >
                      {RESTAURANT_CONFIG.phone}
                    </a>
                  </div>
                </div>
              </div>
              
              <motion.a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold 
                           px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                <span>Ouvrir dans Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
            
            {/* Map preview */}
            <div className="relative h-64 md:h-auto min-h-[300px] bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2532.5!2d2.77!3d50.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDE3JzI0LjAiTiAywrA0NicxMi4wIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Localisation DWICH62"
              />
              
              {/* Click overlay to open in Google Maps */}
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors flex items-center justify-center group"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-emerald-700 font-medium text-sm flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Voir sur Google Maps
                  </span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
