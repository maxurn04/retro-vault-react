import React, { createContext, useState, useEffect } from 'react';

export const ContextoCarrito = createContext();

export const ProveedorCarrito = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem('carrito');
        return guardado ? JSON.parse(guardado) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto, cantidad = 1) => {
        setCarrito((prev) => {
            const indice = prev.findIndex(item => item.id === producto.id);
            if (indice !== -1) {
                const nuevoCarrito = [...prev];
                nuevoCarrito[indice].cantidad += cantidad;
                return nuevoCarrito;
            }
            return [...prev, { ...producto, cantidad: cantidad }];
        });
        alert(`¡Se añadieron ${cantidad} ${producto.nombre} a tu carrito!`);
    };

    const cambiarCantidad = (id, modificador) => {
        setCarrito((prev) => {
            const nuevoCarrito = prev.map(item => {
                if (item.id === id) {
                    const nuevaCantidad = item.cantidad + modificador;
                    return { ...item, cantidad: nuevaCantidad };
                }
                return item;
            });
            return nuevoCarrito.filter(item => item.cantidad > 0);
        });
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((prev) => prev.filter(item => item.id !== id));
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalVenta = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <ContextoCarrito.Provider value={{
            carrito,
            agregarAlCarrito,
            cambiarCantidad,
            eliminarDelCarrito,
            cantidadTotal,
            totalVenta
        }}>
            {children}
        </ContextoCarrito.Provider>
    );
};