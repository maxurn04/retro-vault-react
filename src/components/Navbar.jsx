import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const cartCount = 0; 

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
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle menu-letras" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Menú
                            </a>
                            <ul className="dropdown-menu fondo-menu-desplegable">
                                <li><Link className="dropdown-item fuente-palabras" to="/">Home</Link></li>
                                <li><Link className="dropdown-item fuente-palabras" to="/productos">Productos</Link></li>
                                <li><Link className="dropdown-item fuente-palabras" to="/nosotros">Nosotros</Link></li>
                                <li><Link className="dropdown-item fuente-palabras" to="/blog">Blogs</Link></li>
                                <li><Link className="dropdown-item fuente-palabras" to="/contacto">Contacto</Link></li>
                            </ul>
                        </li>
                    </ul>

                    <div className="align-items-center">
                        <Link to="/carrito" className="btn">
                            <img src="/img/carrito.svg" alt="Icono Carro" className="img-fluid carrito-estilo" />
                            <span className="fuente-palabras" style={{color: 'white'}}>CARRO</span>
                            <span id="contador-carrito" className="ms-2 fuente-palabras" style={{color: 'white'}}>{cartCount}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;