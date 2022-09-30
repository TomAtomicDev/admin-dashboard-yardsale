import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint) => {
    const [data, setData] = useState([]); 

    async function fetchData(){
        const response = await axios.get(endpoint); 
        setData(response.data);
    }
    //useEffect permite ejecutar el llamado cuando se necesite
    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            console.log(error); // no deberíamos usar conlogs sino Sentry JS para reportar errores
        }
    }, []); //El array debe estar vacío cuando no se usa Pagination

    return data;
};

export default useFetch;