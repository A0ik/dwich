import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Check, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import { 
  formatPrice, 
  calculateTotalPrice, 
  getEffectivePriceDelta,
  isDrinkIncluded,
  validateRequiredOptions,
  adjustMeatSelectionToSize,
  getMeatLimitFromSize,
  getMeatGroupFromSizeGroup,
} from '../utils/helpers';
import { SIZE_TO_MEAT_LIMIT } from '../utils/constants';

export default function ProductModal({ product, isOpen, onClose }) {
  const { addItem, openCart } = useCart();
  const toast = useToast();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [showError, setShowError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  // Reset state when product changes
  useEffect(() => {
    if (product) {
      const initial = {};
      product.optionGroups.forEach(group => {
        if (group.type === 'MULTIPLE') {
          initial[group.slug] = [];
        } else {
          initial[group.slug] = null;
        }
      });
      setSelectedOptions(initial);
      setQuantity(1);
      setShowError(false);
    }
  }, [product]);
  
  // Calculer les limites dynamiques basées sur la taille sélectionnée
  const dynamicLimits = useMemo(() => {
    if (!product) return {};
    
    const limits = {};
    product.optionGroups.forEach(group => {
      if (SIZE_TO_MEAT_LIMIT[group.slug]) {
        const selectedSize = selectedOptions[group.slug];
        const meatGroupSlug = getMeatGroupFromSizeGroup(group.slug);
        const meatLimit = getMeatLimitFromSize(group.slug, selectedSize);
        
        if (meatGroupSlug && meatLimit) {
          limits[meatGroupSlug] = meatLimit;
        }
      }
    });
    
    return limits;
  }, [product, selectedOptions]);
  
  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return calculateTotalPrice(product.basePrice, selectedOptions, product.optionGroups, product);
  }, [product, selectedOptions]);
  
  // Check if selection is valid
  const isValid = useMemo(() => {
    if (!product) return false;
    return validateRequiredOptions(selectedOptions, product.optionGroups);
  }, [product, selectedOptions]);
  
  // Handle single option selection (avec ajustement automatique des viandes)
  const handleSingleSelect = (groupSlug, optionName) => {
    const newValue = selectedOptions[groupSlug] === optionName ? null : optionName;
    
    // Vérifier si c'est un groupe taille qui affecte les viandes
    if (SIZE_TO_MEAT_LIMIT[groupSlug] && newValue) {
      const { adjustedOptions, wasAdjusted } = adjustMeatSelectionToSize(
        { ...selectedOptions, [groupSlug]: newValue },
        groupSlug,
        newValue
      );
      
      setSelectedOptions(adjustedOptions);
      
      if (wasAdjusted) {
        toast.info('Sélection de viandes ajustée selon la taille choisie');
      }
    } else {
      setSelectedOptions(prev => ({
        ...prev,
        [groupSlug]: newValue,
      }));
    }
    
    setShowError(false);
  };
  
  // Handle multiple option selection (avec respect de la limite dynamique)
  const handleMultipleSelect = (groupSlug, optionName) => {
    setSelectedOptions(prev => {
      const current = prev[groupSlug] || [];
      const isSelected = current.includes(optionName);
      
      // Déterminer la limite effective
      const dynamicLimit = dynamicLimits[groupSlug];
      const group = product.optionGroups.find(g => g.slug === groupSlug);
      const effectiveMaxSelect = dynamicLimit || group?.maxSelect;
      
      if (isSelected) {
        return {
          ...prev,
          [groupSlug]: current.filter(name => name !== optionName),
        };
      } else {
        if (effectiveMaxSelect && current.length >= effectiveMaxSelect) {
          // Replace oldest selection
          return {
            ...prev,
            [groupSlug]: [...current.slice(1), optionName],
          };
        }
        return {
          ...prev,
          [groupSlug]: [...current, optionName],
        };
      }
    });
    setShowError(false);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!isValid) {
      setShowError(true);
      return;
    }
    
    setIsAdding(true);
    
    setTimeout(() => {
      addItem(product, selectedOptions, quantity);
      setIsAdding(false);
      onClose();
      toast.success('Produit ajouté au panier !');
      
      // Open cart after a small delay
      setTimeout(() => {
        openCart();
      }, 300);
    }, 400);
  };
  
  if (!product) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-auto md:right-0 md:top-0 md:bottom-0 z-50 
                       w-full md:w-[500px] lg:w-[550px] bg-[#0f0f0f] md:border-l border-white/10
                       flex flex-col max-h-[90vh] md:max-h-full rounded-t-3xl md:rounded-none"
          >
            {/* Header with image */}
            <div className="relative">
              <div className="aspect-video md:aspect-[4/3] w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
              </div>
              
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full 
                           flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
              
              {/* Product info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{product.name}</h2>
                <p className="text-white/60 mt-1">{product.description}</p>
              </div>
            </div>
            
            {/* Scrollable options */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {product.optionGroups.map((group) => {
                // Déterminer la limite effective pour ce groupe
                const dynamicLimit = dynamicLimits[group.slug];
                const effectiveMaxSelect = dynamicLimit || group.maxSelect;
                const currentSelection = selectedOptions[group.slug] || [];
                const selectionCount = Array.isArray(currentSelection) ? currentSelection.length : 0;
                
                return (
                  <div key={group.slug} className="space-y-3">
                    {/* Group header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{group.name}</h3>
                        {group.required && (
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                            Obligatoire
                          </span>
                        )}
                      </div>
                      {group.type === 'MULTIPLE' && effectiveMaxSelect && (
                        <span className={`text-xs ${
                          selectionCount >= effectiveMaxSelect 
                            ? 'text-emerald-400' 
                            : 'text-white/40'
                        }`}>
                          {selectionCount}/{effectiveMaxSelect}
                        </span>
                      )}
                    </div>
                    
                    {/* Error indicator */}
                    {showError && group.required && (
                      (group.type === 'SINGLE' && !selectedOptions[group.slug]) ||
                      (group.type === 'MULTIPLE' && (!selectedOptions[group.slug] || selectedOptions[group.slug].length === 0))
                    ) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>Veuillez faire une sélection</span>
                      </motion.div>
                    )}
                    
                    {/* Info pour les groupes viandes liés à une taille */}
                    {dynamicLimit && group.type === 'MULTIPLE' && (
                      <p className="text-xs text-white/40">
                        Sélectionnez jusqu'à {dynamicLimit} viande{dynamicLimit > 1 ? 's' : ''} selon votre taille
                      </p>
                    )}
                    
                    {/* Options grid */}
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => {
                        const isSelected = group.type === 'SINGLE'
                          ? selectedOptions[group.slug] === option.name
                          : (selectedOptions[group.slug] || []).includes(option.name);

                        const drinkIncluded = group.slug === 'boisson' && isDrinkIncluded(product, selectedOptions, product.optionGroups);
                        const effectiveDelta = getEffectivePriceDelta(product, group, option, selectedOptions);
                        
                        return (
                          <motion.button
                            key={option.name}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              if (group.type === 'SINGLE') {
                                handleSingleSelect(group.slug, option.name);
                              } else {
                                handleMultipleSelect(group.slug, option.name);
                              }
                            }}
                            className={`chip ${isSelected ? 'chip-selected' : 'chip-default'}`}
                          >
                            {isSelected && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="mr-1.5"
                              >
                                <Check className="w-4 h-4" />
                              </motion.span>
                            )}
                            <span>{option.name}</span>
                            {effectiveDelta > 0 ? (
                              <span className={`ml-1.5 text-xs ${isSelected ? 'text-white/70' : 'text-emerald-400'}`}>
                                +{formatPrice(effectiveDelta)}
                              </span>
                            ) : drinkIncluded ? (
                              <span className={`ml-1.5 text-xs ${isSelected ? 'text-white/70' : 'text-emerald-400'}`}>
                                Offert
                              </span>
                            ) : null}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Footer with quantity and add to cart */}
            <div className="border-t border-white/10 p-6 space-y-4 bg-[#0f0f0f]">
              {/* Quantity selector */}
              <div className="flex items-center justify-between">
                <span className="text-white/60">Quantité</span>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                               hover:border-emerald-500/50 transition-colors disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </motion.button>
                  <span className="text-xl font-bold text-white w-8 text-center">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                               hover:border-emerald-500/50 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
              
              {/* Add to cart button */}
              <motion.button
                whileHover={{ scale: isValid ? 1.02 : 1 }}
                whileTap={{ scale: isValid ? 0.98 : 1 }}
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3
                           transition-all duration-300 ${
                             isValid
                               ? 'bg-gradient-emerald text-white shadow-lg shadow-emerald-500/30'
                               : 'bg-white/5 text-white/30 cursor-not-allowed'
                           }`}
              >
                {isAdding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Ajouter • {formatPrice(totalPrice * quantity)}</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
