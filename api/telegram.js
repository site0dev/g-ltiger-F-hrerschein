export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Methode nicht erlaubt.' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('Variables Telegram manquantes dans Vercel.');
    return res.status(500).json({ success: false, message: 'Telegram-Konfiguration auf dem Server fehlt.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ success: false, message: 'Ungültige Daten.' });
  }

  if (body.website) return res.status(200).json({ success: true });

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !message) {
    return res.status(422).json({ success: false, message: 'Bitte überprüfen Sie die Formularfelder.' });
  }
  if (name.length > 120 || email.length > 254 || message.length > 3500) {
    return res.status(422).json({ success: false, message: 'Ein Feld überschreitet die zulässige Länge.' });
  }

  const text = [
    'NEUE ANFRAGE — FINVERO', '',
    `Name: ${name}`,
    `E-Mail: ${email}`, '',
    'Nachricht:', message
  ].join('\n');

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
    const telegramResult = await telegramResponse.json();
    if (!telegramResponse.ok || !telegramResult.ok) {
      console.error('Telegram API error:', telegramResult?.description || telegramResponse.status);
      return res.status(502).json({ success: false, message: 'Telegram hat die Nachricht abgelehnt. Bitte prüfen Sie Bot-Token und Chat-ID.' });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Telegram request error:', error);
    return res.status(502).json({ success: false, message: 'Verbindung zu Telegram nicht möglich.' });
  }
}
