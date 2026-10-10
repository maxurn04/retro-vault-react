import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Categorias from '../../views/Categorias';

describe('Vista Categorias', () => {
  it('renderiza el catalogo por categorias', () => {
    render(
      <MemoryRouter>
        <Categorias />
      </MemoryRouter>
    );
    expect(screen.getByText('Nuestras Categorías')).toBeInTheDocument();
  });
});