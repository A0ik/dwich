import { motion } from 'framer-motion';
import { Plus, ChevronRight } from 'lucide-react';
import { formatPrice, getMinPrice, hasOptions } from '../utils/helpers';

export default function ProductCard({ product, onClick, index = 0 }) {
  const minPrice = getMinPrice(product);
  const productHasOptions = hasOptions(product);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="card cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
            className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg"
          >
            {productHasOptions ? 'À partir de ' : ''}
            {formatPrice(minPrice)}
          </motion.div>
        </div>
        
        {/* Quick add button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-white/50 text-sm mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-emerald-400 mt-1"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </div>
        
        {/* Options indicator */}
        {productHasOptions && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-emerald-400/70 bg-emerald-400/10 px-2 py-1 rounded-full">
              Personnalisable
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
