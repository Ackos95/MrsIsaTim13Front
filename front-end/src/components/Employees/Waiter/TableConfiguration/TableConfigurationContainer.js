import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import TableConfiguration from './TableConfiguration';
import { 
  loadConfiguration,
  selectTable,
} from '../../../../actions/employees';

const mapStateToProps = state => ({
  user: state.auth.user,
  tableConfiguration: state.employees.tableConfiguration,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadConfiguration,
  selectTable
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableConfiguration);