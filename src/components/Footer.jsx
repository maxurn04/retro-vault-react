import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-estilo">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 columna-izq-footer">
                        <div className="enlaces-footer">
                            <span className="nombre-sitio p-2 fuente-palabras-slim">Retro Vault 2026</span>
                        </div>
                        <div>
                            <img src="/img/Visa-Logo.png" alt="Visa" height="40" className="me-2" /> | 
                            <img src="/img/MasterCard_Logo.webp" alt="Mastercard" height="40" className="me-2" /> | 
                            <img src="/img/mercado-pago-1.svg" alt="Mercado Pago" height="40" /> 
                        </div>
                    </div>
                    <div className="col-12 col-md-6 columna-der-footer">
                        <p className="fuente-palabras-slim texto-footer-ofertas">Quieres recibir ofertas en tu mail?</p>
                        <form>
                            <input type="email" placeholder="Ingresa Email" required />
                            <button className="btn btn-primary boton-footer" type="submit">Unete</button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;