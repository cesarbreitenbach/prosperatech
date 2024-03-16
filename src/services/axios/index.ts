import { API_ANDROID, API_URL, API_DEV, ENV, API_PORT } from '@env';
import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';
import { useAuthContext } from '../../hooks/auth';

const URL: string =
  ENV === 'dev' ? (Platform.OS === 'android' ? `${API_ANDROID}:${API_PORT}` : `${API_DEV}:${API_PORT}`) : API_URL;

console.log(`essas sao variaveis de ambiente ENV: ${ENV} API_URL:${URL}/api `);
 
export default () => {
  const { user } = useAuthContext();

  

  const getHeaders = () => {
      const headers = {
          auth: `Bearer ${user?.token}`
      }
      return headers;
  } 

  const axiosClient: AxiosInstance = axios.create({
    baseURL: `${URL}/api`,
    headers: getHeaders(),
  });
  

  return ({
    axiosClient
  })
}