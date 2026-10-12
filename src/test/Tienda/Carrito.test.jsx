import { describe, it,expect } from "vitest";
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Carrito from '../../views/Carrito'
import { ProveedorCarrito } from "../../contexto/ContextoCarrito";

//cargar correctamente la vista de CARRITO.

describe('Vista Carrito', () => {
    it('comprueba que el carrito se renderize correctamente', () =>{
        render(
        <ProveedorCarrito>
            <MemoryRouter>
                <Carrito />
            </MemoryRouter>
        </ProveedorCarrito>
        );
        expect(screen.getByText('Tu Carrito de Compras')).toBeInTheDocument();
    });
});