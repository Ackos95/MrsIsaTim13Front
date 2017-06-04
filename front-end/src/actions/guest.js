import * as types from '../constants';

// changeName('acko');
export const changeName = (name) => ({
  type: types.CHANGE_NAME,
  payload: { name }
});