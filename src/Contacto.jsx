import React, { useState, useEffect } from "react";

function Contacto() {
  const [mensajes, setMensajes] = useState([]);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    plataforma: "",
    edad: "",
    terminos: false,
    mensaje: "",
    fecha: ""
  });

  // Función para obtener fecha actual
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Al cargar el componente, establecer la fecha actual
  useEffect(() => {
    setForm(prev => ({ ...prev, fecha: obtenerFechaActual() }));

    // También cargar mensajes guardados en localStorage, si quieres persistencia
    const mensajesGuardados = localStorage.getItem('mensajes');
    if (mensajesGuardados) {
      setMensajes(JSON.parse(mensajesGuardados));
    }
  }, []);

  // Guardar mensajes en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
  }, [mensajes]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const { nickname, email, plataforma, edad, terminos, mensaje, fecha } = form;

    // Validaciones
    if (!nickname.trim() || !email.trim() || !plataforma || !mensaje.trim() || !edad.trim()) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const edadNum = Number(edad);
    if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
      alert('Por favor, ingresa una edad válida entre 1 y 120.');
      return;
    }

    if (!terminos) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }

    // Crear nuevo mensaje
    const nuevoMensaje = {
      nickname: nickname.trim(),
      email: email.trim(),
      plataforma,
      edad: edadNum,
      mensaje: mensaje.trim(),
      fecha
    };

    // Agregar mensaje a la lista
    setMensajes(prev => [...prev, nuevoMensaje]);
    console.log(nuevoMensaje);

    // Mostrar mensaje de éxito
    setMostrarExito(true);
    setTimeout(() => {
      setMostrarExito(false);
    }, 3000);

    // Limpiar formulario
    setForm({
      nickname: "",
      email: "",
      plataforma: "",
      edad: "",
      terminos: false,
      mensaje: "",
      fecha: obtenerFechaActual()
    });
  };

  return (
    <section id="panel-comunicacion" className="panel">
      <h2>¡Contáctanos!</h2>
      <p>¿Tienes alguna sugerencia, bug que reportar o quieres colaborar con nosotros? ¡Escríbenos!</p>
      
      <form id="formulario-contacto" onSubmit={handleSubmit}>
        <label htmlFor="nickname">Tu Nickname Gamer:</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          placeholder="Ej: ShadowHunter22"
          value={form.nickname}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ej: jugador@correo.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="plataforma">Plataforma de juego favorita:</label>
        <select 
          id="plataforma" 
          name="plataforma" 
          value={form.plataforma}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo">Nintendo</option>
          <option value="Mobile">Mobile</option>
          <option value="Otro">Otro</option>
        </select>

        <label htmlFor="edad">Edad:</label>
        <input
          type="number"
          id="edad"
          name="edad"
          placeholder="Ej: 25"
          min="1"
          max="120"
          value={form.edad}
          onChange={handleChange}
          required
        />

        <label htmlFor="terminos" className="checkbox-label">
          <input
            type="checkbox"
            id="terminos"
            name="terminos"
            checked={form.terminos}
            onChange={handleChange}
            required
          />
          Acepto los términos y condiciones
        </label>

        <label htmlFor="mensaje">Tu mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          placeholder="Escribe tu mensaje aquí..."
          value={form.mensaje}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="fecha">Fecha de hoy:</label>
        <input 
          type="date" 
          id="fecha" 
          name="fecha" 
          value={form.fecha}
          readOnly 
        />

        <button type="submit">Enviar mensaje</button>
      </form>

      {mostrarExito && (
        <div className="mensaje-exito" style={{ display: 'block' }}>
          ¡Mensaje enviado correctamente!
        </div>
      )}

      <table id="tabla-mensajes">
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Email</th>
            <th>Plataforma</th>
            <th>Edad</th>
            <th>Mensaje</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {mensajes.map((msg, index) => (
            <tr key={index}>
              <td data-label="Nickname">{msg.nickname}</td>
              <td data-label="Email">{msg.email}</td>
              <td data-label="Plataforma">{msg.plataforma}</td>
              <td data-label="Edad">{msg.edad}</td>
              <td data-label="Mensaje">{msg.mensaje}</td>
              <td data-label="Fecha">{msg.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Contacto;
