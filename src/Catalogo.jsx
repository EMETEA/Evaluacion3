import React from "react";

function Catalogo({ cambiarFondo }) {
  return (
    // Sección principal del catálogo de videojuegos
    <section id="panel-principal" className="panel visible active">
      <h2>Catálogo de Videojuegos</h2>

      {/* Botón para cambiar el fondo, recibe la función cambiarFondo por props */}
      <button onClick={cambiarFondo} className="boton-fondo">
        Cambiar Fondo
      </button>

      <div className="card-juego">
        <h2>ARK</h2>
        <img src="ark.jpg" alt="ark" />
      </div>

      <div className="card-juego">
        <h2>Fortnite</h2>
        <img src="Fortnite.jpg" alt="Fortnite" />
      </div>

      <div className="card-juego">
        <h2>Pixel3D</h2>
        <img src="pixel.png" alt="pixel" />
      </div>
    </section>
  );
}

export default Catalogo;

