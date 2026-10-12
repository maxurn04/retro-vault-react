import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Blogs from '../../views/Blogs';

describe('Vista Blogs', () => {
  it('renderiza la vista de blogs', () => {
    render(<Blogs />);
    expect(screen.getByText(/blogs retrovault/i)).toBeInTheDocument();
  });
});