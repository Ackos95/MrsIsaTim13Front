import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateTableConfig } from '../../../actions/manager/tables';

import TableCanvas from './TableCanvas';

const mapStateToProps = state => ({
  user: state.auth.user,
  inProgress: state.manager.inProgress
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTableConfig
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableCanvas);