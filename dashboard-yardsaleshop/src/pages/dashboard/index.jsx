import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import { Chart } from '@common/Chart';
import { useAuth } from '@hooks/useAuth';
import { NumericFormat } from 'react-number-format';
import { useEffect } from 'react';

export default function Dashboard() {
  const { verifyAuthentication } = useAuth();

  useEffect(() => {
    verifyAuthentication();
  }, []);

  const { data: allProducts } = useFetch(endPoints.products.getList(0, 0));
  const categoryNames = allProducts?.map((product) => product.category.name);

  const reducer = (acumulatorObject, current) => {
    if (acumulatorObject[current]) {
      acumulatorObject[current] += 1; //Si la categoria actual 'current' ya existía en el objeto acumulador, entonces incrementamos uno a su valor.
    } else {
      acumulatorObject[current] = 1; //Si no existía, creamos la clave y le asignamos uno.
    }
    return acumulatorObject; //retornamos el objeto acumulador actualizado.
  };
  const categoryOccurence = categoryNames.reduce(reducer, {});

  const calculateTotalPrice = () => {
    const totalPrice = allProducts.reduce((accumulator, product) => accumulator + product.price, 0);
    return totalPrice;
  };

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: categoryOccurence,
        borderWidth: 2,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
        borderRadius: 12,
      },
    ],
  };

  return (
    <>
      <h1 className="my-8 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">Products by Category</h1>
      <div className="mb-8 mt-2 px-4 sm:px-0">
        <Chart chartData={data} />
      </div>

      <h4 className="mt-4 text-xl text-center md:text-2xl">
        Total Count: <b className="text-primary">{allProducts.length} products</b>
      </h4>
      <h4 className="mt-4 text-xl text-center md:text-2xl">
        Inventory value:{' '}
        <b className="text-primary">
          <NumericFormat value={calculateTotalPrice()} thousandSeparator={true} prefix="$" displayType="text" />
        </b>
      </h4>
    </>
  );
}
