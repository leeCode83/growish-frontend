import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Check host header (strip port if present)
  const hostHeader = request.headers.get('host') || 'growish.xyz'
  const hostname = hostHeader.split(':')[0].toLowerCase()

  // Match app as a subdomain (handles app.growish.xyz, app.localhost, 
  // app.vercel.app, or any *.app.domain)
  const isAppHost = /(^|\.)app\.(localhost|growish\.xyz|.*\.vercel\.app)$/.test(hostname)

  // Define app routes that should only be accessible on app subdomain
  const appRoutes = ['/dashboard', '/vaults', '/history', '/transparency', '/settings']
  const isAppRoute = appRoutes.some(route => url.pathname.startsWith(route))

  if (isAppHost) {
    // On app subdomain, redirect root to dashboard
    if (url.pathname === '/') {
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
    // Allow all app routes on app subdomain
    return NextResponse.next()
  }

  // Not on app subdomain
  if (isAppRoute) {
    // Redirect app routes to app subdomain
    const appUrl = url.clone()
    
    if (hostname.includes('localhost')) {
      appUrl.hostname = `app.${hostname}`
    } else if (hostname.endsWith('.vercel.app')) {
      appUrl.hostname = `app.${hostname}`
    } else {
      const rootDomain = hostname.split('.').slice(-2).join('.')
      appUrl.hostname = `app.${rootDomain}`
    }
    
    return NextResponse.redirect(appUrl)
  }

  // Root domain, non-app routes - show landing page
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
}
