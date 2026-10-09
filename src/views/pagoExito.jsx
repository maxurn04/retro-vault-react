import React, { useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ContextoCarrito } from '../contexto/ContextoCarrito';

const PagoExito = () => {
    const { state } = useLocation();
    const { vaciarCarrito } = useContext(ContextoCarrito);

    useEffect(() => {
        vaciarCarrito();
        localStorage.setItem('carrito', JSON.stringify([]));
    }, []);

    const descargarBoleta = () => {
        window.print();
    };

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
                <div className="caja-gris p-4 mx-auto" style={{ maxWidth: '800px' }}>
                    <div className="text-center mb-4">
                        <h2 className="fuente-palabras text-success">¡Pago Correcto!</h2>
                        <p className="text-white fuente-palabras-slim fs-5">Se ha realizado la compra. Nro #{state.numero}</p>
                        <span className="badge bg-warning text-dark fuente-palabras fs-6">Método: {state.metodoPago}</span>
                    </div>

                    <div className="row text-white mb-4">
                        <div className="col-md-6 mb-3">
                            <h5 className="fuente-palabras text-warning border-bottom border-warning pb-2">Datos del Cliente</h5>
                            <p className="mb-1"><strong>Nombre:</strong> {state.cliente.nombre} {state.cliente.apellidos}</p>
                            <p className="mb-1"><strong>Correo:</strong> {state.cliente.correo}</p>
                        </div>
                        <div className="col-md-6 mb-3">
                            <h5 className="fuente-palabras text-warning border-bottom border-warning pb-2">Dirección de Entrega</h5>
                            <p className="mb-1"><strong>Calle:</strong> {state.cliente.calle} {state.cliente.departamento && `Dpto ${state.cliente.departamento}`}</p>
                            <p className="mb-1"><strong>Ubicación:</strong> {state.cliente.comuna}, {state.cliente.region}</p>
                            {state.cliente.indicaciones && <p className="mb-1"><strong>Nota:</strong> {state.cliente.indicaciones}</p>}
                        </div>
                    </div>

                    <h5 className="fuente-palabras text-warning border-bottom border-warning pb-2 text-white">Detalle de la Compra</h5>
                    <div className="table-responsive">
                        <table className="table table-dark table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cant</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.productos.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.nombre}</td>
                                        <td>{item.cantidad}</td>
                                        <td className="text-end text-warning">CLP${item.precio * item.cantidad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-end text-white fs-4 mt-3">
                        <span className="fuente-palabras">Total Pagado: </span>
                        <strong className="text-warning">CLP${state.total}</strong>
                    </div>

                    <div className="text-center mt-5 d-flex justify-content-center gap-3 flex-wrap">
                        <button onClick={descargarBoleta} className="btn btn-warning fuente-palabras py-2 px-4 fw-bold">
                            Descargar Boleta
                        </button>
                        <Link to="/" className="btn btn-outline-light fuente-palabras py-2 px-4">
                            Volver a la Tienda
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PagoExito;