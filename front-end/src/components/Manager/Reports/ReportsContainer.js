import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { restaurantRating, visitsGraph, restaurantEarnings, waitersEarnings } from '../../../actions/manager/reports';

import Reports from './Reports';

const mapStateToProps = state => ({
  user: state.auth.user,
  inProgress: state.reports.inProgress,
  restaurantRatingValue: state.reports.restaurantRatingValue,
  visitsGraphValue: state.reports.visitsGraphValue,
  restaurantEarningsValue: state.reports.restaurantEarningsValue,
  waitersEarningsValue: state.reports.waitersEarningsValue,
  // reportText: state.reports.reportText, // prebaceno u STATE
});

const mapDispatchToProps = dispatch => bindActionCreators({
  restaurantRating,
  visitsGraph,
  restaurantEarnings,
  waitersEarnings,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
