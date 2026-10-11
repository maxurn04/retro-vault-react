import { useContext } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ContextoUsuario } from '../contexto/ContextoUsuario';

const AdminLayout = () => {
    const { cerrarSesion } = useContext(ContextoUsuario);
    const navigate = useNavigate();

    const clase = ({ isActive }) =>
        `nav-link d-flex align-items-center gap-2 small fw-semibold${isActive ? ' active' : ' text-dark'}`;

    const salir = () => {
        cerrarSesion();
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh' }}>


            <div className="container-fluid p-0">
                <div className="row g-0">
                    <aside className="col-12 col-md-3 col-xl-2 p-3 bg-white border-end">
                        <ul className="nav nav-pills flex-column gap-1">
                            <li className="nav-item">
                                <NavLink end to="/admin" className={clase}><i className="bi bi-house-door-fill"></i>Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/ordenes" className={clase}><i className="bi bi-file-earmark"></i>Boletas</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/mostrarproductos" className={clase}><i className="bi bi-cart"></i>Productos</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/categorias" className={clase}><i className="bi bi-list-ul"></i>Categorías</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/mostrarusuario" className={clase}><i className="bi bi-people"></i>Usuarios</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/reportes" className={clase}><i className="bi bi-graph-up"></i>Reportes</NavLink>
                            </li>
                        </ul>

                        <hr />

                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <NavLink to="/admin/perfil" className={clase}><i className="bi bi-person-circle"></i>Perfil</NavLink>
                            </li>
                        </ul>

                        <hr />

                        <Link to="/" className="btn btn-dark w-100 text-start mb-2">
                            <i className="bi bi-shop me-2"></i>Tienda
                        </Link>
                        <button type="button" className="btn btn-danger w-100 text-start" onClick={salir}>
                            <i className="bi bi-box-arrow-left me-2"></i>Cerrar Sesión
                        </button>
                    </aside>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;