import axios from 'axios';
import { getStorage } from './localStorage';

const instance = axios.create({
  // baseURL: 'http://13.125.4.231',
  headers: { 'Content-Type': 'application/json' },
});

// 토큰값;
const token = getStorage('token');

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
