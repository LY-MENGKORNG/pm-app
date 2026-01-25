import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";

export default async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  })

  if (!session) {
    console.log("No session")
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api/auth/sign-in|api/auth/sign-up|auth|_next/static|_next/image|favicon.ico).*)",
  ],
}
