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
});

export const getVisitedRestaurantsStart =  () => ({
	type: types.GET_VISITED_RESTAURANTS_START
});

export const getVisitedRestaurantsError =  (error) => ({
	type: types.GET_VISITED_RESTAURANTS_ERROR,
	payload: { error }
});

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
	
};


// restaurantsByName

export const getRestaurantsByNameSuccess =  (restaurantsByName) => ({
	type: types.GET_RESTAURANTS_BY_NAME_SUCCESS,
	payload: restaurantsByName
});

export const getRestaurantsByNameStart =  () => ({
	type: types.GET_RESTAURANTS_BY_NAME_START
});

export const getRestaurantsByNameError =  (error) => ({
	type: types.GET_RESTAURANTS_BY_NAME_ERROR,
	payload: { error }
});

export const getRestaurantsByName = ( restaurantName, token ) => dispatch => {
	dispatch(getRestaurantsByNameStart());
	
	$get(`${SERVER_URL}/restaurant/byName/` + restaurantName, null , addAuthHeader(token))
		.then((res) => {
			if (res.status > 400) dispatch(getRestaurantsByNameError());
			
			const { data } = res;
			return dispatch(getRestaurantsByNameSuccess({
				restaurantsByName : data
			}));
		})
		.catch((err) => {
			return dispatch(getRestaurantsByNameError(err));
		});
	
};


// get potential friends

export const getPotentialFriendsSuccess =  (potentialFriends) => ({
	type: types.GET_POTENTIAL_FRIENDS_SUCCESS,
	payload: potentialFriends
});

export const getPotentialFriendsStart =  () => ({
	type: types.GET_POTENTIAL_FRIENDS_START
});

export const getPotentialFriendsError =  (error) => ({
	type: types.GET_POTENTIAL_FRIENDS_ERROR,
	payload: { error }
});

export const getPotentialFriends = ( potentialFriendsName, token ) => dispatch => {
	dispatch(getPotentialFriendsStart());
	
	$get(`${SERVER_URL}/guest/friends/q=` + potentialFriendsName, null , addAuthHeader(token))
		.then((res) => {
			if (res.status > 400) dispatch(getPotentialFriendsError());
			
			const { data } = res;
			return dispatch(getPotentialFriendsSuccess({
				potentialFriends : data
			}));
		})
		.catch((err) => {
			return dispatch(getPotentialFriendsError(err));
		});
	
};


// get current friends

export const getCurrentFriendsSuccess =  (currentFriends) => ({
	type: types.GET_CURRENT_FRIENDS_SUCCESS,
	payload: currentFriends
});

export const getCurrentFriendsStart =  () => ({
	type: types.GET_CURRENT_FRIENDS_START
});

export const getCurrentFriendsError =  (error) => ({
	type: types.GET_CURRENT_FRIENDS_ERROR,
	payload: { error }
});

export const getCurrentFriends = ( token ) => dispatch => {
	dispatch(getCurrentFriendsStart());
	
	$get(`${SERVER_URL}/guest/friends`, null , addAuthHeader(token))
		.then((res) => {
			if (res.status > 400) dispatch(getCurrentFriendsError());
			
			const { data } = res;
			return dispatch(getCurrentFriendsSuccess({
				currentFriends : data
			}));
		})
		.catch((err) => {
			return dispatch(getCurrentFriendsError(err));
		});
	
};


// get all restaurants

export const getAllRestaurantsSuccess =  (allRestaurants) => ({
	type: types.GET_ALL_RESTAURANTS_SUCCESS,
	payload: allRestaurants
});

export const getAllRestaurantsStart =  () => ({
	type: types.GET_ALL_RESTAURANTS_START
});

export const getAllRestaurantsError =  (error) => ({
	type: types.GET_ALL_RESTAURANTS_ERROR,
	payload: { error }
});

export const getAllRestaurants = ( token ) => dispatch => {
	dispatch(getAllRestaurantsStart());
	
	$get(`${SERVER_URL}/guest/friends`, null , addAuthHeader(token))
		.then((res) => {
			if (res.status > 400) dispatch(getAllRestaurantsError());
			
			const { data } = res;
			return dispatch(getAllRestaurantsSuccess({
				allRestaurants : data
			}));
		})
		.catch((err) => {
			return dispatch(getAllRestaurantsError(err));
		});
	
};