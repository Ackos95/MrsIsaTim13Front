import { connect } from 'react-redux';
import Orders from './Orders';

const mapStateToProps = state => ({
  userToken: state.auth.user.token,
});

export default connect(mapStateToProps)(Orders);