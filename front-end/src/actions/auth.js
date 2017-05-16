import * as types from '../constants';

export const login = ({ email, password }) => ({
  type: types.USER_NAME,
  payload: { email, password }
});