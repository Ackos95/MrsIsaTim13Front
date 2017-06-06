import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addEmployee, addSupplier, addSupplyRequest } from '../../actions/manager';
import { getRequests } from '../../actions/supplies';

import Manager from './Manager';

const mapStateToProps = state => ({
  user: state.auth.user,
  created: state.manager.created,
  createdRequest: state.manager.createdRequest,
  inProgress: state.manager.inProgress,
  requests: state.supplies.requests,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addEmployee,
  addSupplier,
  addSupplyRequest,
  getRequests,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Manager);