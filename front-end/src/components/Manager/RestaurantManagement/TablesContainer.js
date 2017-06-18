import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTables, updateOneTable } from '../../../actions/tables';

import Tables from './Tables';

const mapStateToProps = state => ({
  user: state.auth.user,
  tables: state.restaurant.tables,
  colorIndex: state.restaurant.colorIndex,
  chairCount: state.restaurant.chairCount,
  inProgress: state.restaurant.inProgress
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTables,
  updateOneTable
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tables);