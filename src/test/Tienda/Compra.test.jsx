import { describe, it,expect } from "vitest";
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Compra from '../../views/compra';
import { ProveedorCarrito } from "../../contexto/ContextoCarrito";
import { ProveedorUsuario } from "../../contexto/ContextoUsuario";

//cargar correctamente la vista de COMPRA.

describe('VISTA COMPRA', () => {
    it('comprueba que la COMPRA se renderize correctamente', () =>{
        render(
        <ProveedorUsuario>
            <ProveedorCarrito>
                <MemoryRouter>
                    <Compra />
                </MemoryRouter>
            </ProveedorCarrito>
        </ProveedorUsuario>
        );
        expect(screen.getByText('Checkout de Compra')).toBeInTheDocument();
    });
});