/**
 * API Route: POST /api/create-checkout-session
 * Crée une session de paiement Stripe Checkout
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, deliveryFee, customerInfo, orderType } = req.body;

    // Construire les line_items pour Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description || undefined,
        },
        unit_amount: item.unitPrice,
      },
      quantity: item.quantity,
    }));

    // Ajouter les frais de livraison si applicable
    if (deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de livraison',
            description: 'Livraison à domicile',
          },
          unit_amount: deliveryFee,
        },
        quantity: 1,
      });
    }

    // Formater les détails des articles pour le webhook (avec toutes les options)
    const itemsDetails = items.map(item => ({
      name: item.name,
      qty: item.quantity,
      price: item.unitPrice,
      options: item.description || ''
    }));

    // Calculer le sous-total
    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

    // Base URL pour les redirections - UTILISER PUBLIC_URL pour éviter les URL de preview
    const baseUrl = process.env.PUBLIC_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5173';

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?canceled=true`,
      customer_email: customerInfo.email,
      metadata: {
        orderType,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email, // AJOUT: email dans metadata aussi
        customerAddress: orderType === 'delivery' 
          ? `${customerInfo.address}, ${customerInfo.postalCode} ${customerInfo.city}`
          : 'Sur place',
        notes: customerInfo.notes || '',
        // Stocker les détails des articles (JSON stringifié, max 500 chars par clé)
        itemsJson: JSON.stringify(itemsDetails).slice(0, 500),
        subtotal: subtotal.toString(),
        deliveryFee: deliveryFee.toString(),
      },
    });

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
