import React from 'react';

const Registro = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Procesando registro de usuario...");
    };

    return (
        <main>
            <div className="container mt-5 mb-5 pt-5">
                <div className="row">
                    <div className="col-12 col-md-8 mx-auto p-4 caja-gris">
                        <div>
                            <div className="caja-reg-inicio-peq">
                                <h5 className="mb-0 fuente-palabras text-center">Registro de usuario</h5>
                            </div>
                            
                            <form id="f-registro" onSubmit={handleRegister}>
                                
                                <div className="mb-3">
                                    <label className="form-label mb-1 fuente-palabras-slim">RUN (Sin puntos ni guión)*</label>
                                    <input type="text" id="r-run" className="form-control border-dark" minLength="7" maxLength="9" placeholder="Ej: 19011022K" required />
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">NOMBRE*</label>
                                        <input type="text" id="r-nombre" className="form-control border-dark" maxLength="50" required />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">APELLIDOS*</label>
                                        <input type="text" id="r-apellidos" className="form-control border-dark" maxLength="100" required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CORREO*</label>
                                        <input type="email" id="r-correo" className="form-control border-dark" maxLength="100" required />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CONFIRMAR CORREO*</label>
                                        <input type="email" id="r-correo-conf" className="form-control border-dark" maxLength="100" required />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CONTRASEÑA*</label>
                                        <input type="password" id="r-passw" className="form-control border-dark" minLength="4" maxLength="10" required />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CONFIRMAR CONTRASEÑA*</label>
                                        <input type="password" id="r-passw-conf" className="form-control border-dark" minLength="4" maxLength="10" required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">TELÉFONO (Opcional)</label>
                                        <input type="tel" id="r-telf" className="form-control border-dark" />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">FECHA DE NACIMIENTO (Opcional)</label>
                                        <input type="date" id="r-fecha" className="form-control border-dark" />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label mb-1 fuente-palabras-slim">DIRECCIÓN DE ENTREGA*</label>
                                    <input type="text" id="r-direccion" className="form-control border-dark" maxLength="300" required />
                                </div>
                                
                                <div className="row mt-4 mb-4">
                                    <div className="col-12 col-md-6 mb-3">
                                        <select id="r-reg" className="form-select border-dark border-2" required defaultValue="">
                                            <option value="" disabled>Seleccione la región</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <select id="r-comu" className="form-select border-dark border-2" required defaultValue="">
                                            <option value="" disabled>Seleccione la comuna</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="text-center boton-reini ">
                                    <button type="submit" className="btn py-2">REGISTRAR</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Registro;