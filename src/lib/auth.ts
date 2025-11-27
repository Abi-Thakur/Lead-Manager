import jwt from "jsonwebtoken";

export interface JWTPayload {
  id: string;
  email: string;
}

export function generateToken(payload: JWTPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
  } catch (error) {
    console.log(error)
    return null;
    
  }
}
