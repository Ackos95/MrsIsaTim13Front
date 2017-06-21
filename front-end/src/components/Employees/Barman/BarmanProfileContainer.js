import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import BarmanProfile from './BarmanProfile';
import { loadSchedule } from '../../../actions/employees';

const mapStateToProps = state => ({
  user: state.auth.user,
  barmanSchedules: state.employees.barmanSchedules,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSchedule,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BarmanProfile);