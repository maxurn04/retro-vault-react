import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../views/Home';
import { ProveedorUsuario } from '../../contexto/ContextoUsuario';
import { ProveedorCarrito } from '../../contexto/ContextoCarrito';


// para ver si se renderiza la seccion de objetos destacados en la vista Home (index)
describe('Vista Home', () => {
  it('renderiza la seccion de objetos destacados', () => {
    render(
      <ProveedorUsuario>
        <ProveedorCarrito>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </ProveedorCarrito>
      </ProveedorUsuario>
    );
    expect(screen.getByText('Objetos Destacados')).toBeInTheDocument();
  });
});