import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminService from '../../services/AdminService';

const MostrarCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [porBorrar, setPorBorrar] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [listaCategorias, listaProductos] = await Promise.all([
                    AdminService.listarCategorias(),
                    AdminService.listarProductos()
                ]);
                setCategorias(listaCategorias);
                setProductos(listaProductos);
            } catch (e) {
                console.error('Error al cargar las categorías:', e);
                setError('No se pudieron cargar las categorías.');
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);

    const buscar = async (e) => {
        e.preventDefault();
        const nombre = busqueda.trim();
        if (nombre === '') {
            setResultado(null);
            setError('');
            return;
        }
        try {
            const categoria = await AdminService.buscarCategoriaPorNombre(nombre);
            setResultado([categoria]);
            setError('');
        } catch (e) {
            if (e.response?.status === 404) {
                setResultado([]);
                setError('');
            } else {
                setError('No se pudo realizar la búsqueda.');
            }
        }
    };

    const limpiarBusqueda = () => {
        setBusqueda('');
        setResultado(null);
        setError('');
    };

    const confirmarBorrado = async () => {
        const categoria = porBorrar;
        setPorBorrar(null);
        try {
            await AdminService.eliminarCategoria(categoria.id);
            setCategorias((lista) => lista.filter((c) => c.id !== categoria.id));
            setResultado((lista) => (lista === null ? null : lista.filter((c) => c.id !== categoria.id)));
            setError('');
        } catch (e) {
            setError(e.response?.data?.error || 'No se pudo borrar la categoría.');
        }
    };

    if (cargando) {
        return <div className="col p-4">Cargando categorías...</div>;
    }

    const visibles = resultado === null ? categorias : resultado;

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">Gestión de Categorías</h2>
                <Link to="/admin/categorias/nueva" className="btn admin-btn-nuevo">+ Nueva Categoría</Link>
            </div>

            <form className="d-flex gap-2 mb-4" onSubmit={buscar}>
                <input
                    type="text"
                    className="form-control rounded-0 border-dark"
                    placeholder="Buscar categoría por nombre"
                    aria-label="Buscar categoría por nombre"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button type="submit" className="btn admin-btn-nuevo">Buscar</button>
                {resultado !== null && (
                    <button type="button" className="btn btn-secondary" onClick={limpiarBusqueda}>Limpiar</button>
                )}
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {visibles.length === 0 && !error && (
                <p className="text-center text-muted">
                    {resultado !== null ? 'No se encontró ninguna categoría con ese nombre.' : 'No hay categorías registradas.'}
                </p>
            )}

            {visibles.map((cat) => {
                const productosCategoria = productos.filter((p) => p.categoria?.id === cat.id);

                return (
                    <div key={cat.id} className="p-4 mb-4 admin-caja-tabla">
                        <div className="d-flex justify-content-between align-items-center mb-3 pb-2" style={{ borderBottom: '2px solid #999999', color: '#333333' }}>
                            <h5 className="fuente-palabras mb-0">
                                {cat.nombre} <span className="badge bg-secondary ms-2">{productosCategoria.length}</span>
                            </h5>
                            <div className="d-flex gap-2">
                                <Link to={`/admin/categorias/editar/${encodeURIComponent(cat.nombre)}`} className="btn admin-btn-nuevo btn-sm">
                                    Editar
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    disabled={productosCategoria.length > 0}
                                    title={productosCategoria.length > 0 ? 'Solo se pueden borrar categorías sin productos' : 'Borrar categoría'}
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

                            {productosCategoria.length === 0 && (
                                <p className="text-muted small mb-0">Sin productos en esta categoría.</p>
                            )}

                            {productosCategoria.map((producto) => (
                                <div key={producto.id} className="row align-items-center mb-2 pb-2" style={{ borderBottom: '1px solid #cccccc', color: '#333333' }}>
                                    <div className="col-1">{producto.id}</div>
                                    <div className="col-1">{producto.stock}</div>
                                    <div className="col-2">
                                        <img src={producto.imagenUrl} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
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
                                    ¿Seguro que deseas borrar la categoría "{porBorrar.nombre}"? Esta acción no se puede deshacer.
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
