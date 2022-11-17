import { useAuth } from '@hooks/useAuth';
import { deleteProduct } from '@services/api/deleteProduct';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import axios from 'axios';
import endPoints from '@services/api';

function ProductTable({ products, setProducts, productLimit }) {
  const { currentPage, setAlert } = useAuth();
  const firstProduct = (currentPage - 1) * productLimit;
  const lastProduct = firstProduct + productLimit;

  const visibleProducts = products.slice(firstProduct, lastProduct);

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        window.scrollTo(0, 0);
        setAlert({
          active: true,
          message: 'Product deleted successfully',
          type: 'success-deleted',
          autoClose: true,
        });
      })
      .finally(() => {
        const fetchAgain = async () => {
          try {
            const resp = await axios.get(endPoints.products.getList(0, 0));
            setProducts(resp.data);
          } catch (error) {
            console.log(error.message);
            return;
          }
        };
        fetchAgain();
      });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="hidden md:inline px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category
          </th>
          <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price
          </th>
          <th scope="col" className="hidden sm:inline px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Delete</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {visibleProducts?.map((product) => (
          <tr key={`Product-item-${product.id}`}>
            <td className="px-2 sm:px-6 py-4 whitespace-normal">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{product.title}</div>
                </div>
              </div>
            </td>
            <td className="hidden md:inline-flex px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.category.name}</div>
            </td>
            <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${product.price}</span>
            </td>
            <td className="hidden sm:inline-flex px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link href={`edit/${product.id}`}>
                <span className="text-indigo-600 hover:text-indigo-900 cursor-pointer">Edit</span>
              </Link>
            </td>
            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <XCircleIcon className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer" aria-hidden="true" onClick={() => handleDelete(product.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
