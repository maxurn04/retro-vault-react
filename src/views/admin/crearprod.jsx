import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerCatalogo, guardarCatalogo, obtenerCategorias } from '../../data/catalogoAdmin';

const CrearProd = () => {
    const navigate = useNavigate();
    const categorias = obtenerCategorias();
    const [form, setForm] = useState({
        nombre: '', codigo: '', precio: '', stock: '', stockCritico: '', desc: '', categoria: '', img: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const catalogo = obtenerCatalogo();
        const nuevoId = catalogo.length > 0 ? Number(catalogo[catalogo.length - 1].id) + 1 : 1;

        catalogo.push({
            id: nuevoId,
            codigo: form.codigo,
            nombre: form.nombre,
            desc: form.desc,
            precio: parseFloat(form.precio),
            stock: parseInt(form.stock),
            stockCritico: parseInt(form.stockCritico) || 0,
            categoria: form.categoria,
            img: form.img === '' ? '/img/tiendaplaceholde.png' : form.img
        });

        guardarCatalogo(catalogo);
        alert('Producto creado.');
        navigate('/admin/mostrarproductos');
    };

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 p-md-5 admin-fondo-crear">
            <div className="p-4 p-md-5 mx-auto admin-caja-formulario">
                <div className="mb-4 p-2 text-center text-uppercase caja-gris fuente-palabras admin-titulo-formulario">
                    Crear nuevo producto
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
                                <option value="Consolas">Consolas</option>
                                <option value="Juegos">Juegos</option>
                                <option value="Accesorios">Accesorios</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label text-uppercase admin-etiqueta-form">Ruta de la imagen</label>
                            <input type="text" name="img" className="form-control rounded-0 border-dark" placeholder="/img/ejemplo.jpg" value={form.img} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="text-center mt-5 pt-3">
                        <button type="submit" className="btn text-uppercase px-5 py-2 admin-btn-registrar">Registrar</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CrearProd;