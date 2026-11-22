import React, { useState, useEffect } from 'react';
import ProductoCarta from '../components/ProductoCarta';
import CatalogoService from '../services/CatalogoService';

const Ofertas = () => {
    const [productosEnOferta, setProductosEnOferta] = useState([]);

    useEffect(() => {
        CatalogoService.obtenerProductos()
            .then((data) => {
                const lista = data || [];
                setProductosEnOferta(lista.filter(prod => prod.esOferta || prod.oferta));
            })
            .catch(() => {
                setProductosEnOferta([]);
            });
    }, []);

    return (
        <main>
            <article>
                <div className="container mt-5">
                    <h2 className="fuente-palabras text-white mb-4">Ofertas Especiales</h2>
                    <div className="row g-4 mb-5">
                        {productosEnOferta.length > 0 ? (
                            productosEnOferta.map((prod) => (
                                <ProductoCarta 
                                    key={prod.id}
                                    id={prod.id}
                                    nombre={prod.nombre}
                                    precio={prod.precioOferta || prod.precio}
                                    img={prod.img || prod.imagenUrl}
                                />
                            ))
                        ) : (
                            <div className="text-white text-center py-5 fuente-palabras-slim">
                                No hay ofertas disponibles por el momento.
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </main>
    );
};

export default Ofertas;
