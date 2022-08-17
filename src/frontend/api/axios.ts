// @ts-ignore
import * as axios from 'axios';


const apiToken = localStorage.getItem('apiToken');
const _axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `bearer ${apiToken}`
      }
});

export default _axios as axios;