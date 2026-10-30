import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Cookie,
  Gift,
  Package,
  ChefHat,
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  AtSign,
  MessageCircle,
  Menu,
  X,
  Upload,
  Plus,
  Minus,
  Info,
  ClipboardList,
} from 'lucide-react'
import {
  BUSINESS,
  SITE,
  PRODUCTS,
  STATUS_LABELS,
  BOXES,
  STEPS,
  FAQS,
  LAUNCH_NOTES,
} from './content/site.js'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ----------------------------------------------------------------
   Constants / helpers
---------------------------------------------------------------- */
const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Gift boxes', href: '#gifting' },
  { label: 'How it works', href: '#how' },
  { label: 'Our story', href: '#story' },
  { label: 'FAQ', href: '#faq' },
]

const formatPrice = (n) =>
  n == null ? 'Price TBC' : `${SITE.currency} ${n.toLocaleString('en-LK')}`

const YEAR = new Date().getFullYear()

const isPlaceholder = (s) => typeof s === 'string' && s.startsWith('[REPLACE')

const whatsappLink = (text) =>
  BUSINESS.whatsapp
    ? `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`
    : null

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=2400&q=80'
const STORY_IMAGE =
  'https://images.unsplash.com/photo-1767339300211-00be83435c63?auto=format&fit=crop&w=1400&q=80'

/* ----------------------------------------------------------------
   Logo
---------------------------------------------------------------- */
function Logo({ light = false, size = 'md' }) {
  const badge = size === 'lg' ? 'h-10 w-10' : 'h-9 w-9'
  return (
    <span className="flex items-center gap-2.5 group">
      <span className={`relative flex ${badge} items-center justify-center rounded-full bg-primary`}>
        <Cookie className="h-5 w-5 text-background" strokeWidth={2.2} />
        <span className="absolute inset-0 rounded-full ring-2 ring-accent/40 group-hover:ring-accent/70 transition" />
      </span>
      <span
        className={`font-display italic font-medium tracking-tight ${
          size === 'lg' ? 'text-3xl' : 'text-2xl'
        } ${light ? 'text-background' : 'text-ink'} transition-colors`}
      >
        {BUSINESS.name}
      </span>
    </span>
  )
}

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
        aria-label="Main"
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" aria-label={`${BUSINESS.name} home`}>
            <Logo light={!scrolled} />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-tight lift-on-hover ${
                  scrolled ? 'text-ink/70 hover:text-primary' : 'text-white/85 hover:text-white'
                } transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#order"
            className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-background px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
          >
            Pre-order
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <Logo />
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/60" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-medium text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#order"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-background px-6 py-4 rounded-full font-semibold w-full"
          >
            Pre-order a box
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
        stagger: 0.12,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden bg-deep">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Chunky chocolate cookies broken open on parchment"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-deep/90 via-deep/55 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />
      </div>

      {/* Floating crumbs + sugar flecks */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 right-[18%] h-2.5 w-2.5 rounded-[40%] bg-accent/70 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[55%] right-[10%] h-1.5 w-1.5 rounded-full bg-gold/70 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[38%] right-[27%] h-2 w-2 rotate-12 rounded-[30%] bg-background/50 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[20%] right-[34%] h-1 w-1 rounded-full bg-accent/60 animate-float" style={{ animationDelay: '2.2s' }} />
        <div className="absolute top-[65%] right-[22%] h-1.5 w-1.5 rounded-[35%] bg-gold/50 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-4xl pt-24 pb-16">
          <p className="hero-meta font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent mb-8">
            Small-batch gourmet cookies · Sri Lanka
          </p>
          <h1 className="font-display font-medium text-background leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-4xl sm:text-6xl md:text-7xl">{BUSINESS.tagline[0]}</span>
            <span
              className="hero-line-2 block font-serif italic font-medium text-accent text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-2"
              style={{ lineHeight: '0.95' }}
            >
              {BUSINESS.tagline[1]}
            </span>
          </h1>

          <p className="hero-meta mx-auto max-w-xl text-white/75 text-base sm:text-lg mt-8 leading-relaxed">
            Generously indulgent cookies with thoughtful fillings and a little surprise in every
            bite. Baked to order in small batches,
            <span className="text-background"> boxed beautifully for gifting.</span>
          </p>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#order"
              className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-accent text-deep font-semibold px-7 py-4 rounded-full shadow-2xl shadow-accent/30"
            >
              Pre-order a box
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#menu"
              className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium px-7 py-4 rounded-full"
            >
              <Cookie className="h-4 w-4" />
              See the menu
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/50" aria-hidden>
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature Card 1 — Gift box shuffler
---------------------------------------------------------------- */
function GiftBoxShuffler() {
  const [stack, setStack] = useState(BOXES)

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full" aria-hidden>
      {stack.map((box, offset) => (
        <div
          key={box.id}
          style={{
            transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
            zIndex: stack.length - offset,
            opacity: 1 - offset * 0.25,
            transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
          }}
          className="absolute inset-0 bg-surface border border-divider rounded-3xl p-5 shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-blush px-2 py-1 rounded-full">
              {box.count} cookies
            </span>
            <Gift className="h-4 w-4 text-accent-dark" />
          </div>
          <div className="mt-3 font-display text-xl font-medium text-ink leading-tight">{box.name}</div>
          <div className="mt-3 flex items-center gap-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <span
                key={idx}
                className="h-5 w-5 rounded-full border transition-colors"
                style={{
                  background: idx < box.count ? (idx % 2 ? '#7E3550' : '#C9A27A') : 'transparent',
                  borderColor: idx < box.count ? 'transparent' : '#EBDDD2',
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — Signature animation: chocolate chunks + crumbs
   falling from the oven rack onto a fresh cookie
---------------------------------------------------------------- */
const OVEN_STATUSES = [
  { text: 'Dough portioned · weighed by hand', label: 'Prep', tone: 'muted' },
  { text: 'In the oven · golden edges forming', label: 'Baking', tone: 'accent' },
  { text: 'On the cooling rack · centre setting', label: 'Cooling', tone: 'primary' },
  { text: 'Wrapped, boxed & ready', label: 'Ready', tone: 'gold' },
]

function OvenCrumbs() {
  const [tick, setTick] = useState(0)
  const statuses = OVEN_STATUSES
  const statusIdx = tick % statuses.length
  const batch = 7 + Math.floor(tick / statuses.length)

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => setTick((t) => t + 1), 2300)
    return () => clearInterval(interval)
  }, [])

  // kind: chunk (chocolate) | crumb (golden) | fleck (pink sugar)
  const particles = [
    { left: '14%', delay: '0.0s', dur: '2.6s', size: 15, kind: 'chunk', rot: 12 },
    { left: '25%', delay: '1.3s', dur: '3.0s', size: 9, kind: 'crumb', rot: 0 },
    { left: '37%', delay: '0.6s', dur: '2.8s', size: 17, kind: 'chunk', rot: -20 },
    { left: '50%', delay: '1.8s', dur: '2.4s', size: 8, kind: 'fleck', rot: 30 },
    { left: '62%', delay: '0.9s', dur: '3.1s', size: 16, kind: 'chunk', rot: 40 },
    { left: '74%', delay: '2.0s', dur: '2.7s', size: 10, kind: 'crumb', rot: 0 },
    { left: '86%', delay: '0.4s', dur: '2.9s', size: 14, kind: 'chunk', rot: -8 },
  ]

  const puffs = [
    { left: '22%', delay: '0.2s' },
    { left: '48%', delay: '1.0s' },
    { left: '76%', delay: '1.8s' },
  ]

  const status = statuses[statusIdx]
  const toneText = {
    muted: 'text-muted',
    accent: 'text-accent-dark',
    primary: 'text-primary',
    gold: 'text-[#8C7442]',
  }[status.tone]
  const toneDot = {
    muted: 'bg-muted',
    accent: 'bg-accent',
    primary: 'bg-primary',
    gold: 'bg-gold',
  }[status.tone]

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-accent/30"
      style={{ background: 'linear-gradient(180deg, #FFF7EF 0%, #F8E6DC 70%, #F1D3CB 100%)' }}
      aria-hidden
    >
      {/* Warm oven glow */}
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/70 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-[#FBE3C8]/80 blur-xl" />

      {/* Header strip */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <ChefHat className="h-3.5 w-3.5 text-primary" strokeWidth={2.2} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Today's bake</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">batch</span>
          <span className="font-display font-semibold text-sm text-ink tabular-nums">
            {String(batch).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Oven rack */}
      <svg className="absolute left-3 right-3 top-9 h-5" viewBox="0 0 400 20" preserveAspectRatio="none">
        <rect x="0" y="4" width="400" height="3" rx="1.5" fill="#591D32" fillOpacity="0.35" />
        <rect x="0" y="13" width="400" height="3" rx="1.5" fill="#591D32" fillOpacity="0.25" />
        {Array.from({ length: 21 }).map((_, i) => (
          <rect key={i} x={i * 19.5 + 4} y="3" width="2" height="14" rx="1" fill="#591D32" fillOpacity="0.28" />
        ))}
        <rect x="0" y="2" width="5" height="16" rx="1.5" fill="#591D32" fillOpacity="0.5" />
        <rect x="395" y="2" width="5" height="16" rx="1.5" fill="#591D32" fillOpacity="0.5" />
      </svg>

      {/* Falling chunks, crumbs and sugar flecks */}
      <div className="absolute inset-x-0 top-14 bottom-11 overflow-hidden">
        {particles.map((p, i) => (
          <svg
            key={i}
            className="absolute top-0"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `rain-fall ${p.dur} cubic-bezier(0.55,0.05,0.7,0.45) ${p.delay} infinite`,
              filter: 'drop-shadow(0 1px 2px rgba(53,34,31,0.25))',
              transform: 'translateX(-50%)',
            }}
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`chunk-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7A4A3A" />
                <stop offset="55%" stopColor="#4B2E2A" />
                <stop offset="100%" stopColor="#2A1519" />
              </linearGradient>
            </defs>
            <g transform={`rotate(${p.rot} 12 12)`}>
              {p.kind === 'chunk' && (
                <>
                  <path d="M4 9 L9 3.5 L18 4.5 L21 12 L16.5 20 L7 19 L3 14 Z" fill={`url(#chunk-${i})`} />
                  <path d="M8 6 L14 5.5 L11 9 Z" fill="white" fillOpacity="0.25" />
                </>
              )}
              {p.kind === 'crumb' && (
                <path d="M5 11 C 5 6, 11 3, 15 5 C 20 7, 21 13, 17 17 C 13 21, 6 18, 5 11 Z" fill="#D9AE7A" />
              )}
              {p.kind === 'fleck' && <rect x="5" y="9" width="14" height="6" rx="3" fill="#D9A0AD" />}
            </g>
          </svg>
        ))}
      </div>

      {/* Cookie surface (soft dome with baked-in chips) */}
      <svg className="absolute bottom-7 left-3 right-3 h-5" viewBox="0 0 200 20" preserveAspectRatio="none">
        <path d="M 0,20 Q 0,6 30,5 L 170,5 Q 200,6 200,20 Z" fill="#E2B987" fillOpacity="0.55" />
        <path d="M 0,8 Q 25,4 50,6 T 100,6 T 150,6 T 200,8" fill="none" stroke="#B5844F" strokeOpacity="0.5" strokeWidth="1" />
        {[18, 46, 79, 112, 141, 173].map((x) => (
          <ellipse key={x} cx={x} cy={12} rx="3.2" ry="2" fill="#4B2E2A" fillOpacity="0.55" />
        ))}
      </svg>

      {/* Crumb puffs where pieces land */}
      <div className="absolute bottom-[42px] left-3 right-3 h-2">
        {puffs.map((r, i) => (
          <span
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full border border-gold/60"
            style={{
              left: r.left,
              width: '4px',
              height: '4px',
              animation: `rain-ripple 2.4s ease-out ${r.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone === 'accent' && <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />}
          </span>
          <span
            key={status.text}
            className={`font-mono text-[10px] truncate ${toneText}`}
            style={{ animation: 'rain-fadein 0.35s ease-out' }}
          >
            {status.text}
          </span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${toneText}`}>
          {status.label}
        </span>
      </div>

      <style>{`
        @keyframes rain-fall {
          0%   { transform: translate(-50%, -10px) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 82px) rotate(160deg); opacity: 0; }
        }
        @keyframes rain-ripple {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes rain-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Pre-order scheduler
---------------------------------------------------------------- */
function PreorderScheduler() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const bakeDays = [3, 4, 5] // illustrative only
  const [step, setStep] = useState(0)
  const activeDay = 4

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => setStep((prev) => (prev + 1) % 5), 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = [
    { x: 8, y: 110, opacity: 0 },
    { x: 60, y: 60, opacity: 1 },
    { x: 34 + activeDay * 36, y: 60, opacity: 1 },
    { x: 34 + activeDay * 36, y: 60, opacity: 1 },
    { x: 130, y: 130, opacity: 1 },
  ][step]

  return (
    <div className="relative h-44 w-full bg-surface border border-divider rounded-3xl p-5 overflow-hidden" aria-hidden>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Pre-order window</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-blush px-2 py-0.5 rounded-full">
          This week
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-4">
        {days.map((d, idx) => {
          const selected = step >= 3 && idx === activeDay
          const bake = bakeDays.includes(idx)
          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
                selected
                  ? 'bg-primary text-background scale-110 shadow-lg shadow-primary/30'
                  : bake
                    ? 'bg-blush text-ink'
                    : 'bg-background text-ink/40'
              }`}
            >
              <span className={`font-mono text-[9px] ${selected ? 'text-background/70' : 'text-muted'}`}>{d}</span>
              <span className="font-display font-semibold text-sm">{idx + 10}</span>
            </div>
          )
        })}
      </div>

      <div
        className={`w-full py-2.5 rounded-2xl font-medium text-xs text-center transition-all duration-300 ${
          step === 4 ? 'bg-accent text-deep scale-[1.02] shadow-md shadow-accent/30' : 'bg-divider/50 text-muted'
        }`}
      >
        {step >= 3 ? '✓ Delivery date requested' : 'Choose a bake day'}
      </div>

      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.opacity,
          transform: step === 3 ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#35221F" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      })
      gsap.from('.feature-heading > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: '01 / Gifting',
      heading: 'Gift boxes',
      sub: 'Two, four or six',
      text: 'From a two-cookie tasting to a six-cookie gift box with a handwritten card. Built for birthdays, anniversaries and "just because".',
      Component: GiftBoxShuffler,
    },
    {
      eyebrow: '02 / The bake',
      heading: 'Baked to order',
      sub: 'Small batches only',
      text: 'Weighed, shaped and baked for your order — never stockpiled. Thick edges, soft centres and fillings worth breaking open.',
      Component: OvenCrumbs,
    },
    {
      eyebrow: '03 / Pre-orders',
      heading: 'Reserve your day',
      sub: 'Limited slots each week',
      text: 'Pick a bake day, send your request and we confirm the details with you directly. Simple, personal and no surprises.',
      Component: PreorderScheduler,
    },
  ]

  return (
    <section id="gifting" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feature-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ The Cravelle way</span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Made for cravings.
            <span className="block font-serif italic font-medium text-primary-light mt-1">Wrapped for gifting.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-accent/60 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{card.eyebrow}</span>
                <ArrowUpRight
                  className="h-5 w-5 text-ink/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  strokeWidth={1.8}
                />
              </div>

              <card.Component />

              <div className="mt-6">
                <h3 className="font-display font-medium text-2xl text-ink leading-tight">{card.heading}</h3>
                <p className="font-serif italic text-accent-dark text-base mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp — animated counter
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(prefersReducedMotion ? target : 0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el || prefersReducedMotion) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const progress = Math.min((now - startTime) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars — the numbers behind the menu
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01',
      title: 'Menu',
      target: PRODUCTS.length,
      suffix: '',
      label: 'launch flavours',
      desc: 'A deliberately small menu, so every flavour gets the attention it deserves — batch after batch.',
    },
    {
      n: '02',
      title: 'Generous',
      target: 120,
      suffix: 'g',
      label: 'approx. per cookie',
      desc: 'Thick, chunky and properly filling. Dough and fillings are weighed for every cookie so each one is consistent.',
    },
    {
      n: '03',
      title: 'Boxes',
      target: BOXES.length,
      suffix: '',
      label: 'box sizes',
      desc: 'A tasting for two, an assortment of four, or the full six-cookie gift box with a message card.',
    },
  ]

  return (
    <section ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] max-w-full rounded-full bg-accent/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary mb-5">╱ By the numbers</span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              Small menu.
              <span className="block font-serif italic font-medium text-primary-light">Big on detail.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Premium should be something you can taste, not just something we say. Here's what goes into every box.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {p.n} / {p.title}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-medium text-[6rem] sm:text-[8rem] md:text-[7rem] lg:text-[9rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                {p.suffix && (
                  <span className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-accent-dark mb-3 sm:mb-4">
                    {p.suffix}
                  </span>
                )}
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mt-5">{p.label}</p>
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>

              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-accent-dark to-transparent"
                  style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — How ordering works (sticky stacking cards)
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="how" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ How it works</span>
        <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Three steps.
          <span className="block font-serif italic font-medium text-primary-light">One very good box.</span>
        </h2>
      </div>

      <div className="space-y-8">
        {STEPS.map((step) => (
          <article
            key={step.num}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[60vh] lg:min-h-[70vh]">
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Step {step.num}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-blush px-2.5 py-1 rounded-full">
                    Pre-order
                  </span>
                </div>

                <div className="my-10 sm:my-12">
                  <span className="font-display font-medium text-[6rem] sm:text-[10rem] leading-none text-accent/40 -mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-serif italic text-accent-dark text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                </div>

                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
              </div>

              <div className="lg:col-span-2 relative overflow-hidden min-h-[280px] lg:min-h-full bg-deep">
                <img src={step.image} alt={step.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-deep/15" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-dark" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">Step {step.num}</span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  {step.num} / {BUSINESS.name}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Menu — product grid (dark) + detail dialog
---------------------------------------------------------------- */
function StatusPill({ status, dark = false }) {
  const tone = {
    available: dark ? 'bg-emerald-400/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700',
    limited: dark ? 'bg-gold/20 text-[#E2CB96]' : 'bg-[#F5EEDD] text-[#7A6436]',
    'sold-out': dark ? 'bg-white/10 text-white/50' : 'bg-divider text-muted',
    'coming-soon': dark ? 'bg-accent/20 text-accent' : 'bg-blush text-primary',
  }[status]
  return (
    <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-full backdrop-blur-sm ${tone}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

function ProductDialog({ product, onClose, onPick }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!product) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null
  const orderable = product.status === 'available' || product.status === 'limited'

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6 text-ink" role="dialog" aria-modal="true" aria-labelledby="product-title">
      <div className="absolute inset-0 bg-deep/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full sm:max-w-3xl bg-background rounded-t-5xl sm:rounded-5xl overflow-hidden shadow-2xl max-h-[92dvh] overflow-y-auto">
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/90 shadow"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="grid sm:grid-cols-2">
          <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[420px] bg-deep">
            <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="p-7 sm:p-9 flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status={product.status} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{product.role}</span>
            </div>
            <h3 id="product-title" className="font-display font-medium text-3xl text-ink mt-4 leading-tight">
              {product.name}
            </h3>
            <p className="text-muted mt-3 leading-relaxed">{product.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-divider py-5">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">Weight</dt>
                <dd className="font-display text-lg text-ink mt-1">{product.weight}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">Price</dt>
                <dd className="font-display text-lg text-ink mt-1">
                  {formatPrice(product.price)}
                  {product.draftPrice && (
                    <span className="ml-2 align-middle font-mono text-[9px] uppercase tracking-widest text-accent-dark">draft</span>
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Contains</p>
              <div className="flex flex-wrap gap-1.5">
                {product.allergens.map((a) => (
                  <span key={a} className="text-xs bg-surface border border-divider rounded-full px-2.5 py-1 text-ink/80">
                    {a}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted mt-3 leading-relaxed">
                Made in a kitchen that handles wheat, milk, egg, soy and tree nuts.
              </p>
            </div>

            <button
              disabled={!orderable}
              onClick={() => onPick(product.id)}
              className="mt-7 magnetic-btn inline-flex items-center justify-center gap-2 bg-primary text-background font-semibold px-6 py-3.5 rounded-full disabled:opacity-40 disabled:pointer-events-none"
            >
              {orderable ? 'Add to my pre-order' : STATUS_LABELS[product.status]}
              {orderable && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuGrid({ onPick }) {
  const ref = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="menu" ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">╱ The menu</span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              Six cookies,
              <span className="block font-serif italic font-medium text-accent">each worth the wait.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">
            Tap any cookie for weight, allergens and availability. Mix and match flavours in any box.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="svc-tile group bg-deep text-left hover:bg-white/[0.03] transition-colors duration-500 relative flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={p.image.replace('w=1200', 'w=800')}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-deep/30" />
                <span className="absolute top-4 left-4 font-mono text-[10px] text-white/80 uppercase tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute top-4 right-4">
                  <StatusPill status={p.status} dark />
                </span>
              </div>
              <div className="p-7 sm:p-8 flex-1 flex flex-col w-full">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display font-medium text-xl sm:text-2xl">{p.name}</h3>
                  <span className="h-10 w-10 shrink-0 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                    <Plus className="h-4 w-4 text-accent group-hover:text-deep" />
                  </span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mt-2">{p.short}</p>
                <div className="mt-auto pt-6 flex items-end justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">{p.weight}</span>
                  <span className="text-right">
                    <span className="font-display text-lg text-background">{formatPrice(p.price)}</span>
                    {p.draftPrice && (
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-accent/80">Draft price</span>
                    )}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 text-white/55 text-sm leading-relaxed max-w-3xl">
          <ShieldAlert className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <p>
            All our cookies are made in one kitchen that handles wheat (gluten), milk, egg, soy and tree nuts, so
            cross-contact is possible. If you have an allergy, please tell us before ordering.
          </p>
        </div>
      </div>

      <ProductDialog
        product={active}
        onClose={() => setActive(null)}
        onPick={(id) => {
          setActive(null)
          onPick(id)
        }}
      />
    </section>
  )
}

/* ----------------------------------------------------------------
   Our story + promises (trust signals)
---------------------------------------------------------------- */
function Story() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: ChefHat,
      title: 'Made to order',
      text: 'Baked in small batches for confirmed orders — never sitting on a shelf waiting for you.',
    },
    {
      Icon: ClipboardList,
      title: 'Clear allergen info',
      text: 'Every cookie lists what it contains, and we are upfront about what our kitchen handles.',
    },
    {
      Icon: Package,
      title: 'Packed with care',
      text: 'Individually wrapped, boxed with tissue and a card — made to be opened, photographed and shared.',
    },
  ]

  return (
    <section id="story" ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          <div
            className={`lg:col-span-5 relative transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative aspect-[4/5] rounded-6xl overflow-hidden shadow-2xl shadow-primary/15">
              <img src={STORY_IMAGE} alt="Freshly baked cookies cooling on a wire rack" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-surface border border-divider rounded-3xl px-5 py-4 shadow-xl max-w-[15rem]">
              <p className="font-serif italic text-xl text-primary leading-snug">“A little surprise in every bite.”</p>
            </div>
          </div>

          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-150 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Our story</span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Ordinary moments,
              <span className="block font-serif italic font-medium text-primary-light">made a little sweeter.</span>
            </h2>
            <p className="text-ink/80 text-lg mt-8 leading-relaxed max-w-xl">{BUSINESS.story}</p>
            <p className="text-muted mt-5 leading-relaxed max-w-xl">{BUSINESS.mission}</p>
            <p className="font-serif italic text-2xl text-accent-dark mt-8">{BUSINESS.promise}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={title}
              style={{ transitionDelay: visible ? `${300 + i * 120}ms` : '0ms' }}
              className={`bg-surface border border-divider rounded-4xl p-6 hover:border-accent/60 transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-medium text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Customer reviews intentionally omitted until real, permission-given reviews exist (SITE.showReviews). */}

        <div className="text-center">
          <a
            href="#order"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-background font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
          >
            Pre-order a box
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   FAQ — delivery & ordering
---------------------------------------------------------------- */
function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-blush/40">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Delivery & ordering</span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-ink mt-4 leading-[1.05] tracking-tight">
            Good to
            <span className="block font-serif italic font-medium text-primary-light">know.</span>
          </h2>
          <p className="text-muted mt-6 leading-relaxed">
            Can't find your answer? Ask in your pre-order request and we'll get back to you.
          </p>
        </div>
        <div className="lg:col-span-8 divide-y divide-divider border-y border-divider">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-xl text-ink">{f.q}</span>
                  <span className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-background' : 'bg-surface border border-divider text-ink'}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-muted leading-relaxed pr-12 pb-6">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Pre-order request form
---------------------------------------------------------------- */
function OrderForm({ picked, setPicked }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    date: '',
    box: BOXES[1].id,
    giftNote: '',
    message: '',
  })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const dropRef = useRef(null)

  const box = BOXES.find((b) => b.id === form.box)
  const orderable = PRODUCTS.filter((p) => p.status === 'available' || p.status === 'limited')

  const toggleFlavour = (id) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const summary = () => {
    const flavours = picked.map((id) => PRODUCTS.find((p) => p.id === id)?.name).filter(Boolean)
    return [
      `Hi ${BUSINESS.name}! I'd like to pre-order:`,
      `• ${box.name} (${box.count} cookies)`,
      flavours.length ? `• Flavours: ${flavours.join(', ')}` : null,
      form.date ? `• Preferred date: ${form.date}` : null,
      form.area ? `• Delivery area: ${form.area}` : null,
      form.giftNote ? `• Gift card: "${form.giftNote}"` : null,
      form.message ? `• Notes: ${form.message}` : null,
      form.name ? `— ${form.name}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus('sending')
    // [REPLACE] Connect to a real form backend (e.g. Formspree, Netlify Forms, Web3Forms) here.
    setTimeout(() => setStatus('sent'), 1200)
  }

  const handleFiles = (newFiles) => {
    const imgs = Array.from(newFiles).filter((f) => f.type.startsWith('image/'))
    setFiles((prev) => [...prev, ...imgs].slice(0, 3))
  }

  const wa = whatsappLink(summary())
  const [minDate] = useState(() => new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10))

  const contacts = [
    { Icon: Phone, label: 'Call or WhatsApp', value: BUSINESS.phone, href: BUSINESS.phoneHref },
    { Icon: Mail, label: 'Email', value: BUSINESS.email, href: BUSINESS.emailHref },
    { Icon: AtSign, label: 'Instagram', value: BUSINESS.instagram, href: BUSINESS.instagramHref },
    { Icon: MapPin, label: 'We deliver to', value: BUSINESS.serviceArea },
  ]

  return (
    <section id="order" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Pre-order</span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Reserve
              <span className="block font-serif italic font-medium text-primary-light">your box.</span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Tell us what you're craving. We'll confirm availability, your total and payment details — your order is
              booked once payment is confirmed.
            </p>

            <div className="mt-10 space-y-4">
              {contacts.map(({ Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="h-12 w-12 shrink-0 rounded-2xl bg-blush border border-accent/30 flex items-center justify-center group-hover:bg-primary transition">
                      <Icon className="h-5 w-5 text-primary group-hover:text-background" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">{label}</span>
                      <span className={`font-display break-words ${isPlaceholder(value) ? 'text-accent-dark italic text-base' : 'text-ink text-lg'}`}>
                        {value}
                      </span>
                    </span>
                  </>
                )
                return href ? (
                  <a key={label} href={href} className="lift-on-hover flex items-center gap-4 group">
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-4">
                    {inner}
                  </div>
                )
              })}
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-blush/60 border border-accent/30">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Your details</p>
              <p className="text-sm text-muted leading-relaxed">
                We only use your details to handle your order. We never sell or share them for marketing. See our{' '}
                <Link to="/privacy" className="underline underline-offset-2 hover:text-primary">privacy policy</Link>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-surface border border-divider rounded-5xl p-6 sm:p-10 shadow-xl shadow-primary/5">
              {status !== 'sent' ? (
                <>
                  <fieldset>
                    <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">Box size *</legend>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {BOXES.map((b) => {
                        const on = form.box === b.id
                        return (
                          <label
                            key={b.id}
                            className={`cursor-pointer rounded-2xl border p-3 sm:p-4 text-center transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${
                              on ? 'border-primary bg-primary text-background shadow-lg shadow-primary/20' : 'border-divider bg-background hover:border-accent'
                            }`}
                          >
                            <input
                              type="radio"
                              name="box"
                              value={b.id}
                              checked={on}
                              onChange={() => setForm({ ...form, box: b.id })}
                              className="sr-only"
                            />
                            <span className="block font-display text-2xl sm:text-3xl">{b.count}</span>
                            <span className={`block font-mono text-[9px] sm:text-[10px] uppercase tracking-widest mt-1 ${on ? 'text-background/75' : 'text-muted'}`}>
                              {b.name.replace('The ', '')}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                    <p className="text-xs text-muted mt-2">{box.note}</p>
                  </fieldset>

                  <fieldset className="mt-6">
                    <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
                      Flavours you'd like <span className="normal-case tracking-normal">(we'll confirm the mix)</span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {orderable.map((p) => {
                        const on = picked.includes(p.id)
                        return (
                          <button
                            type="button"
                            key={p.id}
                            onClick={() => toggleFlavour(p.id)}
                            aria-pressed={on}
                            className={`text-sm px-3.5 py-2 rounded-full border transition ${
                              on ? 'bg-accent border-accent text-deep' : 'bg-background border-divider text-ink/80 hover:border-accent'
                            }`}
                          >
                            {on && '✓ '}
                            {p.name}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-6 grid sm:grid-cols-2 gap-5">
                    <Field label="Your name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoComplete="name" />
                    <Field label="Phone / WhatsApp" type="tel" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} autoComplete="tel" />
                    <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} autoComplete="email" />
                    <Field label="Delivery area" value={form.area} onChange={(v) => setForm({ ...form, area: v })} placeholder="e.g. Colombo 05" />
                    <Field label="Preferred date" type="date" min={minDate} value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
                    <Field label="Gift card message" value={form.giftNote} onChange={(v) => setForm({ ...form, giftNote: v })} placeholder="Optional" />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
                      Anything else?
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      placeholder="Allergies, occasion, delivery notes…"
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition resize-none font-body"
                    />
                  </div>

                  <div
                    ref={dropRef}
                    onDragOver={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.add('!border-primary', '!bg-blush/50')
                    }}
                    onDragLeave={() => dropRef.current?.classList.remove('!border-primary', '!bg-blush/50')}
                    onDrop={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.remove('!border-primary', '!bg-blush/50')
                      handleFiles(e.dataTransfer.files)
                    }}
                    className="mt-5 border-2 border-dashed border-divider rounded-3xl p-5 text-center hover:border-accent transition-colors"
                  >
                    <input type="file" multiple id="file-up" className="hidden" accept="image/*" onChange={(e) => handleFiles(e.target.files)} />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-5 w-5 mx-auto text-primary mb-2" />
                      <p className="font-display text-ink text-sm">Celebrating something? Add a theme or colour reference</p>
                      <p className="text-xs text-muted mt-1">Optional · click or drag images here (max 3)</p>
                    </label>
                    {files.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {files.map((f, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 bg-blush text-primary text-xs pl-3 pr-1.5 py-1.5 rounded-full font-mono">
                            <CheckCircle2 className="h-3 w-3" />
                            {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            <button type="button" onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} aria-label={`Remove ${f.name}`} className="p-0.5 rounded-full hover:bg-accent/40">
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">Fields marked * are required. This is a request — not a payment.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {wa && (
                        <a
                          href={wa}
                          target="_blank"
                          rel="noreferrer"
                          className="lift-on-hover inline-flex items-center justify-center gap-2 border border-primary/30 text-primary font-semibold px-5 py-3.5 rounded-full"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp us
                        </a>
                      )}
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="magnetic-btn inline-flex items-center justify-center gap-2 bg-primary text-background font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-60"
                      >
                        {status === 'sending' ? 'Sending…' : 'Send pre-order request'}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12" role="status">
                  <div className="h-16 w-16 mx-auto rounded-full bg-blush flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-medium text-3xl text-ink mb-3">Thank you, {form.name.split(' ')[0]}!</h3>
                  <p className="text-muted max-w-md mx-auto leading-relaxed">
                    We've received your request for <span className="text-ink">{box.name}</span>. We'll be in touch to confirm
                    flavours, delivery and payment.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle')
                      setPicked([])
                      setFiles([])
                      setForm((f) => ({ ...f, date: '', giftNote: '', message: '' }))
                    }}
                    className="mt-8 text-sm font-medium text-primary lift-on-hover inline-flex items-center gap-1"
                  >
                    Make another request <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', required, value, onChange, ...rest }) {
  const id = `f-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition font-body"
        {...rest}
      />
    </div>
  )
}

/* ----------------------------------------------------------------
   Draft notes — visible launch checklist while SITE.showDraftNotes
---------------------------------------------------------------- */
function DraftNotes() {
  const [open, setOpen] = useState(false)
  if (!SITE.showDraftNotes) return null
  return (
    <div className="fixed bottom-4 left-4 z-[55] max-w-[calc(100%-2rem)]">
      {open && (
        <div className="mb-3 w-[22rem] max-w-full bg-surface border border-divider rounded-3xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Before launch</p>
            <button onClick={() => setOpen(false)} aria-label="Close checklist" className="p-1 rounded-full hover:bg-divider">
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="space-y-2.5">
            {LAUNCH_NOTES.map((n) => (
              <li key={n} className="flex gap-2 text-xs text-ink/80 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 bg-ink text-background text-xs font-medium pl-3 pr-4 py-2 rounded-full shadow-lg"
      >
        <Info className="h-3.5 w-3.5 text-accent" />
        Draft preview · launch checklist
      </button>
    </div>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] max-w-full rounded-full bg-primary/50 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-24 sm:pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-medium text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            {BUSINESS.tagline[0]}
            <span className="font-serif italic font-medium text-accent block">{BUSINESS.tagline[1]}</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">
              Small-batch gourmet cookies and gift boxes, baked to order in Sri Lanka.
            </p>
            <a href="#order" className="magnetic-btn inline-flex items-center gap-2 bg-accent text-deep font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto">
              Pre-order a box
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="mb-4">
              <Logo light size="lg" />
            </div>
            <p className="font-serif italic text-white/70 text-lg max-w-xs">{BUSINESS.promise}</p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">Menu</p>
            <ul className="space-y-2.5">
              {PRODUCTS.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <a href="#menu" className="text-white/65 hover:text-accent transition text-sm">{p.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">{BUSINESS.name}</p>
            <ul className="space-y-2.5">
              <li><a href="#gifting" className="text-white/65 hover:text-accent transition text-sm">Gift boxes</a></li>
              <li><a href="#how" className="text-white/65 hover:text-accent transition text-sm">How it works</a></li>
              <li><a href="#story" className="text-white/65 hover:text-accent transition text-sm">Our story</a></li>
              <li><a href="#faq" className="text-white/65 hover:text-accent transition text-sm">Delivery & FAQ</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">Contact</p>
            <ul className="space-y-2.5 text-sm text-white/65 break-words">
              <li>{BUSINESS.phone}</li>
              <li>{BUSINESS.email}</li>
              <li>{BUSINESS.instagram}</li>
              <li>{BUSINESS.serviceArea}</li>
            </ul>
          </div>
        </div>

        {SITE.showDraftNotes && (
          <p className="mt-12 text-xs text-white/40 leading-relaxed max-w-3xl border-l-2 border-accent/40 pl-4">
            Pre-launch note: food-premises registration, labelling and allergen requirements must be confirmed with the
            relevant Sri Lankan authorities before commercial sales. Prices shown are drafts for approval.
          </p>
        )}

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              Pre-orders open · limited weekly batches
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacy" className="hover:text-accent transition">Privacy</Link>
            <Link to="/terms" className="hover:text-accent transition">Terms & delivery</Link>
            <span>© {YEAR} {BUSINESS.name}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  const [picked, setPicked] = useState([])

  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const pickFlavour = (id) => {
    setPicked((prev) => (prev.includes(id) ? prev : [...prev, id]))
    document.getElementById('order')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <MenuGrid onPick={pickFlavour} />
        <Story />
        <FAQ />
        <OrderForm picked={picked} setPicked={setPicked} />
      </main>
      <Footer />
      <DraftNotes />
    </div>
  )
}
