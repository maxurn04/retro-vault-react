import { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerCatalogo, obtenerCategorias, guardarCategorias } from '../../data/catalogoAdmin';

const MostrarCategorias = () => {
    const catalogo = obtenerCatalogo();
    const [categorias, setCategorias] = useState(() => obtenerCategorias());
    const [porBorrar, setPorBorrar] = useState(null);

    const confirmarBorrado = () => {
        const vacia = !catalogo.some((p) => p.categoria === porBorrar);
        if (vacia) {
            const lista = categorias.filter((c) => c !== porBorrar);
            guardarCategorias(lista);
            setCategorias(lista);
        }
        setPorBorrar(null);
    };

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">Gestión de Categorías</h2>
                <Link to="/admin/categorias/nueva" className="btn admin-btn-nuevo">+ Nueva Categoría</Link>
            </div>

            {categorias.length === 0 && (
                <p className="text-center text-muted">No hay categorías registradas.</p>
            )}

            {categorias.map((cat) => {
                const productos = catalogo.filter((p) => p.categoria === cat);

                return (
                    <div key={cat} className="p-4 mb-4 admin-caja-tabla">
                        <div className="d-flex justify-content-between align-items-center mb-3 pb-2" style={{ borderBottom: '2px solid #999999', color: '#333333' }}>
                            <h5 className="fuente-palabras mb-0">
                                {cat} <span className="badge bg-secondary ms-2">{productos.length}</span>
                            </h5>
                            <div className="d-flex gap-2">
                                <Link to={`/admin/categorias/editar/${encodeURIComponent(cat)}`} className="btn admin-btn-nuevo btn-sm">
                                    Editar
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    disabled={productos.length > 0}
                                    title={productos.length > 0 ? 'Solo se pueden borrar categorías sin productos' : 'Borrar categoría'}
                                    onClick={() => setPorBorrar(cat)}
                                >
                                    Borrar
                                </button>
                            </div>
                        </div>

                        <div className="admin-ancho-tabla">
                            <div className="row mb-2 pb-2 fuente-palabras admin-encabezado-tabla">
                                <div className="col-1">ID</div>
                                <div className="col-1">Stock</div>
                                <div className="col-2">Imagen</div>
                                <div className="col-4">Nombre</div>
                                <div className="col-4">Precio</div>
                            </div>

                            {productos.length === 0 && (
                                <p className="text-muted small mb-0">Sin productos en esta categoría.</p>
                            )}

                            {productos.map((producto) => (
                                <div key={producto.id} className="row align-items-center mb-2 pb-2" style={{ borderBottom: '1px solid #cccccc', color: '#333333' }}>
                                    <div className="col-1">{producto.id}</div>
                                    <div className="col-1">{producto.stock}</div>
                                    <div className="col-2">
                                        <img src={producto.img} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                                    </div>
                                    <div className="col-4">{producto.nombre}</div>
                                    <div className="col-4">CLP${producto.precio}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {porBorrar !== null && (
                <>
                    <div className="modal d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Borrar categoría</h5>
                                </div>
                                <div className="modal-body">
                                    ¿Seguro que deseas borrar la categoría "{porBorrar}"? Esta acción no se puede deshacer.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setPorBorrar(null)}>Cancelar</button>
                                    <button type="button" className="btn btn-danger" onClick={confirmarBorrado}>Borrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </>
            )}
        </main>
    );
};

export default MostrarCategorias;