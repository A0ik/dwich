import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

export default function FloatingCartButton() {
  const { itemCount, totalPrice, toggleCart, isOpen } = useCart();
  
  // Don't show when cart is open or empty
  if (isOpen || itemCount === 0) return null;
  
  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: 50 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleCart}
        className="fixed bottom-6 right-6 z-40 bg-gradient-emerald text-white 
                   px-6 py-4 rounded-full shadow-lg shadow-emerald-500/40
                   flex items-center gap-3 font-semibold"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          <motion.span
            key={itemCount}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-white text-emerald-600 
                       rounded-full text-xs font-bold flex items-center justify-center"
          >
            {itemCount}
          </motion.span>
        </div>
        <span className="hidden sm:inline">Voir le panier</span>
        <span className="font-bold">{formatPrice(totalPrice)}</span>
      </motion.button>
    </AnimatePresence>
  );
}
