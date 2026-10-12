import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoUsuario } from '../contexto/ContextoUsuario';

const Inicio = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [popup, setPopup] = useState(null);

    const { iniciarSesion } = useContext(ContextoUsuario);
    const navigate = useNavigate();

    const mostrarPopup = (titulo, mensaje, accionAlCerrar = null) => {
        setPopup({ titulo, mensaje, alCerrar: accionAlCerrar });
    };

    const cerrarPopup = () => {
        const accion = popup?.alCerrar;
        setPopup(null);
        if (accion) accion();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const correoIngresado = correo.trim().toLowerCase();
        const passwIngresada = password.trim();

        if (correoIngresado.length > 100) {
            mostrarPopup("Aviso", "El correo no puede superar los 100 caracteres. Prueba con otro.");
            return;
        }
        if (!correoIngresado.endsWith("@duoc.cl") && !correoIngresado.endsWith("@profesor.duoc.cl") && !correoIngresado.endsWith("@gmail.com")) {
            mostrarPopup("Aviso", "Solo se permiten correos @duoc.cl - @profesor.duoc.cl y @gmail.com. Prueba con otro.");
            return;
        }
        if (passwIngresada.length < 4 || passwIngresada.length > 10) {
            mostrarPopup("Error", "La contraseña debe tener entre 4 y 10 caracteres.");
            return;
        }

        if (correoIngresado === "admin@gmail.com" && passwIngresada === "admin.2026") {
            const usuarioAdmin = { nombre: "Administrador", correo: "admin@gmail.com", tipo: "Administrador" };
            iniciarSesion(usuarioAdmin);
            mostrarPopup("¡Acceso Correcto!", "¡Bienvenido, Administrador!", () => navigate('/admin'));
            return; 
        }

        if (correoIngresado === "vendedor1@gmail.com" && passwIngresada === "vendedorEjemp") {
            const usuarioVendedor = { nombre: "Vendedor", correo: "vendedor1@gmail.com", tipo: "Vendedor" };
            iniciarSesion(usuarioVendedor);
            mostrarPopup("¡Acceso Correcto!", "¡Bienvenido, Vendedor!", () => navigate('/'));
            return; 
        }

        const usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
        const usuarioEncontrado = usuarios.find(user => user.correo.toLowerCase() === correoIngresado && user.contra === passwIngresada);

        if (usuarioEncontrado !== undefined) {
            iniciarSesion(usuarioEncontrado);
            mostrarPopup("¡Acceso Correcto!", "¡Bienvenido, " + usuarioEncontrado.nombre + "!", () => navigate('/'));
        } else {
            mostrarPopup("Error de Acceso", "Correo o contraseña incorrectos.");
        }
    };

    return (
        <main>
            <div className="container mt-5">
                <div className="text-center">
                    <img src="/img/logoRV-NF.png" alt="imgEmpresa" className="logo-inicio-sesion" />
                </div>
            </div>

            <div className="container mb-5 pt-5">
                <div className="row">
                    <div className="col-10 col-md-6 mx-auto p-4 caja-gris">
                        <div>
                            <div className="cabeza-formulario-gris caja-gris" style={{ backgroundColor: '#6e7c61' }}>
                                <h5 className="mb-0 text-center">Inicio de sesion</h5>
                            </div>
                            <form id="f-login" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label mb-1 fuente-palabras-slim">Correo</label>
                                    <input 
                                        type="email" 
                                        className="form-control border-dark" 
                                        maxLength="100" 
                                        required 
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label mb-1 fuente-palabras-slim">Contraseña</label>
                                    <input 
                                        type="password" 
                                        className="form-control border-dark " 
                                        minLength="4" 
                                        maxLength="10" 
                                        required 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                
                                <div className="text-center mt-4 boton-reini">
                                    <button type="submit" className="btn boton-reini">INICIAR SESIÓN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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

export default Inicio;