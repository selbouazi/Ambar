import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Las animaciones de entrada solo se activan si el navegador puede observar el
// scroll. Sin JavaScript (o sin IntersectionObserver) todo el contenido queda
// visible desde el primer píxel.
if (typeof IntersectionObserver !== 'undefined') {
  document.documentElement.classList.add('js')
}

// Se pinta el arranque estático de la portada (index.html) con el HTML y el
// CSS; React monta debajo, en #root, sin tocarlo.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
