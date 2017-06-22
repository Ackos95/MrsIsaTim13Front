import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTableConfiguration, getLunchFriends, inviteForLunch, sendMealOrder,
	endRestaurantReservation, tryToReserveTable } from '../../actions/guest';

import RestaurantReservation from './RestaurantReservation';

const mapStateToProps = state => ({
	user: state.auth.user,
	guest: state.guest,
	selectedTablesId : state.restaurant.selectedTablesId
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getTableConfiguration,
	getLunchFriends,
	inviteForLunch,
	sendMealOrder,
	endRestaurantReservation,
	tryToReserveTable
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReservation);