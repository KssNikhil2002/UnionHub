import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
const secret = process.env.AUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  if (pathname === '/' && token) {
    // Prevent logged-in users from accessing the home page by keeping them on the current page
    return NextResponse.redirect(new URL(req.headers.get('referer') || '/', req.url));
  }

  if (pathname === '/Rathskeller' && !token) {
    // Redirect logged-out users trying to access the Rathskeller page to login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Continue to the requested page if no redirects are needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/Rathskeller'], // Paths that will be matched by the middleware
};
