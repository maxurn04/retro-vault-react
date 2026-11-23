
import React, { useEffect, useState } from 'react';
import ContactoService from '../../services/ContactoService';

const MostrarMensajes = () => {
    const [mensajes, setMensajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarMensajes = async () => {
            try {
                const respuesta = await ContactoService.listarMensajes();
                setMensajes(respuesta);
            } catch (error) {
                console.error('Error al cargar los mensajes:', error);
                setError('No se pudieron cargar los mensajes.');
            } finally {
                setCargando(false);
            }
        };

        cargarMensajes();
    }, []);

    const formatearFecha = (fecha) => {
        if (!fecha) return 'Sin fecha';

        return new Date(fecha).toLocaleString('es-CL');
    };

    if (cargando) {
        return <div className="col p-4">Cargando mensajes...</div>;
    }

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">
                Mensajes de Contacto
            </h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!error && mensajes.length === 0 && (
                <div className="alert alert-info">
                    No hay mensajes recibidos.
                </div>
            )}

            {mensajes.length > 0 && (
    <div className="p-4 admin-caja-tabla">
        <div className="admin-ancho-tabla">
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Mensaje</th>
                            <th>Fecha de envío</th>
                        </tr>
                    </thead>

                    <tbody>
                        {mensajes.map((mensaje) => (
                            <tr key={mensaje.id}>
                                <td>{mensaje.id}</td>
                                <td>{mensaje.nombre}</td>
                                <td>{mensaje.correo}</td>
                                <td style={{ minWidth: '250px' }}>
                                    {mensaje.mensaje}
                                </td>
                                <td style={{ minWidth: '170px' }}>
                                    {formatearFecha(mensaje.fechaEnvio)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)}
        </main>
    );
};

export default MostrarMensajes;
