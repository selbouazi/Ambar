import { Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Carta from './pages/Carta'
import Resenas from './pages/Resenas'
import Informacion from './pages/Informacion'
import Contacto from './pages/Contacto'
import NoMatch from './pages/NoMatch'

export default function App() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col bg-cream-50 text-ink">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/carta" element={<Carta />} />
            <Route path="/resenas" element={<Resenas />} />
            <Route path="/informacion" element={<Informacion />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}