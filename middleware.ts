import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/apis/authMiddleware";
import { logMiddleware } from "./middleware/apis/logMiddleware";

export const config = {
  matcher: "/api/:path*",
};

export const middleware = (req: NextRequest) => {
  if (req.url.includes("/api/notes")) {
    const logResult = logMiddleware(req);
    console.log(logResult.response);
  }

  const authResult = authMiddleware(req);
  if (!authResult.isValid)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.next();
};
