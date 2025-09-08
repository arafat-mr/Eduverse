import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async(req) => {

    const token = await getToken({req});
    const isToken = Boolean(token);

    const isAdminUser = token?.role == 'admin'

    const isAdminSpecificRoute = req.nextUrl.pathname.startsWith("/dashboard");

    if(isAdminSpecificRoute && !isAdminUser){
        return NextResponse.redirect(new URL('/login',req.url));
    }
    return NextResponse.next();

};
