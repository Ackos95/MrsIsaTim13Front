import * as types from '../constants';
import { Record } from 'immutable';

const Guest = new Record({
  dirty: false,
	gettingVisitedRests : false,
	gettingRestsByName : false,
	restaurants : [],
	restaurantsByName : [],
	gettingPotentialFriends : false,
	potentialFriends : [],
	gettingCurrentFriends : false,
	currentFriends : []
});

const initialState = new Guest();

const guestReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.CHANGE_NAME:
      return state.set('dirty', true);
	
		/** VISITED RESTAURANTS */
		case types.GET_VISITED_RESTAURANTS_START:
			return state.set('gettingVisitedRests', true);
	
		case types.GET_VISITED_RESTAURANTS_SUCCESS:
			return state.set('restaurants', action.payload.restaurants)
									.set('gettingVisitedRests', false);
		
		case types.GET_VISITED_RESTAURANTS_ERROR:
			return state.set('gettingVisitedRests', false);
	
		/** RESTAURANTS BY NAME */
		case types.GET_RESTAURANTS_BY_NAME_START:
			return state.set('gettingRestsByName', true);
	
		case types.GET_RESTAURANTS_BY_NAME_SUCCESS:
			return state.set('restaurantsByName', action.payload.restaurantsByName)
				.set('gettingRestsByName', false);
	
		case types.GET_RESTAURANTS_BY_NAME_ERROR:
			return state.set('gettingRestsByName', false);
	
		/** POTENTIAL FRIENDS */
		case types.GET_POTENTIAL_FRIENDS_START:
			return state.set('gettingPotentialFriends', true);
			
		case types.GET_POTENTIAL_FRIENDS_SUCCESS:
			return state.set('potentialFriends', action.payload.potentialFriends)
				.set('gettingPotentialFriends', false);
	
		case types.GET_POTENTIAL_FRIENDS_ERROR:
			return state.set('gettingPotentialFriends', false);
	
		/** CURRENT FRIENDS */
		case types.GET_CURRENT_FRIENDS_START:
			return state.set('gettingCurrentFriends', true);
	
		case types.GET_CURRENT_FRIENDS_SUCCESS:
			return state.set('currentFriends', action.payload.currentFriends)
				.set('gettingCurrentFriends', false);
	
		case types.GET_CURRENT_FRIENDS_ERROR:
			return state.set('gettingCurrentFriends', false);
	
		/** NEXT REDUCING */
	
		default:
      return state;
  }
};


export default guestReducer;