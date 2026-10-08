import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextoCarrito } from '../contexto/ContextoCarrito';

const ProductoCarta = ({ id, nombre, precio, img }) => {
    const { agregarAlCarrito } = useContext(ContextoCarrito);

    const handleAgregarCarrito = () => {
        agregarAlCarrito({ id, nombre, precio, img }, 1);
    };

    return (
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
            <div className="caja-peque">
                <div>
                    <Link to={`/detalleprod/${id}`}>
                        <img src={img} alt={nombre} className="img-fluid imagen-productos" />
                    </Link>
                    <p className="fuente-palabras titulo-producto-tarjeta mt-2">{nombre}</p>
                </div>
                <div className="container mt-3 p-0">  
                    <div className="row">
                        <div className="col-6">
                            <p 
                                className="ajuste-letras-bloque fuente-palabras-slim click-efecto" 
                                style={{ cursor: 'pointer', color: '#7d916b' }}
                                onClick={handleAgregarCarrito}
                                title="Añadir al carrito"
                            >
                                + Añadir 1
                            </p>
                        </div>
                        <div className="col-6 text-end">
                            <p className="ajuste-letras-bloque-der fuente-palabras-slim m-0">
                                CLP${precio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductoCarta;