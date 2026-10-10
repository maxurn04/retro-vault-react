import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Nosotros from '../../views/Nosotros';

//carga correctamente la vista de nosotros.
describe('Vista Nosotros', () => {
  it('renderiza la seccion sobre nosotros', () => {
    render(<Nosotros />);
    expect(screen.getByText('Sobre Nosotros')).toBeInTheDocument();
  });
});