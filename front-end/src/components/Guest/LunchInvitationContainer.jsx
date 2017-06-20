import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import LunchInvitation from './LunchInvitation';
import { registrationConfirmation } from '../../actions/auth';

const mapStateToProps = (state, ownProps) => ({
	gettingRestaurantMeals: state.auth.confirmedRegistration
});

const mapDispatchToProps = dispatch => bindActionCreators({
	registrationConfirmation,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(LunchInvitation);