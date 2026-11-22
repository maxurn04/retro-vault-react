import { contactoApi } from './api';

class ContactoService {
    async enviarMensaje(datosContacto) {
        const response = await contactoApi.post('/contacto', datosContacto);
        return response.data;
    }
}

export default new ContactoService();
