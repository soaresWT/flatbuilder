// api/proxy.js
export default async function handler(req, res) {
  const url = `https://flathub.org${req.url}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body:
        req.method === "POST" || req.method === "PUT" ? req.body : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
