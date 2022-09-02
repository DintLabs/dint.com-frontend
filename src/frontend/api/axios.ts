// @ts-nocheck
import * as axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

//  new code
const _axios = axios.create({ baseURL });

_axios.interceptors.request.use((req) => {
  const apiToken = localStorage.getItem('apiToken');
  if (apiToken) {
    req.headers = {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer ${apiToken}`
    };
  }
  return req;
});

// _axios.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (err) => {
//     const originalRequest = err.config;
//     if (err?.response?.status === 400) {
//       console.log(err);
//     }
//     if (err?.response?.status === 404) {
//       console.log(err);
//     }
//     if (err?.response?.status === 500) {
//       console.log(err);
//     }
//     if (err?.response?.status === 403) {
//       console.log(err);
//     }
//     if (err?.response?.status === 401) {
//       console.log(err);
//     }

//     return err;
//   }
// );

// old code

// let _axios = axios;
// const apiToken = localStorage.getItem('apiToken');
// if (apiToken) {
//   _axios = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: {
//       'Content-type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `bearer ${apiToken}`
//     }
//   });
// } else {
//   _axios = axios.create({
//     baseURL: process.env.REACT_APP_API_URL
//   });
// }

export default _axios as axios;
