import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadSchedule, loadEmployees, addTermin, deleteTermin, updateTermin, selectScheduleItem } from '../../../actions/manager/schedule';

import Schedule from './Schedule';

const mapStateToProps = state => ({
  user: state.auth.user,
  inProgress: state.schedule.inProgress,
  selectedItem: state.schedule.selectedItem,
  employees: state.schedule.employees,
  schedule: state.schedule.schedule,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTermin,
  deleteTermin,
  updateTermin,
  loadSchedule,
  loadEmployees,
  selectScheduleItem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
