import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editInfo } from '../../../actions/auth';

import Profile from './Profile';

const mapStateToProps = (state, ownProps) => ({
	user: state.auth.user,
	state: state
});

const mapDispatchToProps = dispatch => bindActionCreators({
	editInfo
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);