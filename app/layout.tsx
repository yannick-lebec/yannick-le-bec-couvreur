import type { Metadata } from 'next'
import { Bebas_Neue, Outfit } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit-var',
})

export const metadata: Metadata = {
  title: 'Yannick Le Bec — Couvreur Indépendant · Essonne (91) · Île-de-France',
  description:
    "Couvreur indépendant avec 25 ans d'expérience, disponible pour missions et chantiers en Essonne (91) et Île-de-France. Sérieux, autonome, réactif.",
  keywords:
    'couvreur Essonne, couvreur 91, artisan couvreur Île-de-France, main d\'oeuvre couverture, couvreur indépendant',
  openGraph: {
    title: 'Yannick Le Bec — Couvreur Indépendant Essonne',
    description:
      "25 ans d'expérience en couverture. Disponible pour vos chantiers en Essonne et Île-de-France.",
    url: 'https://yannick-le-bec.fr',
    siteName: 'Yannick Le Bec',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${outfit.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-(family-name:--font-outfit-var)">
        {children}
      </body>
    </html>
  )
}
