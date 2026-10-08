import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductoCarta from '../components/ProductoCarta';
import { productosData } from '../data/productos';
import { ContextoUsuario } from '../contexto/ContextoUsuario';

const Home = () => {
    const { usuarioActivo, cerrarSesion } = useContext(ContextoUsuario);
    const consolasDestacadas = productosData.filter(prod => [1, 4, 5, 6].includes(prod.id));
    const accesoriosDestacados = productosData.filter(prod => [8, 10, 12].includes(prod.id));

    return (
        <main>
            <article>
                <div className="container p-1 mt-4">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-8 mb-3 mb-md-0 text-center text-md-start">
                            <img src="/img/RV.gif" alt="Retro Vault" className="img-fluid" />
                        </div>
                        
                        <div className="col-12 col-md-4 text-center text-md-end">
                            {!usuarioActivo ? (
                                <div id="menu-invitado">
                                    <Link className="fuente-palabras text-decoration-none text-white" to="/inicio">Iniciar Sesión</Link> 
                                    <span className="text-white mx-2">|</span> 
                                    <Link className="fuente-palabras text-decoration-none text-white" to="/registro">Registrar Usuario</Link>
                                </div>
                            ):(
                                <div id="menu-usuario" className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end align-items-center">
                                    <p className="text-white fuente-palabras mb-2 mb-md-0 me-md-3 texto-bienvenida">
                                        Bienvenido <strong>{usuarioActivo.nombre}</strong>!
                                    </p>
                                    <button onClick={cerrarSesion} className="btn btn-link text-decoration-none fuente-palabras p-0" style={{ color: '#bca624' }}>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="fuente-palabras p-1 texto-descripcion-inicio text-white mt-3 text-center text-md-start"> 
                        Tu bóveda de nostalgia gamer. Descubre consolas de antaño y vuelve a jugar los títulos que marcaron tu infancia.
                    </p>
                </div>

                <div className="container pb-2">
                    <hr className="linea-separacion" />
                </div>
            </article>

            <article>
                <div className="container caja-gris p-3">
                    <div className="row">
                        <h2 className="fuente-palabras text-center titulo-destacados text-white">Objetos Destacados</h2>
                        <div className="col-12 col-md-8 col-lg-6 mx-auto">
                            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active" data-bs-interval="3000">
                                        <Link to="/detalleprod/2">
                                            <img src="/img/zelda64.webp" className="d-block w-100 img-fluid imagen-productos-grande" alt="Zelda 64" />
                                        </Link>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="3000">
                                        <Link to="/detalleprod/1">
                                            <img src="/img/ps2.jpg" className="d-block w-100 img-fluid imagen-productos-grande" alt="PS2" />
                                        </Link>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="3000">
                                        <Link to="/detalleprod/4">
                                            <img src="/img/ps3.jpg" className="d-block w-100 img-fluid imagen-productos-grande" alt="PS3" />
                                        </Link>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <div className="container pt-3">
                <hr className="linea-separacion" />
            </div>
            
            <div className="container mt-5">
                <div className="row">
                    <h2 className="fuente-palabras text-white">
                        Consolas <Link className="fuente-palabras enlace-ver-mas" to="/productos-cons-jueg"> Ver mas...</Link>
                    </h2>
                    {consolasDestacadas.map((prod) => (
                        <ProductoCarta 
                            key={prod.id}
                            id={prod.id}
                            nombre={prod.nombre}
                            precio={prod.precio}
                            img={prod.img}
                        />
                    ))}
                </div>
                
                <div className="container pt-3">
                    <hr className="linea-separacion linea-separacion-dorada" />
                </div>
                
                <div className="row">
                    <h2 className="fuente-palabras text-white">
                        Accesorios destacados <Link className="fuente-palabras enlace-ver-mas" to="/productos-accesorios"> Ver mas...</Link>
                    </h2>
                    {accesoriosDestacados.map((prod) => (
                        <ProductoCarta 
                            key={prod.id}
                            id={prod.id}
                            nombre={prod.nombre}
                            precio={prod.precio}
                            img={prod.img}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Home;