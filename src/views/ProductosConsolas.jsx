import React from 'react';
import ProductoCarta from '../components/ProductoCarta';
import { productosData } from '../data/productos';

const ProductosConsolas = () => {
    const consolas = productosData.filter(prod => prod.categoria === "Consolas" || prod.categoria === "Juegos");

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
                                img={prod.img}
                            />
                        ))}
                    </div>
                </div>
            </article>
        </main>
    );
};

export default ProductosConsolas;