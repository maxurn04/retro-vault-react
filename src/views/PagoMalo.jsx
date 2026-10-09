import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const PagoMalo = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="container mt-5 pt-5 text-center text-white">
                <h2>No hay información de pago reciente.</h2>
                <Link to="/" className="btn boton-reini mt-3">Volver al Inicio</Link>
            </div>
        );
    }

    return (
        <main>
            <div className="container mt-5 mb-5 pt-4">
                <div className="caja-gris p-4 mx-auto text-center" style={{ maxWidth: '600px' }}>
                    <h2 className="fuente-palabras text-danger mb-3">Error en el Pago</h2>
                    <p className="text-white fuente-palabras-slim fs-5 mb-4">
                        No se pudo procesar tu orden #{state.numero}. Debes seleccionar un método de pago para continuar.
                    </p>
                    
                    <div className="caja-peque text-start p-3 mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                        <h5 className="fuente-palabras text-white">Monto a pagar: <span className="text-warning">CLP${state.total}</span></h5>
                        <p className="text-white fuente-palabras-slim mb-0">Artículos en orden: {state.productos.reduce((acc, p) => acc + p.cantidad, 0)}</p>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <button onClick={() => navigate('/compra')} className="btn btn-warning fuente-palabras py-3 fs-5">
                            Volver a realizar el pago
                        </button>
                        <Link to="/carrito" className="btn btn-outline-light fuente-palabras py-2">
                            Revisar mi carrito
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PagoMalo;