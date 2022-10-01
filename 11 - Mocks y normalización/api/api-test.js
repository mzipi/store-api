import ContenedorMemoria from '../contenedores/ContenedorMemoria.js';
import { generarUsuario } from '../utils/generadorDeUsuarios.js';

class ApiTestMock extends ContenedorMemoria {
    constructor() {
        super()
    }

    popular(cant = 50) {
        const nuevos = [];
        for (let i = 1; i < cant; i++) {
            const nuevoUsuario = generarUsuario();
            const guardado = this.guardar(nuevoUsuario);
            nuevos.push(guardado);
        }
        return nuevos;
    }
}

export default ApiTestMock;