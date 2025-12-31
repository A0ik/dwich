/**
 * API Route: POST /api/webhook-stripe
 * Webhook Stripe - Envoie WhatsApp + Email restaurant + Email client
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

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
    console.log('📧 Customer email:', session.customer_email);
    console.log('📦 Metadata:', JSON.stringify(session.metadata));

    // Récupérer les line_items
    let lineItems = [];
    try {
      const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      lineItems = items.data;
      console.log('📋 Line items:', lineItems.length);
    } catch (e) {
      console.error('Error fetching line items:', e);
    }

    // 1. Envoyer WhatsApp au restaurant
    try {
      await sendWhatsAppNotification(session, lineItems);
      console.log('✅ WhatsApp sent to restaurant');
    } catch (error) {
      console.error('❌ WhatsApp error:', error.message);
    }

    // 2. Envoyer Email au client
    try {
      const emailResult = await sendEmailToCustomer(session, lineItems);
      console.log('✅ Email sent to customer:', emailResult?.id || 'sent');
    } catch (error) {
      console.error('❌ Customer email error:', error.message);
    }

    // 3. Envoyer Email au restaurant
    try {
      await sendEmailToRestaurant(session, lineItems);
      console.log('✅ Email sent to restaurant');
    } catch (error) {
      console.error('❌ Restaurant email error:', error.message);
    }
  }

  res.status(200).json({ received: true });
}

// ============ WHATSAPP ============
async function sendWhatsAppNotification(session, lineItems) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.RESTAURANT_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !from || !to) {
    console.log('Twilio not configured, skipping WhatsApp');
    return;
  }

  const meta = session.metadata || {};
  const orderId = session.id.slice(-8).toUpperCase();
  const total = (session.amount_total / 100).toFixed(2);
  
  let itemsDetails = [];
  try {
    if (meta.itemsJson) itemsDetails = JSON.parse(meta.itemsJson);
  } catch (e) {}

  let productsText = '';
  if (itemsDetails.length > 0) {
    productsText = itemsDetails.map(item => {
      let line = `• ${item.qty}x ${item.name} (${(item.price / 100).toFixed(2)}€)`;
      if (item.options) line += `\n   → ${item.options}`;
      return line;
    }).join('\n');
  } else {
    productsText = lineItems
      .filter(item => item.description !== 'Livraison à domicile')
      .map(item => `• ${item.quantity}x ${item.description || 'Produit'}`).join('\n');
  }

  const message = `🍔 *NOUVELLE COMMANDE DWICH62*

━━━━━━━━━━━━━━━━━━━
📋 *Commande #${orderId}*
💰 *Total: ${total}€*
💳 *PAYÉ PAR CARTE*
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
  if (!response.ok && result.code !== 63016) {
    throw new Error(`Twilio: ${JSON.stringify(result)}`);
  }
  return result;
}

// ============ EMAIL CLIENT ============
async function sendEmailToCustomer(session, lineItems) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.log('RESEND_API_KEY not configured');
    return null;
  }

  const meta = session.metadata || {};
  const orderId = session.id.slice(-8).toUpperCase();
  const total = (session.amount_total / 100).toFixed(2);
  const customerEmail = session.customer_email;
  
  if (!customerEmail) {
    console.log('No customer email in session');
    return null;
  }

  console.log('Preparing email for:', customerEmail);

  let itemsDetails = [];
  try {
    if (meta.itemsJson) {
      itemsDetails = JSON.parse(meta.itemsJson);
    }
  } catch (e) {
    console.log('Error parsing itemsJson:', e.message);
  }

  // Générer le HTML des produits
  let productsHtml = '';
  if (itemsDetails.length > 0) {
    productsHtml = itemsDetails.map(item => `
      <tr>
        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
          <div style="font-weight: 600; color: #111827;">${item.name}</div>
          ${item.options ? `<div style="color: #6b7280; font-size: 13px; margin-top: 4px;">→ ${item.options}</div>` : ''}
        </td>
        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #374151;">${item.qty}</td>
        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #111827;">${(item.price * item.qty / 100).toFixed(2)}€</td>
      </tr>
    `).join('');
  } else if (lineItems.length > 0) {
    productsHtml = lineItems
      .filter(item => item.description !== 'Livraison à domicile')
      .map(item => `
        <tr>
          <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
            <div style="font-weight: 600; color: #111827;">${item.description || 'Produit'}</div>
          </td>
          <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #374151;">${item.quantity}</td>
          <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #111827;">${(item.amount_total / 100).toFixed(2)}€</td>
        </tr>
      `).join('');
  }

  const subtotal = meta.subtotal ? (parseFloat(meta.subtotal) / 100).toFixed(2) : (session.amount_total / 100 - 5).toFixed(2);
  const deliveryFee = meta.orderType === 'delivery' ? '5,00' : '0,00';

  const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de commande - DWICH62</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 10px;">🍔</div>
      <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 800;">DWICH62</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Merci pour votre commande !</p>
    </div>
    
    <!-- Content -->
    <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      
      <!-- Order Number -->
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #10b981; border-radius: 16px; padding: 25px; text-align: center; margin-bottom: 30px;">
        <p style="margin: 0; color: #166534; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Numéro de commande</p>
        <p style="margin: 8px 0 0 0; color: #059669; font-size: 42px; font-weight: 800; letter-spacing: 3px;">#${orderId}</p>
      </div>
      
      <!-- Greeting -->
      <p style="color: #374151; font-size: 16px; line-height: 1.7; margin-bottom: 25px;">
        Bonjour <strong>${meta.customerName || 'cher client'}</strong>,<br><br>
        Votre paiement a bien été reçu ! Nous préparons votre commande avec soin.
        ${meta.orderType === 'delivery' 
          ? '<br><br>🚚 <strong>Livraison estimée : 30-45 minutes</strong>' 
          : '<br><br>🏪 <strong>Votre commande sera prête dans 15-20 minutes</strong>'}
      </p>
      
      <!-- Order Details Title -->
      <div style="border-bottom: 3px solid #10b981; padding-bottom: 10px; margin-bottom: 20px;">
        <h2 style="color: #111827; font-size: 20px; margin: 0; font-weight: 700;">📋 Récapitulatif de votre commande</h2>
      </div>
      
      <!-- Products Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background: #f9fafb;">
            <th style="padding: 12px 15px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600;">Produit</th>
            <th style="padding: 12px 15px; text-align: center; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600;">Qté</th>
            <th style="padding: 12px 15px; text-align: right; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600;">Prix</th>
          </tr>
        </thead>
        <tbody>
          ${productsHtml}
        </tbody>
      </table>
      
      <!-- Totals -->
      <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
        <table style="width: 100%;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Sous-total</td>
            <td style="padding: 8px 0; text-align: right; color: #374151;">${subtotal}€</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Livraison</td>
            <td style="padding: 8px 0; text-align: right; color: ${meta.orderType === 'delivery' ? '#374151' : '#10b981'};">${meta.orderType === 'delivery' ? deliveryFee + '€' : 'Gratuit'}</td>
          </tr>
          <tr style="border-top: 2px solid #e5e7eb;">
            <td style="padding: 15px 0 0 0; font-size: 20px; font-weight: 700; color: #111827;">Total payé</td>
            <td style="padding: 15px 0 0 0; text-align: right; font-size: 28px; font-weight: 800; color: #10b981;">${total}€</td>
          </tr>
        </table>
      </div>
      
      <!-- Delivery/Pickup Info -->
      ${meta.orderType === 'delivery' ? `
      <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
        <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px; font-weight: 600;">🚚 Adresse de livraison</h3>
        <p style="margin: 0; color: #78350f; font-size: 15px; line-height: 1.5;">${meta.customerAddress}</p>
      </div>
      ` : `
      <div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
        <h3 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px; font-weight: 600;">🏪 Retrait sur place</h3>
        <p style="margin: 0; color: #1e3a8a; font-size: 15px; line-height: 1.5;">
          <strong>DWICH62</strong><br>
          135 Ter Rue Jules Guesde<br>
          62800 Liévin
        </p>
      </div>
      `}
      
      <!-- Notes -->
      ${meta.notes ? `
      <div style="background: #f3f4f6; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0; color: #374151; font-size: 14px; font-weight: 600;">📝 Vos instructions</h3>
        <p style="margin: 0; color: #6b7280; font-style: italic;">${meta.notes}</p>
      </div>
      ` : ''}
      
      <!-- Contact -->
      <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">Une question sur votre commande ?</p>
        <a href="tel:0767469502" style="display: inline-block; background: #10b981; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
          📞 Appelez-nous : 07 67 46 95 02
        </a>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 30px 20px; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0 0 5px 0; font-weight: 600;">DWICH62</p>
      <p style="margin: 0 0 5px 0;">135 Ter Rue Jules Guesde, 62800 Liévin</p>
      <p style="margin: 0;">© ${new Date().getFullYear()} Tous droits réservés</p>
    </div>
    
  </div>
</body>
</html>
  `;

  console.log('Sending email via Resend...');
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'DWICH62 <onboarding@resend.dev>',
      to: [customerEmail],
      subject: `✅ Commande #${orderId} confirmée - DWICH62`,
      html: emailHtml,
    }),
  });

  const result = await response.json();
  console.log('Resend response:', JSON.stringify(result));
  
  if (!response.ok) {
    throw new Error(`Resend error: ${JSON.stringify(result)}`);
  }
  
  return result;
}

// ============ EMAIL RESTAURANT ============
async function sendEmailToRestaurant(session, lineItems) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) return null;

  const restaurantEmail = process.env.RESTAURANT_EMAIL || 'dwich62bruay@gmail.com';
  const meta = session.metadata || {};
  const orderId = session.id.slice(-8).toUpperCase();
  const total = (session.amount_total / 100).toFixed(2);

  let itemsDetails = [];
  try {
    if (meta.itemsJson) itemsDetails = JSON.parse(meta.itemsJson);
  } catch (e) {}

  let productsHtml = '';
  if (itemsDetails.length > 0) {
    productsHtml = itemsDetails.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">${item.qty}x ${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd;">${item.options || '-'}</td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">${(item.price * item.qty / 100).toFixed(2)}€</td>
      </tr>
    `).join('');
  } else {
    productsHtml = lineItems
      .filter(item => item.description !== 'Livraison à domicile')
      .map(item => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">${item.quantity}x ${item.description || 'Produit'}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">-</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">${(item.amount_total / 100).toFixed(2)}€</td>
        </tr>
      `).join('');
  }

  const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <div style="background: #dc2626; padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">🚨 NOUVELLE COMMANDE</h1>
    </div>
    
    <div style="background: #fef2f2; padding: 20px; text-align: center; border-bottom: 3px solid #dc2626;">
      <p style="margin: 0; color: #666;">Commande</p>
      <p style="margin: 5px 0; color: #dc2626; font-size: 36px; font-weight: bold;">#${orderId}</p>
      <p style="margin: 10px 0 0 0; font-size: 24px; font-weight: bold; color: #16a34a;">${total}€</p>
      <p style="margin: 10px 0 0 0; background: #10b981; color: white; display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold;">💳 PAYÉ PAR CARTE</p>
    </div>
    
    <div style="padding: 20px; background: #f9f9f9;">
      <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">👤 CLIENT</h2>
      <table style="width: 100%;">
        <tr><td style="padding: 5px 0; color: #666;">Nom:</td><td style="padding: 5px 0; font-weight: bold;">${meta.customerName || 'N/A'}</td></tr>
        <tr><td style="padding: 5px 0; color: #666;">Téléphone:</td><td style="padding: 5px 0; font-weight: bold;"><a href="tel:${meta.customerPhone}" style="color: #dc2626;">${meta.customerPhone || 'N/A'}</a></td></tr>
        <tr><td style="padding: 5px 0; color: #666;">Email:</td><td style="padding: 5px 0;">${session.customer_email || 'N/A'}</td></tr>
      </table>
    </div>
    
    <div style="padding: 20px; ${meta.orderType === 'delivery' ? 'background: #fef3c7; border-left: 4px solid #f59e0b;' : 'background: #dbeafe; border-left: 4px solid #3b82f6;'}">
      <h2 style="margin: 0 0 10px 0; color: #333; font-size: 18px;">${meta.orderType === 'delivery' ? '🚚 LIVRAISON' : '🏪 SUR PLACE'}</h2>
      ${meta.orderType === 'delivery' ? `<p style="margin: 0; font-size: 16px; font-weight: bold;">${meta.customerAddress}</p>` : '<p style="margin: 0;">Le client viendra chercher sa commande</p>'}
    </div>
    
    <div style="padding: 20px;">
      <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">🍔 COMMANDE</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead><tr style="background: #f3f4f6;"><th style="padding: 12px; text-align: left;">Produit</th><th style="padding: 12px; text-align: left;">Options</th><th style="padding: 12px; text-align: right;">Prix</th></tr></thead>
        <tbody>${productsHtml}</tbody>
        <tfoot>
          ${meta.orderType === 'delivery' ? '<tr><td colspan="2" style="padding: 12px; text-align: right;">Livraison:</td><td style="padding: 12px; text-align: right;">5,00€</td></tr>' : ''}
          <tr style="background: #10b981; color: white;"><td colspan="2" style="padding: 15px; font-size: 18px; font-weight: bold;">TOTAL</td><td style="padding: 15px; text-align: right; font-size: 24px; font-weight: bold;">${total}€</td></tr>
        </tfoot>
      </table>
    </div>
    
    ${meta.notes ? `<div style="padding: 20px; background: #fef3c7; border-top: 1px solid #f59e0b;"><h2 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">📝 NOTES</h2><p style="margin: 0; color: #78350f; font-weight: bold;">${meta.notes}</p></div>` : ''}
    
    <div style="padding: 15px; background: #333; text-align: center;"><p style="margin: 0; color: #999; font-size: 12px;">Reçue le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p></div>
  </div>
</body>
</html>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'DWICH62 <onboarding@resend.dev>',
      to: [restaurantEmail],
      subject: `🚨 COMMANDE #${orderId} - ${total}€ - ${meta.orderType === 'delivery' ? 'LIVRAISON' : 'SUR PLACE'}`,
      html: emailHtml,
    }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(`Resend: ${JSON.stringify(result)}`);
  return result;
}
