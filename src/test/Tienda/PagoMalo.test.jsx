import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import PagoMalo from '../../views/PagoMalo';

describe('Vista PagoMalo', () => {
  it('muestra aviso si no hay datos de pago reciente', () => {
    render(
      <MemoryRouter>
        <PagoMalo />
      </MemoryRouter>
    );

    expect(screen.getByText(/no hay información de pago reciente/i)).toBeInTheDocument();
  });
});
