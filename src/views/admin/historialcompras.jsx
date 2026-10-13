import { Link, useParams } from 'react-router-dom';

const HistorialCompras = () => {
    const { indice } = useParams();
    const usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
    const usuario = usuarios[indice];

    if (!usuario) {
        return (
            <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
                <div className="alert alert-danger text-center" role="alert">
                    Usuario no encontrado. <Link to="/admin/mostrarusuario" className="alert-link">Volver a Usuarios</Link>
                </div>
            </main>
        );
    }

    const boletas = (JSON.parse(localStorage.getItem('boletas')) || []).filter(
        (b) => b.cliente?.correo?.toLowerCase() === usuario.correo.toLowerCase()
    );
    const totalGastado = boletas.reduce((suma, b) => suma + Number(b.total), 0);

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">
                    Historial de Compras: {usuario.nombre} {usuario.apellidos}
                </h2>
                <Link to="/admin/mostrarusuario" className="btn admin-btn-nuevo">Volver a Usuarios</Link>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                    <div className="card border-0 text-white bg-primary h-100">
                        <div className="card-body">
                            <div className="small">Compras realizadas</div>
                            <div className="fs-4 fw-bold">{boletas.length}</div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card border-0 text-white bg-success h-100">
                        <div className="card-body">
                            <div className="small">Total gastado</div>
                            <div className="fs-4 fw-bold">CLP${totalGastado}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 admin-caja-tabla">
                <div className="admin-ancho-tabla">
                    <div className="row mb-3 pb-2 fuente-palabras admin-encabezado-tabla">
                        <div className="col-2">N°</div>
                        <div className="col-3">Fecha</div>
                        <div className="col-3">Método</div>
                        <div className="col-2">Total</div>
                        <div className="col-2 text-center">Acciones</div>
                    </div>

                    {boletas.length === 0 && (
                        <p className="text-center text-muted my-3">Este usuario aún no tiene compras.</p>
                    )}

                    {boletas.map((b) => (
                        <div key={b.numero} className="row align-items-center mb-2 pb-2" style={{ borderBottom: '1px solid #cccccc', color: '#333333' }}>
                            <div className="col-2">{b.numero}</div>
                            <div className="col-3">{b.fecha}</div>
                            <div className="col-3">{b.metodoPago}</div>
                            <div className="col-2">CLP${b.total}</div>
                            <div className="col-2 text-center">
                                <Link to={`/admin/boletas/${b.numero}`} className="btn admin-btn-nuevo btn-sm w-100" style={{ padding: '4px 8px', fontSize: '0.85rem' }}>
                                    Ver boleta
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default HistorialCompras;