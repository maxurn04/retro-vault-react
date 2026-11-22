import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

export const datosUbicacion = [
    { region: "Arica y Parinacota", comunas: ["Arica", "Camarones", "General Lagos", "Putre"] },
    { region: "Tarapacá", comunas: ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"] },
    { region: "Antofagasta", comunas: ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"] },
    { region: "Atacama", comunas: ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"] },
    { region: "Coquimbo", comunas: ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paiguano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"] },
    { region: "Valparaíso", comunas: ["Algarrobo", "Cabildo", "Calera", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Cruz", "La Ligua", "Limache", "Llaillay", "Los Andes", "Nogales", "Olmué", "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"] },
    { region: "Metropolitana de Santiago", comunas: ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"] },
    { region: "Libertador Gral. Bernardo O’Higgins", comunas: ["Chimbarongo", "Chépica", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchihue", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Francisco de Mostazal", "San Vicente de Tagua Tagua", "Santa Cruz"] },
    { region: "Maule", comunas: ["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Romeral", "Río Claro", "Sagrada Familia", "San Clemente", "San Javier de Loncomilla", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"] },
    { region: "Ñuble", comunas: ["Bulnes", "Chillán Viejo", "Chillán", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"] },
    { region: "Biobío", comunas: ["Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"] },
    { region: "Araucanía", comunas: ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"] },
    { region: "Los Ríos", comunas: ["Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Mariquina", "Máfil", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"] },
    { region: "Los Lagos", comunas: ["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"] },
    { region: "Aysén", comunas: ["Aysén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O’Higgins", "Río Ibáñez", "Tortel"] },
    { region: "Magallanes", comunas: ["Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"] }
];

const Registro = () => {
    const [formulario, setFormulario] = useState({
        run: '',
        nombre: '',
        apellidos: '',
        correo: '',
        password: '',
        confirmarPassword: '',
        telefono: '',
        fechaNacimiento: '',
        direccion: ''
    });

    const [indiceRegion, setIndiceRegion] = useState('');
    const [comunaSeleccionada, setComunaSeleccionada] = useState('');
    const [cargando, setCargando] = useState(false);
    const [popup, setPopup] = useState(null);

    const navigate = useNavigate();

    const mostrarPopup = (titulo, mensaje, accionAlCerrar = null) => {
        setPopup({ titulo, mensaje, alCerrar: accionAlCerrar });
    };

    const cerrarPopup = () => {
        const accion = popup?.alCerrar;
        setPopup(null);
        if (accion) accion();
    };

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formulario.password !== formulario.confirmarPassword) {
            mostrarPopup("Error", "Las contraseñas no coinciden.");
            return;
        }

        const correoNormalizado = formulario.correo.trim().toLowerCase();
        if (!correoNormalizado.endsWith("@duoc.cl") && !correoNormalizado.endsWith("@profesor.duoc.cl") && !correoNormalizado.endsWith("@gmail.com")) {
            mostrarPopup("Aviso", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            return;
        }

        const regionNombre = indiceRegion !== '' ? datosUbicacion[indiceRegion].region : '';

        const nuevoUsuario = {
            run: formulario.run.trim(),
            nombre: formulario.nombre.trim(),
            apellidos: formulario.apellidos.trim(),
            correo: correoNormalizado,
            password: formulario.password.trim(),
            rol: "Cliente",
            telefono: formulario.telefono.trim(),
            fechaNacimiento: formulario.fechaNacimiento || null,
            direccionDefecto: formulario.direccion.trim(),
            region: regionNombre,
            comuna: comunaSeleccionada
        };

        setCargando(true);
        try {
            await AuthService.registro(nuevoUsuario);
            mostrarPopup("¡Registro Exitoso!", "Tu cuenta ha sido creada exitosamente en el sistema. Ahora puedes iniciar sesión.", () => {
                navigate('/inicio');
            });
        } catch (error) {
            console.error("Error en registro:", error);
            const msg = error.response?.data?.error || "No se pudo registrar el usuario. El correo o RUN ya existen, o el servicio no está disponible.";
            mostrarPopup("Error al Registrar", msg);
        } finally {
            setCargando(false);
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
                    <div className="col-12 col-md-8 mx-auto p-4 caja-gris">
                        <div>
                            <div className="cabeza-formulario-gris caja-gris" style={{ backgroundColor: '#6e7c61' }}>
                                <h5 className="mb-0 text-center">Registro de Cliente</h5>
                            </div>
                            <form id="f-registro" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">RUN*</label>
                                        <input type="text" name="run" className="form-control border-dark" placeholder="12345678-9" required value={formulario.run} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CORREO ELECTRÓNICO*</label>
                                        <input type="email" name="correo" className="form-control border-dark" placeholder="usuario@duoc.cl" required value={formulario.correo} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">NOMBRE*</label>
                                        <input type="text" name="nombre" className="form-control border-dark" required value={formulario.nombre} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">APELLIDOS*</label>
                                        <input type="text" name="apellidos" className="form-control border-dark" required value={formulario.apellidos} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CONTRASEÑA*</label>
                                        <input type="password" name="password" className="form-control border-dark" required value={formulario.password} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CONFIRMAR CONTRASEÑA*</label>
                                        <input type="password" name="confirmarPassword" className="form-control border-dark" required value={formulario.confirmarPassword} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">TELÉFONO (Opcional)</label>
                                        <input type="tel" name="telefono" className="form-control border-dark" value={formulario.telefono} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">FECHA DE NACIMIENTO (Opcional)</label>
                                        <input type="date" name="fechaNacimiento" className="form-control border-dark" value={formulario.fechaNacimiento} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label mb-1 fuente-palabras-slim">DIRECCIÓN DE ENTREGA*</label>
                                    <input type="text" name="direccion" className="form-control border-dark" maxLength="300" required value={formulario.direccion} onChange={handleChange} />
                                </div>
                                
                                <div className="row mt-4 mb-4">
                                    <div className="col-12 col-md-6 mb-3">
                                        <select className="form-select border-dark border-2" required value={indiceRegion} onChange={(e) => { setIndiceRegion(e.target.value); setComunaSeleccionada(''); }}>
                                            <option value="" disabled>Seleccione la región</option>
                                            {datosUbicacion.map((item, index) => (
                                                <option key={index} value={index}>{item.region}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <select className="form-select border-dark border-2" required value={comunaSeleccionada} onChange={(e) => setComunaSeleccionada(e.target.value)}>
                                            <option value="" disabled>Seleccione la comuna</option>
                                            {indiceRegion !== '' && datosUbicacion[indiceRegion].comunas.map((comuna, idx) => (
                                                <option key={idx} value={comuna}>{comuna}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="text-center mt-3 boton-reini">
                                    <button type="submit" className="btn boton-reini px-5 py-2" disabled={cargando}>
                                        {cargando ? 'REGISTRANDO...' : 'REGISTRAR'}
                                    </button>
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

export default Registro;
