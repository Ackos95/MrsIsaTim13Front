import * as types from '../constants';
import { Record } from 'immutable';

const Guest = new Record({
  dirty: false,
	gettingVisitedRests : false,
	gettingRestsByName : false,
	restaurants : [],
	restaurantsByName : []
});

const initialState = new Guest();

const guestReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.CHANGE_NAME:
      return state.set('dirty', true);
	
		case types.GET_VISITED_RESTAURANTS_START:
			return state.set('gettingVisitedRests', true);
	
		case types.GET_VISITED_RESTAURANTS_SUCCESS:
			return state.set('restaurants', action.payload.restaurants)
									.set('gettingVisitedRests', false);
	
		case types.GET_VISITED_RESTAURANTS_ERROR:
			return state.set('gettingVisitedRests', false);
	
		case types.GET_RESTAURANTS_BY_NAME_START:
			return state.set('gettingRestsByName', true);
	
		case types.GET_RESTAURANTS_BY_NAME_SUCCESS:
			return state.set('restaurantsByName', action.payload.restaurantsByName)
				.set('gettingRestsByName', false);
	
		case types.GET_RESTAURANTS_BY_NAME_ERROR:
			return state.set('gettingRestsByName', false);
	
	
		default:
      return state;
  }
}


export default guestReducer;