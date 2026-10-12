import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Campo = ({ etiqueta, name, valor, onChange, editable, tipo = 'text', requerido = false, col = 'col-12 col-md-6' }) => (
    <div className={`${col} mb-3`}>
        <label className="form-label text-uppercase admin-etiqueta-form">{etiqueta}</label>
        <input
            type={tipo}
            name={name}
            className="form-control rounded-0 border-dark"
            value={valor ?? ''}
            onChange={onChange}
            readOnly={!editable}
            required={requerido && editable}
        />
    </div>
);

const DetalleBoleta = ({ editable = false }) => {
    const { numero } = useParams();
    const navigate = useNavigate();
    const [boleta, setBoleta] = useState(null);
    const [guardada, setGuardada] = useState(false);
    const [noEncontrado, setNoEncontrado] = useState(false);

    useEffect(() => {
        const boletas = JSON.parse(localStorage.getItem('boletas')) || [];
        const encontrada = boletas.find((b) => String(b.numero) === numero);
        if (!encontrada) {
            setNoEncontrado(true);
            return;
        }
        setBoleta(encontrada);
    }, [numero, navigate]);
    
    if (noEncontrado) {
        return (
            <main className="col-12 col-md-9 col-xl-10 p-4 p-md-5 admin-fondo-crear">
                <div className="alert alert-danger text-center" role="alert">
                    Boleta no encontrada. <Link to="/admin/boletas" className="alert-link">Volver a Boletas</Link>
                </div>
            </main>
        );
    }
    if (!boleta) return null;

    const cambiarGeneral = (e) => setBoleta({ ...boleta, [e.target.name]: e.target.value });

    const cambiarCliente = (e) =>
        setBoleta({ ...boleta, cliente: { ...boleta.cliente, [e.target.name]: e.target.value } });

    const cambiarProducto = (indice, campo, valor) =>
        setBoleta({
            ...boleta,
            productos: boleta.productos.map((p, i) => (i === indice ? { ...p, [campo]: valor } : p))
        });

    const subtotalDe = (p) => (Number(p.precio) || 0) * (Number(p.cantidad) || 0);
    const total = boleta.productos.reduce((suma, p) => suma + subtotalDe(p), 0);

    const guardar = (e) => {
        e.preventDefault();

        const productos = boleta.productos.map((p) => {
            const cantidad = parseInt(p.cantidad);
            const precio = parseFloat(p.precio);
            return { ...p, cantidad, precio, subtotal: cantidad * precio };
        });
        const actualizada = {
            ...boleta,
            productos,
            total: productos.reduce((suma, p) => suma + p.subtotal, 0)
        };

        const boletas = JSON.parse(localStorage.getItem('boletas')) || [];
        const lista = boletas.map((b) => (String(b.numero) === numero ? actualizada : b));
        localStorage.setItem('boletas', JSON.stringify(lista));

    setGuardada(true);
    setTimeout(() => navigate('/admin/boletas'), 1500);
    };

    const titulo = editable ? `Editando boleta #${boleta.numero}` : `Detalle de boleta #${boleta.numero}`;
    const c = boleta.cliente;

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 p-md-5 admin-fondo-crear">
            <div className="p-4 p-md-5 mx-auto admin-caja-formulario" style={{ maxWidth: '900px' }}>
                <div className="mb-4 p-2 text-center text-uppercase caja-gris fuente-palabras admin-titulo-formulario">
                    {titulo}
                </div>
                        {guardada && (
                            <div className="alert alert-success text-center" role="alert">
                                Boleta actualizada con éxito.
                            </div>
                        )}
                <form onSubmit={guardar}>
                    <div className="row">
                        <Campo etiqueta="Número" name="numero" valor={boleta.numero} editable={false} col="col-12 col-md-4" />
                        <Campo etiqueta="Fecha" name="fecha" valor={boleta.fecha} editable={false} col="col-12 col-md-4" />
                        <div className="col-12 col-md-4 mb-3">
                            <label className="form-label text-uppercase admin-etiqueta-form">Método de pago</label>
                            <select
                                name="metodoPago"
                                className="form-select rounded-0 border-dark"
                                value={boleta.metodoPago}
                                onChange={cambiarGeneral}
                                disabled={!editable}
                            >
                                <option value="Tarjeta Visa / Mastercard">Tarjeta Visa / Mastercard</option>
                                <option value="Mercado Pago">Mercado Pago</option>
                                <option value="RedCompra / Débito">RedCompra / Débito</option>
                            </select>
                        </div>
                    </div>

                    <h6 className="fuente-palabras text-uppercase border-bottom border-dark pb-2 mt-4">Datos del Cliente</h6>
                    <div className="row">
                        <Campo etiqueta="Nombre" name="nombre" valor={c.nombre} onChange={cambiarCliente} editable={editable} requerido />
                        <Campo etiqueta="Apellidos" name="apellidos" valor={c.apellidos} onChange={cambiarCliente} editable={editable} requerido />
                        <Campo etiqueta="Correo" name="correo" valor={c.correo} onChange={cambiarCliente} editable={editable} tipo="email" requerido col="col-12" />
                    </div>

                    <h6 className="fuente-palabras text-uppercase border-bottom border-dark pb-2 mt-4">Dirección de Entrega</h6>
                    <div className="row">
                        <Campo etiqueta="Calle" name="calle" valor={c.calle} onChange={cambiarCliente} editable={editable} requerido />
                        <Campo etiqueta="Departamento" name="departamento" valor={c.departamento} onChange={cambiarCliente} editable={editable} />
                        <Campo etiqueta="Comuna" name="comuna" valor={c.comuna} onChange={cambiarCliente} editable={editable} requerido />
                        <Campo etiqueta="Región" name="region" valor={c.region} onChange={cambiarCliente} editable={editable} requerido />
                        <div className="col-12 mb-3">
                            <label className="form-label text-uppercase admin-etiqueta-form">Indicaciones</label>
                            <textarea
                                name="indicaciones"
                                className="form-control rounded-0 border-dark"
                                rows="2"
                                value={c.indicaciones ?? ''}
                                onChange={cambiarCliente}
                                readOnly={!editable}
                            ></textarea>
                        </div>
                    </div>

                    <h6 className="fuente-palabras text-uppercase border-bottom border-dark pb-2 mt-4">Detalle de la Compra</h6>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr className="admin-etiqueta-form text-uppercase">
                                    <th>Producto</th>
                                    <th style={{ width: '110px' }}>Cant</th>
                                    <th style={{ width: '140px' }}>Precio</th>
                                    <th className="text-end" style={{ width: '140px' }}>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boleta.productos.map((p, i) => (
                                    <tr key={`${p.id}-${i}`}>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control rounded-0 border-dark"
                                                value={p.nombre}
                                                onChange={(e) => cambiarProducto(i, 'nombre', e.target.value)}
                                                readOnly={!editable}
                                                required={editable}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control rounded-0 border-dark"
                                                min="1"
                                                step="1"
                                                value={p.cantidad}
                                                onChange={(e) => cambiarProducto(i, 'cantidad', e.target.value)}
                                                readOnly={!editable}
                                                required={editable}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control rounded-0 border-dark"
                                                min="0"
                                                step="any"
                                                value={p.precio}
                                                onChange={(e) => cambiarProducto(i, 'precio', e.target.value)}
                                                readOnly={!editable}
                                                required={editable}
                                            />
                                        </td>
                                        <td className="text-end fw-bold">CLP${subtotalDe(p)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-end fs-4 mt-3">
                        <span className="fuente-palabras">Total Pagado: </span>
                        <strong>CLP${total}</strong>
                    </div>

                    <div className="text-center mt-5 d-flex justify-content-center gap-3 flex-wrap">
                        {editable && (
                            <button type="submit" className="btn text-uppercase px-5 py-2 admin-btn-registrar">
                                Guardar cambios
                            </button>
                        )}
                        <Link to="/admin/boletas" className="btn text-uppercase px-5 py-2 admin-btn-registrar">
                            {editable ? 'Cancelar' : 'Volver'}
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default DetalleBoleta;
