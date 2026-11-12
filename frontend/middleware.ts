// frontend/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  // Kung mubisita sa dashboard unya walay cookie, i-redirect sa login
  if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Kung naay cookie unya naa sa login page, i-redirect sa dashboard
  if (request.nextUrl.pathname === '/admin' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};