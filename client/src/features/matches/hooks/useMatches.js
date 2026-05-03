import { useCallback } from 'react';
import { useApi } from '../../../core/hooks/useApi';

export const useMatches = () => {
  const { loading, error, get, post, put, del } = useApi();

  const fetchMatches = useCallback(async (params = {}) => {
    const res = await get('/matches', params);
    return res.data;
  }, [get]);

  const fetchLatestMatch = useCallback(async () => {
    const res = await get('/matches/latest');
    return res.data;
  }, [get]);

  const fetchNextMatch = useCallback(async () => {
    const res = await get('/matches/next');
    return res.data;
  }, [get]);

  const fetchMatchById = useCallback(async (id) => {
    const res = await get(`/matches/${id}`);
    return res.data;
  }, [get]);

  const fetchMatchesByTeam = useCallback(async (teamId, params = {}) => {
    const res = await get(`/matches/team/${teamId}`, params);
    return res.data;
  }, [get]);

  const createMatch = useCallback(async (data) => {
    const res = await post('/matches', data);
    return res.data;
  }, [post]);

  const updateMatch = useCallback(async (id, data) => {
    const res = await put(`/matches/${id}`, data);
    return res.data;
  }, [put]);

  const updateScore = useCallback(async (id, data) => {
    const res = await put(`/matches/${id}/score`, data);
    return res.data;
  }, [put]);

  const finishMatch = useCallback(async (id, data) => {
    const res = await put(`/matches/${id}/finish`, data);
    return res.data;
  }, [put]);

  const deleteMatch = useCallback(async (id) => {
    await del(`/matches/${id}`);
  }, [del]);

  return {
    loading,
    error,
    fetchMatches,
    fetchLatestMatch,
    fetchNextMatch,
    fetchMatchById,
    fetchMatchesByTeam,
    createMatch,
    updateMatch,
    updateScore,
    finishMatch,
    deleteMatch
  };
};