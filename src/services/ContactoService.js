import { contactoApi } from './api';

class ContactoService {
    async enviarMensaje(datosContacto) {
        const response = await contactoApi.post('/contacto', datosContacto);
        return response.data;
    }

    async listarMensajes() {
    const response = await contactoApi.get('/contacto');
    return response.data;
    }
}



export default new ContactoService();
