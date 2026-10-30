import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Cookie } from 'lucide-react'
import { BUSINESS } from '../content/site.js'

export default function LegalLayout({ eyebrow, title, updated, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${title} — ${BUSINESS.name}`
  }, [title])

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 sm:px-10 lg:px-16 py-6 border-b border-divider">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Cookie className="h-5 w-5 text-background" strokeWidth={2.2} />
            </span>
            <span className="font-display italic font-medium text-2xl text-ink">{BUSINESS.name}</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <main className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <article className="max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ {eyebrow}</span>
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-ink mt-4 tracking-tight">{title}</h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mt-4">Last updated: {updated}</p>

          <div className="mt-8 p-5 rounded-3xl bg-blush/60 border border-accent/30 text-sm text-ink/80 leading-relaxed">
            <strong className="font-semibold">Draft template.</strong> This page is a starting point, not legal advice.
            Review it against how {BUSINESS.name} actually operates and Sri Lankan requirements before launch.
          </div>

          <div className="mt-10 space-y-8 text-ink/80 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
            {children}
          </div>
        </article>
      </main>
    </div>
  )
}
