// Callback OAuth GitHub per Decap CMS: scambia il code con un access token
// e lo restituisce alla finestra del CMS via postMessage.
// Richiede GITHUB_CLIENT_ID e GITHUB_CLIENT_SECRET tra le env var di Vercel.
export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!code || !clientId || !clientSecret) {
    res.status(400).send("Parametri o credenziali OAuth mancanti");
    return;
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) {
    res.status(401).send("Autenticazione GitHub non riuscita");
    return;
  }

  const content = JSON.stringify({ token: tokenData.access_token, provider: "github" });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!doctype html><html><body><script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:${content.replace(/'/g, "\\'")}',
      e.origin
    );
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`);
}
