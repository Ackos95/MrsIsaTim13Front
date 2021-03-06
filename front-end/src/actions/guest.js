import * as types from '../constants'
import { SERVER_URL } from '../config';
import { $get, $post, addAuthHeader } from '../utils/http';

export const tryToReserveTableError = () => ({
	type: types.TABLE_RESERVATION_ERROR
});

/** transakcijom poduprto - može vratiti grešku */
export const tryToReserveTable = ( selectedTables, reservationDate, reservationHours, token) => dispatch => {
	
	let tableReservationJson = {selectedTables: selectedTables, reservationDate: reservationDate,
		reservationHours: reservationHours};
	
	console.log("\ntryToReserveTable");
	console.log(tableReservationJson);
	
	$post(`${SERVER_URL}/restaurant/reserveTable`, tableReservationJson, addAuthHeader(token))
		.then((res) => {
			if (res.status > 400)
				console.log("\ngreška u tryToReserveTable > > status > 400");
			
			const { data } = res;
			
			console.log("\n sendMealOrder data pa res");
			console.log(data); 									console.log(res);
			console.log("sendMealOrder data pa res \n");
			if (res.status === 418 )
				return dispatch(tryToReserveTableError());
			
		})
		.catch((err) => {
			console.log("\n\n tryToReserveTableError > ERROR > catch promise");
		});
	
	
};


/** sva stanja koja su mijenjana tokom rezervacije vratim na inicijalna */
export const endRestaurantReservation = () => ({
	type: types.END_RESTAURANT_RESERVATION
});

export const resetTableConfigError = () => ({type: types.RESET_TABLE_CONFIG_ERROR});

export const dispatchRestaurantOnReservation = (restaurant) => ({
	type: types.RESTAURANT_ON_RESERVATION,
	payload: restaurant
});

export const startRestaurantReservation = ( restaurant ) => dispatch => {
	console.log("\n startRestaurantReservation  >  console.log(restaurant);");
	console.log(restaurant);
	return dispatch(dispatchRestaurantOnReservation(restaurant));
};
	
	export const sendMealOrderSuccess = ( mealOrderSuccess ) => ({
	type: types.SEND_MEAL_ORDER_SUCCESS,
	payload: mealOrderSuccess
});

export const sendMealOrder = ( mealOrder ) => dispatch => {
	
	console.log("\n console.log(mealOrder);");
	console.log(mealOrder);
	
	$post(`${SERVER_URL}/lunch-invitation/mealOrder`, mealOrder, null)
		.then((res) => {
			const { data } = res;
			console.log("\n sendMealOrder data pa res");
			console.log(data); 									console.log(res);
			console.log("sendMealOrder data pa res \n");
			return dispatch(sendMealOrderSuccess(data));
		})
		.catch((err) => {
			console.log("\n sendMealOrder E R R O R");
			console.log(err); console.log("-------------  -------------");
		});
};

export const acceptLunchInvitation = ( invitationId ) => dispatch => {
	$post(`${SERVER_URL}/lunch-invitation/accept`, {invitation_id : invitationId}, null)
	.then((res) => {
		const { data } = res;
		console.log("\n acceptLunchInvitation data pa res");
		console.log(data); 									console.log(res);
		console.log("acceptLunchInvitation data pa res \n");
	})
	.catch((err) => {
		console.log("\n acceptLunchInvitation E R R O R");
		console.log(err); console.log("-------------  -------------");
	});
};

export const declineLunchInvitation = ( invitationId ) => dispatch => {
	$post(`${SERVER_URL}/lunch-invitation/decline`, {invitation_id : invitationId} , null)
	.then((res) => {
		const { data } = res;
		console.log("\n declineLunchInvitation data pa res");
		console.log(data); 									console.log(res);
		console.log("declineLunchInvitation data pa res \n");
	})
	.catch((err) => {
		console.log("\n declineLunchInvitation E R R O R");
		console.log(err); console.log("-------------  -------------");
	});
};

export const getLunchInvitationSuccess = ( lunchInvitation ) => ({
	type: types.GET_LUNCH_INVITATION_SUCCESS,
	payload: lunchInvitation
});

export const getLunchInvitationInfo = ( invitationId ) => dispatch => {
	$get(`${SERVER_URL}/lunch-invitation/q=` + invitationId, null , null)
		.then((res) => {
			
			const { data } = res;
			console.log("\n getLunchInvitationInfo data pa res");
			console.log(data); 									console.log(res);
			console.log("getLunchInvitationInfo data pa res \n");
			
			return dispatch(getLunchInvitationSuccess(data));
		})
		.catch((err) => {
			console.log("\n getLunchInvitation E R R O R");
			console.log(err); console.log("-------------");
		});
	
	};

export const inviteForLunchSuccess = ( invitedFriend ) => ({
	type: types.INVITED_LUNCH_FRIEND_SUCCESS,
	payload: invitedFriend
});

export const inviteForLunch = ( restaurantId, date, hours, invitedGuest, token ) => dispatch => {
	
	let lunchInvitation = {restaurant_id: restaurantId, date: date, hours: hours, invited_guest: invitedGuest};
	$post(`${SERVER_URL}/guest/inviteForLunch`, lunchInvitation, addAuthHeader(token))
		.then((res) => {
			
			const { data } = res;
			console.log("\n no errors then promise > > invite For Lunch > >");
			console.log(data); 	console.log(res);
			console.log("iznad je console.log(data) i res");
			
			return dispatch(inviteForLunchSuccess(data));
			
		})
		.catch((err) => {
			console.log("\nerror catch promise > > invite For Lunch  >> > >> " + err);
		});
};

export const getLunchFriendsSuccess = ( lunchFriends ) => ({
	type: types.GET_LUNCH_FRIENDS_SUCCESS,
	payload: lunchFriends
});

export const getLunchFriendsStart = () => ({
	type: types.GET_LUNCH_FRIENDS_START
});

export const getLunchFriendsError = ( error ) => ({
	type: types.GET_LUNCH_FRIENDS_ERROR,
	payload: { error }
});

export const getLunchFriends = ( lunchFriendsName, token ) => dispatch => {
	dispatch(getLunchFriendsStart());
	
	$get(`${SERVER_URL}/guest/lunch-friends/q=` + lunchFriendsName, null , addAuthHeader(token))
		.then((res) => {
			
			const { data } = res;
			return dispatch(getLunchFriendsSuccess({
				lunchFriends : data
			}));
		})
		.catch((err) => {
			return dispatch(getLunchFriendsError(err));
		});
	
};

export const getTableConfigurationSuccess = ( configuration ) => ({
	type: types.TABLE_CONFIGURATION_SUCCESS,
	payload: configuration
});

export const getTableConfiguration = ( restaurantOnReservation, reservationDate, reservationHours, token ) => dispatch => {
	
	console.log("\ngetTableConfiguration   S T A R T S");
	console.log(restaurantOnReservation);
	console.log(reservationDate);
	console.log(reservationHours);
	
	let tableConfigJSON = {restaurant_id: restaurantOnReservation.id, date: reservationDate, hours: reservationHours};
	console.log("\nget Table Configuration JSON");
	console.log(tableConfigJSON);
	console.log("get Table Configuration JSON\n");
	
	$post(`${SERVER_URL}/restaurant/configuration`, tableConfigJSON ,
		addAuthHeader(token))
		.then((res) => {
			if (res.status > 400)
				console.log("\ngetTableConfiguration status > 400 . . . E R R O R\n");
			
			const { data } = res;
			console.log("\nres pa data"); console.log(res); console.log(data); console.log("res pa data");
			return dispatch(getTableConfigurationSuccess({
				configuration : data
			}));
		})
		.catch((err) => {
			console.log("\ngetTableConfiguration promise caught E R R O R\n");
			console.log(err); 																console.log();
		});
	
};

export const removeFriendFromList = ( unwantedFriend ) => ({
	type: types.REMOVE_FRIEND,
	payload: unwantedFriend
});

export const removeFriend = ( unwantedFriend, token ) => dispatch => {
	
	console.log("\nremoveFriend . . . unwantedFriend");
	console.log(unwantedFriend);
	
	dispatch(removeFriendFromList(unwantedFriend));
	
	$post(`${SERVER_URL}/guest/friends/deleteFriend`, unwantedFriend, addAuthHeader(token))
		.then((res) => {
			if (res.status > 400)
				console.log("\n delete friend   > > E R R O R > >   ");
			
			const { data } = res;
			console.log("\n no errors then promise > > delete friend > >");
			console.log(data);
			console.log(res);
			console.log("iznad je console.log(data) i res");
			
		})
		.catch((err) => {
			console.log("\nerror catch promise > > delete friend >> > >> " + err);
		});
};

export const removeFriendRequest = (requestForRemoval) => ({
	type: types.REMOVE_FRIEND_REQUEST,
	payload: requestForRemoval
});

export const removePotentialFriend = (removeFromPotentialFriends) => ({
	type: types.REMOVE_POTENTIAL_FRIEND,
	payload: removeFromPotentialFriends
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


// add friend

export const addFriendSuccess =  (addedFriendData) => ({
	type: types.ADD_FRIEND_SUCCESS,
	payload: addedFriendData
});

export const addFriendStart =  () => ({
	type: types.ADD_FRIEND_START
});

export const addFriendError =  (error) => ({
	type: types.ADD_FRIEND_ERROR,
	payload: { error }
});

export const addFriend = (newFriend , token ) => dispatch => {
	dispatch(addFriendStart());
	
	$post(`${SERVER_URL}/guest/friends/requestFriendship`, newFriend, addAuthHeader(token))
		.then((res) => {
			if (res.status > 400) dispatch(addFriendError());
			
			const { data } = res;
			return dispatch(addFriendSuccess({
				addedFriendData : data
			}));
		})
		.catch((err) => {
			return dispatch(addFriendError(err));
		});
	
};


// get friend requests

export const getFriendRequestsSuccess =  (friendRequests) => ({
	type: types.GET_FRIEND_REQUESTS_SUCCESS,
	payload: friendRequests
});

export const getFriendRequestsStart =  () => ({
	type: types.GET_FRIEND_REQUESTS_START
});

export const getFriendRequestsError =  (error) => ({
	type: types.GET_FRIEND_REQUESTS_ERROR,
	payload: { error }
});

export const getFriendRequests = (token) => dispatch => {
	dispatch(getFriendRequestsStart());
	
	$get(`${SERVER_URL}/guest/friends/pending`, null,  addAuthHeader(token))
		.then((res) => {
			if (res.status > 400) dispatch(getFriendRequestsError());
			
			const { data } = res;
			return dispatch(getFriendRequestsSuccess({
				friendRequests : data
			}));
		})
		.catch((err) => {
			return dispatch(getFriendRequestsError(err));
		});
	
};




// accept friend

export const acceptFriendSuccess =  (acceptFriendData) => ({
	type: types.ACCEPT_FRIEND_SUCCESS,
	payload: acceptFriendData
});

export const acceptFriendStart =  () => ({
	type: types.ACCEPT_FRIEND_START
});

export const acceptFriendError =  (error) => ({
	type: types.ACCEPT_FRIEND_ERROR,
	payload: { error }
});

export const acceptFriend = (friendRequest, token ) => dispatch => {
	dispatch(acceptFriendStart());
	
	$post(`${SERVER_URL}/guest/friends/accept`, friendRequest, addAuthHeader(token))
		.then((res) => {
			if (res.status > 400) dispatch(acceptFriendError());
			
			const { data } = res;
			return dispatch(acceptFriendSuccess({
				acceptFriendData : data
			}));
		})
		.catch((err) => {
			return dispatch(acceptFriendError(err));
		});
	
};


// decline friend

export const declineFriendSuccess =  (acceptFriendData) => ({
	type: types.DECLINE_FRIEND_SUCCESS,
	payload: acceptFriendData
});

export const declineFriendStart =  () => ({
	type: types.DECLINE_FRIEND_START
});

export const declineFriendError =  (error) => ({
	type: types.DECLINE_FRIEND_ERROR,
	payload: { error }
});

export const declineFriend = (friendRequest , token ) => dispatch => {
	dispatch(declineFriendStart());
	
	$post(`${SERVER_URL}/guest/friends/decline`, friendRequest, addAuthHeader(token))
		.then((res) => {
			if (res.status > 400) dispatch(declineFriendError());
			
			const { data } = res;
			return dispatch(declineFriendSuccess({
				acceptFriendData : data
			}));
		})
		.catch((err) => {
			return dispatch(declineFriendError(err));
		});
	
};

