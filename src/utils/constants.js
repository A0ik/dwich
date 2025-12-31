// Configuration du restaurant
export const RESTAURANT_CONFIG = {
  name: 'DWICH62',
  phone: '03 21 12 34 56',
  email: 'contact@dwich62.fr',
  address: '123 Rue de la Gastronomie, 62000 Arras',
};

// Lien Google Maps - REMPLACE PAR TON LIEN
export const MAP_LINK = "https://maps.google.com/?q=123+Rue+de+la+Gastronomie+62000+Arras";

// Frais de livraison en centimes (500 = 5€)
export const DELIVERY_FEE = 500;

// Montant minimum pour la livraison gratuite (en centimes, null = jamais gratuit)
export const FREE_DELIVERY_THRESHOLD = null;

// Configuration Stripe (les vraies clés seront dans .env)
export const STRIPE_CONFIG = {
  // URL de retour après paiement réussi
  successUrl: '/checkout/success',
  // URL de retour après annulation
  cancelUrl: '/checkout',
};

// Mapping taille -> nombre de viandes max
// Utilisé pour la validation dynamique Assiettes et Tacos
export const SIZE_TO_MEAT_LIMIT = {
  // Pour les Assiettes
  'taille-assiette': {
    '1 viande': 1,
    '2 viandes': 2,
    '3 viandes': 3,
  },
  // Pour les Tacos
  'taille-tacos': {
    'M (1 viande)': 1,
    'L (2 viandes)': 2,
    'XL (3 viandes)': 3,
  },
};

// Mapping groupe taille -> groupe viandes
export const SIZE_GROUP_TO_MEAT_GROUP = {
  'taille-assiette': 'viandes-assiette',
  'taille-tacos': 'viandes-tacos',
};
