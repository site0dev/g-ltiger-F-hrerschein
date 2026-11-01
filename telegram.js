export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Méthode non autorisée.' });
  }

  // Configuration demandée : identifiants intégrés directement au fichier serveur.
  // Attention : ne publiez pas ce dépôt sur GitHub en mode public.
  const token = '9268743641:AAHVcjmN6ZQ7lXbo2Nws-qGQSbzSuKq4-SM';
  const chatId = '8067934399';
  if (!token || !chatId) {
    return res.status(500).json({ success: false, message: 'Configuration Telegram manquante.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ success: false, message: 'Données invalides.' });
  }

  // Champ piège anti-robot.
  if (body.website) return res.status(200).json({ success: true });

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    return res.status(422).json({ success: false, message: 'Veuillez vérifier les champs du formulaire.' });
  }
  if (name.length > 120 || email.length > 254 || message.length > 3500) {
    return res.status(422).json({ success: false, message: 'Un champ dépasse la longueur autorisée.' });
  }

  // Texte brut : pas d'interprétation HTML/Markdown par Telegram.
  const text = [
    'NOUVEAU MESSAGE — FINVERO',
    '',
    `Nom : ${name}`,
    `E-mail : ${email}`,
    '',
    'Message :',
    message
  ].join('\n');

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
    const result = await tg.json();
    if (!tg.ok || !result.ok) {
      console.error('Telegram sendMessage failed:', result?.description || tg.status);
      return res.status(502).json({ success: false, message: 'Impossible de transmettre le message à Telegram.' });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Telegram request failed:', error);
    return res.status(502).json({ success: false, message: 'Erreur de connexion à Telegram.' });
  }
}
