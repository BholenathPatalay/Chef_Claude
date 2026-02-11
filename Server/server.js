import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import recipeRoutes from "./routes/recipe.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://chef-claude.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

export default app;
