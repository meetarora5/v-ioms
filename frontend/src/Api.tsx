import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});
const token = localStorage.getItem('token');
if(token){
  api.defaults.headers.common['Authorization'] = `Token ${token}`;
}
export default api;
