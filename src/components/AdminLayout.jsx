import { Link, NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const clase = ({ isActive }) => `nav-link admin-enlace-nav${isActive ? ' fw-bold' : ''}`;

    return (
        <div className="container-fluid p-0 admin-cuerpo">
            <div className="row g-0">
                <aside className="col-12 col-md-3 col-xl-2 p-3 admin-lateral">
                    <h4 className="admin-contenedor-logo text-center">
                        <img src="/img/logoRV-NF.png" alt="Logo RV" className="img-fluid admin-img-logo" />
                    </h4>
                    <ul className="nav flex-row flex-md-column admin-lista-nav">
                        <li className="nav-item"><NavLink end to="/admin" className={clase}>Resumen</NavLink></li>
                        <li className="nav-item"><NavLink to="/admin/mostrarproductos" className={clase}>Productos</NavLink></li>
                        <li className="nav-item"><NavLink to="/admin/crearusuario" className={clase}>Nuevo usuario</NavLink></li>
                        <li className="nav-item"><NavLink to="/admin/mostrarusuario" className={clase}>Mostrar usuarios</NavLink></li>
                        <li className="nav-item"><Link to="/" className="nav-link admin-enlace-nav">Volver a la tienda</Link></li>
                    </ul>
                </aside>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;