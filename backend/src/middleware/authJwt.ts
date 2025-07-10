// authJwt.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { getRuntimeConfig } from "../config/runtimeConfig";

export interface KeycloakJwtPayload {
  sub: string;
  preferred_username?: string;
  email?: string;
  realm_access?: {
    roles: string[];
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username?: string;
        email?: string;
        roles?: string[];
      };
    }
  }
}

let jwks: ReturnType<typeof jwksClient> | null = null;

function getClient() {
  if (!jwks) {
    const config = getRuntimeConfig();
    jwks = jwksClient({
      jwksUri: `${config.keycloak_base_url}/realms/${config.keycloak_realm}/protocol/openid-connect/certs`,
      cache: true,
      cacheMaxEntries: 300,
      cacheMaxAge: 10 * 60 * 1000,
    });
  }
  return jwks;
}

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  const client = getClient();
  client.getSigningKey(header.kid!, function (err, key) {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const config = getRuntimeConfig(); // Gọi tại đây, khi chắc chắn đã load

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token is missing" });
    return;
  }

  jwt.verify(
    token,
    getKey,
    {
      algorithms: ["RS256"],
      issuer: `${config.keycloak_base_url}/realms/${config.keycloak_realm}`,
      audience: config.keycloak_audience,
    },
    (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Invalid token", error: err });
        return;
      }

      const payload = decoded as KeycloakJwtPayload;

      req.user = {
        id: payload.sub,
        username: payload.preferred_username,
        email: payload.email,
        roles: payload.realm_access?.roles || [],
      };

      next();
    }
  );
};
