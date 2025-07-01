import React, { useState, useEffect } from "react";

const CrudGOTY = () => {
  const [juegos, setJuegos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    genero: "",
    anio: ""
  });
  const [editarIndice, setEditarIndice] = useState(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("goty-juegos");
    if (datosGuardados) {
      setJuegos(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goty-juegos", JSON.stringify(juegos));
  }, [juegos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAgregarActualizar = () => {
    const { nombre, genero, anio } = form;

    if (!nombre || !genero || !anio) {
      alert("Completa todos los campos");
      return;
    }

    if (editarIndice !== null) {
      const listaActualizada = [...juegos];
      listaActualizada[editarIndice] = { ...form };
      setJuegos(listaActualizada);
      setEditarIndice(null);
    } else {
      setJuegos(prev => [...prev, form]);
    }

    setForm({ nombre: "", genero: "", anio: "" });
  };

  const handleEliminar = (index) => {
    const listaFiltrada = juegos.filter((_, i) => i !== index);
    setJuegos(listaFiltrada);
    if (editarIndice === index) {
      setForm({ nombre: "", genero: "", anio: "" });
      setEditarIndice(null);
    }
  };

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
        <select name="genero" value={form.genero} onChange={handleChange}>
          <option value="">Selecciona un género</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG">RPG</option>
          <option value="Deportes">Deportes</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Otros">Otros</option>
        </select>
        <input
          type="number"
          name="anio"
          placeholder="Año de lanzamiento"
          min="1950"
          max={new Date().getFullYear()}
          value={form.anio}
          onChange={handleChange}
        />
        <button onClick={handleAgregarActualizar}>
          {editarIndice !== null ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <ul className="lista-juegos">
        {juegos.map((juego, index) => (
          <li key={index}>
            <span>
              <strong>{juego.nombre}</strong> | {juego.genero} | {juego.anio}
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
};

export default CrudGOTY;


