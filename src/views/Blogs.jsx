import React from 'react';

const Blogs = () => {
    return (
        <main>
            <div className="container my-5">
                <h1 className="text-center fuente-palabras" style={{ color: '#3f4738' }}>Blogs RetroVault</h1>

                <div className="caja-gris row align-items-center mt-4">
                    <div className="col-md-7">
                        <h3 className="fuente-palabras">Blog #1</h3>
                        <p className="fuente-palabras-slim">
                            Retro Vault cierra su primer trimestre de operaciones
                            con resultados que superaron las expectativas del equipo fundador.
                        </p>
                        <button className="btn btn-light boton-reini mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#caso1">
                            Ver Caso
                        </button>
                        <div id="caso1" className="collapse mt-3">
                            <p className="fuente-palabras-slim">
                                Desde la apertura de la sucursal, hemos visto llegar cada semana a más personas con consolas y juegos guardados por años, buscando venderlos, cambiarlos por crédito
                                o simplemente darles una segunda vida en manos de otro coleccionista.
                                Este movimiento confirma algo que sospechábamos desde el día uno: la fiebre por lo retro en Chile no es una moda pasajera.
                                Cada vez son más los que se acercan buscando ese título puntual que marcó su infancia, y no pocas veces terminan encontrando algo que ni siquiera sabían que buscaban.
                                De cara a los próximos meses, el equipo trabaja en ampliar el catálogo disponible y en mejorar los tiempos de revisión y prueba de los equipos que ingresan, 
                                para que cada consola que sale de la tienda funcione exactamente como se espera. Seguiremos compartiendo estos hitos aquí, en nuestra bóveda de recuerdos.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 text-center mt-3 mt-md-0">
                        <img src="/img/logoRV.jpg" alt="Caso Curioso 1" className="imagen-productos-grande" />
                    </div>
                </div>

                <div className="caja-gris row align-items-center mt-4">
                    <div className="col-md-7">
                        <h3 className="fuente-palabras">Blog #2</h3>
                        <p className="fuente-palabras-slim">
                            En el CES 2026, marcas como MyArcade y SEGA presentaron
                            nuevas consolas inspiradas en sus clásicos de los 90
                        </p>
                        <button className="btn btn-light boton-reini mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#caso2">
                            Ver Caso
                        </button>
                        <div id="caso2" className="collapse mt-3">
                            <p className="fuente-palabras-slim">
                                con pantallas mejoradas y conexión a internet, entre ellas un sistema retro portátil con licencias oficiales como Sonic y OutRun,
                                orientado a traer la experiencia arcade clásica al formato de bolsillo.
                                Además, en marzo Nintendo empezó a clasificar oficialmente la Wii U como "consola retro",
                                junto a la PlayStation 3 y la Xbox 360, y lanzó una promoción con 10% extra en crédito al entregar estas consolas antiguas.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 text-center mt-3 mt-md-0">
                        <img src="/img/segaCES.webp" alt="Caso Curioso 2" className="imagen-productos-grande" />
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Blogs;