import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductoCarta';
import CatalogoService from '../services/CatalogoService';

const Productos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        CatalogoService.obtenerProductos()
            .then((data) => {
                setProductos(data || []);
            })
            .catch(() => {
                setProductos([]);
            });
    }, []);

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
                        {productos.map((prod) => (
                            <ProductCard 
                                key={prod.id}
                                id={prod.id}
                                nombre={prod.nombre}
                                precio={prod.precio}
                                img={prod.img || prod.imagenUrl}
                            />
                        ))}
                    </div>
                </div>
            </article>
        </main>
    );
};

export default Productos;
