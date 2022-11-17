import { useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { addProduct } from '@services/api/addProduct';
import { useAuth } from '@hooks/useAuth';
import endPoints from '@services/api';
import { updateProduct } from '@services/api/updateProduct';

export default function FormProduct({ setOpen, setProducts, product }) {
  const { setAlert } = useAuth();
  const formRef = useRef();
  const router = useRouter();

  console.log(product);
  const handleSumit = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    //Destructurar los datos
    const data = {
      title: formData.get('title'), //Se pasa el nombre del elemento
      price: parseInt(formData.get('price')), //Se transforma en valor numérico
      description: formData.get('description'),
      categoryId: parseInt(formData.get('category')),
      images: [formData.get('images').name || product?.images /* || "https://api.lorem.space/image/shoes?w=640&h=480&r=6261" */],
    };

    if (product) {
      updateProduct(product.id, data)
        .then(() => {
          console.log(data);
          setAlert({
            active: true,
            message: 'Product edited succesfully',
            type: 'success-edited',
            autoClose: false,
          });
          router.push('/dashboard/products');
        })
        .catch((err) => {
          setAlert({
            active: true,
            message: `Ups! ${err.response.data.message}`,
            type: 'error',
            autoClose: false,
          });
          router.push('/dashboard/products');
        });
    } else {
      addProduct(data)
        .then((resp) => {
          console.log(resp);
          setAlert({
            active: true,
            message: 'Product added succesfully',
            type: 'success-added',
            autoClose: true,
          });
          setOpen(false);
          router.push('/dashboard/products');
        })
        .catch((err) => {
          console.log(err);
          setAlert({
            active: true,
            message: `Ups! ${err.response.data.message}`,
            type: 'error',
            autoClose: false,
          });
          setOpen(false);
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
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSumit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-2 sm:grap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={product?.title}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                defaultValue={product?.price}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                /* autoComplete="category-name" */
                defaultValue={product?.category?.id}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Toys</option>
                <option value="5">Others</option>
              </select>
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                autoComplete="description"
                rows="3"
                defaultValue={product?.description}
                className="form-textarea mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {/* Upload product image section */}
            <div className="col-span-6">
              <div>
                <div className="block text-sm font-medium text-gray-700">Cover photo</div>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {/* {  product && (<span className="space-y-1 text-center"> `${product.images[0]}`</span> )
                    } */}
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          className="sr-only"
                          /* defaultValue={product?.images} */
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
