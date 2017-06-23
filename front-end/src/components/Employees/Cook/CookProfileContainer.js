import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import CookProfile from './CookProfile';
import { 
  loadSchedule,
  loadOrders,
  setMealDone,
  setMealAccepted,
} from '../../../actions/employees';

import { EmployeePasswordGuard } from '../../Guards';

const mapStateToProps = state => ({
  user: state.auth.user,
  cookSchedules: state.employees.cookSchedules,
  orders: state.employees.orders,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSchedule,
  loadOrders,
  setMealDone,
  setMealAccepted,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePasswordGuard(CookProfile));