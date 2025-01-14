import { isAxiosError } from 'axios';
import api from '../config/axios';
import { ProfileForm, User } from '../types';

export async function getUser() {
  try {
    const { data } = await api.get<User>('/api/user');
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateProfile(formData: ProfileForm) {
  try {
    const { data } = await api.patch('/api/user', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      console.log(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}