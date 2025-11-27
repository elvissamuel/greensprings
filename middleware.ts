import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only"
  })
  const isLoginPage = req.nextUrl.pathname === "/admin/login"
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

  // If on login page and already authenticated, redirect to dashboard
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin/applications", req.url))
  }

  // If accessing admin routes (except login) without token, redirect to login
  if (isAdminRoute && !isLoginPage && !token) {
    const loginUrl = new URL("/admin/login", req.url)
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If accessing admin routes with token but wrong role, redirect to login
  if (isAdminRoute && !isLoginPage && token && token.role !== "admin") {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
