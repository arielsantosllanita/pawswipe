import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export async function signJWT(payload: JWTPayload, secret: string): Promise<string> {
  return (
    new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(secret))
  );
}

export async function verifyJWT(token: string, secret: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}
