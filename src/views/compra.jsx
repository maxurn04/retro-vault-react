import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoCarrito } from '../contexto/ContextoCarrito';
import { ContextoUsuario } from '../contexto/ContextoUsuario';

const Compra = () => {
    const { carrito, totalVenta, vaciarCarrito } = useContext(ContextoCarrito);
    const { usuarioActivo } = useContext(ContextoUsuario);
    const navigate = useNavigate();

    const [metodoPago, setMetodoPago] = useState('');
    const [formulario, setFormulario] = useState({
        nombre: '', apellidos: '', correo: '', calle: '',
        departamento: '', region: '', comuna: '', indicaciones: ''
    });

    useEffect(() => {
        if (usuarioActivo) {
            setFormulario(prev => ({
                ...prev,
                nombre: usuarioActivo.nombre || '',
                apellidos: usuarioActivo.apellidos || '',
                correo: usuarioActivo.correo || '',
                calle: usuarioActivo.direccion || '',
                region: usuarioActivo.region || '',
                comuna: usuarioActivo.comuna || ''
            }));
        }
    }, [usuarioActivo]);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const procesarPago = () => {
        if (!formulario.nombre.trim() || !formulario.apellidos.trim() || !formulario.correo.trim() || !formulario.calle.trim()) {
            alert("Por favor completa los datos obligatorios del cliente y envío.");
            return;
        }

        const numeroOrden = Math.floor(100000 + Math.random() * 900000);
        const datosOrden = {
            numero: numeroOrden,
            productos: [...carrito],
            total: totalVenta,
            cliente: { ...formulario },
            metodoPago: metodoPago
        };

        if (metodoPago === '') {
            navigate('/pago-malo', { state: datosOrden });
        } else {
            vaciarCarrito();
            localStorage.setItem('carrito', JSON.stringify([]));
            navigate('/pago-exito', { state: datosOrden });
        }
    };

    return (
        <main>
            <div className="container mt-5 mb-5 pt-4">
                <h2 className="fuente-palabras text-white mb-4">Checkout de Compra</h2>
                <div className="row">
                    <div className="col-12 col-lg-7 mb-4">
                        <div className="caja-gris p-4">
                            <h4 className="fuente-palabras text-white mb-4">Información del Cliente y Envío</h4>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-white fuente-palabras-slim">Nombre*</label>
                                    <input type="text" name="nombre" className="form-control" value={formulario.nombre} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-white fuente-palabras-slim">Apellidos*</label>
                                    <input type="text" name="apellidos" className="form-control" value={formulario.apellidos} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-white fuente-palabras-slim">Correo*</label>
                                <input type="email" name="correo" className="form-control" value={formulario.correo} onChange={handleChange} />
                            </div>
                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <label className="form-label text-white fuente-palabras-slim">Calle*</label>
                                    <input type="text" name="calle" className="form-control" value={formulario.calle} onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label text-white fuente-palabras-slim">Depto (Opcional)</label>
                                    <input type="text" name="departamento" className="form-control" value={formulario.departamento} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-white fuente-palabras-slim">Región*</label>
                                    <input type="text" name="region" className="form-control" value={formulario.region} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-white fuente-palabras-slim">Comuna*</label>
                                    <input type="text" name="comuna" className="form-control" value={formulario.comuna} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-white fuente-palabras-slim">Indicaciones para la entrega (Opcional)</label>
                                <textarea name="indicaciones" className="form-control" rows="2" value={formulario.indicaciones} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-5">
                        <div className="caja-gris p-4">
                            <h4 className="fuente-palabras text-white mb-4">Resumen del Carrito</h4>
                            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                {carrito.map(item => (
                                    <div key={item.id} className="d-flex align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid #bca624' }}>
                                        <img src={item.img} alt={item.nombre} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} className="me-3" />
                                        <div className="flex-grow-1 text-white">
                                            <h6 className="fuente-palabras mb-1 text-truncate" style={{ maxWidth: '150px' }}>{item.nombre}</h6>
                                            <small className="fuente-palabras-slim">Cant: {item.cantidad}</small>
                                        </div>
                                        <div className="text-warning fuente-palabras fw-bold">
                                            CLP${item.precio * item.cantidad}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex justify-content-between mt-3 pt-3 text-white" style={{ borderTop: '2px solid #bca624' }}>
                                <span className="fuente-palabras fs-5">Total:</span>
                                <strong className="fs-5 text-warning">CLP${totalVenta}</strong>
                            </div>

                            <div className="mt-4 pt-3" style={{ borderTop: '1px solid #bca624' }}>
                                <h5 className="fuente-palabras text-white mb-3">Método de Pago</h5>
                                <div className="form-check mb-2">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="opcionPago" 
                                        id="pago1" 
                                        value="Tarjeta Visa / Mastercard"
                                        checked={metodoPago === 'Tarjeta Visa / Mastercard'}
                                        onChange={(e) => setMetodoPago(e.target.value)}
                                    />
                                    <label className="form-check-label text-white fuente-palabras-slim" htmlFor="pago1">
                                        Tarjeta Visa / Mastercard
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="opcionPago" 
                                        id="pago2" 
                                        value="Mercado Pago"
                                        checked={metodoPago === 'Mercado Pago'}
                                        onChange={(e) => setMetodoPago(e.target.value)}
                                    />
                                    <label className="form-check-label text-white fuente-palabras-slim" htmlFor="pago2">
                                        Mercado Pago
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="opcionPago" 
                                        id="pago3" 
                                        value="RedCompra / Débito"
                                        checked={metodoPago === 'RedCompra / Débito'}
                                        onChange={(e) => setMetodoPago(e.target.value)}
                                    />
                                    <label className="form-check-label text-white fuente-palabras-slim" htmlFor="pago3">
                                        RedCompra / Débito
                                    </label>
                                </div>
                            </div>

                            <button 
                                type="button" 
                                onClick={procesarPago} 
                                className="btn btn-warning w-100 py-3 fuente-palabras fs-5 mt-2" 
                                style={{ fontWeight: 'bold' }}
                            >
                                Pagar ahora CLP${totalVenta}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Compra;