// Endpoint contatti: inoltra la richiesta via email transazionale Brevo.
// Env richieste su Vercel: BREVO_API_KEY, CONTACT_TO_EMAIL (destinatario),
// opzionale CONTACT_FROM_EMAIL (mittente verificato su Brevo).
// Senza configurazione risponde 503: il frontend mostra il fallback email.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const { name, email, company, phone, area, message, website } = req.body ?? {};

  // Honeypot antispam: i bot compilano il campo invisibile "website".
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!name || !email || !message) {
    res.status(400).json({ error: "missing_fields" });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    res.status(503).json({ error: "not_configured" });
    return;
  }

  const sender = process.env.CONTACT_FROM_EMAIL || to;
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { email: sender, name: "Sito Delex Capital" },
      to: [{ email: to }],
      replyTo: { email, name },
      subject: `Richiesta dal sito — ${name}${company ? ` (${company})` : ""}${area ? ` · ${area}` : ""}`,
      textContent: `Nome: ${name}\nEmail: ${email}\nAzienda: ${company || "-"}\nTelefono: ${phone || "-"}\nArea di interesse: ${area || "-"}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    res.status(502).json({ error: "provider_error" });
    return;
  }

  res.status(200).json({ ok: true });
}
