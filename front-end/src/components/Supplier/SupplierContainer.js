import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addOffer } from '../../actions/supplier';
import { getRequests } from '../../actions/supplies';

import Supplier from './Supplier';

const mapStateToProps = state => ({
  token: state.auth.user.token,
  requests: state.supplies.requests,
  createdOffer: state.supplier.createdOffer,
  inProgress: state.supplier.inProgress, // something is loading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRequests,
  addOffer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);