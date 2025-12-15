'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function authenticate(password: string) {
  const correctPassword = process.env.SITE_PASSWORD
  
  if (!correctPassword) {
    return { error: 'Password protection is not configured' }
  }
  
  if (password === correctPassword) {
    // In production (Vercel), always use secure cookies for HTTPS
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
    const cookieStore = await cookies()
    cookieStore.set('site-auth', 'authenticated', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    redirect('/')
  } else {
    return { error: 'Forkert adgangskode' }
  }
}

