'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#projets' },
  { label: 'Avis', href: '#avis' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (phoneRef.current && !phoneRef.current.contains(e.target as Node)) {
        setPhoneOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-noir'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <Image
                src="/logo-en-tête.png"
                alt="YLB Couverture"
                width={300}
                height={100}
                className="w-37.5 sm:w-50 h-auto shrink-0"
                priority
              />
            </button>

            <div className="flex items-center gap-4">
              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="text-gray-300 hover:text-white text-sm tracking-wide transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNav('#contact')}
                  className="bg-rouge hover:bg-rouge/90 text-white text-sm font-semibold px-5 py-2 transition-all duration-200 hover:scale-105"
                >
                  Me contacter
                </button>
              </div>

              {/* Phone */}
              <div ref={phoneRef} className="relative">
                <button
                  onClick={() => setPhoneOpen((v) => !v)}
                  className="w-10 h-10 rounded-full bg-rouge hover:bg-rouge/90 flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                  aria-label="Appeler"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>

                {phoneOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gris-moyen shadow-lg px-4 py-3 whitespace-nowrap">
                    <div className="text-[10px] text-texte-secondaire uppercase tracking-widest mb-1">
                      Appelez-moi
                    </div>
                    <a
                      href="tel:0695301487"
                      className="text-noir font-semibold text-base hover:text-rouge transition-colors"
                    >
                      06 95 30 14 87
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Menu"
              >
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="font-bebas text-white text-4xl tracking-widest hover:text-rouge transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="mt-4 bg-rouge text-white font-bebas text-2xl tracking-widest px-10 py-3 hover:bg-rouge/90 transition-colors"
          >
            ME CONTACTER
          </button>
        </div>
      </div>
    </>
  )
}
