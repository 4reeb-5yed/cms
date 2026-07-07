'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'
  
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      router.push(redirect)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-ledger border border-ink/10 p-8">
      <h1 className="font-display text-2xl text-ink mb-2">Admin Login</h1>
      <p className="text-sm text-ink/70 mb-6">Enter your admin password to access the CMS.</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-ledger text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-ink mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-stone border border-ink/20 text-ink rounded-ledger focus:outline-none focus:border-ember transition-colors"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-ember text-stone font-medium rounded-ledger hover:brightness-110 transition-all disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-stone flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Suspense fallback={<div className="bg-white rounded-ledger border border-ink/10 p-8"><p className="text-center text-ink/50">Loading...</p></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
