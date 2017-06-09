import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPotentialFriends, getCurrentFriends, addFriend, removePotentialFriend } from '../../actions/guest';

import GuestFriends from './GuestFriends';

const mapStateToProps = state => ({
	user: state.auth.user,
	guest: state.guest
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getPotentialFriends,
	getCurrentFriends,
	addFriend,
	removePotentialFriend
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GuestFriends);