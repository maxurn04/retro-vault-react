import { describe, it,expect } from "vitest";
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Registro from '../../views/Registro';
import { ProveedorUsuario } from '../../contexto/ContextoUsuario';

//cargar correctamente la vista de Inicio.

describe('view de registro de usuario', () => {
    it('comprueba que la pagina de registro de user se renderize correctamente', () =>{
        render(
            <ProveedorUsuario>
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
            </ProveedorUsuario>
        );
        expect(screen.getByText(/Registro de usuario/i)).toBeInTheDocument();
    });
});