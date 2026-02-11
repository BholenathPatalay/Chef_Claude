import "../config/env.js";
import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

export function checkJwt(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  return jwtCheck(req, res, next);
}
