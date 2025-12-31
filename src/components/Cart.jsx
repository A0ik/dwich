import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, formatSelectedOptions } from '../utils/helpers';
import { DELIVERY_FEE } from '../utils/constants';

export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    itemCount,
  } = useCart();
  
  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Cart drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0f0f0f] border-l border-white/10 
                       flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-white">Votre panier</h2>
                  <p className="text-white/50 text-sm">
                    {itemCount} article{itemCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                           hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
            
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-white/30" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Votre panier est vide</h3>
                  <p className="text-white/50 text-sm mb-6">
                    Ajoutez des produits depuis notre menu
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      closeCart();
                      navigate('/menu');
                    }}
                    className="btn-primary"
                  >
                    Voir le menu
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4"
                      >
                        <div className="flex gap-4">
                          {/* Product image */}
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Product info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-white truncate">
                                {item.productName}
                              </h3>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.id)}
                                className="text-white/30 hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                            
                            {/* Options summary */}
                            <p className="text-white/40 text-xs mt-1 line-clamp-2">
                              {formatSelectedOptions(item.selectedOptions, item.optionGroups)}
                            </p>
                            
                            {/* Price and quantity */}
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-emerald-400 font-bold">
                                {formatPrice(item.unitPrice * item.quantity)}
                              </span>
                              
                              {/* Quantity controls */}
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 
                                             flex items-center justify-center hover:border-emerald-500/50 transition-colors"
                                >
                                  <Minus className="w-3 h-3 text-white" />
                                </motion.button>
                                <span className="text-white font-medium w-6 text-center">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 
                                             flex items-center justify-center hover:border-emerald-500/50 transition-colors"
                                >
                                  <Plus className="w-3 h-3 text-white" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
            
            {/* Footer with total and checkout */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4 bg-[#0f0f0f]">
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Sous-total</span>
                    <span className="text-white">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Livraison</span>
                    <span className="text-emerald-400">+ {formatPrice(DELIVERY_FEE)}</span>
                  </div>
                  <p className="text-xs text-white/40">
                    À emporter: gratuit. La livraison se choisit au checkout.
                  </p>
                </div>
                
                {/* Total */}
                <div className="flex items-center justify-between py-3 border-t border-white/10">
                  <span className="font-semibold text-white">Total estimé (livraison)</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    {formatPrice(totalPrice + DELIVERY_FEE)}
                  </span>
                </div>
                
                {/* Checkout button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-gradient-emerald text-white py-4 rounded-2xl font-bold text-lg
                             flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                >
                  <span>Commander</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
