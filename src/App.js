import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importación de componentes principales que representan cada sección de la app
import Navbar from './Navbar.jsx';
import Contacto from './Contacto.jsx';
import SobreNosotros from './SobreNosotros.jsx';
import Catalogo from './Catalogo.jsx';
import Noticias from './Noticias.jsx';
import GOTY from './GOTY.jsx';

import './App.css';

function App() {
  // Estado para manejar el fondo dinámico (clases CSS 'fondo1' o 'fondo2')
  const [fondo, setFondo] = useState("fondo1");

  // Función que alterna el fondo entre dos estilos
  const cambiarFondo = () => {
    setFondo((prev) => (prev === "fondo1" ? "fondo2" : "fondo1"));
  };

  return (
    // Router envuelve toda la aplicación para habilitar navegación SPA
    <Router>
      {/* Contenedor principal con clase que aplica el fondo dinámico */}
      <div className={`app ${fondo}`}> 
        {/* Barra de navegación visible en todas las páginas */}
        <Navbar />

        {/* Contenido principal donde se renderizan las secciones según la ruta */}
        <main id="contenedor-principal">
          <Routes>
            {/* Ruta principal (Home) muestra el catálogo y pasa función para cambiar fondo */}
            <Route path="/" element={<Catalogo cambiarFondo={cambiarFondo} />} />

            {/* Rutas para otras secciones de la SPA */}
            <Route path="/SobreNosotros" element={<SobreNosotros />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/Noticias" element={<Noticias />} />
            <Route path="/GOTY" element={<GOTY />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


