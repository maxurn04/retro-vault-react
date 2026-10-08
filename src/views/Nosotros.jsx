import React from 'react';

const Nosotros = () => {
    return (
        <main>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <h1 className="text-center fuente-palabras" style={{ color: '#eff6ee' }}>Sobre Nosotros</h1>
                        <p className="fuente-palabras-slim mt-4 mx-auto" style={{ maxWidth: '700px', color: '#eff6ee', textAlign: 'justify', fontSize: 'large' }}>
                            Somos una bóveda de nostalgia gamer, nacida en Chile en 2026 de la mano de un grupo de amigos apasionados por las consolas de antaño. Cansados de ver cómo la nostalgia se perdía en cajones y bodegas, decidimos crear un espacio donde esos títulos que marcaron nuestra infancia pudieran tener una segunda vida.
                            <br /><br />
                            Contamos con una única sucursal física, donde vendemos, compramos y recibimos consolas y videojuegos retro. Ya sea que quieras hacerte con una pieza para tu colección, o que tengas guardada una consola que ya no usas y quieras darle una nueva vida, aquí encontrarás un espacio pensado para eso.
                            <br /><br />
                            Cada equipo que pasa por nuestras manos es revisado y probado antes de llegar a las tuyas, para asegurarnos de que, cuando la enciendas, la experiencia sea tan buena como la recuerdas.
                            <br /><br />
                            Más que una tienda, somos un punto de encuentro para quienes crecieron con un control en la mano y quieren volver a sentir esa magia.
                        </p>
                        <p className="text-center fuente-palabras-slim mx-auto" style={{ maxWidth: '700px', color: '#eff6ee', fontSize: 'large' }}>
                            ¡Gracias por ser parte de esta bóveda de recuerdos!
                        </p>
                    </div>
                </div>
        
                <hr className="linea-separacion" />
                
                <div className="row mt-4 mb-5">
                    <div className="col-12">
                        <h2 className="text-center fuente-palabras" style={{ color: '#eff6ee' }}>Equipo</h2>
                    </div>
        
                    <div className="col-md-6 mt-4 text-center">
                        <div className="caja-peque cuadrado-grande mx-auto" style={{ height: 'auto', maxWidth: '320px' }}>
                            <img src="/img/iconons1.jpeg" alt="Integrante del equipo" className="imagen-nosotros mb-3" />
                            <p className="fuente-palabras mb-0">Maxcel Valencia</p>
                            <p className="fuente-palabras-slim">Desarrollador</p>
                        </div>
                    </div>
        
                    <div className="col-md-6 mt-4 text-center">
                        <div className="caja-peque cuadrado-grande mx-auto" style={{ height: 'auto', maxWidth: '320px' }}>
                            <img src="/img/iconons2.jpg" alt="Integrante del equipo" className="imagen-nosotros mb-3" />
                            <p className="fuente-palabras mb-0">Maximiliano Urrutia</p>
                            <p className="fuente-palabras-slim">Desarrollador</p>
                        </div>
                    </div>
                </div>
        
            </div>
            <div className="container my-5">
                <h1 className="text-center fw-bold mb-4" style={{ color: '#968732' }}>Preguntas Frecuentes (FAQ)</h1>

                <div className="accordion" id="faqAccordion">
                    <div className="accordion-item item-faq">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                <span className="letra-pregunta">Q.</span> ¿Compran consolas y juegos usados?
                            </button>
                        </h2>
                        <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                <span className="letra-respuesta">A.</span> Sí, compramos y recibimos consolas y videojuegos retro que ya no uses. Si tienes equipos guardados, contáctanos a traves de nuestro formulario web y te contamos cómo funciona el proceso.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item item-faq">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                <span className="letra-pregunta">Q.</span> ¿Tienen tienda física o solo venden online?
                            </button>
                        </h2>
                        <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                <span className="letra-respuesta">A.</span> Contamos con una única sucursal física en Santiago, donde puedes ver, probar y retirar tus productos en persona.
                            </div>
                        </div>
                    </div>
                    
                    <div className="accordion-item item-faq">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                <span className="letra-pregunta">Q.</span> ¿Las consolas vienen con garantía?
                            </button>
                        </h2>
                        <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                <span className="letra-respuesta">A.</span> Cada consola pasa por una revisión y prueba antes de ser puesta a la venta, así que puedes comprar con confianza. Consulta las condiciones específicas de garantía al momento de tu compra.
                            </div>
                        </div>
                    </div>
                    
                    <div className="accordion-item item-faq">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                <span className="letra-pregunta">Q.</span> ¿Qué métodos de pago aceptan?
                            </button>
                        </h2>
                        <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                <span className="letra-respuesta">A.</span> Aceptamos Visa, Mastercard y Mercado Pago, tanto en compras presenciales como en línea.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Nosotros;