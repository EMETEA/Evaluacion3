import React, { useState, useEffect } from "react";

function CrudGOTY() {
  // Estado inicial: cargar desde localStorage directamente
  const [juegos, setJuegos] = useState(() => {
    const juegosGuardados = localStorage.getItem("goty-juegos");
    return juegosGuardados ? JSON.parse(juegosGuardados) : [];
  });

  // Estado para el formulario
  const [form, setForm] = useState({
    nombre: "",
    genero: ""
  });

  // Índice del juego que se está editando
  const [editarIndice, setEditarIndice] = useState(null);

  // Guardar los cambios en localStorage cuando juegos cambia
  useEffect(() => {
    localStorage.setItem("goty-juegos", JSON.stringify(juegos));
  }, [juegos]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Agregar nuevo juego o actualizar uno existente
  const handleAgregarActualizar = () => {
    const { nombre, genero } = form;

    if (!nombre.trim() || !genero.trim()) {
      alert("Completa todos los campos");
      return;
    }

    if (editarIndice !== null) {
      // Editar juego existente
      const juegosActualizados = [...juegos];
      juegosActualizados[editarIndice] = { ...form };
      setJuegos(juegosActualizados);
      setEditarIndice(null);
    } else {
      // Agregar nuevo juego
      setJuegos((prev) => [...prev, form]);
    }

    // Limpiar formulario
    setForm({ nombre: "", genero: "" });
  };

  // Eliminar juego
  const handleEliminar = (index) => {
    const juegosFiltrados = juegos.filter((_, i) => i !== index);
    setJuegos(juegosFiltrados);

    if (editarIndice === index) {
      setEditarIndice(null);
      setForm({ nombre: "", genero: "" });
    }
  };

  // Editar juego
  const handleEditar = (index) => {
    setForm(juegos[index]);
    setEditarIndice(index);
  };

  return (
    <div className="contenedor-crud">
      <h2 style={{ textAlign: "center", color: "#00ffcc", marginBottom: "1em" }}>
        ¡Vota por tu nominado a GOTY!
      </h2>

      <div className="formulario-crud">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del juego"
          value={form.nombre}
          onChange={handleChange}
        />
        <select
          name="genero"
          value={form.genero}
          onChange={handleChange}
        >
          <option value="">Selecciona un género</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG">RPG</option>
          <option value="Deportes">Deportes</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Otros">Otros</option>
        </select>
        <button onClick={handleAgregarActualizar}>
          {editarIndice !== null ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <ul className="lista-juegos">
        {juegos.map((juego, index) => (
          <li key={index}>
            <span>
              <strong>{juego.nombre}</strong> | {juego.genero}
            </span>
            <div>
              <button onClick={() => handleEditar(index)}>Editar</button>
              <button onClick={() => handleEliminar(index)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudGOTY;
