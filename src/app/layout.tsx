import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './providers'
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'Generated by Tarun Nitin Pahade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
      <NextAuthProvider>
      <ThemeProvider attribute="class">
        {children}
        </ThemeProvider>
        </NextAuthProvider>
        
        </body>
    </html>
  )
}
