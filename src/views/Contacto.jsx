import React, { useState } from 'react';

const Contacto = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');
    
    const [errorNombre, setErrorNombre] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorMensaje, setErrorMensaje] = useState('');
    const [popup, setPopup] = useState(null);

    const mostrarPopup = (titulo, mensaje, accionAlCerrar = null) => {
        setPopup({ titulo, mensaje, alCerrar: accionAlCerrar });
    };

    const cerrarPopup = () => {
        const accion = popup?.alCerrar;
        setPopup(null);
        if (accion) accion();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let esValido = true;

        setErrorNombre('');
        setErrorCorreo('');
        setErrorMensaje('');

        const nombreTrim = nombre.trim();
        const correoTrim = correo.trim();
        const mensajeTrim = mensaje.trim();

        if (nombreTrim === '') {
            setErrorNombre('El nombre es requerido.');
            esValido = false;
        } else if (nombreTrim.length > 100) {
            setErrorNombre('El nombre no puede superar los 100 caracteres.');
            esValido = false;
        }

        const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (correoTrim === '') {
            setErrorCorreo('El correo es requerido.');
            esValido = false;
        } else if (correoTrim.length > 100) {
            setErrorCorreo('El correo no puede superar los 100 caracteres.');
            esValido = false;
        } else if (!correoRegex.test(correoTrim)) {
            setErrorCorreo('Ingresa un correo válido.');
            esValido = false;
        } else if (!dominiosPermitidos.some(dominio => correoTrim.toLowerCase().endsWith(dominio))) {
            setErrorCorreo('Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.');
            esValido = false;
        }

        if (mensajeTrim === '') {
            setErrorMensaje('El comentario es requerido.');
            esValido = false;
        } else if (mensajeTrim.length > 500) {
            setErrorMensaje('El comentario no puede superar los 500 caracteres.');
            esValido = false;
        }

        if (esValido) {
            mostrarPopup("¡Mensaje Enviado!", "¡Mensaje enviado con éxito!");
            setNombre('');
            setCorreo('');
            setMensaje('');
        }
    };

    return (
        <main>
            <div className="logoContactoCaja">
                <img src="/img/logoRV-NF.png" alt="Foto de Tienda" className="logoContactoImagen" />
            </div>

            <div className="estiloForm">
                <form id="formContacto" noValidate onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombreId" style={{ fontSize: 'large' }} className="form-label fuente-palabras">Nombre Completo</label>
                        <textarea className="form-control" id="nombreId" rows="1" maxLength="101" value={nombre} onChange={(e) => setNombre(e.target.value)}></textarea>
                        <div className="invalid-feedback d-block text-danger">{errorNombre}</div>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="correoContacto" style={{ fontSize: 'large' }} className="form-label fuente-palabras">Correo Electronico</label>
                        <textarea className="form-control" id="correoContacto" rows="1" maxLength="101" value={correo} onChange={(e) => setCorreo(e.target.value)}></textarea>
                        <div className="invalid-feedback d-block text-danger">{errorCorreo}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mensajeContacto" style={{ fontSize: 'large' }} className="form-label fuente-palabras">Contenido</label>
                        <textarea className="form-control" id="mensajeContacto" rows="5" maxLength="500" value={mensaje} onChange={(e) => setMensaje(e.target.value)}></textarea>
                        <div className="invalid-feedback d-block text-danger">{errorMensaje}</div>
                    </div>
                    
                    <div className="text-center">
                        <button type="submit" className="btn p-3" style={{ backgroundColor: '#968732', border: 'none' }}><h6>Enviar Mensaje</h6></button>
                    </div>
                </form>
            </div>

            {popup && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999
                    }}
                >
                    <div 
                        className="caja-gris p-4 text-center text-white" 
                        style={{ 
                            maxWidth: '420px', 
                            width: '90%', 
                            borderRadius: '10px', 
                            border: '2px solid #bca624',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                        }}
                    >
                        <h4 className="fuente-palabras mb-3" style={{ color: '#bca624' }}>
                            {popup.titulo}
                        </h4>
                        <p className="fuente-palabras-slim mb-4" style={{ fontSize: '1.05rem' }}>
                            {popup.mensaje}
                        </p>
                        <button 
                            type="button" 
                            className="btn boton-reini px-4 py-2" 
                            onClick={cerrarPopup}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Contacto;