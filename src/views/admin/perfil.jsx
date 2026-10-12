import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoUsuario } from '../../contexto/ContextoUsuario';
import { obtenerCatalogo, obtenerCategorias } from '../../data/catalogoAdmin';

const Perfil = () => {
    const { usuarioActivo, cerrarSesion } = useContext(ContextoUsuario);
    const navigate = useNavigate();

    const salir = () => {
        cerrarSesion();
        navigate('/');
    };

    const resumen = [
        { titulo: 'Productos', valor: obtenerCatalogo().length, icono: 'bi-box-seam' },
        { titulo: 'Categorías', valor: obtenerCategorias().length, icono: 'bi-tags' },
        { titulo: 'Usuarios', valor: (JSON.parse(localStorage.getItem('lista_usuarios')) || []).length, icono: 'bi-people' },
        { titulo: 'Boletas', valor: (JSON.parse(localStorage.getItem('boletas')) || []).length, icono: 'bi-receipt' }
    ];

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">Perfil</h2>
            </div>

            <div className="p-4 mx-auto admin-caja-formulario" style={{ maxWidth: '700px' }}>
                <div className="text-center mb-4">
                    <i className="bi bi-person-circle" style={{ fontSize: '5rem', color: '#555555' }}></i>
                    <h4 className="fuente-palabras mt-2 mb-0">{usuarioActivo ? usuarioActivo.nombre : 'Sin sesión activa'}</h4>
                    <span className="badge bg-dark mt-2">{usuarioActivo ? usuarioActivo.tipo : '—'}</span>
                </div>

                <div className="mb-3">
                    <label className="form-label text-uppercase admin-etiqueta-form">Nombre</label>
                    <input type="text" className="form-control rounded-0 border-dark" readOnly value={usuarioActivo ? usuarioActivo.nombre : ''} />
                </div>

                <div className="mb-3">
                    <label className="form-label text-uppercase admin-etiqueta-form">Correo</label>
                    <input type="text" className="form-control rounded-0 border-dark" readOnly value={usuarioActivo ? usuarioActivo.correo : ''} />
                </div>

                <div className="mb-4">
                    <label className="form-label text-uppercase admin-etiqueta-form">Rol</label>
                    <input type="text" className="form-control rounded-0 border-dark" readOnly value={usuarioActivo ? usuarioActivo.tipo : ''} />
                </div>

                <h6 className="fuente-palabras text-uppercase border-bottom border-dark pb-2">Resumen de administración</h6>
                <div className="row g-3 mb-4">
                    {resumen.map((r) => (
                        <div key={r.titulo} className="col-6 col-md-3">
                            <div className="card text-center h-100">
                                <div className="card-body py-3">
                                    <i className={`bi ${r.icono} fs-4 text-primary`}></i>
                                    <div className="fs-4 fw-bold">{r.valor}</div>
                                    <div className="small text-muted">{r.titulo}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button type="button" className="btn btn-danger px-5" onClick={salir}>
                        <i className="bi bi-box-arrow-left me-2"></i>Cerrar Sesión
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Perfil;