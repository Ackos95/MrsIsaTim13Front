import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PasswordChange from './PasswordChange';
import { changePassword } from '../../../../actions/auth';

const mapStateToProps = state => ({
  user: state.auth.user,
  passwordChanged: state.auth.passwordChanged,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePassword,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);