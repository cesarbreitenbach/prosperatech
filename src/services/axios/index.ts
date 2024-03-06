import { API_ANDROID, API_URL, API_DEV, ENV, API_PORT } from '@env';
import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';
// import { useAuthContext } from '../../hooks/auth';

const URL: string =
  ENV === 'dev' ? (Platform.OS === 'android' ? API_ANDROID : API_DEV) : API_URL;

console.log(`peguei a api: ${URL}:${API_PORT}`);
 
export default () => {
  // const {user} = useAuthContext();

  const getHeaders = () => {
      const headers = {
          auth: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY3BmIjoiMTExMTExMTExMTEiLCJuYW1lIjoiU2FuZGFsaW8iLCJlbWFpbCI6ImNlc2FyMkB0ZXN0ZS5jb20iLCJhZG1pbiI6ZmFsc2UsInN1cGVyYWRtaW4iOmZhbHNlLCJ0eXBlIjoidGVhbSIsImlkRXN0YWJlbGVjaW1lbnRvIjpudWxsLCJpYXQiOjE3MDgwMDUyODN9.W9-iqoC2Ck6zOPfSLJ-zx3Wi2wzDjq9-rfQJ1nofhJY`
      }
      return headers;
  } 

  const axiosClient: AxiosInstance = axios.create({
    baseURL: `${URL}:${API_PORT}/api`,
    headers: getHeaders(),
  });
  

  return ({
    axiosClient
  })
}