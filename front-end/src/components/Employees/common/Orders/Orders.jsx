import React, { Component } from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';

import Order from './Order';


class Orders extends Component {

  static propTypes = {
    userToken: PropTypes.string.isRequired,
    orders: PropTypes.arrayOf(PropTypes.object).isRequired,
    options: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.renderOrders = this.renderOrders.bind(this);
  }

  renderOrders() {
    const { orders, options, userToken } = this.props;

    return map(orders, (order) => (
      <Order key={`ORDER_${order.id}`} order={order} options={options} userToken={userToken} />
    )); 
  }

  render() {
    return (
      <div>
        <h2>Orders</h2>
        <ul>
          {this.renderOrders()}
        </ul>
      </div>
    )
  }
}

export default Orders;