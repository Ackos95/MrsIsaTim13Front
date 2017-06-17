import * as types from '../../constants/index';

//import { SERVER_URL } from '../../config/index';

//import { $post, $put, getToken, addAuthHeader } from '../../utils/http';

/** sve za konfiguraciju stolova **/

export const updateTableConfigStart = () => ({
  type: types.UPDATE_TABLE_CONFIG_STARTED
});

export const updateTableConfigError = () => ({
  type: types.UPDATE_TABLE_CONFIG_ERROR
});

export const updateTableConfigSuccess = ( createdRequest ) => ({
  type: types.UPDATE_TABLE_CONFIG_SUCCESS,
  payload: { createdRequest }
});


export const updateTableConfig = ({ values }) => dispatch => {
  dispatch(updateTableConfigStart());
  console.log('values');
  console.log(values);
}

