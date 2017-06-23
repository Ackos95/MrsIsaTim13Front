import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRestaurantsByName, startRestaurantReservation } from '../../actions/guest';

import GuestRestaurants from './GuestRestaurants';

const mapStateToProps = state => ({
	user: state.auth.user,
	guest: state.guest
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getRestaurantsByName,
	startRestaurantReservation
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GuestRestaurants);