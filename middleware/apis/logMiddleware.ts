import { NextRequest } from "next/server";

export const logMiddleware = (req: NextRequest) => {
  return { response: req.method + " " + req.url };
};
