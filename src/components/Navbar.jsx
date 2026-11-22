import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ContextoCarrito } from '../contexto/ContextoCarrito';
import { ContextoUsuario } from '../contexto/ContextoUsuario';

const Navbar = () => {
    const { cantidadTotal } = useContext(ContextoCarrito);
    const { usuarioActivo, cerrarSesion } = useContext(ContextoUsuario);
    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate('/');
    };

    const esAdminOVendedor = usuarioActivo?.rol === 'Administrador' || usuarioActivo?.rol === 'Vendedor' || usuarioActivo?.tipo === 'Administrador' || usuarioActivo?.tipo === 'Vendedor';

    return (
        <nav className="navbar navbar-expand-lg navbar-estilo">
            <div className="container-fluid">
                <Link className="navbar-brand fuente-palabras" to="/">
                    <img src="/img/logoRV.jpg" alt="imgEmpresa" className="img-fluid logo-nav" />
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item me-3">
                            <Link className="nav-link fuente-palabras text-white" to="/">Home</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link fuente-palabras text-white" to="/categorias">Categorías</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link fuente-palabras text-white" to="/ofertas">Ofertas</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link fuente-palabras text-white" to="/nosotros">Nosotros</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link fuente-palabras text-white" to="/blogs">Blogs</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link fuente-palabras text-white" to="/contacto">Contacto</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center justify-content-center gap-3 mt-3 mt-lg-0">
                        {usuarioActivo ? (
                            <div className="d-flex align-items-center gap-2">
                                {esAdminOVendedor && (
                                    <Link to="/admin" className="btn btn-warning btn-sm fw-bold">
                                        <i className="bi bi-speedometer2 me-1"></i>Panel Admin
                                    </Link>
                                )}
                                <span className="text-white small d-none d-md-inline">
                                    <i className="bi bi-person-circle me-1"></i>
                                    {usuarioActivo.nombre}
                                </span>
                                <button 
                                    type="button" 
                                    onClick={handleCerrarSesion} 
                                    className="btn btn-outline-light btn-sm"
                                    title="Cerrar sesión"
                                >
                                    <i className="bi bi-box-arrow-right"></i>
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap-2">
                                <Link to="/inicio" className="btn btn-outline-light btn-sm fuente-palabras">
                                    Ingresar
                                </Link>
                                <Link to="/registro" className="btn btn-success btn-sm fuente-palabras">
                                    Registro
                                </Link>
                            </div>
                        )}

                        <Link to="/carrito" className="btn d-flex align-items-center">
                            <img src="/img/carrito.svg" alt="Icono Carro" className="img-fluid carrito-estilo me-2" />
                            <span className="fuente-palabras" style={{color: 'white'}}>CARRO</span>
                            <span id="contador-carrito" className="ms-2 fuente-palabras" style={{color: 'white'}}>{cantidadTotal}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
