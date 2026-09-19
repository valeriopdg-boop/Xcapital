// Avvia il flusso OAuth GitHub per Decap CMS.
// Richiede GITHUB_CLIENT_ID (GitHub OAuth App) tra le env var di Vercel.
export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send("GITHUB_CLIENT_ID non configurata");
    return;
  }
  const params = new URLSearchParams({
    client_id: clientId,
    scope: "repo",
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
