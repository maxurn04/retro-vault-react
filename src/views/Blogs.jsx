import React, { useState, useEffect } from 'react';
import CatalogoService from '../services/CatalogoService';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        CatalogoService.obtenerBlogs()
            .then(data => setBlogs(data || []))
            .catch(() => {});
    }, []);

    return (
        <main>
            <div className="container my-5">
                <h1 className="text-center fuente-palabras" style={{ color: '#3f4738' }}>Blogs RetroVault</h1>

                {blogs.length > 0 ? (
                    blogs.map((b) => (
                        <div key={b.id} className="caja-gris row align-items-center mt-4">
                            <div className="col-md-7">
                                <h3 className="fuente-palabras">{b.titulo}</h3>
                                <p className="fuente-palabras-slim small text-warning mb-1">
                                    Por {b.autor || 'Admin'} - {b.fechaPublicacion || ''}
                                </p>
                                <p className="fuente-palabras-slim">
                                    {b.contenido ? b.contenido.substring(0, 160) + '...' : ''}
                                </p>
                                <button className="btn btn-light boton-reini mt-2" type="button" data-bs-toggle="collapse" data-bs-target={`#caso${b.id}`}>
                                    Ver Caso
                                </button>
                                <div id={`caso${b.id}`} className="collapse mt-3">
                                    <p className="fuente-palabras-slim">
                                        {b.contenido}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-5 text-center mt-3 mt-md-0">
                                <img src={b.imagenUrl || '/img/logoRV.jpg'} alt={b.titulo} className="imagen-productos-grande" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="caja-gris row align-items-center mt-4">
                        <div className="col-md-7">
                            <h3 className="fuente-palabras">Blog #1</h3>
                            <p className="fuente-palabras-slim">
                                Retro Vault cierra su primer trimestre de operaciones con resultados que superaron las expectativas del equipo fundador.
                            </p>
                            <button className="btn btn-light boton-reini mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#caso1">
                                Ver Caso
                            </button>
                            <div id="caso1" className="collapse mt-3">
                                <p className="fuente-palabras-slim">
                                    Desde la apertura de la sucursal, hemos visto llegar cada semana a más personas con consolas y juegos guardados por años, buscando venderlos, cambiarlos por crédito o simplemente darles una segunda vida en manos de otro coleccionista.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-5 text-center mt-3 mt-md-0">
                            <img src="/img/logoRV.jpg" alt="Caso Curioso 1" className="imagen-productos-grande" />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Blogs;
