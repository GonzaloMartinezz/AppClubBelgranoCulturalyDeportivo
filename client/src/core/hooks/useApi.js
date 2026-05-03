import { useState, useCallback } from 'react';
import api from '../api/client';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null, params = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const config = params ? { params } : {};
      let response;
      
      switch (method.toUpperCase()) {
        case 'GET':
          response = await api.get(url, config);
          break;
        case 'POST':
          response = await api.post(url, data);
          break;
        case 'PUT':
          response = await api.put(url, data);
          break;
        case 'DELETE':
          response = await api.delete(url);
          break;
        default:
          throw new Error('Invalid method');
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url, params) => request('GET', url, null, params), [request]);
  const post = useCallback((url, data) => request('POST', url, data), [request]);
  const put = useCallback((url, data) => request('PUT', url, data), [request]);
  const del = useCallback((url) => request('DELETE', url), [request]);

  return { loading, error, get, post, put, del, setError };
};