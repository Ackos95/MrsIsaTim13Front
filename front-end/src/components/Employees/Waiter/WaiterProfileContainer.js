import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import WaiterProfile from './WaiterProfile';
import { 
  loadSchedule,
  loadOrders,
  setOrderDone,
} from '../../../actions/employees';

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

export default connect(mapStateToProps, mapDispatchToProps)(WaiterProfile);