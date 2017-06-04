import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Login from './Login';
import { login, testCors } from '../../actions/auth';

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  testCors
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);