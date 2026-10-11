import { Link } from 'react-router-dom';
import { obtenerCatalogo } from '../../data/catalogoAdmin';

const MostrarProductos = () => {
    const catalogo = obtenerCatalogo();

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">Gestión de Productos</h2>
                <Link to="/admin/crearprod" className="btn admin-btn-nuevo">+ Nuevo Producto</Link>
            </div>

            <div className="p-4 admin-caja-tabla">
                <div className="admin-ancho-tabla">
                    <div className="row mb-3 pb-2 fuente-palabras admin-encabezado-tabla">
                        <div className="col-1">ID</div>
                        <div className="col-1">Stock</div>
                        <div className="col-2">Imagen</div>
                        <div className="col-3">Nombre</div>
                        <div className="col-3">Precio</div>
                        <div className="col-2 text-center">Acciones</div>
                    </div>

                    {catalogo.map((producto) => (
                        <div key={producto.id} className="row align-items-center mb-2 pb-2" style={{ borderBottom: '1px solid #cccccc', color: '#333333' }}>
                            <div className="col-1">{producto.id}</div>
                            <div className="col-1">{producto.stock}</div>
                            <div className="col-2">
                                <img src={producto.img} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                            </div>
                            <div className="col-3">{producto.nombre}</div>
                            <div className="col-3">CLP${producto.precio}</div>
                            <div className="col-2 text-center">
                                <Link to={`/admin/editarprod/${producto.id}`} className="btn admin-btn-nuevo btn-sm w-100" style={{ padding: '4px 8px', fontSize: '0.85rem' }}>
                                    Editar
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default MostrarProductos;