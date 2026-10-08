import React, { createContext, useState, useEffect } from 'react';

export const ContextoUsuario = createContext();

export const ProveedorUsuario = ({ children }) => {
    const [usuarioActivo, setUsuarioActivo] = useState(() => {
        const guardado = localStorage.getItem('usuario_activo');
        return guardado ? JSON.parse(guardado) : null;
    });

    const iniciarSesion = (usuario) => {
        setUsuarioActivo(usuario);
        localStorage.setItem('usuario_activo', JSON.stringify(usuario));
    };

    const cerrarSesion = () => {
        setUsuarioActivo(null);
        localStorage.removeItem('usuario_activo');
    };

    return (
        <ContextoUsuario.Provider value={{ usuarioActivo, iniciarSesion, cerrarSesion }}>
            {children}
        </ContextoUsuario.Provider>
    );
};