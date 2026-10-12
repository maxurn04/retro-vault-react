const datos = [
    { mes: 'May', ventas: 820000, ganancias: 310000 },
    { mes: 'Jun', ventas: 940000, ganancias: 360000 },
    { mes: 'Jul', ventas: 880000, ganancias: 330000 },
    { mes: 'Ago', ventas: 1120000, ganancias: 450000 },
    { mes: 'Sep', ventas: 1260000, ganancias: 520000 },
    { mes: 'Oct', ventas: 1390000, ganancias: 580000 },
    { mes: 'Nov', ventas: 1500000, ganancias: 630000, proyeccion: true },
    { mes: 'Dic', ventas: 1750000, ganancias: 740000, proyeccion: true },
    { mes: 'Ene', ventas: 1450000, ganancias: 600000, proyeccion: true }
];

const rayado = {
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.45) 0 6px, transparent 6px 12px)'
};

const clp = (valor) => `CLP$${valor.toLocaleString('es-CL')}`;
const millones = (valor) => `${(valor / 1000000).toFixed(1)}M`;

const Reportes = () => {
    const reales = datos.filter((d) => !d.proyeccion);
    const proyectados = datos.filter((d) => d.proyeccion);

    const ventasTotales = reales.reduce((suma, d) => suma + d.ventas, 0);
    const gananciasTotales = reales.reduce((suma, d) => suma + d.ganancias, 0);
    const ventasProyectadas = proyectados.reduce((suma, d) => suma + d.ventas, 0);
    const maximo = Math.max(...datos.map((d) => d.ventas));

    const resumen = [
        { titulo: 'Ventas (últimos 6 meses)', valor: clp(ventasTotales), clase: 'bg-primary' },
        { titulo: 'Ganancias (últimos 6 meses)', valor: clp(gananciasTotales), clase: 'bg-success' },
        { titulo: 'Proyección ventas (3 meses)', valor: clp(ventasProyectadas), clase: 'bg-warning' }
    ];

    return (
        <main className="col-12 col-md-9 col-xl-10 p-4 admin-contenido-principal">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fuente-palabras mb-3 mb-md-0 admin-titulo-pagina">Reportes</h2>
            </div>

            <div className="row g-3 mb-4">
                {resumen.map((r) => (
                    <div key={r.titulo} className="col-12 col-md-4">
                        <div className={`card border-0 text-white h-100 ${r.clase}`}>
                            <div className="card-body">
                                <div className="small">{r.titulo}</div>
                                <div className="fs-4 fw-bold">{r.valor}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 admin-caja-tabla">
                <div style={{ minWidth: '600px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3 pb-2" style={{ borderBottom: '2px solid #999999', color: '#333333' }}>
                        <h5 className="fuente-palabras mb-0">Ventas y ganancias mensuales</h5>
                        <div className="d-flex gap-3 small">
                            <span><span className="d-inline-block bg-primary me-1" style={{ width: '12px', height: '12px' }}></span>Ventas</span>
                            <span><span className="d-inline-block bg-success me-1" style={{ width: '12px', height: '12px' }}></span>Ganancias</span>
                            <span><span className="d-inline-block bg-secondary me-1" style={{ width: '12px', height: '12px', ...rayado }}></span>Proyección</span>
                        </div>
                    </div>

                    <div className="d-flex align-items-end justify-content-around" style={{ height: '260px', borderBottom: '1px solid #999999' }}>
                        {datos.map((d) => (
                            <div key={d.mes} className="d-flex align-items-end gap-1 h-100">
                                <div className="d-flex flex-column justify-content-end align-items-center h-100">
                                    <span style={{ fontSize: '0.7rem', color: '#333333' }}>{millones(d.ventas)}</span>
                                    <div
                                        className="bg-primary"
                                        title={`${d.mes} - Ventas: ${clp(d.ventas)}`}
                                        style={{ width: '24px', height: `${(d.ventas / maximo) * 85}%`, ...(d.proyeccion ? rayado : {}) }}
                                    ></div>
                                </div>
                                <div className="d-flex flex-column justify-content-end align-items-center h-100">
                                    <span style={{ fontSize: '0.7rem', color: '#333333' }}>{millones(d.ganancias)}</span>
                                    <div
                                        className="bg-success"
                                        title={`${d.mes} - Ganancias: ${clp(d.ganancias)}`}
                                        style={{ width: '24px', height: `${(d.ganancias / maximo) * 85}%`, ...(d.proyeccion ? rayado : {}) }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-around mt-2" style={{ color: '#333333' }}>
                        {datos.map((d) => (
                            <span key={d.mes} className={`small fw-bold ${d.proyeccion ? 'fst-italic' : ''}`}>{d.mes}</span>
                        ))}
                    </div>

                    <p className="small text-muted mt-3 mb-0">Datos de ejemplo. Los meses con rayas son proyecciones.</p>
                </div>
            </div>
        </main>
    );
};

export default Reportes;