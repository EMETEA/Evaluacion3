import React, { useState, useEffect } from "react";

function Catalogo({ cambiarFondo }) {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [generoActual, setGeneroActual] = useState(null);

  // Reemplaza con tu API key de RAWG
  const API_KEY = '091fef11833a43369e1787f2e7f82db0';
  const BASE_URL = 'https://api.rawg.io/api';

  useEffect(() => {
    obtenerJuegos();
  }, []);

  // Función para obtener parámetros aleatorios
  const obtenerParametrosAleatorios = () => {
    const ordenamientos = ['-rating', '-released', '-added', '-created', '-updated', '-metacritic'];
    const paginas = [1, 2, 3, 4, 5]; // Primeras 5 páginas para obtener variedad
    
    const ordenAleatorio = ordenamientos[Math.floor(Math.random() * ordenamientos.length)];
    const paginaAleatoria = paginas[Math.floor(Math.random() * paginas.length)];
    
    return { ordenAleatorio, paginaAleatoria };
  };

  // Función para mezclar array (Fisher-Yates shuffle)
  const mezclarArray = (array) => {
    const arrayMezclado = [...array];
    for (let i = arrayMezclado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayMezclado[i], arrayMezclado[j]] = [arrayMezclado[j], arrayMezclado[i]];
    }
    return arrayMezclado;
  };

  //  Función única para obtener todos los juegos
  const obtenerJuegos = async () => {
    try {
      setCargando(true);
      setError(null);
      setGeneroActual(null); // Resetear género actual
      
      const { ordenAleatorio, paginaAleatoria } = obtenerParametrosAleatorios();
      
      // Obtenemos juegos con parámetros aleatorios
      const response = await fetch(
        `${BASE_URL}/games?key=${API_KEY}&page_size=20&page=${paginaAleatoria}&ordering=${ordenAleatorio}`
      );
      
      if (!response.ok) {
        throw new Error('Error al cargar los juegos');
      }
      
      const data = await response.json();
      // Mezclamos los resultados y tomamos 12 aleatorios
      const juegosMezclados = mezclarArray(data.results).slice(0, 12);
      setJuegos(juegosMezclados);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setCargando(false);
    }
  };

  //  Función para obtener juegos por género
  const obtenerJuegosPorGenero = async (generoId) => {
    try {
      setCargando(true);
      setError(null);
      setGeneroActual(generoId); // Guardamos el género actual
      const { ordenAleatorio, paginaAleatoria } = obtenerParametrosAleatorios();
      
      // Agregamos fechas aleatorias para más variedad
      const fechaInicio = Math.floor(Math.random() * 5) + 2019; // Entre 2019-2023
      const fechaFin = fechaInicio + Math.floor(Math.random() * 3) + 1; // 1-3 años después
      
      const response = await fetch(
        `${BASE_URL}/games?key=${API_KEY}&genres=${generoId}&page_size=20&page=${paginaAleatoria}&ordering=${ordenAleatorio}&dates=${fechaInicio}-01-01,${fechaFin}-12-31`
      );
      
      if (!response.ok) {
        // Si falla con fechas, intentamos sin ellas
        const responseFallback = await fetch(
          `${BASE_URL}/games?key=${API_KEY}&genres=${generoId}&page_size=20&page=${paginaAleatoria}&ordering=${ordenAleatorio}`
        );
        const dataFallback = await responseFallback.json();
        const juegosMezclados = mezclarArray(dataFallback.results).slice(0, 12);
        setJuegos(juegosMezclados);
        return;
      }
      
      const data = await response.json();
      const juegosMezclados = mezclarArray(data.results).slice(0, 12);
      setJuegos(juegosMezclados);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  //  Función para refrescar juegos
  const refrescarJuegos = () => {
    if (generoActual) {
      obtenerJuegosPorGenero(generoActual);
    } else {
      obtenerJuegos();
    }
  };

  if (cargando) {
    return (
      <section id="panel-principal" className="panel visible active">
        <h2>Catálogo de Videojuegos</h2>
        <button onClick={cambiarFondo} className="boton-fondo">
          Cambiar Fondo
        </button>
        <div className="cargando">
          <p>Cargando juegos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="panel-principal" className="panel visible active">
        <h2>Catálogo de Videojuegos</h2>
        <button onClick={cambiarFondo} className="boton-fondo">
          Cambiar Fondo
        </button>
        <div className="error">
          <p>Error: {error}</p>
          <p>Nota: Necesitas configurar tu API key de RAWG</p>
          <button onClick={obtenerJuegos}>Reintentar</button>
        </div>
      </section>
    );
  }

  return (
    <section id="panel-principal" className="panel visible active">
      <h2>Catálogo de Videojuegos</h2>

      {/* Botón para cambiar el fondo, recibe la función cambiarFondo por props */}
      <button onClick={cambiarFondo} className="boton-fondo">
        Cambiar Fondo
      </button>

      {/* Filtros por género */}
      <div className="filtros-genero">
        <button onClick={() => obtenerJuegos()} className="filtro-btn">
          Todos
        </button>
        <button onClick={() => obtenerJuegosPorGenero(4)} className="filtro-btn">
          Acción
        </button>
        <button onClick={() => obtenerJuegosPorGenero(3)} className="filtro-btn">
          Aventura
        </button>
        <button onClick={() => obtenerJuegosPorGenero(5)} className="filtro-btn">
          RPG
        </button>
        <button onClick={() => obtenerJuegosPorGenero(2)} className="filtro-btn">
          Shooter
        </button>
      </div>

      {/* Contenedor de juegos */}
      <div className="contenedor-juegos">
        {juegos.map((juego) => (
          <div key={juego.id} className="card-juego">
            <h3>{juego.name}</h3>
            <img 
              src={juego.background_image || 'placeholder.jpg'} 
              alt={juego.name}
              onError={(e) => {
                e.target.src = 'placeholder.jpg'; // Imagen por defecto si falla
              }}
            />
            <div className="info-juego">
              <p className="rating">⭐ {juego.rating}/5</p>
              <p className="fecha"> {juego.released}</p>
              <div className="generos">
                {juego.genres?.slice(0, 2).map((genero) => (
                  <span key={genero.id} className="genero-tag">
                    {genero.name}
                  </span>
                ))}
              </div>
              <div className="plataformas">
                {juego.platforms?.slice(0, 3).map((plataforma, index, array) => (
                  <span key={plataforma.platform.id} className="plataforma-tag">
                    {plataforma.platform.name}
                    {index < array.length - 1 && ' - '}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Catalogo;