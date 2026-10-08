import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const datosUbicacion = [
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
    { region: "Aisén del Gral. Carlos Ibáñez del Campo", comunas: ["Aisén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O’Higgins", "Río Ibáñez", "Tortel"] },
    { region: "Magallanes y de la Antártica Chilena", comunas: ["Antártica", "Cabo de Hornos (Ex Navarino)", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"] }
];

const Registro = () => {
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState({
        run: '', nombre: '', apellidos: '', correo: '', confirmarCorreo: '',
        passw: '', confirmarPassw: '', telefono: '', fecha: '', direccion: ''
    });
    const [indiceRegion, setIndiceRegion] = useState('');
    const [comunaSeleccionada, setComunaSeleccionada] = useState('');

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { run, nombre, apellidos, correo, confirmarCorreo, passw, confirmarPassw, telefono, fecha, direccion } = formulario;
        const runUpper = run.trim().toUpperCase();
        const correoLower = correo.trim().toLowerCase();
        const confCorreoLower = confirmarCorreo.trim().toLowerCase();

        if (runUpper.length < 7 || runUpper.length > 9) {
            alert("El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guión.");
            return;
        }
        if (nombre.trim().length > 50) {
            alert("El nombre no puede superar los 50 caracteres.");
            return;
        }
        if (apellidos.trim().length > 100) {
            alert("Los apellidos no pueden superar los 100 caracteres.");
            return;
        }
        if (direccion.trim().length > 300) {
            alert("La dirección no puede superar los 300 caracteres.");
            return;
        }
        if (!correoLower.endsWith("@duoc.cl") && !correoLower.endsWith("@profesor.duoc.cl") && !correoLower.endsWith("@gmail.com")) {
            alert("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            return;
        }
        if (correoLower !== confCorreoLower) {
            alert("Los correos no coinciden.");
            return;
        }
        if (passw.trim().length < 4 || passw.trim().length > 10) {
            alert("La contraseña debe tener entre 4 y 10 caracteres.");
            return;
        }
        if (passw.trim() !== confirmarPassw.trim()) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
        const usuarioExiste = usuarios.find(user => user.correo.toLowerCase() === correoLower);

        if (usuarioExiste) {
            alert("Ya existe un usuario registrado con este correo.");
            return;
        }

        const regionTexto = datosUbicacion[indiceRegion].region;
        const nuevoUser = {
            run: runUpper, nombre: nombre.trim(), apellidos: apellidos.trim(),
            correo: correoLower, contra: passw.trim(), telefono: telefono.trim(),
            fechaNacimiento: fecha, direccion: direccion.trim(), region: regionTexto,
            comuna: comunaSeleccionada, tipo: "Cliente"
        };

        usuarios.push(nuevoUser);
        localStorage.setItem('lista_usuarios', JSON.stringify(usuarios));
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        navigate('/inicio');
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
                                    <input type="text" name="run" className="form-control border-dark" minLength="7" maxLength="9" placeholder="Ej: 19011022K" required value={formulario.run} onChange={handleChange} />
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">NOMBRE*</label>
                                        <input type="text" name="nombre" className="form-control border-dark" maxLength="50" required value={formulario.nombre} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">APELLIDOS*</label>
                                        <input type="text" name="apellidos" className="form-control border-dark" maxLength="100" required value={formulario.apellidos} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CORREO*</label>
                                        <input type="email" name="correo" className="form-control border-dark" maxLength="100" required value={formulario.correo} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CONFIRMAR CORREO*</label>
                                        <input type="email" name="confirmarCorreo" className="form-control border-dark" maxLength="100" required value={formulario.confirmarCorreo} onChange={handleChange} />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CONTRASEÑA*</label>
                                        <input type="password" name="passw" className="form-control border-dark" minLength="4" maxLength="10" required value={formulario.passw} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">CONFIRMAR CONTRASEÑA*</label>
                                        <input type="password" name="confirmarPassw" className="form-control border-dark" minLength="4" maxLength="10" required value={formulario.confirmarPassw} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">TELÉFONO (Opcional)</label>
                                        <input type="tel" name="telefono" className="form-control border-dark" value={formulario.telefono} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label mb-1 fuente-palabras-slim">FECHA DE NACIMIENTO (Opcional)</label>
                                        <input type="date" name="fecha" className="form-control border-dark" value={formulario.fecha} onChange={handleChange} />
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

                                <div className="text-center mt-3">
                                    <button type="submit" className="btn boton-reini px-5 py-2">REGISTRAR</button>
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