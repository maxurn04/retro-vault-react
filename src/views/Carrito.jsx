import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextoCarrito } from '../contexto/ContextoCarrito';

const Carrito = () => {
    const { carrito, cambiarCantidad, eliminarDelCarrito, totalVenta } = useContext(ContextoCarrito);
    const navigate = useNavigate();

    return (
        <main>
            <div className="container mt-5 mb-5 pt-5">
                <h2 className="fuente-palabras click-efecto mb-4 text-white">Tu Carrito de Compras</h2>

                <div className="row">
                    <div className="col-12 col-lg-8 mb-4">
                        <div className="caja-gris" style={{ padding: '20px', overflowX: 'auto' }}>
                            <div className="fuente-palabras">
                                {carrito.length === 0 ? (
                                    <div className="text-center text-white py-5 fuente-palabras-slim">
                                        Tu carrito está vacio.
                                    </div>
                                ) : (
                                    carrito.map(producto => (
                                        <div key={producto.id} className="row align-items-center text-white mb-3 pb-3" style={{ borderBottom: '1px solid #bca624' }}>
                                            <div className="col-3 col-md-2 text-center">
                                                <img src={producto.img} alt={producto.nombre} className="imagen-productos img-fluid" style={{ borderRadius: '8px' }} />
                                            </div>
                                            <div className="col-7 col-md-3">
                                                <div className="fuente-palabras text-truncate">{producto.nombre}</div>
                                                <div className="fuente-palabras-slim">CLP${producto.precio}</div>
                                            </div>
                                            <div className="col-2 col-md-1 text-end order-md-last">
                                                <button onClick={() => eliminarDelCarrito(producto.id)} className="btn btn-sm fw-bold fuente-palabras" style={{ backgroundColor: '#dc3545', color: 'white' }}>X</button>
                                            </div>
                                            <div className="col-6 col-md-3 text-center mt-3 mt-md-0">
                                                <button onClick={() => cambiarCantidad(producto.id, -1)} className="btn btn-sm fuente-palabras fw-bold" style={{ fontSize: '20px', backgroundColor: '#bca624', color: 'white' }}>-</button>
                                                <span className="mx-2 fuente-palabras">{producto.cantidad}</span>
                                                <button onClick={() => cambiarCantidad(producto.id, 1)} className="btn btn-sm fuente-palabras fw-bold" style={{ fontSize: '20px', backgroundColor: '#bca624', color: 'white' }}>+</button>
                                            </div>
                                            <div className="col-6 col-md-3 text-warning fw-bold text-end text-md-center mt-3 mt-md-0">
                                                CLP${producto.precio * producto.cantidad}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="caja-gris" style={{ padding: '30px' }}>
                            <h4 className="fuente-palabras text-white mb-4">Resumen</h4>
                            
                            <div className="d-flex justify-content-between mb-3 text-white">
                                <span className="fuente-palabras-slim">Total a pagar:</span>
                                <strong className="fs-4 text-warning">CLP${totalVenta}</strong>
                            </div>
                            
                            <hr style={{ borderColor: '#bca624' }} />
                            
                            <button 
                                onClick={() => navigate('/compra')}
                                disabled={carrito.length === 0}
                                className="btn btn-warning w-100 fuente-palabras mt-3" 
                                style={{ fontWeight: 'bold', padding: '15px', borderRadius: '10px' }}>
                                Proceder al Pago
                            </button>
                            <Link to="/productos" className="btn btn-outline-light w-100 fuente-palabras mt-3">
                                Seguir Comprando
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Carrito;