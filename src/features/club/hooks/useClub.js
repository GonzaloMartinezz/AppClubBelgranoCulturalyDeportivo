import { useCallback } from 'react';
import { useApi } from '../../../core/hooks/useApi';

export const useSponsors = () => {
  const { loading, error, get, post, put, del } = useApi();

  const fetchSponsors = useCallback(async (params = {}) => {
    const res = await get('/sponsors', params);
    return res.data;
  }, [get]);

  const fetchSponsorsForHome = useCallback(async () => {
    const res = await get('/sponsors/home');
    return res.data;
  }, [get]);

  const createSponsor = useCallback(async (data) => {
    const res = await post('/sponsors', data);
    return res.data;
  }, [post]);

  const updateSponsor = useCallback(async (id, data) => {
    const res = await put(`/sponsors/${id}`, data);
    return res.data;
  }, [put]);

  const deleteSponsor = useCallback(async (id) => {
    await del(`/sponsors/${id}`);
  }, [del]);

  return { loading, error, fetchSponsors, fetchSponsorsForHome, createSponsor, updateSponsor, deleteSponsor };
};

export const useStaff = () => {
  const { loading, error, get, post, put, del } = useApi();

  const fetchStaff = useCallback(async (params = {}) => {
    const res = await get('/staff', params);
    return res.data;
  }, [get]);

  const fetchStaffByTeam = useCallback(async (teamId) => {
    const res = await get(`/staff/team/${teamId}`);
    return res.data;
  }, [get]);

  const createStaff = useCallback(async (data) => {
    const res = await post('/staff', data);
    return res.data;
  }, [post]);

  const updateStaff = useCallback(async (id, data) => {
    const res = await put(`/staff/${id}`, data);
    return res.data;
  }, [put]);

  const deleteStaff = useCallback(async (id) => {
    await del(`/staff/${id}`);
  }, [del]);

  return { loading, error, fetchStaff, fetchStaffByTeam, createStaff, updateStaff, deleteStaff };
};

export const useClub = () => {
  const { loading, error, get, put, post } = useApi();

  const fetchClub = useCallback(async () => {
    const res = await get('/club/main');
    return res.data;
  }, [get]);

  const fetchAllClubs = useCallback(async () => {
    const res = await get('/club');
    return res.data;
  }, [get]);

  const updateClub = useCallback(async (id, data) => {
    const res = await put(`/club/${id}`, data);
    return res.data;
  }, [put]);

  const createClub = useCallback(async (data) => {
    const res = await post('/club', data);
    return res.data;
  }, [post]);

  return { loading, error, fetchClub, fetchAllClubs, updateClub, createClub };
};

export const useCompetitions = () => {
  const { loading, error, get, put, post } = useApi();

  const fetchCompetitions = useCallback(async (params = {}) => {
    const res = await get('/competitions', params);
    return res.data;
  }, [get]);

  const fetchActiveCompetition = useCallback(async () => {
    const res = await get('/competitions/active');
    return res.data;
  }, [get]);

  const fetchStandings = useCallback(async (id) => {
    const res = await get(`/competitions/${id}/standings`);
    return res.data;
  }, [get]);

  const updateCompetition = useCallback(async (id, data) => {
    const res = await put(`/competitions/${id}`, data);
    return res.data;
  }, [put]);

  const createCompetition = useCallback(async (data) => {
    const res = await post('/competitions', data);
    return res.data;
  }, [post]);

  return { loading, error, fetchCompetitions, fetchActiveCompetition, fetchStandings, updateCompetition, createCompetition };
};