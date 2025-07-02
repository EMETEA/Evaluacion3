import React, { useState, useEffect } from "react";

function CrudGOTY() {
  // Estado para almacenar la lista de juegos nominados
  const [juegos, setJuegos] = useState([]);

  // Estado para manejar los datos del formulario (nombre y género)
  const [form, setForm] = useState({
    nombre: "",
    genero: ""
  });

  // Estado para guardar el índice del juego que se está editando, o null si se está agregando uno nuevo
  const [editarIndice, setEditarIndice] = useState(null);

  // useEffect que carga los datos guardados en localStorage cuando el componente se monta
  useEffect(() => {
    const datosGuardados = localStorage.getItem("goty-juegos");
    if (datosGuardados) {
      setJuegos(JSON.parse(datosGuardados));
    }
  }, []);

  // useEffect que guarda la lista actualizada en localStorage cada vez que cambia 'juegos'
  useEffect(() => {
    localStorage.setItem("goty-juegos", JSON.stringify(juegos));
  }, [juegos]);

  // Maneja el cambio en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Función para agregar un nuevo juego o actualizar uno existente
  const handleAgregarActualizar = () => {
    const { nombre, genero } = form;

    // Validación básica para evitar campos vacíos
    if (!nombre || !genero) {
      alert("Completa todos los campos");
      return;
    }

    if (editarIndice !== null) {
      // Actualizar juego existente
      const listaActualizada = [...juegos];
      listaActualizada[editarIndice] = { ...form };
      setJuegos(listaActualizada);
      setEditarIndice(null);  // Salir del modo edición
    } else {
      // Agregar nuevo juego
      setJuegos(prev => [...prev, form]);
    }

    // Limpiar formulario
    setForm({ nombre: "", genero: "" });
  };

  // Eliminar un juego de la lista por índice
  const handleEliminar = (index) => {
    const listaFiltrada = juegos.filter((_, i) => i !== index);
    setJuegos(listaFiltrada);

    // Si se estaba editando ese juego, cancelar edición y limpiar formulario
    if (editarIndice === index) {
      setForm({ nombre: "", genero: "" });
      setEditarIndice(null);
    }
  };

  // Poner el formulario en modo edición con los datos del juego seleccionado
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
        {/* Campo nombre del juego */}
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del juego"
          value={form.nombre}
          onChange={handleChange}
        />
        {/* Selección de género */}
        <select name="genero" value={form.genero} onChange={handleChange}>
          <option value="">Selecciona un género</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG">RPG</option>
          <option value="Deportes">Deportes</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Otros">Otros</option>
        </select>
        
        {/* Botón que cambia texto según si se agrega o actualiza */}
        <button onClick={handleAgregarActualizar}>
          {editarIndice !== null ? "Actualizar" : "Agregar"}
        </button>
      </div>

      {/* Lista de juegos con opciones para editar y eliminar */}
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
