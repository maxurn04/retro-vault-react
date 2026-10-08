import React, { useState } from 'react';

const Contacto = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');
    
    const [errorNombre, setErrorNombre] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorMensaje, setErrorMensaje] = useState('');

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
            alert("Mensaje enviado con exito!!");
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
                    
                    <div className="text-center" style={{ border: '4px solid #968732', padding: '2%', borderRadius: '10px', backgroundColor: '#968732' }}>
                        <button type="submit" className="btn btn-primary boton-contacto">Enviar Mensaje</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Contacto;