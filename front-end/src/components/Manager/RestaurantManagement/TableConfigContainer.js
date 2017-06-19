import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTable, deleteTable, sendTableConfig, updateColorIndex, updateChairCount } from '../../../actions/tables';

import TableConfig from './TableConfig';

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedTable: state.restaurant.selectedTable,
  inProgress: state.restaurant.inProgress,
  chairCount: state.restaurant.chairCount
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTable,
  deleteTable,
  sendTableConfig,
  updateChairCount,
  updateColorIndex
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableConfig);