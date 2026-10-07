import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const user = null; 

    return (
        <main>
            <article className="container mt-4">
                <div className="row align-items-center">
                    <div className="col-12 col-md-8">
                        <h1 className="fuente-palabras text-white">
                            Bienvenido a <span style={{ color: '#bca624' }}>el siguiente nivel.</span>
                        </h1>
                        <p className="fuente-palabras p-1 texto-descripcion-inicio">
                            Tu bóveda de nostalgia gamer. Descubre consolas de antaño y vuelve a jugar los títulos que marcaron tu infancia.
                        </p>
                    </div>
                    
                    <div className="col-12 col-md-4 text-md-end text-center mt-3 mt-md-0">
                        {!user ? (
                            <div className="movimiento-inicio-sesion" id="menu-invitado" style={{paddingTop: '0'}}>
                                <Link className="fuente-palabras text-decoration-none" style={{ color: '#fff' }} to="/inicio">Iniciar Sesión</Link> <span style={{ color: '#fff' }}>|</span> 
                                <Link className="fuente-palabras text-decoration-none" style={{ color: '#fff' }} to="/registro"> Registrar Usuario</Link>
                            </div>
                        ) : (
                            <div id="menu-usuario" className="movimiento-inicio-sesion" style={{paddingTop: '0'}}>
                                <span className="text-white fuente-palabras">
                                    <p className="texto-bienvenida mb-0">Bienvenido <strong className="fuente-palabras">{user.nombre}</strong>!</p>
                                </span>
                                <a href="#" className="fuente-palabras text-decoration-none" style={{ color: '#fff' }}> Cerrar Sesión</a>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="mt-3">
                    <hr className="linea-separacion" />
                </div>
            </article>

            <article>
                <div className="container caja-gris">
                    <div className="row">
                        <h2 className="fuente-palabras text-center titulo-destacados">Objetos Destacados</h2>
                        <div className="col-12 col-md-8 col-lg-6 mx-auto">
                            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active" data-bs-interval="3000">
                                        <Link to="/detalleprod/2"><img src="/img/zelda64.webp" className="d-block w-100 imagen-productos-grande" alt="Zelda 64" /></Link>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="3000">
                                    <Link to="/detalleprod/1"><img src="/img/ps2.jpg" className="d-block w-100 imagen-productos-grande" alt="PS2" /></Link>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="3000">
                                    <Link to="/detalleprod/4"><img src="/img/ps3.jpg" className="d-block w-100 imagen-productos-grande" alt="PS3" /></Link>
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
            
            <section className="container ">
                <div className="row">
                    <h2 className="fuente-palabras">Consolas <Link className="fuente-palabras enlace-ver-mas" to="/productos-cons-jueg"> Ver mas...</Link></h2>
                    
                    <div className="col-12 col-sm-6 col-lg-3 mb-4">
                        <div className="caja-peque">
                            <div>
                                <Link to="/detalleprod/1"><img src="/img/ps2.jpg" alt="ps2" className="img-fluid imagen-productos" /></Link>
                                <p className="fuente-palabras titulo-producto-tarjeta">PLAYSTATION 2</p>
                            </div>
                            <div className="container mt-3">  
                                <div className="row">
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque fuente-palabras-slim" style={{ color: "#7d916b" }}>BAR000001</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque-der fuente-palabras-slim">CLP$60000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="col-12 col-sm-6 col-lg-3 mb-4">
                        <div className="caja-peque">
                            <div>
                                <Link to="/detalleprod/4"><img src="/img/ps3.jpg" alt="ps3" className="img-fluid imagen-productos" /></Link>
                                <p className="fuente-palabras titulo-producto-tarjeta">PLAYSTATION 3</p>
                            </div>
                            <div className="container mt-3">  
                                <div className="row">
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque fuente-palabras-slim" style={{ color: "#7d916b" }}>BAR000004</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque-der fuente-palabras-slim">CLP$85000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="col-12 col-sm-6 col-lg-3 mb-4">
                        <div className="caja-peque">
                            <div>
                                <Link to="/detalleprod/5"><img src="/img/zeebo.jpeg" alt="zeebo" className="img-fluid imagen-productos" /></Link>
                                <p className="fuente-palabras titulo-producto-tarjeta">ZEEBO</p>
                            </div>
                            <div className="container mt-3">  
                                <div className="row">
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque fuente-palabras-slim" style={{ color: "#7d916b" }}>BAR000005</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque-der fuente-palabras-slim">CLP$35000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="col-12 col-sm-6 col-lg-3 mb-4">
                        <div className="caja-peque">
                            <div>
                                <Link to="/detalleprod/6"><img src="/img/gamecub.jpg" alt="gamecube" className="img-fluid imagen-productos" /></Link>
                                <p className="fuente-palabras titulo-producto-tarjeta">GAMECUBE</p>
                            </div>
                            <div className="container mt-3">  
                                <div className="row">
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque fuente-palabras-slim" style={{ color: "#7d916b" }}>BAR000006</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque-der fuente-palabras-slim">CLP$40000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
             <div className="container pt-3">
                <hr className="linea-separacion linea-separacion-dorada" />
            </div>

             <section className="container mt-5">
                <div className="row">
                    <h2 className="fuente-palabras">Accesorios destacados  <Link className="fuente-palabras enlace-ver-mas" to="/productos-accesorios"> Ver mas...</Link></h2>
                     <div className="col-12 col-sm-6 col-lg-3 mb-4">
                        <div className="caja-peque">
                            <div>
                                <Link to="/detalleprod/8"><img src="/img/dualshock2.avif" alt="ds2" className="img-fluid imagen-productos" /></Link>
                                <p className="fuente-palabras titulo-producto-tarjeta">Mando DualShock 2</p>
                            </div>
                            <div className="container mt-3">  
                                <div className="row">
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque fuente-palabras-slim" style={{ color: "#7d916b" }}>BAR000008</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque-der fuente-palabras-slim">CLP$15000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                      <div className="col-12 col-sm-6 col-lg-3 mb-4">
                        <div className="caja-peque">
                            <div>
                                <Link to="/detalleprod/10"><img src="/img/lucesledrgb.webp" alt="lucesrgb" className="img-fluid imagen-productos" /></Link>
                                <p className="fuente-palabras titulo-producto-tarjeta">Tira de Luces RGB 5m</p>
                            </div>
                            <div className="container mt-3">  
                                <div className="row">
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque fuente-palabras-slim" style={{ color: "#7d916b" }}>BAR000010</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque-der fuente-palabras-slim">CLP$12000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                       <div className="col-12 col-sm-6 col-lg-3 mb-4">
                        <div className="caja-peque">
                            <div>
                                <Link to="/detalleprod/12"><img src="/img/MEMORYCARD.jpg" alt="bolso ejemplo" className="img-fluid imagen-productos" /></Link>
                                <p className="fuente-palabras titulo-producto-tarjeta">Memory Card PS2 8MB</p>
                            </div>
                            <div className="container mt-3">  
                                <div className="row">
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque fuente-palabras-slim" style={{ color: "#7d916b" }}>BAR000012</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="ajuste-letras-bloque-der fuente-palabras-slim">CLP$8000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </section>
        </main>
    );
};

export default Home;