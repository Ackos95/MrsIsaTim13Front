import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addEmployee, addSupplier } from '../../actions/manager';

import Manager from './Manager';

const mapStateToProps = state => ({
  user: state.auth.user,
  created: state.manager.created,
  inProgress: state.manager.inProgress,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addEmployee,
  addSupplier,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Manager);