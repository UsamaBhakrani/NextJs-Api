import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/apis/authMiddleware";

export const config = {
  matcher: "/api/:path*",
};

export const middleware = (req: NextRequest) => {
  const authResult = authMiddleware(req);
  if (!authResult.isValid)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.next();
};
