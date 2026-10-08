import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextoCarrito } from '../contexto/ContextoCarrito';

const Navbar = () => {
    const { cantidadTotal } = useContext(ContextoCarrito);

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
                            <Link className="nav-link fuente-palabras text-white" to="/blog">Blogs</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link fuente-palabras text-white" to="/contacto">Contacto</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center justify-content-center mt-3 mt-lg-0">
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