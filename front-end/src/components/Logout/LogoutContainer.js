import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Logout from './Logout';
import { logout } from '../../actions/auth';

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(Logout);