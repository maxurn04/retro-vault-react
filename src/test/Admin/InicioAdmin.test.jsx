import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InicioAdmin from '../../views/admin/inicioadmin';
import AdminService from '../../services/AdminService';

vi.mock('../../services/AdminService', () => ({
    default: { obtenerMetricasDashboard: vi.fn() }
}));

const metricas = {
    totalCompras: 7, ingresosTotales: 150000, productosInventario: 3,
    stockTotalUnidades: 30, usuariosRegistrados: 2, productosCriticosAlerta: 4
};

describe('vista admin del dashboard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('muestra compras e ingresos totales del backend', async () => {
        AdminService.obtenerMetricasDashboard.mockResolvedValue(metricas);
        render(<MemoryRouter><InicioAdmin /></MemoryRouter>);
        expect(await screen.findByText('7')).toBeInTheDocument();
        expect(screen.getByText('CLP$150.000')).toBeInTheDocument();
    });

    it('muestra la cantidad de productos y el inventario total', async () => {
        AdminService.obtenerMetricasDashboard.mockResolvedValue(metricas);
        render(<MemoryRouter><InicioAdmin /></MemoryRouter>);
        expect(await screen.findByText('3')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('muestra usuarios registrados y productos en stock crítico', async () => {
        AdminService.obtenerMetricasDashboard.mockResolvedValue(metricas);
        render(<MemoryRouter><InicioAdmin /></MemoryRouter>);
        expect(await screen.findByText('2')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('muestra un aviso si no se pueden cargar las métricas', async () => {
        AdminService.obtenerMetricasDashboard.mockRejectedValue(new Error('fallo'));
        render(<MemoryRouter><InicioAdmin /></MemoryRouter>);
        expect(await screen.findByText(/no se pudieron cargar las métricas/i)).toBeInTheDocument();
    });
});