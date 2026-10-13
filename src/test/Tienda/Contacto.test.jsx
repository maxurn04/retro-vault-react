import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contacto from '../../views/Contacto';

describe('Vista Contacto', () => {
  it('renderiza la pagina y el formulario', () => {
    render(<Contacto />);
    expect(screen.getByText('Enviar Mensaje')).toBeInTheDocument();
  });
});