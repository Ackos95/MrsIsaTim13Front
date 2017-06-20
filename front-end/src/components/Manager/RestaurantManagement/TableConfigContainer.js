import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTable, deleteTable, updateColorIndex, updateChairCount, updateDone } from '../../../actions/tables';

import TableConfig from './TableConfig';

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedTableId: state.restaurant.selectedTableId,
  inProgress: state.restaurant.inProgress,
  chairCount: state.restaurant.chairCount,
  colorIndex: state.restaurant.colorIndex,
  confirmationInProgress: state.restaurant.confirmationInProgress
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTable,
  deleteTable,
  updateChairCount,
  updateColorIndex,
  updateDone
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableConfig);