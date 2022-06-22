import axios from 'axios';
import { getStorage } from './localStorage';

const instance = axios.create({
  baseURL: 'http://13.125.4.231',
  headers: { 'Content-Type': 'application/json' },
});

//토큰값
const token = getStorage('token');

instance.defaults.headers.common['Authorization'] = `${token}`;

export default instance;
