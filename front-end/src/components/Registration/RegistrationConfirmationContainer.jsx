import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import RegistrationConfirmation from './RegistrationConfirmation';
import { registrationConfirmation } from '../../actions/auth';

const mapStateToProps = (state, ownProps) => ({
	confirmedRegistration: state.auth.confirmedRegistration
});

const mapDispatchToProps = dispatch => bindActionCreators({
	registrationConfirmation,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationConfirmation);