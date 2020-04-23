import { useState, useCallback, useRef, useEffect } from 'react';

// useEffect not only runs when some component re-renders, but also when a component unmounts
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // there can be a situation where we try to update state on a component that is not on the screen anymore
  // in such case, we'd want to cancel the ongoing HTTP request

  // a reference here is a piece of data which won't be changed when this function runs again
  // useRef stores data across the re-render cycles
  // we do not manage it via state (a state also would survive re-render cycles) because we don't want to update the UI when
  // we change this data
  const activeHttpRequests = useRef([]);
  // to avoid infinite loops, it is wrapped in useCallback
  // so this function never gets recreated when the component that uses this hook re-renders
  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);

    // AbortController is an API supported in modern browsers
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const response = await fetch(url, { method, body, headers, signal: httpAbortCtrl.signal });

      const responseData = await response.json();

      // remove the request controller used for this request
      // in this way we don't have any old request controllers
      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      return responseData;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  // it only runs when a component mounts
  useEffect(() => {
    // if you return a function here, it is executed as a "clean-up" function before the next time useEffect runs again
    // in our case, it only runs once because of the empty [], so it only runs when the component unmounts
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
