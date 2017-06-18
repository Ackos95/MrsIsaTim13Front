import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addEmployee, addSupplier, addSupplyRequest, endSupplyRequest } from '../../actions/manager/manager';
import { getRequests } from '../../actions/supplies';

import ManagerMain from './ManagerMain';

const mapStateToProps = state => ({
  user: state.auth.user,
  createdUser: state.manager.createdUser,
  createdRequest: state.manager.createdRequest,
  endedRequest: state.manager.endedRequest,
  inProgress: state.manager.inProgress,
  inProgressReqs: state.supplies.inProgress,
  requests: state.supplies.requests,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addEmployee,
  addSupplier,
  addSupplyRequest,
  endSupplyRequest,
  getRequests, // from  ** actions/supplies **
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManagerMain);