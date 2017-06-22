import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import CookProfile from './CookProfile';
import { loadSchedule } from '../../../actions/employees';

const mapStateToProps = state => ({
  user: state.auth.user,
  cookSchedules: state.employees.cookSchedules,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSchedule,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CookProfile);