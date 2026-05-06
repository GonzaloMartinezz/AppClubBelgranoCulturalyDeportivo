import { useCallback } from 'react';
import { useApi } from '../../../core/hooks/useApi';

export const usePlayers = () => {
  const { loading, error, get, post, put, del } = useApi();

  const fetchPlayers = useCallback(async (params = {}) => {
    const res = await get('/players', params);
    return res.data;
  }, [get]);

  const fetchPlayerById = useCallback(async (id) => {
    const res = await get(`/players/${id}`);
    return res.data;
  }, [get]);

  const fetchPlayersByTeam = useCallback(async (teamId) => {
    const res = await get(`/players/team/${teamId}`);
    return res.data;
  }, [get]);

  const createPlayer = useCallback(async (data) => {
    const res = await post('/players', data);
    return res.data;
  }, [post]);

  const updatePlayer = useCallback(async (id, data) => {
    const res = await put(`/players/${id}`, data);
    return res.data;
  }, [put]);

  const deletePlayer = useCallback(async (id) => {
    await del(`/players/${id}`);
  }, [del]);

  return {
    loading,
    error,
    fetchPlayers,
    fetchPlayerById,
    fetchPlayersByTeam,
    createPlayer,
    updatePlayer,
    deletePlayer
  };
};