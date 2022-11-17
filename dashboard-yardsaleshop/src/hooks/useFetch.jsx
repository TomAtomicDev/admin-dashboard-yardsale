import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [errorFetch, setErrorFetch] = useState(false);

  async function fetchData() {
    const response = await axios.get(url);
    setData(response.data);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log(err);
      setErrorFetch(true);
    }
  }, []);

  return {
    data,
    errorFetch,
  };
};

export default useFetch;
