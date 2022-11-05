import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import { Chart } from '@common/Chart';
import { useAuth } from '@hooks/useAuth';

import { useEffect } from 'react';

export default function Dashboard () {
    
    const { verifyAuthentication }= useAuth();
   
    useEffect(() => {       
        verifyAuthentication();        
      }, []);
	

    const { data: allProducts} = useFetch(endPoints.products.getList(0,0));
    const categoryNames = allProducts?.map((product) => product.category.name);

    const reducer = (acumulatorObject, current) => {
        if (acumulatorObject[current]){
        acumulatorObject[current] += 1 //Si la categoria actual 'current' ya existía en el objeto acumulador, entonces incrementamos uno a su valor.
        } else {
        acumulatorObject[current] = 1 //Si no existía, creamos la clave y le asignamos uno.
        }
        return acumulatorObject; //retornamos el objeto acumulador actualizado.
    };
    const categoryOccurence = categoryNames.reduce(reducer, {})

    const data = {
    datasets: [
        {
        label: 'Categories',
        data: categoryOccurence,
        borderWidth: 2,
        backgroundColor: ['#d32244', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
        },
    ],
    };

	return(
		<>
            <Chart className="mb-8 mt-2" chartData={data} />
		</>
	);
}