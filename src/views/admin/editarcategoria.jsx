import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { obtenerCatalogo, guardarCatalogo, obtenerCategorias, guardarCategorias } from '../../data/catalogoAdmin';

const EditarCategoria = () => {
    const { nombre: original } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState(original);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!obtenerCategorias().includes(original)) {
            navigate('/admin/categorias');
        }
    }, [original, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const limpio = nombre.trim();
        const categorias = obtenerCategorias();

        if (categorias.some((c) => c !== original && c.toLowerCase() === limpio.toLowerCase())) {
            setError('Ya existe una categoría con ese nombre.');
            return;
        }

        guardarCategorias(categorias.map((c) => (c === original ? limpio : c)));
        guardarCatalogo(obtenerCatalogo().map((p) => (p.categoria === original ? { ...p, categoria: limpio } : p)));
        navigate('/admin/categorias');
    };

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 p-md-5 admin-fondo-crear">
            <div className="p-4 p-md-5 mx-auto admin-caja-formulario">
                <div className="mb-4 p-2 text-center text-uppercase caja-gris fuente-palabras admin-titulo-formulario">
                    Editando categoría
                </div>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-uppercase admin-etiqueta-form">Nombre de la categoría</label>
                        <input
                            type="text"
                            className="form-control rounded-0 border-dark"
                            maxLength="30"
                            required
                            value={nombre}
                            onChange={(e) => { setNombre(e.target.value); setError(''); }}
                        />
                    </div>

                    <div className="text-center mt-5 pt-3 d-flex justify-content-center gap-3 flex-wrap">
                        <button type="submit" className="btn text-uppercase px-5 py-2 admin-btn-registrar">Actualizar</button>
                        <Link to="/admin/categorias" className="btn text-uppercase px-5 py-2 admin-btn-registrar">Cancelar</Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default EditarCategoria;