import { describe, it,expect } from "vitest";
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import PagoExito from '../../views/pagoExito'
import { ProveedorCarrito } from "../../contexto/ContextoCarrito";

//cargar correctamente la vista de PAGO EXITO.

describe('VISTA PAGO EXITO (si hay pago)', () => {
    it('comprueba que la PAGO EXITO se renderize correctamente', () =>{
        render(
            <ProveedorCarrito>
                <MemoryRouter>
                    <PagoExito />
                </MemoryRouter>
            </ProveedorCarrito>
        );
        expect(screen.getByText(/no hay información de pago reciente/i)).toBeInTheDocument(); //por si hay tilde (si hay)
    });
});