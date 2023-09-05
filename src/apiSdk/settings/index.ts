import axios from 'axios';
import queryString from 'query-string';
import { SettingsInterface, SettingsGetQueryInterface } from 'interfaces/settings';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSettings = async (
  query?: SettingsGetQueryInterface,
): Promise<PaginatedInterface<SettingsInterface>> => {
  const response = await axios.get('/api/settings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSettings = async (settings: SettingsInterface) => {
  const response = await axios.post('/api/settings', settings);
  return response.data;
};

export const updateSettingsById = async (id: string, settings: SettingsInterface) => {
  const response = await axios.put(`/api/settings/${id}`, settings);
  return response.data;
};

export const getSettingsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/settings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSettingsById = async (id: string) => {
  const response = await axios.delete(`/api/settings/${id}`);
  return response.data;
};
