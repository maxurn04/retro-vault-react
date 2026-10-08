import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoUsuario } from '../contexto/ContextoUsuario';

const Inicio = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const { iniciarSesion } = useContext(ContextoUsuario);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const correoIngresado = correo.trim().toLowerCase();
        const passwIngresada = password.trim();

        if (correoIngresado.length > 100) {
            alert("El correo no puede superar los 100 caracteres. Prueba con otro.");
            return;
        }
        if (!correoIngresado.endsWith("@duoc.cl") && !correoIngresado.endsWith("@profesor.duoc.cl") && !correoIngresado.endsWith("@gmail.com")) {
            alert("Solo se permiten correos @duoc.cl - @profesor.duoc.cl y @gmail.com. Prueba con otro.");
            return;
        }
        if (passwIngresada.length < 4 || passwIngresada.length > 10) {
            alert("Error: La contraseña debe tener entre 4 y 10 caracteres.");
            return;
        }

        if (correoIngresado === "admin@gmail.com" && passwIngresada === "admin.2026") {
            const usuarioAdmin = { nombre: "Administrador", correo: "admin@gmail.com", tipo: "Administrador" };
            iniciarSesion(usuarioAdmin);
            alert("¡Bienvenido, Administrador!");
            navigate('/');
            return; 
        }

        if (correoIngresado === "vendedor1@gmail.com" && passwIngresada === "vendedorEjemp") {
            const usuarioVendedor = { nombre: "Vendedor", correo: "vendedor1@gmail.com", tipo: "Vendedor" };
            iniciarSesion(usuarioVendedor);
            alert("¡Bienvenido, Vendedor!");
            navigate('/');
            return; 
        }

        const usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
        const usuarioEncontrado = usuarios.find(user => user.correo.toLowerCase() === correoIngresado && user.contra === passwIngresada);

        if (usuarioEncontrado !== undefined) {
            iniciarSesion(usuarioEncontrado);
            alert("¡Bienvenido, " + usuarioEncontrado.nombre + "!");
            navigate('/'); 
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    };

    return (
        <main>
            <div className="container mt-5">
                <div className="text-center">
                    <img src="/img/logoRV-NF.png" alt="imgEmpresa" className="img-fluid logo-inicio-sesion" />
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
                                        className="form-control border-dark" 
                                        minLength="4" 
                                        maxLength="10" 
                                        required 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                
                                <div className="text-center mt-3 pt-4">
                                    <button type="submit" className="btn boton-reini">INICIAR SESIÓN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Inicio;