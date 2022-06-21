import axios from 'axios';
import { getToken } from './token';

const instance = axios.create({
  baseURL: 'http://172.31.37.76',
  headers: { 'Content-Type': 'application/json' },
});

//토큰값
const token = getToken();

instance.defaults.headers.common['Authorization'] = `${token}`;

export default instance;
