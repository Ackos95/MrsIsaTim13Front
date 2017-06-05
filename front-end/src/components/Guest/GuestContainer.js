import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/auth';
import { changeName, getVisitedRestaurants } from '../../actions/guest';

import Guest from './Guest';

const mapStateToProps = state => ({
  user: state.auth.user,
  inProgress: state.auth.inProgress,
	guest: state.guest
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  changeName,
	getVisitedRestaurants,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Guest);