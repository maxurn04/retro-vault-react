import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductoCarta from '../components/ProductoCarta';
import { ContextoUsuario } from '../contexto/ContextoUsuario';
import CatalogoService from '../services/CatalogoService';

const Home = () => {
    const { usuarioActivo, cerrarSesion } = useContext(ContextoUsuario);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        CatalogoService.obtenerProductos()
            .then(data => {
                setProductos(data || []);
            })
            .catch(() => {
                setProductos([]);
            });
    }, []);

    const consolasDestacadas = productos.filter(p => [1, 4, 5, 6].includes(p.id) || (p.categoria?.nombre || p.categoria) === 'Consolas');
    const accesoriosDestacados = productos.filter(p => [8, 10, 12].includes(p.id) || (p.categoria?.nombre || p.categoria) === 'Accesorios');

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
                    <h2 className="fuente-palabras text-center">Objetos Destacados</h2>
                    <div className="text-center mt-3">
                        <Link to="/detalleprod/2">
                            <img src="/img/zelda64.webp" alt="Zelda 64" className="img-fluid imagen-productos-grande" />
                        </Link>
                    </div>
                </div>
                
                <div className="container pb-2 mt-4">
                    <hr className="linea-separacion" />
                </div>
            </article>

            <article>
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fuente-palabras m-0">Consolas <span style={{ color: '#bca624', fontSize: '1.2rem' }}>Ver mas...</span></h2>
                        <Link to="/productos-cons-jueg" className="btn boton-reini">
                            Explorar Todas
                        </Link>
                    </div>
                    
                    <div className="row g-4 mb-5">
                        {consolasDestacadas.map((prod) => (
                            <ProductoCarta 
                                key={prod.id}
                                id={prod.id}
                                nombre={prod.nombre}
                                precio={prod.precio}
                                img={prod.img || prod.imagenUrl}
                            />
                        ))}
                    </div>
                </div>

                <div className="container pb-2">
                    <hr className="linea-separacion" />
                </div>
            </article>

            <article>
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fuente-palabras m-0">Accesorios <span style={{ color: '#bca624', fontSize: '1.2rem' }}>Ver mas...</span></h2>
                        <Link to="/productos-accesorios" className="btn boton-reini">
                            Explorar Todos
                        </Link>
                    </div>
                    
                    <div className="row g-4 mb-5">
                        {accesoriosDestacados.map((prod) => (
                            <ProductoCarta 
                                key={prod.id}
                                id={prod.id}
                                nombre={prod.nombre}
                                precio={prod.precio}
                                img={prod.img || prod.imagenUrl}
                            />
                        ))}
                    </div>
                </div>
            </article>
        </main>
    );
};

export default Home;
