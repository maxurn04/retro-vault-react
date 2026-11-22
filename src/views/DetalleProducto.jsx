import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ContextoCarrito } from '../contexto/ContextoCarrito';
import CatalogoService from '../services/CatalogoService';

const DetalleProducto = () => {
    const { id } = useParams();
    const [prod, setProd] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [popup, setPopup] = useState(null);
    const { agregarAlCarrito } = useContext(ContextoCarrito);

    useEffect(() => {
        setCargando(true);
        CatalogoService.obtenerProductoPorId(id)
            .then((data) => {
                if (data) {
                    setProd(data);
                } else {
                    setProd(null);
                }
            })
            .catch(() => {
                setProd(null);
            })
            .finally(() => {
                setCargando(false);
            });
    }, [id]);

    if (cargando) {
        return <h3 className="text-center text-white mt-5 fuente-palabras">Cargando producto...</h3>;
    }

    if (!prod) {
        return <h2 className="text-center text-white mt-5 fuente-palabras">Producto No Encontrado</h2>;
    }

    const imagenPrincipal = prod.imagenUrl || prod.img || '/img/logoRV.jpg';
    const imagen2 = prod.img2 || null;
    const imagen3 = prod.img3 || null;

    const mostrarPopup = (titulo, mensaje, accionAlCerrar = null) => {
        setPopup({ titulo, mensaje, alCerrar: accionAlCerrar });
    };

    const cerrarPopup = () => {
        const accion = popup?.alCerrar;
        setPopup(null);
        if (accion) accion();
    };

    const handleAgregar = () => {
        agregarAlCarrito(prod, cantidad);
        mostrarPopup("Carrito", `¡${prod.nombre} añadido al carrito!`);
    };

    return (
        <div className="container mt-5 mb-5 fuente-palabras-slim">
            <div className="mb-3 text-white"> 
                <Link to="/" className="text-decoration-none fuente-palabras click-efecto text-white">Inicio</Link> /
                <Link to="/productos" className="text-decoration-none fuente-palabras click-efecto text-white"> Productos</Link> /
                <span className="fuente-palabras text-white"> {prod.nombre} </span>
            </div>

            <div className="row">
                <div className="col-12 col-md-6 mb-4">
                    <div className="caja-gris text-center" style={{ padding: '10px' }}>
                        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="3000">
                                    <img src={imagenPrincipal} className="d-block w-100 img-fluid imagen-productos-grande" alt={prod.nombre} />
                                </div>
                                {imagen2 && (
                                    <div className="carousel-item" data-bs-interval="3000">
                                        <img src={imagen2} className="d-block w-100 img-fluid imagen-productos-grande" alt={prod.nombre} />
                                    </div>
                                )}
                                {imagen3 && (
                                    <div className="carousel-item" data-bs-interval="3000">
                                        <img src={imagen3} className="d-block w-100 img-fluid imagen-productos-grande" alt={prod.nombre} />
                                    </div>
                                )}
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

                <div className="col-12 col-md-6 text-white">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1 className="fuente-palabras" style={{ color: '#bca624' }}>{prod.nombre}</h1>
                        <h2 className="fuente-palabras">CLP${prod.precio}</h2>
                    </div>
                    
                    <hr className="linea-separacion" style={{ borderColor: '#bca624' }} />
                    <p className="mt-4" style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                        {prod.descripcion || prod.desc || "No hay descripción disponible para este artículo."}
                    </p>
                    <p className="text-secondary">{prod.codigo}</p>
                    
                    <div className="d-flex align-items-center mb-4">
                        <label htmlFor="detalle-cantidad" className="me-3 fuente-palabras">Cantidad:</label>
                        <input 
                            type="number" 
                            id="detalle-cantidad" 
                            className="form-control text-center" 
                            value={cantidad} 
                            min="1" 
                            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                            style={{ width: '80px', backgroundColor: '#3f4738', color: 'white', border: '1px solid #bca624' }} 
                        /> 
                        <h6 className="fuente-palabras-slim ms-auto mb-0">
                            Stock: {prod.stock}
                            {prod.stock <= (prod.stockCritico || 3) && (
                                <p className="fuente-palabras marcar-efecto d-inline ms-2 mb-0">¡Quedan pocos!</p>
                            )}
                        </h6>
                    </div>
                    
                    <button onClick={handleAgregar} className="btn w-100 fuente-palabras text-dark" style={{ backgroundColor: '#bca624', fontWeight: 'bold', padding: '18px', fontSize: '20px' }}>
                        Añadir al carrito
                    </button>
                </div>
            </div>

            {popup && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999
                    }}
                >
                    <div 
                        className="caja-gris p-4 text-center text-white" 
                        style={{ 
                            maxWidth: '420px', 
                            width: '90%', 
                            borderRadius: '10px', 
                            border: '2px solid #bca624',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                        }}
                    >
                        <h4 className="fuente-palabras mb-3" style={{ color: '#bca624' }}>
                            {popup.titulo}
                        </h4>
                        <p className="fuente-palabras-slim mb-4" style={{ fontSize: '1.05rem' }}>
                            {popup.mensaje}
                        </p>
                        <button 
                            type="button" 
                            className="btn boton-reini px-4 py-2" 
                            onClick={cerrarPopup}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetalleProducto;
