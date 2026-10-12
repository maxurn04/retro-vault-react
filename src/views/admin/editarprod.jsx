import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerCatalogo, guardarCatalogo, obtenerCategorias } from '../../data/catalogoAdmin';

const EditarProd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const categorias = obtenerCategorias();
    const [form, setForm] = useState({
        nombre: '', codigo: '', precio: '', stock: '', stockCritico: '', desc: '', categoria: '', img: ''
    });

    useEffect(() => {
        const producto = obtenerCatalogo().find((p) => p.id === parseInt(id));
        if (!producto) {
            alert('Producto no encontrado.');
            navigate('/admin/mostrarproductos');
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
            alert('Error: El código debe tener un mínimo de 3 caracteres.');
            return;
        }
        if (nombre === '' || nombre.length > 100) {
            alert('Error: El nombre es obligatorio y máximo 100 caracteres.');
            return;
        }
        if (desc.length > 500) {
            alert('Error: La descripción máximo 500 caracteres.');
            return;
        }
        if (isNaN(precio) || precio < 0) {
            alert('Error: El precio debe ser mayor o igual a 0.');
            return;
        }
        if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
            alert('Error: El stock debe ser un número entero y mayor o igual a 0.');
            return;
        }
        if (stockCriticoInput !== '' && (isNaN(stockCritico) || stockCritico < 0 || !Number.isInteger(stockCritico))) {
            alert('Error: El stock crítico debe ser un número entero válido.');
            return;
        }

        const catalogo = obtenerCatalogo().map((p) =>
            p.id === parseInt(id)
                ? { ...p, codigo, nombre, desc, precio, stock, stockCritico, categoria: form.categoria, img }
                : p
        );

        guardarCatalogo(catalogo);
        alert('¡Producto actualizado con éxito!');
        navigate('/admin/mostrarproductos');
    };

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 p-md-5 admin-fondo-crear">
            <div className="p-4 p-md-5 mx-auto admin-caja-formulario">
                <div className="mb-4 p-2 text-center text-uppercase caja-gris fuente-palabras admin-titulo-formulario">
                    Editando producto
                </div>

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