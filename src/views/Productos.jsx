import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductoCarta';
import { productosData } from '../data/productos';

const Productos = () => {
    return (
        <main>
            <article>
                <div className="container mt-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fuente-palabras text-white mb-0">Catálogo disponible</h2>
                        <Link to="/" className="btn boton-reini">
                            Regresar
                        </Link>
                    </div>
                    
                    <div className="row g-4 mb-5">
                        {productosData.map((prod) => (
                            <ProductCard 
                                key={prod.id}
                                id={prod.id}
                                nombre={prod.nombre}
                                precio={prod.precio}
                                img={prod.img}
                            />
                        ))}
                    </div>
                </div>
            </article>
        </main>
    );
};

export default Productos;