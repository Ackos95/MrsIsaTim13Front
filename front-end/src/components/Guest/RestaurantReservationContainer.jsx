import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTableConfiguration, getLunchFriends, inviteForLunch, sendMealOrder } from '../../actions/guest';

import RestaurantReservation from './RestaurantReservation';

const mapStateToProps = state => ({
	user: state.auth.user,
	guest: state.guest
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getTableConfiguration,
	getLunchFriends,
	inviteForLunch,
	sendMealOrder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReservation);