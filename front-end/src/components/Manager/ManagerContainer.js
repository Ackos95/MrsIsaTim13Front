import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addEmployee } from '../../actions/manager';

import Manager from './Manager';

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addEmployee,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Manager);