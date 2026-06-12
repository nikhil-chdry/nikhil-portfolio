import express from "express";
import handler from "./dist/server/server.js";

const app = express();

// Serve static assets from dist/client
app.use(express.static("dist/client"));

// Everything else goes to the SSR handler
app.use(async (req, res) => {
  const url = `http://${req.headers.host}${req.originalUrl}`;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;

  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : body,
  });

  const response = await handler.fetch(request, {}, {});

  res.status(response.status);
  response.headers.forEach((value, key) => res.setHeader(key, value));

  if (response.body) {
    for await (const chunk of response.body) res.write(chunk);
  }
  res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));