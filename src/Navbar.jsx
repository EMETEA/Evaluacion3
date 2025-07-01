import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link to="/Catalogo">Home</Link>
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