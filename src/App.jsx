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

  return (
    <SmoothScroll>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:text-[14px] focus:font-semibold focus:text-maroc-950"
      >
        Saltar al contenido
      </a>

      <div className="flex min-h-screen flex-col bg-cream-50 text-ink">
        <Navbar />

        <main id="contenido" key={location.pathname} className="flex-1">
          <Routes location={location}>
            <Route path="/" element={<Inicio />} />
            <Route path="/carta" element={<Carta />} />
            <Route path="/resenas" element={<Resenas />} />
            <Route path="/informacion" element={<Informacion />} />
            {/* Ruta antigua: se conserva para no romper enlaces. */}
            <Route path="/contacto" element={<Navigate to="/informacion#llegar" replace />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>

        <Footer />
        <MobileBar />
      </div>
    </SmoothScroll>
  )
}
