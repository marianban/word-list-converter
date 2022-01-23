import { useCallback, useState, useEffect } from 'react';

const requestStatuses = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const useGet = (url, initialData) => {
  const [status, setStatus] = useState(requestStatuses.INITIAL);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState('');

  const get = useCallback(
    async (signal) => {
      try {
        setStatus(requestStatuses.LOADING);

        const response = await fetch(url, { signal });

        if (response.ok) {
          const data = await response.json();
          setData(data);
          setStatus(requestStatuses.SUCCESS);
        } else {
          // server reached but request failed
          const errMsg = `Failed to fetch words with status code: ${response.status}`;
          console.error(errMsg);
          setStatus(requestStatuses.ERROR);
          setError(errMsg);
        }
      } catch (e) {
        if (e.name === 'AbortError') {
          // we know it's been canceled!
        } else {
          // network issue
          setStatus(requestStatuses.ERROR);
          setError(e.toString());
        }
      }
    },
    [url, setData]
  );

  useEffect(() => {
    const controller = new AbortController();

    get(controller.signal);

    return () => {
      controller.abort();
    };
  }, [get]);

  const isInitial = status === requestStatuses.INITIAL;
  const isError = status === requestStatuses.ERROR;
  const isSuccess = status === requestStatuses.SUCCESS;
  const isLoading = status === requestStatuses.LOADING;

  return { get, isError, isLoading, isSuccess, isInitial, data, error };
};
