import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { menuData } from '../data/menu';
import CategorySection from '../components/CategorySection';
import ProductModal from '../components/ProductModal';

export default function Menu() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});
  
  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);
  
  // Track active category on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    
    menuData.categories.forEach((category) => {
      const element = document.getElementById(category.slug);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Filter products based on search
  const filteredCategories = menuData.categories
    .map((category) => ({
      ...category,
      products: category.products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.products.length > 0);
  
  const handleCategoryClick = (slug) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-32">
      {/* Header */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Notre <span className="text-gradient">Menu</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Découvrez nos spécialités préparées avec passion. Personnalisez vos plats selon vos envies.
          </p>
        </motion.div>
        
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 pr-12"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Category navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
        >
          <div className="flex gap-2 min-w-max">
            {menuData.categories.map((category) => (
              <motion.button
                key={category.slug}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category.slug)}
                className={`chip ${
                  activeCategory === category.slug ? 'chip-selected' : 'chip-default'
                }`}
              >
                <span className="mr-1.5">{category.emoji}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Categories and products */}
      <div className="container mx-auto px-4 space-y-16">
        <AnimatePresence mode="wait">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <CategorySection
                key={category.slug}
                category={category}
                onProductClick={setSelectedProduct}
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-white/50">
                Essayez avec d'autres termes de recherche
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
