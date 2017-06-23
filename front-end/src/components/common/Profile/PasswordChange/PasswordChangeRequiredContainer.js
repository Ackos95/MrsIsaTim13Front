import { connect } from 'react-redux';
import PasswordChangeRequired from './PasswordChangeRequired';

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(PasswordChangeRequired);