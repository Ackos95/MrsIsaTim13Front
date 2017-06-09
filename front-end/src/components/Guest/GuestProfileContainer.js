import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVisitedRestaurants, getRestaurantsByName, getFriendRequests, acceptFriend,
	declineFriend, removeFriendRequest } from '../../actions/guest';

import GuestProfile from './GuestProfile';

const mapStateToProps = state => ({
  user: state.auth.user,
  inProgress: state.auth.inProgress,
	guest: state.guest
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getVisitedRestaurants,
	getRestaurantsByName,
	getFriendRequests,
	acceptFriend,
	declineFriend,
	removeFriendRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GuestProfile);