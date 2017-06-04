import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Profile from './Profile';

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);