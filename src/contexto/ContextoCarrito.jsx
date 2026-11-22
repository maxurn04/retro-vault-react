import React, { createContext, useState, useEffect, useContext } from 'react';
import { ContextoUsuario } from './ContextoUsuario';
import OrdenesService from '../services/OrdenesService';

export const ContextoCarrito = createContext();

export const ProveedorCarrito = ({ children }) => {
    const contextoUsuario = useContext(ContextoUsuario);
    const usuarioActivo = contextoUsuario ? contextoUsuario.usuarioActivo : null;
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        localStorage.removeItem('carrito');
    }, []);

    useEffect(() => {
        if (usuarioActivo && usuarioActivo.id) {
            OrdenesService.obtenerCarrito(usuarioActivo.id)
                .then(items => {
                    if (Array.isArray(items)) {
                        const formateados = items.map(item => ({
                            id: item.productoId || item.id,
                            nombre: item.nombre,
                            precio: item.precio,
                            cantidad: item.cantidad,
                            img: item.imagenUrl || item.img || '/img/logoRV.jpg'
                        }));
                        setCarrito(formateados);
                    }
                })
                .catch(() => {});
        } else {
            setCarrito([]);
        }
    }, [usuarioActivo]);

    const agregarAlCarrito = (producto, cantidad = 1) => {
        const itemActualizado = { ...producto, cantidad };
        setCarrito((prev) => {
            const indice = prev.findIndex(item => item.id === producto.id);
            if (indice !== -1) {
                const nuevoCarrito = [...prev];
                nuevoCarrito[indice] = {
                    ...nuevoCarrito[indice],
                    cantidad: nuevoCarrito[indice].cantidad + cantidad
                };
                return nuevoCarrito;
            }
            return [...prev, itemActualizado];
        });

        if (usuarioActivo && usuarioActivo.id) {
            OrdenesService.agregarAlCarrito(usuarioActivo.id, {
                productoId: producto.id,
                cantidad: cantidad,
                nombre: producto.nombre,
                precio: producto.precio,
                imagenUrl: producto.img || producto.imagenUrl || ''
            }).catch(() => {});
        }
    };

    const cambiarCantidad = (id, modificador) => {
        const itemActual = carrito.find(item => item.id === id);
        if (!itemActual) return;
        const nuevaCantidad = itemActual.cantidad + modificador;

        setCarrito((prev) => {
            if (nuevaCantidad <= 0) {
                return prev.filter(item => item.id !== id);
            }
            return prev.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item);
        });

        if (usuarioActivo && usuarioActivo.id) {
            if (nuevaCantidad <= 0) {
                OrdenesService.eliminarDelCarrito(usuarioActivo.id, id).catch(() => {});
            } else {
                OrdenesService.cambiarCantidad(usuarioActivo.id, id, nuevaCantidad).catch(() => {});
            }
        }
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((prev) => prev.filter(item => item.id !== id));
        if (usuarioActivo && usuarioActivo.id) {
            OrdenesService.eliminarDelCarrito(usuarioActivo.id, id).catch(() => {});
        }
    };

    const vaciarCarrito = () => {
        setCarrito([]);
        if (usuarioActivo && usuarioActivo.id) {
            OrdenesService.vaciarCarrito(usuarioActivo.id).catch(() => {});
        }
    };

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalVenta = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <ContextoCarrito.Provider value={{
            carrito,
            agregarAlCarrito,
            cambiarCantidad,
            eliminarDelCarrito,
            vaciarCarrito,
            cantidadTotal,
            totalVenta
        }}>
            {children}
        </ContextoCarrito.Provider>
    );
};
