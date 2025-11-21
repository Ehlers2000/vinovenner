'use client'

import { useState } from 'react'
import { authenticate } from './actions'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    const result = await authenticate(password)
    
    if (result?.error) {
      setError(result.error)
      setPassword('')
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-graphite-900 mb-2">
            Vinovenner
          </h1>
          <p className="text-graphite-600">Indtast adgangskode for at fortsætte</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">
              Adgangskode
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-graphite-300 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Adgangskode"
              autoFocus
            />
          </div>
          
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logger ind...' : 'Log ind'}
          </Button>
        </form>
      </div>
    </div>
  )
}

