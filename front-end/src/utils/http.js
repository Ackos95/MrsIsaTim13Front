export const get = (uri, params) => {

  let stringParams = params ? '?' : '';
  for (let key in params)
    stringParams += `${key}=${params[key]}&`;
  stringParams = stringParams.substring(0, stringParams.length - 1);

  return fetch(`${uri}${stringParams}`)
}