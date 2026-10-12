import { useState } from 'react';

const vacio = {
    run: '', nombre: '', apellidos: '', correo: '', contra: '',
    telefono: '', fechaNacimiento: '', direccion: '', region: '', comuna: ''
};

const MostrarUsuarios = () => {
    const [usuarios, setUsuarios] = useState(() => JSON.parse(localStorage.getItem('lista_usuarios')) || []);
    const [form, setForm] = useState(vacio);
    const [indice, setIndice] = useState('');
    const [aviso, setAviso] = useState(null)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const seleccionar = (user, i) => {
        setForm({ ...vacio, ...user });
        setIndice(i);
    };

    const guardarCambios = () => {
        if (indice === '') return;
        const lista = [...usuarios];
        lista[indice] = { ...lista[indice], ...form };
        localStorage.setItem('lista_usuarios', JSON.stringify(lista));
        setUsuarios(lista);
        setAviso({ tipo: 'success', texto: 'Usuario editado.' });
    };

    const borrarUsuario = () => {
        if (indice === '') return;
        const lista = usuarios.filter((_, i) => i !== indice);
        localStorage.setItem('lista_usuarios', JSON.stringify(lista));
        setUsuarios(lista);
        setForm(vacio);
        setIndice('');
        setAviso({ tipo: 'success', texto: 'Usuario borrado.' });
    };

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">Mostrar Usuarios</h2>
            </div>

            <div className="p-4 admin-caja-tabla">
                <div className="admin-ancho-tabla">
                    <div className="p-4">
                        {aviso && <div className={`alert alert-${aviso.tipo} text-center mx-auto`} role="alert" style={{ maxWidth: '700px' }}>{aviso.texto}</div>}
                        <form className="container p-4" style={{ backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '8px', maxWidth: '700px' }}>
                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="r-run" className="form-label">RUN</label>
                                    <input type="text" className="form-control" id="r-run" name="run" required value={form.run} onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label htmlFor="r-nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="r-nombre" name="nombre" maxLength="50" required value={form.nombre} onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label htmlFor="r-apellidos" className="form-label">Apellidos</label>
                                    <input type="text" className="form-control" id="r-apellidos" name="apellidos" maxLength="100" required value={form.apellidos} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="r-correo" className="form-label">Correo</label>
                                    <input type="email" className="form-control" id="r-correo" name="correo" required value={form.correo} onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label htmlFor="r-passw" className="form-label">Contraseña</label>
                                    <input type="text" className="form-control" id="r-passw" name="contra" minLength="4" maxLength="10" required value={form.contra} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="r-telf" className="form-label">Teléfono</label>
                                    <input type="tel" className="form-control" id="r-telf" name="telefono" required value={form.telefono} onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label htmlFor="r-fecha" className="form-label">Fecha de Nacimiento</label>
                                    <input type="date" className="form-control" id="r-fecha" name="fechaNacimiento" required value={form.fechaNacimiento} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="r-reg" className="form-label">Región</label>
                                    <input className="form-control" id="r-reg" name="region" required value={form.region} onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label htmlFor="r-comu" className="form-label">Comuna</label>
                                    <input className="form-control" id="r-comu" name="comuna" required value={form.comuna} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="r-direccion" className="form-label">Dirección</label>
                                    <input type="text" className="form-control" id="r-direccion" name="direccion" maxLength="300" required value={form.direccion} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-2">
                                    <label htmlFor="r-id" className="form-label">ID</label>
                                    <input type="text" className="form-control" id="r-id" readOnly value={indice} />
                                </div>
                            </div>

                            <br />
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-dark col-6" onClick={guardarCambios}>Guardar Cambios</button>
                                </div>
                                <div className="col text-center">
                                    <button type="button" className="btn btn-dark col-6" onClick={borrarUsuario}>Borrar Usuario</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br />

                    <div className="row mb-3 pb-2 fuente-palabras admin-encabezado-tabla">
                        <div className="col-2">Run</div>
                        <div className="col-3">Nombre</div>
                        <div className="col-2">Correo</div>
                        <div className="col-3">Telefono</div>
                        <div className="col-2">direccion</div>
                    </div>

                    {usuarios.map((user, i) => (
                        <div key={i} className="row mb-2 pb-2" style={{ cursor: 'pointer' }} onClick={() => seleccionar(user, i)}>
                            <div className="col-2">{user.run}</div>
                            <div className="col-3">{user.nombre} {user.apellidos}</div>
                            <div className="col-2">{user.correo}</div>
                            <div className="col-3">{user.telefono}</div>
                            <div className="col-2">{user.direccion}</div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default MostrarUsuarios;