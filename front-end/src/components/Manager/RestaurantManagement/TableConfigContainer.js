import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateColorIndex, updateChairCount, addTable, deleteTable } from '../../../actions/tables';

import TableConfig from './TableConfig';

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedTable: state.restaurant.selectedTable,
  inProgress: state.restaurant.inProgress
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateChairCount,
  updateColorIndex,
  addTable,
  deleteTable
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableConfig);