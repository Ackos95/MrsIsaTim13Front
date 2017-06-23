import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import WaiterProfile from './WaiterProfile';
import { 
  loadSchedule,
  loadOrders,
  setOrderDone,
} from '../../../actions/employees';

import { EmployeePasswordGuard } from '../../Guards';
// import React from 'react';
// import { Redirect } from 'react-router-dom';

// const EmployeePasswordGuard = (Component) => (props) => props.user && !props.user.changedPassword ? <Redirect to="/change-password" /> : <Component {...props} /> 

const mapStateToProps = state => ({
  user: state.auth.user,
  waiterSchedules: state.employees.waiterSchedules,
  orders: state.employees.orders,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSchedule,
  loadOrders,
  setOrderDone,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePasswordGuard(WaiterProfile));