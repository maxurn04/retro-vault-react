import { describe, it,expect } from "vitest";
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Inicio from '../../views/Inicio'
import { ProveedorUsuario } from "../../contexto/ContextoUsuario";

//cargar correctamente la vista de Inicio.

describe('VISTA Inicio', () => {
    it('comprueba que la pagina de Inicio sesion se renderize bien', () =>{
        render(
        <ProveedorUsuario>
            <MemoryRouter>
                <Inicio />
            </MemoryRouter>
        </ProveedorUsuario>
        );
        expect(screen.getByText(/inicio de sesion/i)).toBeInTheDocument();
    });
});