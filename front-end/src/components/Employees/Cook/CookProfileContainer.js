import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import CookProfile from './CookProfile';
import { 
  loadSchedule,
  loadOrders,
} from '../../../actions/employees';

const mapStateToProps = state => ({
  user: state.auth.user,
  cookSchedules: state.employees.cookSchedules,
  orders: state.employees.orders,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSchedule,
  loadOrders,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CookProfile);