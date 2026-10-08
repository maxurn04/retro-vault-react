import React from 'react';
import ProductoCarta from '../components/ProductoCarta';
import { productosData } from '../data/productos';

const Ofertas = () => {
    const productosEnOferta = productosData.filter(prod => prod.oferta === true);

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
                                    precio={prod.precio}
                                    img={prod.img}
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