import React from "react";

function Noticias() {
  return (
    // Sección principal con ID para estilos y manejo específico
    <section id="panel-noticias" className="panel">
      <h2>Noticias Recientes de Videojuegos</h2>

      {/* Tarjeta individual de noticia */}
      <div className="tarjeta-noticia">
        <img src="./elden.jpg" alt="Elden Ring DLC" />
        <h3>Elden Ring anuncia su esperado DLC</h3>
        <p>
          FromSoftware revela 'Shadow of the Erdtree', una nueva expansión con nuevas zonas y jefes para Elden Ring. Disponible el próximo mes.
        </p>
      </div>

      <div className="tarjeta-noticia">
        <img src="gta.jpg" alt="GTA VI filtrado" />
        <h3>Filtraciones de GTA VI generan controversia</h3>
        <p>
          Un gameplay filtrado de GTA VI muestra mecánicas inéditas. Rockstar aún no confirma ni desmiente la autenticidad del video.
        </p>
      </div>

      <div className="tarjeta-noticia">
        <img src="Zelda.jpg" alt="Zelda nuevo juego" />
        <h3>Nintendo trabaja en un nuevo Zelda en 2D</h3>
        <p>
          Según rumores, Nintendo estaría desarrollando una entrega clásica estilo A Link to the Past para Nintendo Switch 2.
        </p>
      </div>
    </section>
  );
}

export default Noticias;
