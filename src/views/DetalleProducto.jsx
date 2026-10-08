import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productosData } from '../data/productos';
import { ContextoCarrito } from '../contexto/ContextoCarrito';

const DetalleProducto = () => {
    const { id } = useParams();
    const prod = productosData.find(item => item.id === parseInt(id));
    const [cantidad, setCantidad] = useState(1);
    const { agregarAlCarrito } = useContext(ContextoCarrito);

    if (!prod) {
        return <h2 className="text-center text-white mt-5 fuente-palabras">Producto No Encontrado</h2>;
    }

    const handleAgregar = () => {
        agregarAlCarrito(prod, cantidad);
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
                                    <img src={prod.img} className="d-block w-100 img-fluid imagen-productos-grande" alt={prod.nombre} />
                                </div>
                                {prod.img2 && (
                                    <div className="carousel-item" data-bs-interval="3000">
                                        <img src={prod.img2} className="d-block w-100 img-fluid imagen-productos-grande" alt={prod.nombre} />
                                    </div>
                                )}
                                {prod.img3 && (
                                    <div className="carousel-item" data-bs-interval="3000">
                                        <img src={prod.img3} className="d-block w-100 img-fluid imagen-productos-grande" alt={prod.nombre} />
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
                        {prod.desc || "No hay descripcion del articulo"}
                    </p>
                    <p>{prod.codigo}</p>
                    
                    <div className="d-flex align-items-center mb-4">
                        <label htmlFor="detalle-cantidad" className="me-3 fuente-palabras">Cantidad:</label>
                        <input 
                            type="number" 
                            id="detalle-cantidad" 
                            className="form-control text-center" 
                            value={cantidad} 
                            min="1" 
                            onChange={(e) => setCantidad(parseInt(e.target.value))}
                            style={{ width: '80px', backgroundColor: '#3f4738', color: 'white', border: '1px solid #bca624' }} 
                        /> 
                        <h6 className="fuente-palabras-slim ms-auto mb-0">
                            Stock: {prod.stock}
                            {prod.stock <= prod.stockCritico && (
                                <p className="fuente-palabras marcar-efecto d-inline ms-2 mb-0">¡Quedan pocos!</p>
                            )}
                        </h6>
                    </div>
                    
                    <button onClick={handleAgregar} className="btn w-100 fuente-palabras text-dark" style={{ backgroundColor: '#bca624', fontWeight: 'bold', padding: '18px', fontSize: '20px' }}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;