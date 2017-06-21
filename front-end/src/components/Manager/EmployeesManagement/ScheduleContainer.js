import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadSchedule, loadEmployees, addTermin, deleteTermin } from '../../../actions/manager/schedule';

import Schedule from './Schedule';

const mapStateToProps = state => ({
  user: state.auth.user,
  inProgress: state.schedule.inProgress,
  selectedEventId: state.schedule.selectedEventId,
  employees: state.schedule.employees,
  schedule: state.schedule.schedule,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTermin,
  deleteTermin,
  loadSchedule,
  loadEmployees
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
