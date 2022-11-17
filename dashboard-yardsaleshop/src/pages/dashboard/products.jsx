import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import Pagination from '@components/Pagination';
import ProductTable from '@components/ProductTable';
import Modal from '@common/Modal';
import FormProduct from '@components/FormProduct';
import Alert from '@components/Alert';
import { useState, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { CheckIcon } from '@heroicons/react/20/solid';

export default function Products() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const { verifyAuthentication } = useAuth();

  const { data: allProducts } = useFetch(endPoints.products.getList(0, 0));

  useEffect(() => {
    verifyAuthentication();
  }, []);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const PRODUCT_LIMIT = 25;
  const totalPages = Math.ceil(products.length / PRODUCT_LIMIT);

  return (
    <>
      <Alert />
      {/* Componente Header Page */}
      <div className="pl-4 lg:flex lg:items-center lg:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">List of Products</h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setOpen(true)}
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Products
            </button>
          </span>
        </div>
      </div>

      {/* Componente Lista de productos */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Pagination totalPages={totalPages} />
              <ProductTable products={products} setProducts={setProducts} productLimit={PRODUCT_LIMIT} />
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormProduct setOpen={setOpen} setProducts={setProducts} />
      </Modal>
    </>
  );
}
