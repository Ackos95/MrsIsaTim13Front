	import axios from 'axios';

export const $get = (url, params, options = {}) => axios({
  method: 'GET',
  url,
  params,
  ...options
});

export const $post = (url, data, options = {}) => axios({
  method: 'POST',
  url,
  data,
  ...options
});

export const $put = (url, data, options = {}) => axios({
    method: 'PUT',
  url,
  data,
  ...options
});


export const $delete = (url, options = {}) => axios({
  method: 'DELETE',
  url,
  ...options
});

export const addAuthHeader = (authToken, obj = {}) => {
  obj.headers = { ...(obj.headers || {}), Authorization: `Basic ${authToken}`};

  return obj;
}

export const getToken = (userName, password) => btoa(`${userName}:${password}`);

export const checkPassword = (token, userName, password) => token === getToken(userName, password);