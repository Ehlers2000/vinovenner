import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if password protection is enabled (handle various truthy values)
  const enablePasswordProtection = process.env.ENABLE_PASSWORD_PROTECTION
  const isPasswordProtected = enablePasswordProtection === 'true' || enablePasswordProtection === '1'
  
  // If password protection is disabled, redirect away from login page
  if (!isPasswordProtected) {
    if (request.nextUrl.pathname === '/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }
  
  // Check if user is authenticated
  const isAuthenticated = request.cookies.get('site-auth')?.value === 'authenticated'
  
  // Allow access to the login page itself
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next()
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

