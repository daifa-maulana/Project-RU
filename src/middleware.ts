import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const role = request.cookies.get('auth-role')?.value;
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!token || (role !== 'ADMIN' && role !== 'USTADZ')) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
    }
  }

  // Protect /portal (user/orang tua) routes
  if (pathname.startsWith('/portal')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === '/login' && token) {
    if (role === 'ADMIN' || role === 'USTADZ') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/portal/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*', '/login'],
};
