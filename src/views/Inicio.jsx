import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { ContextoUsuario } from '../contexto/ContextoUsuario';
import AuthService from '../services/AuthService';

const Inicio = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false);
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

    const handleLogin = async (e) => {
        e.preventDefault();
        const correoIngresado = correo.trim().toLowerCase();
        const passwIngresada = password.trim();

        if (correoIngresado.length > 100) {
            mostrarPopup("Aviso", "El correo no puede superar los 100 caracteres. Prueba con otro.");
            return;
        }
        if (!correoIngresado.endsWith("@duoc.cl") && !correoIngresado.endsWith("@profesor.duoc.cl") && !correoIngresado.endsWith("@gmail.com") && correoIngresado !== "admin@tienda.cl") {
            mostrarPopup("Aviso", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl, @gmail.com o el correo demo admin@tienda.cl.");
            return;
        }

        setCargando(true);
        try {
            const respuesta = await AuthService.login(correoIngresado, passwIngresada);
            const usuario = respuesta.usuario || {
                id: respuesta.id,
                nombre: respuesta.nombre,
                apellidos: respuesta.apellidos,
                correo: respuesta.correo,
                rol: respuesta.rol,
                tipo: respuesta.rol
            };
            const token = respuesta.token;

            iniciarSesion(usuario, token);

            const mensajeBienvenida = `¡Bienvenido, ${usuario.nombre}! (${usuario.rol || usuario.tipo})`;
            mostrarPopup("¡Acceso Correcto!", mensajeBienvenida, () => {
                const rolUpper = (usuario.rol || usuario.tipo || '').toUpperCase();
                if (rolUpper === 'ADMIN' || rolUpper === 'ADMINISTRADOR') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            });
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            const msg = error.response?.data?.error || "Correo o contraseña incorrectos, o servicio de autenticación no disponible.";
            mostrarPopup("Error de Acceso", msg);
        } finally {
            setCargando(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setCargando(true);
        try {
            const googleCredential = credentialResponse.credential;
            let decoded = {};
            try {
                decoded = jwtDecode(googleCredential);
            } catch (err) {
            }

            const respuesta = await AuthService.loginGoogle(
                googleCredential,
                decoded.email || null,
                decoded.name || null
            );

            const usuario = respuesta.usuario || {
                id: respuesta.id,
                nombre: respuesta.nombre,
                apellidos: respuesta.apellidos,
                correo: respuesta.correo,
                rol: respuesta.rol,
                tipo: respuesta.rol
            };
            const token = respuesta.token;

            iniciarSesion(usuario, token);

            mostrarPopup("¡Acceso con Google Correcto!", `¡Bienvenido, ${usuario.nombre}!`, () => {
                const rolUpper = (usuario.rol || usuario.tipo || '').toUpperCase();
                if (rolUpper === 'ADMIN' || rolUpper === 'ADMINISTRADOR') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            });
        } catch (error) {
            console.error("Error en login Google:", error);
            const msg = error.response?.data?.error || "Error al autenticar con la cuenta de Google en el servidor.";
            mostrarPopup("Error de Autenticación Google", msg);
        } finally {
            setCargando(false);
        }
    };

    const handleGoogleError = () => {
        mostrarPopup("Error Google", "No se pudo completar el inicio de sesión con Google. Revisa tu Client ID en Google Cloud Console.");
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
                                <h5 className="mb-0 text-center">Inicio de sesión</h5>
                            </div>
                            <form id="f-login" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label mb-1 fuente-palabras-slim">Correo</label>
                                    <input 
                                        type="email" 
                                        className="form-control border-dark" 
                                        required 
                                        placeholder="ejemplo@duoc.cl"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        disabled={cargando}
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label mb-1 fuente-palabras-slim">Contraseña</label>
                                    <input 
                                        type="password" 
                                        className="form-control border-dark" 
                                        required 
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={cargando}
                                    />
                                </div>
                                
                                <div className="text-center mt-4 boton-reini">
                                    <button 
                                        type="submit" 
                                        className="btn boton-reini w-100 py-2" 
                                        disabled={cargando}
                                    >
                                        {cargando ? 'INICIANDO SESIÓN...' : 'INICIAR SESIÓN'}
                                    </button>
                                </div>
                            </form>

                            <div className="d-flex align-items-center my-4">
                                <hr className="flex-grow-1 border-secondary" />
                                <span className="px-3 text-white small">O continúa con</span>
                                <hr className="flex-grow-1 border-secondary" />
                            </div>

                            <div className="d-flex justify-content-center">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    theme="filled_black"
                                    shape="pill"
                                    text="signin_with"
                                    locale="es"
                                />
                            </div>
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
                            className="btn px-4 py-2" 
                            style={{ backgroundColor: '#bca624', color: '#ffffff', fontWeight: 'bold', borderRadius: '8px' }}
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
