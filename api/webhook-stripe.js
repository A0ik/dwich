/**
 * API Route: POST /api/webhook-stripe
 * Webhook Stripe pour recevoir les événements de paiement
 * Envoie une notification WhatsApp au restaurateur avec TOUS les détails
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('✅ Payment received:', session.id);

    try {
      // Récupérer les line_items de Stripe pour avoir tous les détails
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      
      await sendWhatsAppNotification(session, lineItems.data);
      console.log('✅ WhatsApp notification sent');
    } catch (error) {
      console.error('❌ WhatsApp error:', error);
    }
  }

  res.status(200).json({ received: true });
}

async function sendWhatsAppNotification(session, lineItems) {
  const method = process.env.WHATSAPP_METHOD || 'twilio';
  const message = formatOrderMessage(session, lineItems);
  
  console.log('📱 Sending WhatsApp via:', method);
  console.log('📝 Message:', message);

  if (method === 'twilio') {
    await sendViaTwilio(message);
  } else if (method === 'meta') {
    await sendViaMeta(message);
  }
}

function formatOrderMessage(session, lineItems) {
  const meta = session.metadata || {};
  const orderId = session.id.slice(-8).toUpperCase();
  const total = (session.amount_total / 100).toFixed(2);
  
  // Essayer de parser les items depuis metadata
  let itemsDetails = [];
  try {
    if (meta.itemsJson) {
      itemsDetails = JSON.parse(meta.itemsJson);
    }
  } catch (e) {
    console.log('Could not parse itemsJson, using line_items');
  }

  // Construire la liste des produits avec détails
  let productsText = '';
  
  if (itemsDetails.length > 0) {
    // Utiliser les détails stockés (avec options/sauces)
    productsText = itemsDetails.map(item => {
      let line = `• ${item.qty}x ${item.name} (${(item.price / 100).toFixed(2)}€)`;
      if (item.options) {
        line += `\n   → ${item.options}`;
      }
      return line;
    }).join('\n');
  } else {
    // Fallback: utiliser les line_items de Stripe
    productsText = lineItems
      .filter(item => item.description !== 'Livraison à domicile')
      .map(item => {
        let line = `• ${item.quantity}x ${item.description || item.price?.product?.name || 'Produit'}`;
        if (item.price?.unit_amount) {
          line += ` (${(item.price.unit_amount / 100).toFixed(2)}€)`;
        }
        return line;
      }).join('\n');
  }

  // Message WhatsApp formaté
  return `🍔 *NOUVELLE COMMANDE DWICH*

━━━━━━━━━━━━━━━━━━━
📋 *Commande #${orderId}*
💰 *Total: ${total}€*
━━━━━━━━━━━━━━━━━━━

👤 *Client:* ${meta.customerName || 'N/A'}
📞 *Tél:* ${meta.customerPhone || 'N/A'}
📧 *Email:* ${session.customer_email || 'N/A'}

📍 *Mode:* ${meta.orderType === 'delivery' ? '🚚 LIVRAISON' : '🏪 SUR PLACE'}
${meta.orderType === 'delivery' ? `🏠 *Adresse:* ${meta.customerAddress}` : ''}

━━━━━━━━━━━━━━━━━━━
🍽️ *DÉTAILS COMMANDE:*
━━━━━━━━━━━━━━━━━━━
${productsText}
━━━━━━━━━━━━━━━━━━━

${meta.notes ? `📝 *Notes:* ${meta.notes}\n` : ''}
⏰ ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`;
}

async function sendViaTwilio(message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.RESTAURANT_WHATSAPP_NUMBER;

  console.log('Twilio config check:', { 
    hasSid: !!accountSid, 
    hasToken: !!authToken, 
    from, 
    to 
  });

  if (!accountSid || !authToken || !from || !to) {
    throw new Error('Missing Twilio configuration. Check environment variables.');
  }

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: from, To: to, Body: message }),
    }
  );

  const result = await response.json();
  console.log('Twilio response:', JSON.stringify(result));

  if (!response.ok) {
    throw new Error(`Twilio error: ${JSON.stringify(result)}`);
  }

  return result;
}

async function sendViaMeta(message) {
  const token = process.env.META_WHATSAPP_TOKEN;
  const phoneId = process.env.META_WHATSAPP_PHONE_ID;
  const recipientPhone = process.env.RESTAURANT_PHONE_NUMBER;

  if (!token || !phoneId || !recipientPhone) {
    throw new Error('Missing Meta WhatsApp configuration');
  }

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${phoneId}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipientPhone,
        type: 'text',
        text: { preview_url: false, body: message },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Meta WhatsApp error: ${JSON.stringify(error)}`);
  }

  return response.json();
}
