import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminService from '../../services/AdminService';

const CrearCategoria = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await AdminService.crearCategoria({ nombre: nombre.trim() });
            navigate('/admin/categorias');
        } catch (err) {
            setError(err.response?.data?.error || 'No se pudo crear la categoría.');
        }
    };

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 p-md-5 admin-fondo-crear">
            <div className="p-4 p-md-5 mx-auto admin-caja-formulario">
                <div className="mb-4 p-2 text-center text-uppercase caja-gris fuente-palabras admin-titulo-formulario">
                    Crear nueva categoría
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
                        <button type="submit" className="btn text-uppercase px-5 py-2 admin-btn-registrar">Registrar</button>
                        <Link to="/admin/categorias" className="btn text-uppercase px-5 py-2 admin-btn-registrar">Cancelar</Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CrearCategoria;