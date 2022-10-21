import axios from 'axios'; //Se usa axios para hacer las peticiones
import endPoints from '@services/api';


const deleteProduct = async (id) => {
    const response = await axios.delete(endPoints.products.deleteProduct(id));
    return response.data; //data contiene la respuesta del servidor
};

export { deleteProduct };