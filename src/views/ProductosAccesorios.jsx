import React, { useState, useEffect } from 'react';
import ProductoCarta from '../components/ProductoCarta';
import CatalogoService from '../services/CatalogoService';

const ProductosAccesorios = () => {
    const [accesorios, setAccesorios] = useState([]);

    useEffect(() => {
        CatalogoService.obtenerProductos()
            .then((data) => {
                const lista = data || [];
                setAccesorios(lista.filter(prod => {
                    const cat = prod.categoria?.nombre || prod.categoria;
                    return cat === 'Accesorios';
                }));
            })
            .catch(() => {
                setAccesorios([]);
            });
    }, []);

    return (
        <main>
            <article>
                <div className="container mt-5">
                    <h2 className="fuente-palabras mb-4">Accesorios disponibles</h2>
                    <div className="row g-4 mb-5">
                        {accesorios.map((prod) => (
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

export default ProductosAccesorios;
