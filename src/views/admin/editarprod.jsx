import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { obtenerCatalogo, guardarCatalogo, obtenerCategorias } from '../../data/catalogoAdmin';

const EditarProd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const categorias = obtenerCategorias();
    const [aviso, setAviso] = useState(null);
    const [noEncontrado, setNoEncontrado] = useState(false);
    const mostrarError = (texto) => setAviso({ tipo: 'danger', texto });    
    const [form, setForm] = useState({
        nombre: '', codigo: '', precio: '', stock: '', stockCritico: '', desc: '', categoria: '', img: ''
    });

    useEffect(() => {
        const producto = obtenerCatalogo().find((p) => p.id === parseInt(id));
        if (!producto) {
            setNoEncontrado(true);
            return;
        }
        setForm({
            nombre: producto.nombre,
            codigo: producto.codigo || '',
            precio: producto.precio,
            stock: producto.stock || 0,
            stockCritico: producto.stockCritico || '',
            desc: producto.desc || '',
            categoria: producto.categoria || '',
            img: producto.img || ''
        });
    }, [id, navigate]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        const codigo = form.codigo.trim();
        const nombre = form.nombre.trim();
        const desc = form.desc.trim();
        const precio = parseFloat(form.precio);
        const stock = parseInt(form.stock);
        const stockCriticoInput = String(form.stockCritico).trim();
        const stockCritico = stockCriticoInput === '' ? 0 : parseInt(stockCriticoInput);
        const img = form.img.trim() === '' ? '/img/tiendaplaceholde.png' : form.img.trim();

        if (codigo.length < 3) {
            mostrarError('Error: El código debe tener un mínimo de 3 caracteres.');
            return;
        }
        if (nombre === '' || nombre.length > 100) {
            mostrarError('Error: El nombre es obligatorio y máximo 100 caracteres.');
            return;
        }
        if (desc.length > 500) {
            mostrarError('Error: La descripción máximo 500 caracteres.');
            return;
        }
        if (isNaN(precio) || precio < 0) {
            mostrarError('Error: El precio debe ser mayor o igual a 0.');
            return;
        }
        if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
            mostrarError('Error: El stock debe ser un número entero y mayor o igual a 0.');
            return;
        }
        if (stockCriticoInput !== '' && (isNaN(stockCritico) || stockCritico < 0 || !Number.isInteger(stockCritico))) {
            mostrarError('Error: El stock crítico debe ser un número entero válido.');
            return;
        }

        const catalogo = obtenerCatalogo().map((p) =>
            p.id === parseInt(id)
                ? { ...p, codigo, nombre, desc, precio, stock, stockCritico, categoria: form.categoria, img }
                : p
        );

        guardarCatalogo(catalogo);
        setAviso({ tipo: 'success', texto: '¡Producto actualizado con éxito!' });
        setTimeout(() => navigate('/admin/mostrarproductos'), 1500);
    };
    if (noEncontrado) {
        return (
            <main className="col-12 col-md-9 col-xl-10 p-4 p-md-5 admin-fondo-crear">
                <div className="alert alert-danger text-center" role="alert">
                    Producto no encontrado. <Link to="/admin/mostrarproductos" className="alert-link">Volver a Productos</Link>
                </div>
            </main>
        );
    }
    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 p-md-5 admin-fondo-crear">
            <div className="p-4 p-md-5 mx-auto admin-caja-formulario">
                <div className="mb-4 p-2 text-center text-uppercase caja-gris fuente-palabras admin-titulo-formulario">
                    Editando producto
                </div>
                {aviso && <div className={`alert alert-${aviso.tipo} text-center`} role="alert">{aviso.texto}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-uppercase admin-etiqueta-form">Nombre del producto</label>
                        <input type="text" name="nombre" className="form-control rounded-0 border-dark" maxLength="100" required value={form.nombre} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-uppercase admin-etiqueta-form">Código</label>
                        <input type="text" name="codigo" className="form-control rounded-0 border-dark" minLength="3" required placeholder="BARXXXXXX" value={form.codigo} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-uppercase admin-etiqueta-form">Precio</label>
                        <input type="number" name="precio" className="form-control rounded-0 border-dark" min="0" step="any" required value={form.precio} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-uppercase admin-etiqueta-form">Stock</label>
                        <input type="number" name="stock" className="form-control rounded-0 border-dark" min="0" required value={form.stock} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-uppercase admin-etiqueta-form">Stock Crítico (Bajo nivel seguro)</label>
                        <input type="number" name="stockCritico" className="form-control rounded-0 border-dark" min="0" value={form.stockCritico} onChange={handleChange} />
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-uppercase admin-etiqueta-form">Descripción (Opcional)</label>
                        <textarea name="desc" className="form-control rounded-0 border-dark" rows="2" maxLength="500" value={form.desc} onChange={handleChange}></textarea>
                    </div>

                    <div className="row mt-5">
                        <div className="col-12 col-md-6 mb-3 mb-md-0">
                            <label className="form-label text-uppercase admin-etiqueta-form">- Seleccione la categoría -</label>
                            <select name="categoria" className="form-select rounded-0 border-dark" required value={form.categoria} onChange={handleChange}>
                                <option value="">Seleccione una categoría...</option>
                                {categorias.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label text-uppercase admin-etiqueta-form">Ruta de la imagen</label>
                            <input type="text" name="img" className="form-control rounded-0 border-dark" placeholder="/img/ejemplo.jpg" value={form.img} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="text-center mt-5 pt-3">
                        <button type="submit" className="btn text-uppercase px-5 py-2 admin-btn-registrar">Actualizar</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default EditarProd;