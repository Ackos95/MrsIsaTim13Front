import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTables, updateOneTable, selectTable } from '../../../actions/tables';

import Tables from './Tables';

const mapStateToProps = state => ({
  user: state.auth.user,
  tables: state.restaurant.tables,
  colorIndex: state.restaurant.colorIndex,
  chairCount: state.restaurant.chairCount,
  selectedTableId: state.restaurant.selectedTableId,
  inProgress: state.restaurant.inProgress
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTables,
  updateOneTable,
  selectTable,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tables);