import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import recipeRoutes from "./routes/recipe.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

export default app;
