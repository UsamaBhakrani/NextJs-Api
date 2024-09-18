import { NextRequest } from "next/server";

const validateToken = (token: any) => {
  const validToken = true;

  if (!validToken || !token) {
    return false;
  }

  return true;
};

export const authMiddleware = (req: NextRequest) => {
  const token = req.headers.get("authorization")?.split(" ")[1];

  return { isValid: validateToken(token) };
};
