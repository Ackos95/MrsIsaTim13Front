import * as types from '../constants';
import { Record } from 'immutable';

const Guest = new Record({
  dirty: false,
	gettingRestaurants : false,
	restaurants : []
});

const initialState = new Guest();

const guestReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.CHANGE_NAME:
      return state.set('dirty', true);
	
		case types.GET_VISITED_RESTAURANTS_START:
			return state.set('gettingRestaurants', true);
	
		case types.GET_VISITED_RESTAURANTS_SUCCESS:
			return state.set('restaurants', action.payload).set('gettingRestaurants', false);
	
		case types.GET_VISITED_RESTAURANTS_ERROR:
			return state.set('gettingRestaurants', false);
	
		default:
      return state;
  }
}


export default guestReducer;