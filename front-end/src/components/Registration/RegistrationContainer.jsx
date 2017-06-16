import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Registration from './Registration';
import { register } from '../../actions/auth';

const mapStateToProps = state => ({
	user: state.auth.user,
	inProgress: state.auth.inProgress,
	errorMessage : state.auth.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
	register,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Registration);