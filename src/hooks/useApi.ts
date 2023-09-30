import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl =
  import.meta.env.PROD ?
    import.meta.env.VITE_API_BASE_URL_PROD :
    import.meta.env.VITE_API_BASE_URL_DEV;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

const useApi = () => {
  const [data, setData] = useState<[] | null>(null);
  const [error, setError] = useState<string | ''>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController | null>(null);


  // API_REQUEST is a function that takes in a config object, a success callback, and an error callback
  // The config object should have the following properties:
  // method: the HTTP method to use
  // url: the endpoint to hit
  // requestConfig: an object that contains the data and params properties
  // data: the data to send in the request body
  // params: the query parameters to send
  const API_REQUEST = async (
    config: {
      method: string,
      url: string,
      requestConfig?: {
        data?: any,
        params?: any,
      },
    },
    successCb: (data: any) => void,
    errorCb: (error: any) => void,
  ) => {
    const {
      method,
      url,
      requestConfig = {},
    } = config;

    try {
      setIsLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const res = await axiosInstance({
        method,
        url,
        data: requestConfig.data || {},
        params: requestConfig.params || {},
        signal: ctrl.signal,
      });

      setData(res.data.data);

      // If there is a success callback, call it with the data
      // success callback is used in components that need to react to the data returned from the API
      successCb && successCb(res.data.data);
    } catch (error: any | unknown) {
      setError(error);
      errorCb && errorCb(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {

    // cleanup function to cancel any pending requests when the component unmounts
    return () => controller?.abort();
  }, [controller]);

  return { data, error, isLoading, API_REQUEST };
}


export default useApi;