import { Link } from 'react-router-dom';
import { obtenerCatalogo } from '../../data/catalogoAdmin';

const accesos = [
    { titulo: 'Dashboard', texto: 'Visión general de todas las métricas y estadísticas clave del sistema.', icono: 'bi-speedometer2', ruta: '/admin' },
    { titulo: 'Boletas', texto: 'Gestión y seguimiento de todas las boletas de compra realizadas.', icono: 'bi-cart-check', ruta: '/admin/boletas' },
    { titulo: 'Productos', texto: 'Administrar inventario y detalles de los productos disponibles.', icono: 'bi-box-seam', ruta: '/admin/mostrarproductos' },
    { titulo: 'Categorías', texto: 'Organizar productos en categorías para facilitar su navegación.', icono: 'bi-tags', ruta: '/admin/categorias' },
    { titulo: 'Usuarios', texto: 'Gestión de cuentas de usuario y sus roles dentro del sistema.', icono: 'bi-people', ruta: '/admin/mostrarusuario' },
    { titulo: 'Reportes', texto: 'Generación de informes detallados sobre las operaciones del sistema.', icono: 'bi-bar-chart', ruta: '/admin/reportes' },
    { titulo: 'Perfil', texto: 'Administración de la información personal y configuraciones de cuenta.', icono: 'bi-person', ruta: '/admin/perfil' },
    { titulo: 'Tienda', texto: 'Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.', icono: 'bi-shop', ruta: '/' }
];

const InicioAdmin = () => {
    const catalogo = obtenerCatalogo();
    const totalProductos = catalogo.length;
    const inventarioTotal = catalogo.reduce((suma, p) => suma + (Number(p.stock) || 0), 0);

    const resumen = [
        { titulo: 'Compras', valor: '1,234', pie: 'Probabilidad de aumento:', dato: '20%', clase: 'bg-primary', icono: 'bi-cart4' },
        { titulo: 'Productos', valor: totalProductos, pie: 'Inventario actual:', dato: inventarioTotal, clase: 'bg-success', icono: 'bi-box-seam' },
        { titulo: 'Usuarios', valor: '890', pie: 'Nuevos usuarios este mes:', dato: '120', clase: 'bg-warning', icono: 'bi-people-fill' }
    ];

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 bg-light" style={{ minHeight: '100vh' }}>
            <h1 className="fs-4 fw-semibold mb-0">Dashboard</h1>
            <p className="small text-muted mb-4">Resumen de las actividades diarias</p>

            <div className="row g-4 mb-4 justify-content-center">
                {resumen.map((r) => (
                    <div key={r.titulo} className="col-12 col-md-4 col-xl-3">
                        <div className={`card border-0 text-white h-100 ${r.clase}`}>
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-3">
                                    <i className={`bi ${r.icono} display-5`}></i>
                                    <div>
                                        <div className="fw-semibold">{r.titulo}</div>
                                        <div className="fs-3 fw-bold">{r.valor}</div>
                                    </div>
                                </div>
                                <div className="text-center small mt-2">{r.pie} <strong>{r.dato}</strong></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-3">
                {accesos.map((a) => (
                    <div key={a.titulo} className="col-12 col-sm-6 col-xl-3">
                        <Link to={a.ruta} className="text-decoration-none text-dark">
                            <div className="card h-100 text-center shadow-sm">
                                <div className="card-body">
                                    <i className={`bi ${a.icono} fs-2 text-primary`}></i>
                                    <h6 className="fw-bold mt-2">{a.titulo}</h6>
                                    <p className="small text-muted mb-0">{a.texto}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default InicioAdmin;
