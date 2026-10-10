import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Blog from '../../views/Blog';

describe('Vista Blog', () => {
  it('renderiza la vista de blogs', () => {
    render(<Blog />);
    expect(screen.getByText('Blogs RetroVault')).toBeInTheDocument();
  });
});