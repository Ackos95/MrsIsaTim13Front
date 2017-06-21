import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import LunchInvitation from './LunchInvitation';
import { getLunchInvitationInfo, acceptLunchInvitation, declineLunchInvitation, sendMealOrder } from '../../actions/guest';

const mapStateToProps = (state, ownProps) => ({
	user: state.auth.user,
	gettingRestaurantMeals: state.auth.confirmedRegistration,
	guest: state.guest
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getLunchInvitationInfo,
	acceptLunchInvitation,
	declineLunchInvitation,
	sendMealOrder
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(LunchInvitation);