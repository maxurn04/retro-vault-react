import React, { useState, useEffect } from 'react';
import ProductoCarta from '../components/ProductoCarta';
import CatalogoService from '../services/CatalogoService';

const ProductosConsolas = () => {
    const [consolas, setConsolas] = useState([]);

    useEffect(() => {
        CatalogoService.obtenerProductos()
            .then((data) => {
                const lista = data || [];
                setConsolas(lista.filter(prod => {
                    const cat = prod.categoria?.nombre || prod.categoria;
                    return cat === 'Consolas' || cat === 'Juegos';
                }));
            })
            .catch(() => {
                setConsolas([]);
            });
    }, []);

    return (
        <main>
            <article>
                <div className="container mt-5">
                    <h2 className="fuente-palabras mb-4">Consolas y Juegos disponibles</h2>
                    <div className="row g-4 mb-5">
                        {consolas.map((prod) => (
                            <ProductoCarta 
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

export default ProductosConsolas;
