import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//https://nextjs.org/docs/pages/building-your-application/routing/middleware

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token');

  const protectedRoutes = ['/map'];
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
