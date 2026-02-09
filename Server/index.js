import "./config/env.js";

[
  "PORT",
  "MONGO_URI",
  "GROQ_API_KEY",
  "AUTH0_AUDIENCE",
  "AUTH0_ISSUER_BASE_URL",
].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

import connectDB from "./config/db.js";
import app from "./server.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
