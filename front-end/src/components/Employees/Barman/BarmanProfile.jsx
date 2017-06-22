import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';

import Schedule from '../common/Schedule';
import Orders from '../common/Orders/OrdersContainer';

class BarmanProfile extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    barmanSchedules: PropTypes.arrayOf(PropTypes.object).isRequired,
    orders: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadSchedule: PropTypes.func.isRequired,
    loadOrders: PropTypes.func.isRequired,
    setDrinkDone: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { user: { id, token, restaurant }, loadSchedule, loadOrders } = this.props;
    
    loadSchedule(restaurant.id, id, token);
    loadOrders(token);
  }

  render() {
    const { barmanSchedules, orders, setDrinkDone } = this.props;

    return (
      <div>
        <h1> Barman Profile page </h1>
        <Link to="/barman/schedules">Schedules</Link>
        <Link to="/barman/orders">Orders</Link>
        <Link to="/barman/profile">Profile</Link>
        
        <div className="employee__main-content">
          <Switch>
            <Route path="/barman/schedules" render={() => <Schedule schedules={barmanSchedules} />} />
            <Route path="/barman/orders" render={() => <Orders orders={orders} options={{ showDrinks: true, setDrinkDone }} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default BarmanProfile;