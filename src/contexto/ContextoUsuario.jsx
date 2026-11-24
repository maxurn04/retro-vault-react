import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const ContextoUsuario = createContext();

export const ProveedorUsuario = ({ children }) => {
    const [usuarioActivo, setUsuarioActivo] = useState(() => {
        const guardado = localStorage.getItem('usuario_activo');
        return guardado ? JSON.parse(guardado) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token_jwt') || null;
    });

    useEffect(() => {
        const tokenGuardado = localStorage.getItem('token_jwt');
        if (tokenGuardado) {
            AuthService.validarToken(tokenGuardado)
                .then((data) => {
                    const usuario = data.usuario || {
                        id: data.id,
                        nombre: data.nombre,
                        correo: data.correo,
                        rol: data.rol,
                        tipo: data.tipo || (data.rol === 'ADMIN' ? 'Administrador' : data.rol)
                    };
                    setUsuarioActivo(usuario);
                    localStorage.setItem('usuario_activo', JSON.stringify(usuario));
                })
                .catch(() => {
                    cerrarSesion();
                });
        }
    }, []);

    const iniciarSesion = (usuario, nuevoToken = null) => {
        setUsuarioActivo(usuario);
        localStorage.setItem('usuario_activo', JSON.stringify(usuario));
        if (nuevoToken) {
            setToken(nuevoToken);
            localStorage.setItem('token_jwt', nuevoToken);
        }
    };

    const cerrarSesion = () => {
        setUsuarioActivo(null);
        setToken(null);
        localStorage.removeItem('usuario_activo');
        localStorage.removeItem('token_jwt');
    };

    return (
        <ContextoUsuario.Provider value={{ usuarioActivo, token, iniciarSesion, cerrarSesion }}>
            {children}
        </ContextoUsuario.Provider>
    );
};
