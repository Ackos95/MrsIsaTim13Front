import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addSysManager, addResManager, addRestaurant } from '../../actions/sys_manager';

import SystemManager from './SystemManager';

const mapStateToProps = state => ({
  user: state.auth.user,
  createdManager: state.sys_manager.createdManager, // new sys. / res. manager
  createdRestaurant: state.sys_manager.createdRestaurant,
  inProgress: state.sys_manager.inProgress,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addSysManager,
  addResManager,
  addRestaurant,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemManager);