import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import MobileBar from './components/MobileBar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Carta from './pages/Carta'
import Resenas from './pages/Resenas'
import Informacion from './pages/Informacion'
import { AvisoLegal, Cookies } from './pages/Legal'
import NoMatch from './pages/NoMatch'

export default function App() {
  const location = useLocation()

  // El hero pintado en el HTML solo corresponde a la portada. Al navegar fuera
  // se retira (y se marca) para que, si se vuelve a la portada, Inicio pinte el
  // suyo con React como en cualquier otra página.
  useLayoutEffect(() => {
    if (location.pathname === '/') return
    const hero = document.getElementById('hero-estatico')
    if (hero) hero.remove()
    window.__heroEstatico = false
  }, [location.pathname])

  return (
    <SmoothScroll>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[2px] focus:bg-gold-500 focus:px-5 focus:py-3 focus:text-[14px] focus:font-semibold focus:text-night-950"
      >
        Saltar al contenido
      </a>

      <div className="flex min-h-screen flex-col bg-night-950 text-cream-50">
        <Navbar />

        <main id="contenido" key={location.pathname} className="flex-1">
          <Routes location={location}>
            <Route path="/" element={<Inicio />} />
            <Route path="/carta" element={<Carta />} />
            <Route path="/el-local" element={<Informacion />} />
            <Route path="/resenas" element={<Resenas />} />
            {/* Rutas antiguas: se conservan para no romper enlaces. */}
            <Route path="/informacion" element={<Navigate to="/el-local" replace />} />
            <Route path="/contacto" element={<Navigate to="/el-local#llegar" replace />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/politica-de-cookies" element={<Cookies />} />
            <Route path="/cookies" element={<Navigate to="/politica-de-cookies" replace />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>

        <Footer />
        <MobileBar />
      </div>
    </SmoothScroll>
  )
}
