import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRestaurantsByName, startReservation } from '../../actions/guest';

import GuestRestaurants from './GuestRestaurants';

const mapStateToProps = state => ({
	user: state.auth.user,
	guest: state.guest
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getRestaurantsByName,
	startReservation
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GuestRestaurants);