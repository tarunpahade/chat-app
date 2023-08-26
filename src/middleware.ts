'use client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const path=request.nextUrl.pathname
  const isPublicPath=path === '/' || path === '/login' || path === '/signup' || path === '/verifyemail' 
 const token= request.cookies.get('next-auth.session-token')?.value || ''
 if (isPublicPath && token) {
   return NextResponse.redirect(new URL('/chat',request.nextUrl))
 }
 if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/chat',
    '/signup',
    '/verifyemail'
  ],
}