import axios from 'axios'; //Se usa axios para hacer las peticiones
import endPoints from '@services/api';

const addProduct = async (body) => {
  const config = {
    headers: {
      accept: '*/*', //Permite cualquier petición
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.products.postProducts, body, config);
  return response.data; //data contiene la respuesta del servidor
};

export { addProduct };
