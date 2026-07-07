'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SiteSettings {
  siteTitle: string
  tagline: string
  footerText: string
  socialLinks: { platform: string; url: string }[]
}

export default function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: '',
    tagline: '',
    footerText: '',
    socialLinks: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      setSettings({
        siteTitle: data.siteTitle || '',
        tagline: data.tagline || '',
        footerText: data.footerText || '',
        socialLinks: typeof data.socialLinks === 'string' 
          ? JSON.parse(data.socialLinks) 
          : (data.socialLinks || [])
      })
    } catch (err) {
      console.error('Error fetching settings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...settings,
          socialLinks: JSON.stringify(settings.socialLinks)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError('Failed to save settings. Please try again.')
      console.error('Error saving settings:', err)
    } finally {
      setSaving(false)
    }
  }

  const addSocialLink = () => {
    setSettings({
      ...settings,
      socialLinks: [...settings.socialLinks, { platform: 'github', url: '' }]
    })
  }

  const removeSocialLink = (index: number) => {
    const updated = settings.socialLinks.filter((_, i) => i !== index)
    setSettings({ ...settings, socialLinks: updated })
  }

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = settings.socialLinks.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    )
    setSettings({ ...settings, socialLinks: updated })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-ink/50">Loading settings...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display text-ink">Site Settings</h1>
        {saved && <span className="text-moss font-medium">✓ Saved successfully</span>}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-ledger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-ledger border border-ink/10 p-6 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Site Title</label>
          <input
            type="text"
            required
            value={settings.siteTitle}
            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
            placeholder="My Portfolio"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Tagline</label>
          <input
            type="text"
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
            placeholder="A brief description of your work"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Footer Text</label>
          <textarea
            value={settings.footerText}
            onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
            className="w-full px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember resize-none"
            rows={2}
            placeholder="© 2024 My Portfolio"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-ink">Social Links</label>
            <button type="button" onClick={addSocialLink} className="text-sm text-ember hover:underline">
              + Add Link
            </button>
          </div>
          <div className="space-y-3">
            {settings.socialLinks.map((link, index) => (
              <div key={index} className="flex gap-2">
                <select
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                  className="px-3 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
                >
                  <option value="github">GitHub</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter</option>
                  <option value="dribbble">Dribbble</option>
                  <option value="email">Email</option>
                </select>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  className="flex-1 px-4 py-2 border border-ink/20 rounded-ledger focus:outline-none focus:border-ember"
                  placeholder="https://..."
                />
                <button 
                  type="button" 
                  onClick={() => removeSocialLink(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-ledger"
                >
                  ✕
                </button>
              </div>
            ))}
            {settings.socialLinks.length === 0 && (
              <p className="text-sm text-ink/50">No social links added yet.</p>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className="px-6 py-2 bg-ember text-stone rounded-ledger hover:brightness-110 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}