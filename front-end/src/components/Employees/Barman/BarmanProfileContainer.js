import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import BarmanProfile from './BarmanProfile';
import { 
  loadSchedule,
  loadOrders,
} from '../../../actions/employees';

const mapStateToProps = state => ({
  user: state.auth.user,
  barmanSchedules: state.employees.barmanSchedules,
  orders: state.employees.orders,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSchedule,
  loadOrders,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BarmanProfile);