import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import WaiterProfile from './WaiterProfile';
import { loadSchedule } from '../../../actions/employees';

const mapStateToProps = state => ({
  user: state.auth.user,
  waiterSchedules: state.employees.waiterSchedules,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSchedule,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WaiterProfile);