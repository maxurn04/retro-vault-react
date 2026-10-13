import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Blogs from '../../views/Blogs';
import { MemoryRouter } from 'react-router-dom';

describe('Vista Blogs', () => {
  it('renderiza la vista de blogs', () => {
    render(<Blogs />);
    expect(screen.getByText(/blogs retrovault/i)).toBeInTheDocument();
  });


//para comprobar si muestra los blogs disponibles
  it('renderiza la lista de blogs disponibles', () => {
      render(
        <MemoryRouter>
          <Blogs />
        </MemoryRouter>
      );
      const publicaciones = screen.getAllByRole('heading');
      expect(publicaciones.length).toBeGreaterThan(1);
    });
  });