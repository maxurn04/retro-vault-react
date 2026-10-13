import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Categorias from '../../views/Categorias';

describe('Vista Categorias', () => {
  it('renderiza la pagina', () => {
    render(
      <MemoryRouter>
        <Categorias />
      </MemoryRouter>
    );
    expect(screen.getByText('Nuestras Categorías')).toBeInTheDocument();
  });

  //para ver si cargan las categorias disponibles
  it('renderiza las categorías disponibles', () => {
    render(
      <MemoryRouter>
        <Categorias />
      </MemoryRouter>
    );
    const titulos = screen.getAllByRole('heading');
    expect(titulos.length).toBeGreaterThan(1);
  });
});