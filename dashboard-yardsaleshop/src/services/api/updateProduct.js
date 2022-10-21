import axios from 'axios'; //Se usa axios para hacer las peticiones
import endPoints from '@services/api';


const updateProduct = async (id, body) => {
    const config = {
        headers: {
            accept: '*/*', //Permite cualquier petición
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.put(endPoints.products.putProduct(id), body, config);
    return response.data; //data contiene la respuesta del servidor
};

export { updateProduct };