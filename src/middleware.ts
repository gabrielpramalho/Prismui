import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Export as default function
export default function middleware(request: NextRequest) {
  // Check if the path is /docs/components
  if (request.nextUrl.pathname === "/docs/components") {
    // Redirect to /docs
    return NextResponse.redirect(new URL("/docs", request.url));
  }
}

export const config = {
  matcher: "/docs/components",
};
