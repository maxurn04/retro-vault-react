import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from './views/Inicio';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Registro from './views/Registro';
import Nosotros from './views/Nosotros';
import Blogs from './views/Blogs';
import Contacto from './views/Contacto';
import Productos from './views/Productos';
import ProductosAccesorios from './views/ProductosAccesorios';
import ProductosConsolas from './views/ProductosConsolas';
import DetalleProducto from './views/DetalleProducto';

import Carrito from './views/Carrito';
import { ProveedorCarrito } from './contexto/ContextoCarrito';
import { ProveedorUsuario } from './contexto/ContextoUsuario';
import Categorias from './views/Categorias';
import Ofertas from './views/Ofertas';
import Comprar from './views/compra';
import PagoExito from './views/pagoExito';
import PagoMalo from './views/PagoMalo';

import './App.css';

const App = () => {
  return (
    <ProveedorUsuario>
      <ProveedorCarrito>
        <Router>
          <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos-accesorios" element={<ProductosAccesorios />} />
        <Route path="/productos-cons-jueg" element={<ProductosConsolas />} />
        <Route path="/detalleprod/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/compra" element={<Comprar />} />
        <Route path="/pago-exito" element={<PagoExito />} />
        <Route path="/pago-malo" element={<PagoMalo />} />
      </Routes>

      <Footer />
    </Router>
      </ProveedorCarrito>
    </ProveedorUsuario>
  );
};

export default App;