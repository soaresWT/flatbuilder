export default async function handler(req, res) {
  const url = `https://flathub.org$/api/v1/apps`;
  const response = await fetch(url, {
    method: req.method,
    headers: {
      ...req.headers,
    },
    body: req.method === "POST" ? req.body : undefined,
  });

  const data = await response.text(); // ou response.json()

  res.status(response.status).send(data);
}
