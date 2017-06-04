import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Login from './Login';
import { login } from '../../actions/auth';

const mapStateToProps = state => ({
  user: state.auth.user,
  inProgress: state.auth.inProgress,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);