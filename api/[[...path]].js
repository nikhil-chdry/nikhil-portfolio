import handler from "../dist/server/server.js";

export const config = { runtime: "nodejs" };

export default async function (req, res) {
  // Convert Node req to a Fetch Request
  const url = `https://${req.headers.host}${req.url}`;
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
    duplex: "half",
  });

  const response = await handler.fetch(request, {}, {});

  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));

  if (response.body) {
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}