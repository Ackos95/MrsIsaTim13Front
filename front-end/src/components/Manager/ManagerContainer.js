import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addEmployee, addSupplier, addSupplyRequest, endSupplyRequest } from '../../actions/manager';
import { getRequests } from '../../actions/supplies';

import Manager from './Manager';

const mapStateToProps = state => ({
  user: state.auth.user,
  createdUser: state.manager.createdUser,
  createdRequest: state.manager.createdRequest,
  endedRequest: state.manager.endedRequest,
  inProgress: state.manager.inProgress,
  requests: state.supplies.requests,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addEmployee,
  addSupplier,
  addSupplyRequest,
  endSupplyRequest,
  getRequests,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Manager);