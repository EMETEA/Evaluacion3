import { Link } from "react-router-dom";

// Componente Navbar que contiene la barra de navegación principal
// Utiliza Links de react-router-dom para navegación SPA sin recarga de página
function Navbar() {
    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    {/* Enlaces a las rutas principales de la aplicación */}
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/SobreNosotros">Sobre Nosotros</Link>
                    </li>
                    <li>
                        <Link to="/Contacto">Contacto</Link>
                    </li>
                    <li>
                        <Link to="/Noticias">Noticias</Link>
                    </li>
                    <li>
                        <Link to="/GOTY">GOTY</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
