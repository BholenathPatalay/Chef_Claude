import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
  audience: "https://chefclaude.api",
  issuerBaseURL: "https://dev-zqyo5x8qp31v8sgw.us.auth0.com/",
});
