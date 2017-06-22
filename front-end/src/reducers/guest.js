import * as types from '../constants';
import { Record } from 'immutable';
import filter from 'lodash/filter'

const Guest = new Record({
	gettingVisitedRests : false,
	gettingRestsByName : false,
	restaurants : [],
	restaurantsByName : [],
	gettingPotentialFriends : false,
	potentialFriends : [],
	gettingCurrentFriends : false,
	currentFriends : [],
	addingFriend : false,
	gettingFriendRequests : false,
	friendRequests : [],
	acceptDeclineState : false,
	restaurantOnReservation : {},
	reservationStarted : false,
	restaurantConfiguration : undefined,
	gettingLunchFriends : false,
	lunchFriends : [],
	invitedLunchFriends : [],
	lunchInvitation : null,
	invitationRestaurant : null,
	lunchOrderSuccess : null
});

const initialState = new Guest();

const guestReducer = (state = initialState, action) => {
  switch (action.type) {
		
		case types.SEND_MEAL_ORDER_SUCCESS: {
			console.log(" SEND_MEAL_ORDER_SUCCESS   >  SEND_MEAL_ORDER_SUCCESS ");
			console.log(action.payload);
			return state.set('lunchOrderSuccess', action.payload);
		}
		
  	/** lunch invitation */
		case types.GET_LUNCH_INVITATION_SUCCESS: {
			console.log("\n GET_LUNCH_INVITATION_SUCCESS  GET_LUNCH_INVITATION_SUCCESS");
			console.log(action.payload.reservationDate);

			/** http://www.webdevelopersnotes.com/formatting-time-using-javascript */
			
			let m_names = ["Januar", "Februar", "Mart",
				"April", "Maj", "Jun", "Jul", "Avgust", "Septembar",
				"Oktobar", "Novembar", "Decembar"];
			
			let d = new Date(action.payload.reservationDate);
			let curr_date = d.getDate();
			let curr_month = d.getMonth();
			let curr_year = d.getFullYear();
			let curr_hour = d.getHours();
			let curr_min = d.getMinutes();
			
			curr_hour += "";
			curr_min += "";
			
			if (curr_hour.length === 1)
				curr_hour = "0" + curr_hour;
			if (curr_min.length === 1)
				curr_min = "0" + curr_min;
			
			let printDate = curr_date + "-" + m_names[curr_month] + "-" + curr_year;
			let printHour = curr_hour + ":" + curr_min;
			
			let lunchInvitation = {id: action.payload.id, lunchGuest: action.payload.lunchGuest,
				lunchHost: action.payload.lunchHost , lunchDate: printDate, lunchHour: printHour,
				reservationHours: action.payload.reservationHours, restaurant: action.payload.restaurant,
				realDate: action.payload.reservationDate
			};
			return state.set('lunchInvitation', lunchInvitation);
		}
		
  	/** INVITED LUNCH FRIENDS */
		case types.INVITED_LUNCH_FRIEND_SUCCESS: {
			let newInvitedLunchFriends = state.invitedLunchFriends;
			newInvitedLunchFriends.push(action.payload);
			return state.set('invitedLunchFriends',newInvitedLunchFriends)
				.set('lunchFriends', filter(state.lunchFriends, (lunchFriend) => lunchFriend.id !== action.payload.id ) );
		}
			
  	/** LUNCH FRIENDS search by name */
		case types.GET_LUNCH_FRIENDS_START:
			return state.set('gettingLunchFriends', true);
	
		case types.GET_LUNCH_FRIENDS_SUCCESS: {
			let newLunchFriends = action.payload.lunchFriends;
			// Ko je ovo pisao? Da li si siguran da ce ovo raditi, overridujes svaki put newLunchFriends, prakticno je identicno kao
			// newLunchFriends = filter(newLunchFriends, (lunchFriend) => lunchFriend.id !== state.invitedLunchFriends[state.invitedLunchFriends.length - 1].id)
			// Predlog resenja (Testiraj samo pisao sam ga u 05:11, bez testiranja naravno :D):
			/*
				const { invitedLunchFriends } = state;
				const newLunchFriends = filter(action.payload.lunchFriends, (friend) => invitedLunchFriends.find(invitedFriend) => invitedFriend.id !== friend.id)

				return state.set(...)
			*/
			for (var i = 0; i < state.invitedLunchFriends.length; i++) {
				newLunchFriends = filter(newLunchFriends, (lunchFriend) => lunchFriend.id !== state.invitedLunchFriends[i].id );
			}
			return state.set('gettingLunchFriends', false)
				.set('lunchFriends', newLunchFriends);
		}
		
		case types.GET_LUNCH_FRIENDS_ERROR:
			return state.set('gettingLunchFriends', false);
	
	
	
		/** TABLE CONFIG SUCCESS */
		case types.TABLE_CONFIGURATION_SUCCESS:
			return state.set("restaurantConfiguration", action.payload);
	
	
		/** REMOVE FRIEND */
  	case types.REMOVE_FRIEND:
			return state.set("currentFriends",
				filter(state.currentFriends, (unwantedFriend) => unwantedFriend.id !== action.payload.id ) );
			
			
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
	
	
		/** ADD FRIEND */
		case types.ADD_FRIEND_START:
			return state.set('addingFriend', true);
	
		case types.ADD_FRIEND_SUCCESS:
			return state.set('addingFriend', false);
	
		case types.ADD_FRIEND_ERROR:
			return state.set('addingFriend', false);
	
		/** GET FRIEND REQUESTS*/
		case types.GET_FRIEND_REQUESTS_START:
			return state.set('gettingFriendRequests', true);
	
		case types.GET_FRIEND_REQUESTS_SUCCESS:
			return state.set('friendRequests', action.payload.friendRequests)
									.set('gettingFriendRequests', false);
	
		case types.GET_FRIEND_REQUESTS_ERROR:
			return state.set('gettingFriendRequests', false);
	
		/** ACCEPT FRIEND */
		case types.ACCEPT_FRIEND_START:
			return state.set('acceptDeclineState', true);
	
		case types.ACCEPT_FRIEND_SUCCESS:
			return state.set('acceptDeclineState', false);
	
		case types.ACCEPT_FRIEND_ERROR:
			return state.set('acceptDeclineState', false);
	
		/** DECLINE FRIEND */
		case types.DECLINE_FRIEND_START:
			return state.set('acceptDeclineState', true);
	
		case types.DECLINE_FRIEND_SUCCESS:
			return state.set('acceptDeclineState', false);
	
		case types.DECLINE_FRIEND_ERROR:
			return state.set('acceptDeclineState', false);
		
		/** REMOVE FRIEND REQUEST */
		case types.REMOVE_FRIEND_REQUEST: {
			return state.set('friendRequests',
				filter(state.friendRequests, (req) => req.id !== action.payload.id ) );
		}
	
		/** REMOVE POTENTIAL FRIEND */
		case types.REMOVE_POTENTIAL_FRIEND: {
			return state.set('potentialFriends',
				filter(state.potentialFriends, (friend) => friend.id !== action.payload.id ) );
		}
	
		/** NEXT REDUCING */
		
		default:
      return state;
  }
};


export default guestReducer;