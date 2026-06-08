import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import APropos from '@/components/APropos'
import Services from '@/components/Services'
import Projets from '@/components/Projets'
import Temoignages from '@/components/Temoignages'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <APropos />
        <Services />
        <Projets />
        <Temoignages />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
