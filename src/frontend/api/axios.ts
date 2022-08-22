// @ts-nocheck
import * as axios from 'axios';

let _axios = axios;
const apiToken = localStorage.getItem('apiToken');
if (apiToken) {
  _axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer ${apiToken}`
    }
  });
} else {
  _axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });
}

export default _axios as axios;
