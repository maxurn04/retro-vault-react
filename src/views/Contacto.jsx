import React from 'react';

const Contacto = () => {
    return (
        <main>
            <div className="logoContactoCaja">
                <img src="/img/logoRV-NF.png" alt="Foto de Tienda" className="logoContactoImagen" />
            </div>

            <div className="estiloForm">
                <form id="formContacto" noValidate>
                    <div className="mb-3">
                        <label htmlFor="nombreId" style={{ fontSize: 'large' }} className="form-label fuente-palabras">Nombre Completo</label>
                        <textarea type="text" className="form-control" id="nombreId" rows="1" maxLength="101"></textarea>
                        <div className="invalid-feedback d-block text-danger" id="errorNombre"></div>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="correoContacto" style={{ fontSize: 'large' }} className="form-label fuente-palabras">Correo Electronico</label>
                        <textarea type="email" className="form-control" id="correoContacto" aria-describedby="emailHelp" rows="1" maxLength="101"></textarea>
                        <div className="invalid-feedback d-block text-danger" id="errorCorreo"></div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mensajeContacto" style={{ fontSize: 'large' }} className="form-label fuente-palabras">Contenido</label>
                        <textarea type="text" className="form-control" id="mensajeContacto" rows="5" maxLength="500"></textarea>
                        <div className="invalid-feedback d-block text-danger" id="errorMensaje"></div>
                    </div>
                    
                    <div className="text-center" style={{borderRadius: '10px' }}>
                        <button type="submit" className="btn boton-contacto pt-3 pb-3" style={{ backgroundColor: '#968732', borderColor: '#968732' }}>Enviar Mensaje</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Contacto;