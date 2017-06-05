import * as types from '../constants'
import { SERVER_URL } from '../config';
import { $get, addAuthHeader } from '../utils/http';

// changeName('acko');
export const changeName = (name) => ({
  type: types.CHANGE_NAME,
  payload: { name }
});

export const getVisitedRestaurantsSuccess =  (restaurants) => ({
	type: types.GET_VISITED_RESTAURANTS_SUCCESS,
	payload: restaurants
})

export const getVisitedRestaurantsStart =  () => ({
	type: types.GET_VISITED_RESTAURANTS_START
})

export const getVisitedRestaurantsError =  (error) => ({
	type: types.GET_VISITED_RESTAURANTS_ERROR,
	payload: { error }
})

export const getVisitedRestaurants = ( token ) => dispatch => {
	dispatch(getVisitedRestaurantsStart());
	
	$get(`${SERVER_URL}/restaurant/visited`, null , addAuthHeader(token))
		.then((res) => {
			if (res.status > 400) dispatch(getVisitedRestaurantsError());
			
			const { data } = res;
			return dispatch(getVisitedRestaurantsSuccess({
				restaurants : data
			}));
		})
		.catch((err) => {
			return dispatch(getVisitedRestaurantsError(err));
		});
	
}
/*
return dispatch(getVisitedRestaurantsSuccess({
 restaurants : data,
 token : getToken(userName, password)
 */