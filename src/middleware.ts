'use client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const path=request.nextUrl.pathname
  const isPublicPath=path === '/' || path === '/login' || path === '/signup' || path === '/reset' 
 const token= request.cookies.get('next-auth.session-token')?.value || ''
 if (isPublicPath && token) {
   return NextResponse.redirect(new URL('/chat',request.nextUrl))
 }
 if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/chat',
    '/signup',
    '/reset'
  ],
}