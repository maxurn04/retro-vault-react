import React from 'react';
import { Link } from 'react-router-dom';

const Categorias = () => {
    return (
        <main>
            <div className="container mt-5 mb-5 pt-4">
                <h2 className="fuente-palabras text-white text-center mb-5">Nuestras Categorías</h2>
                <div className="row g-4">
                    <div className="col-12 col-md-6 text-center">
                        <div className="caja-gris p-4 h-100 d-flex flex-column justify-content-center align-items-center" style={{ borderRadius: '15px' }}>
                            <h3 className="fuente-palabras text-warning mb-4">Consolas y Juegos</h3>
                            <Link to="/productos-cons-jueg">
                                <img src="/img/ps2.jpg" alt="Consolas y Juegos" className="img-fluid imagen-productos-grande mb-4 rounded" style={{ objectFit: 'cover', height: '250px', width: '100%' }} />
                            </Link>
                            <Link to="/productos-cons-jueg" className="btn boton-reini w-75 py-2">Explorar Consolas</Link>
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-6 text-center">
                        <div className="caja-gris p-4 h-100 d-flex flex-column justify-content-center align-items-center" style={{ borderRadius: '15px' }}>
                            <h3 className="fuente-palabras text-warning mb-4">Accesorios Retro</h3>
                            <Link to="/productos-accesorios">
                                <img src="/img/dualshock2.avif" alt="Accesorios" className="img-fluid imagen-productos-grande mb-4 rounded" style={{ objectFit: 'cover', height: '250px', width: '100%' }} />
                            </Link>
                            <Link to="/productos-accesorios" className="btn boton-reini w-75 py-2">Explorar Accesorios</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Categorias;