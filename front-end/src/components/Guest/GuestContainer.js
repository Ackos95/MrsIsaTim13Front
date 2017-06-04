import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/auth';
import { changeName } from '../../actions/guest';

import Guest from './Guest';

const mapStateToProps = state => ({
  user: state.auth.user,
  inProgress: state.auth.inProgress,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  changeName,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Guest);