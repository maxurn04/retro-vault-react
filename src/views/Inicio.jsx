import React from 'react';

const Inicio = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Intentando iniciar sesión...");
    };

    return (
        <main>
            <div className="container">
                <div className="text-center">
                    <img src="/img/logoRV-NF.png" alt="imgEmpresa" className="logo-inicio-sesion" />
                </div>
            </div>

            <div className="container mb-5">
                <div className="row">
                    <div className="col-10 col-md-6 mx-auto p-4 caja-gris">
                        <div>
                            <div className="cabeza-formulario-gris caja-gris" style={{ backgroundColor: '#6e7c61' }}>
                                <h5 className="mb-0 text-center fuente-palabras">Inicio de sesion</h5>
                            </div>
                            <form id="f-login" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label mb-1 fuente-palabras-slim">Correo</label>
                                    <input 
                                        type="email" 
                                        id="login-correo" 
                                        className="form-control border-dark" 
                                        maxLength="100" 
                                        required 
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label mb-1 fuente-palabras-slim">Contraseña</label>
                                    <input 
                                        type="password" 
                                        id="login-passw" 
                                        className="form-control border-dark" 
                                        minLength="4" 
                                        maxLength="10" 
                                        required 
                                    />
                                </div>
                                
                                <div className="text-center mt-3 pt-4">
                                    <button type="submit" className="btn boton-reini">INICIAR SESION</button>
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