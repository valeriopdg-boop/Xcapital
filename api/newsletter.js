// Iscrizione newsletter: crea/aggiorna il contatto su Brevo.
// Env richieste su Vercel: BREVO_API_KEY, BREVO_NEWSLETTER_LIST_ID.
// Il double opt-in GDPR va attivato nelle impostazioni della lista su Brevo.
// Senza configurazione risponde 503: il frontend mostra il fallback email.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const { email, website } = req.body ?? {};

  // Honeypot antispam.
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).json({ error: "invalid_email" });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_NEWSLETTER_LIST_ID;
  if (!apiKey || !listId) {
    res.status(503).json({ error: "not_configured" });
    return;
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email, listIds: [Number(listId)], updateEnabled: true }),
  });

  // 201 creato, 204 aggiornato: entrambi successi.
  if (!response.ok && response.status !== 204) {
    res.status(502).json({ error: "provider_error" });
    return;
  }

  res.status(200).json({ ok: true });
}
