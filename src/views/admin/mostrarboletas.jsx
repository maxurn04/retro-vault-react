import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrdenesService from '../../services/OrdenesService';

const MostrarBoletas = () => {
    const [boletas, setBoletas] = useState([]);
    const [porBorrar, setPorBorrar] = useState(null);

    useEffect(() => {
        OrdenesService.obtenerBoletas()
            .then((data) => {
                if (Array.isArray(data)) {
                    setBoletas(data);
                } else {
                    setBoletas([]);
                }
            })
            .catch(() => {
                setBoletas([]);
            });
    }, []);

    const confirmarBorrado = () => {
        const lista = boletas.filter((b) => String(b.numero || b.numeroOrden) !== String(porBorrar));
        setBoletas(lista);
        setPorBorrar(null);
    };

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">Gestión de Boletas</h2>
            </div>

            <div className="p-4 admin-caja-tabla">
                <div className="admin-ancho-tabla">
                    <div className="row mb-3 pb-2 fuente-palabras admin-encabezado-tabla">
                        <div className="col-1">N°</div>
                        <div className="col-2">Fecha</div>
                        <div className="col-2">Cliente</div>
                        <div className="col-2">Método</div>
                        <div className="col-2">Total</div>
                        <div className="col-3 text-center">Acciones</div>
                    </div>

                    {boletas.length === 0 && (
                        <p className="text-center text-muted my-3">No hay boletas registradas.</p>
                    )}

                    {boletas.map((b) => {
                        const num = b.numero || b.numeroOrden;
                        const nomCliente = b.cliente ? `${b.cliente.nombre || ''} ${b.cliente.apellidos || ''}`.trim() : 'Cliente';
                        const fechaFormateada = b.fecha ? (typeof b.fecha === 'string' ? b.fecha.replace('T', ' ').substring(0, 19) : b.fecha) : '';
                        return (
                            <div key={num} className="row align-items-center mb-2 pb-2" style={{ borderBottom: '1px solid #cccccc', color: '#333333' }}>
                                <div className="col-1">{num}</div>
                                <div className="col-2">{fechaFormateada}</div>
                                <div className="col-2">{nomCliente}</div>
                                <div className="col-2">{b.metodoPago}</div>
                                <div className="col-2">CLP${b.total}</div>
                                <div className="col-3 d-flex justify-content-center gap-1">
                                    <Link to={`/admin/boletas/${num}`} className="btn admin-btn-nuevo btn-sm" title="Ver detalles" aria-label="Ver detalles">
                                        <i className="bi bi-eye"></i>
                                    </Link>
                                    <Link to={`/admin/boletas/${num}/editar`} className="btn admin-btn-nuevo btn-sm" title="Editar" aria-label="Editar">
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button type="button" className="btn btn-danger btn-sm" title="Borrar" aria-label="Borrar" onClick={() => setPorBorrar(num)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {porBorrar !== null && (
                <>
                    <div className="modal d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Borrar boleta</h5>
                                </div>
                                <div className="modal-body">
                                    ¿Seguro que deseas borrar la boleta #{porBorrar}? Esta acción no se puede deshacer.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setPorBorrar(null)}>Cancelar</button>
                                    <button type="button" className="btn btn-danger" onClick={confirmarBorrado}>Borrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </>
            )}
        </main>
    );
};

export default MostrarBoletas;
