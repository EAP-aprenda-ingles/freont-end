import { NextRequest, NextResponse } from "next/server";

const signInUrl = `http://localhost:3000`;

export function middleware(request: NextRequest) {
    const token = request.cookies.get('user_token')?.value;

    if (!token) {
        return NextResponse.redirect(signInUrl, {
            headers: {
                'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/article/:path*', '/homepage', '/user/:path*', '/search', '/notifications']
};