import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Login from './Login';
import { login } from '../../actions/auth';

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
}, dispatch);

export default connect(null, mapDispatchToProps)(Login);