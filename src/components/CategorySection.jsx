import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function CategorySection({ category, onProductClick, index = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      id={category.slug}
      className="scroll-mt-24"
    >
      {/* Category header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.emoji}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {category.name}
          </h2>
        </div>
        {category.description && (
          <p className="text-white/50 ml-12">{category.description}</p>
        )}
      </motion.div>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.products.map((product, productIndex) => (
          <ProductCard
            key={product.slug}
            product={product}
            onClick={() => onProductClick(product)}
            index={productIndex}
          />
        ))}
      </div>
    </motion.section>
  );
}
