import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar.jsx';
import Contacto from './Contacto.jsx';
import SobreNosotros from './SobreNosotros.jsx';
import Catalogo from './Catalogo.jsx';
import Noticias from './Noticias.jsx';
import GOTY from './GOTY.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <main id="contenedor-principal">
          <Routes>
            <Route path="/Catalogo" element={<Catalogo />} /> 
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
