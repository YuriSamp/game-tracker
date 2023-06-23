import { errorHandler } from '@/lib/request/errorHandle';
import { request } from '@/lib/request/request';
import { useCallback, useEffect, useState } from 'react';

const INITIAL_STATE_DATA: any[] = [];
const INITIAL_STATE_ERROR = '';

export function useRequest<T>(endpoint: string) {
  const [data, setData] = useState<T>(INITIAL_STATE_DATA as T);
  const [error, setError] = useState(INITIAL_STATE_ERROR);
  const [isLoading, setIsloading] = useState(true);

  const apiCall = useCallback(async () => {
    setError('');
    setIsloading(true);
    try {
      const response = await request.get<T>(endpoint);
      setData(response.data);
    } catch (error) {
      const errMensage = errorHandler(error);
      setError(errMensage);
    }
    setIsloading(false);
  }, [setData, setError, setIsloading, endpoint]);

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  return { data, error, isLoading, refetch: apiCall };
}
