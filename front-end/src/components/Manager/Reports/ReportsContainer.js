import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { restaurantRating } from '../../../actions/manager/reports';

import Reports from './Reports';

const mapStateToProps = state => ({
  user: state.auth.user,
  inProgress: state.reports.inProgress,
  // reportText: state.reports.reportText, // prebaceno u STATE
});

const mapDispatchToProps = dispatch => bindActionCreators({
  restaurantRating,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
