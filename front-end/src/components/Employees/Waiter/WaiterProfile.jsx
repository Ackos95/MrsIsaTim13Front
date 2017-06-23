import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';

import Schedule from '../common/Schedule';
import Orders from '../common/Orders/OrdersContainer';
import TableConfiguration from './TableConfiguration';
import Profile from '../../common/Profile/ProfileContainer';
import PasswordChange from '../../common/Profile/PasswordChange/PasswordChangeContainer';


class WaiterProfile extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    waiterSchedules: PropTypes.arrayOf(PropTypes.object).isRequired,
    orders: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadSchedule: PropTypes.func.isRequired,
    loadOrders: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { user: { id, token, restaurant }, loadSchedule, loadOrders } = this.props;
    
    loadSchedule(restaurant.id, id, token);
    loadOrders(token);
  }

  render() {
    const { waiterSchedules, orders } = this.props;

    return (
      <div>
        <h1> Waiter Profile page </h1>

        <Link to="/waiter/schedules">Schedules</Link>
        <Link to="/waiter/orders">Orders</Link>
        <Link to="/waiter/profile">Profile</Link>
        
        <div className="employee__main-content">
          <Switch>
            <Route path="/waiter/schedules" render={() => <Schedule schedules={waiterSchedules} />} />
            <Route path="/waiter/orders" render={() => <div><Orders orders={orders} options={{ showMeals: true, showDrinks: true }} /><TableConfiguration /></div>} />
            <Route path="/waiter/profile" render={() => <div><Profile isEditable={true} employeeFlag={true} /><PasswordChange /></div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default WaiterProfile;