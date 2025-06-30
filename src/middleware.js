import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  
  const protectedRoutes = ['/profile', '/profile/files', '/profile/details'];
  
  const isProtectedRoute = protectedRoutes.some(route => {
    const localePattern = /^\/[a-z]{2}(\/.*)?$/;
    if (localePattern.test(pathname)) {
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
      return pathWithoutLocale.startsWith(route);
    }
    return pathname.startsWith(route);
  });

  if (isProtectedRoute) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (!accessToken && !refreshToken) {
      const url = request.nextUrl.clone();
      
      const localeMatch = pathname.match(/^\/([a-z]{2})\//);
      const locale = localeMatch ? localeMatch[1] : 'en';
      
      url.pathname = `/${locale}`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};