import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { datosUbicacion } from '../Registro';

const EditarUsuario = () => {
    const { indice } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        run: '', nombre: '', apellidos: '', correo: '', passw: '', telefono: '', fecha: '', direccion: ''
    });
    const [indiceRegion, setIndiceRegion] = useState('');
    const [comuna, setComuna] = useState('');
    const [aviso, setAviso] = useState(null);
    const [noEncontrado, setNoEncontrado] = useState(false);
    const mostrarError = (texto) => setAviso({ tipo: 'danger', texto });

    useEffect(() => {
        const usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
        const user = usuarios[indice];
        if (!user) {
            setNoEncontrado(true);
            return;
        }
        setForm({
            run: user.run || '',
            nombre: user.nombre || '',
            apellidos: user.apellidos || '',
            correo: user.correo || '',
            passw: user.contra || '',
            telefono: user.telefono || '',
            fecha: user.fechaNacimiento || '',
            direccion: user.direccion || ''
        });
        const i = datosUbicacion.findIndex((r) => r.region === user.region);
        setIndiceRegion(i === -1 ? '' : String(i));
        setComuna(user.comuna || '');
    }, [indice, navigate]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        const run = form.run.trim().toUpperCase();
        const nombre = form.nombre.trim();
        const apellidos = form.apellidos.trim();
        const correo = form.correo.trim().toLowerCase();
        const passw = form.passw.trim();
        const direccion = form.direccion.trim();

        if (run.length < 7 || run.length > 9) {
            mostrarError('El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guión.');
            return;
        }
        if (nombre.length > 50) {
            mostrarError('El nombre no puede superar los 50 caracteres.');
            return;
        }
        if (apellidos.length > 100) {
            mostrarError('Los apellidos no pueden superar los 100 caracteres.');
            return;
        }
        if (direccion.length > 300) {
            mostrarError('La dirección no puede superar los 300 caracteres.');
            return;
        }
        if (!correo.endsWith('@duoc.cl') && !correo.endsWith('@profesor.duoc.cl') && !correo.endsWith('@gmail.com')) {
            mostrarError('Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.');
            return;
        }
        if (passw.length < 4 || passw.length > 10) {
            mostrarError('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
        if (usuarios.some((u, i) => i !== Number(indice) && u.correo.toLowerCase() === correo)) {
            mostrarError('Ya existe un usuario registrado con este correo.');
            return;
        }

        usuarios[indice] = {
            ...usuarios[indice],
            run,
            nombre,
            apellidos,
            correo,
            contra: passw,
            telefono: form.telefono.trim(),
            fechaNacimiento: form.fecha,
            direccion,
            region: datosUbicacion[indiceRegion].region,
            comuna
        };

        localStorage.setItem('lista_usuarios', JSON.stringify(usuarios));
        setAviso({ tipo: 'success', texto: 'Usuario actualizado con éxito.' });
        setTimeout(() => navigate('/admin/mostrarusuario'), 1500);
    };

    if (noEncontrado) {
        return (
            <main className="col-12 col-md-9 col-xl-10 p-4">
                <div className="alert alert-danger text-center" role="alert">
                    Usuario no encontrado. <Link to="/admin/mostrarusuario" className="alert-link">Volver a Usuarios</Link>
                </div>
            </main>
        );
    }
    return (
        <main className="col-12 col-md-9 col-xl-10 p-0" style={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
            <div className="p-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#e0e0e0', borderBottom: '1px solid #cccccc' }}>
                <h1 className="fw-semibold m-0 fs-2" style={{ color: '#333333' }}>Editar Usuario</h1>
            </div>

            <div className="p-4">
                {aviso && <div className={`alert alert-${aviso.tipo} text-center`} role="alert" style={{ maxWidth: '700px' }}>{aviso.texto}</div>}
                <form className="p-4" style={{ backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '8px', maxWidth: '700px' }} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="r-run" className="form-label">RUN</label>
                        <input type="text" className="form-control" id="r-run" name="run" required value={form.run} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="r-nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="r-nombre" name="nombre" maxLength="50" required value={form.nombre} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="r-apellidos" className="form-label">Apellidos</label>
                        <input type="text" className="form-control" id="r-apellidos" name="apellidos" maxLength="100" required value={form.apellidos} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="r-correo" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="r-correo" name="correo" required value={form.correo} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="r-passw" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="r-passw" name="passw" minLength="4" maxLength="10" required value={form.passw} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="r-telf" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="r-telf" name="telefono" required value={form.telefono} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="r-fecha" className="form-label">Fecha de Nacimiento</label>
                        <input type="date" className="form-control" id="r-fecha" name="fecha" required value={form.fecha} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="r-direccion" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="r-direccion" name="direccion" maxLength="300" required value={form.direccion} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="r-reg" className="form-label">Región</label>
                        <select className="form-select" id="r-reg" required value={indiceRegion} onChange={(e) => { setIndiceRegion(e.target.value); setComuna(''); }}>
                            <option value="">Seleccione la región</option>
                            {datosUbicacion.map((item, index) => (
                                <option key={index} value={index}>{item.region}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="r-comu" className="form-label">Comuna</label>
                        <select className="form-select" id="r-comu" required value={comuna} onChange={(e) => setComuna(e.target.value)}>
                            <option value="">Seleccione la comuna</option>
                            {indiceRegion !== '' && datosUbicacion[indiceRegion].comunas.map((c, i) => (
                                <option key={i} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn boton-colores-inicio">Guardar Cambios</button>
                </form>
            </div>
        </main>
    );
};

export default EditarUsuario;