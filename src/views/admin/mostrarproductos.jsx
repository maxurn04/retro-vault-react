import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminService from '../../services/AdminService';

const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [porBorrar, setPorBorrar] = useState(null);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setProductos(await AdminService.listarProductos());
            } catch (e) {
                console.error('Error al cargar los productos:', e);
                setError('No se pudieron cargar los productos.');
            } finally {
                setCargando(false);
            }
        };

        cargarProductos();
    }, []);

    const confirmarBorrado = async () => {
        const producto = porBorrar;
        setPorBorrar(null);
        try {
            await AdminService.eliminarProducto(producto.id);
            setProductos((lista) => lista.filter((p) => p.id !== producto.id));
            setError('');
        } catch (e) {
            setError(e.response?.data?.error || 'No se pudo borrar el producto.');
        }
    };

    if (cargando) {
        return <div className="col p-4">Cargando productos...</div>;
    }

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">Gestión de Productos</h2>
                <div className="d-flex gap-2">
                    <Link to="/admin/productoscriticos" className="btn btn-danger fw-bold">Productos Críticos</Link>
                    <Link to="/admin/crearprod" className="btn admin-btn-nuevo">+ Nuevo Producto</Link>
                 </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="p-4 admin-caja-tabla">
                <div className="admin-ancho-tabla">
                    <div className="row mb-3 pb-2 fuente-palabras admin-encabezado-tabla">
                        <div className="col-1">ID</div>
                        <div className="col-1">Stock</div>
                        <div className="col-2">Imagen</div>
                        <div className="col-3">Nombre</div>
                        <div className="col-2">Precio</div>
                        <div className="col-3 text-center">Acciones</div>
                    </div>

                    {productos.map((producto) => (
                        <div key={producto.id} className="row align-items-center mb-2 pb-2" style={{ borderBottom: '1px solid #cccccc', color: '#333333' }}>
                            <div className="col-1">{producto.id}</div>
                            <div className="col-1">{producto.stock}</div>
                            <div className="col-2">
                                <img src={producto.imagenUrl} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                            </div>
                            <div className="col-3">{producto.nombre}</div>
                            <div className="col-2">CLP${producto.precio}</div>
                            <div className="col-3 d-flex gap-1">
                                <Link to={`/admin/editarprod/${producto.id}`} className="btn admin-btn-nuevo btn-sm w-50" style={{ padding: '4px 8px', fontSize: '0.85rem' }}>
                                    Editar
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm w-50"
                                    style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                                    onClick={() => setPorBorrar(producto)}
                                >
                                    Borrar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {porBorrar !== null && (
                <>
                    <div className="modal d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Borrar producto</h5>
                                </div>
                                <div className="modal-body">
                                    ¿Seguro que deseas borrar el producto "{porBorrar.nombre}"? Esta acción no se puede deshacer.
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

export default MostrarProductos;