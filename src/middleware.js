

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const middleware = async (req) => {
  const token = await getToken({ req });
  const isToken = Boolean(token);
  const isUserRole = token?.role === 'admin' || token?.role === 'user';

  const isPrivateRoute = req.nextUrl.pathname.startsWith("/dashboard")||
   req.nextUrl.pathname.startsWith("/checkout") ||
   req.nextUrl.pathname.startsWith("/payment")


  if (isPrivateRoute && (!isToken || !isUserRole)) {
    
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};
