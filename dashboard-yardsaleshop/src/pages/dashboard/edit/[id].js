import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';
import useAlert from '@hooks/useAlert';
import axios from 'axios';
import endPoints from '@services/api';
import FormProduct from '@components/FormProduct';

function Edit() {
  const router = useRouter();
  const { setAlert } = useAlert();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { verifyAuthentication } = useAuth();

  useEffect(() => {
    verifyAuthentication();
  }, []);

  useEffect(() => {
    setLoading(true);
    const { id } = router.query;
    if (!router.isReady) return;
    const getProduct = async () => {
      const response = await axios.get(endPoints.products.getProduct(id));
      return response.data;
    };

    getProduct()
      .then((res) => {
        setLoading(false);
        setProduct(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  }, [router?.isReady, router.query]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Not Found: request failed</h1>;
  }

  return <FormProduct product={product} setAlert={setAlert} />;
}

export default Edit;
