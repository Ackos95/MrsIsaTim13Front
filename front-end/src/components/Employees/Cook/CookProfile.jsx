import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';

import Schedule from '../common/Schedule';
import Orders from '../common/Orders/OrdersContainer';
import Profile from '../../common/Profile/ProfileContainer';
import PasswordChange from '../../common/Profile/PasswordChange/PasswordChangeContainer';


class CookProfile extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    cookSchedules: PropTypes.arrayOf(PropTypes.object).isRequired,
    orders: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadSchedule: PropTypes.func.isRequired,
    loadOrders: PropTypes.func.isRequired,
    setMealDone: PropTypes.func.isRequired,
    setMealAccepted: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { user: { id, token, restaurant }, loadSchedule, loadOrders } = this.props;
    
    loadSchedule(restaurant.id, id, token);
    loadOrders(token);
  }

  render() {
    const { cookSchedules, orders, setMealAccepted, setMealDone } = this.props;

    return (
      <div>
        <h1> Cook Profile page </h1>
        <Link to="/cook/schedules">Schedules</Link>
        <Link to="/cook/orders">Orders</Link>
        <Link to="/cook/profile">Profile</Link>
        
        <div className="employee__main-content">
          <Switch>
            <Route path="/cook/schedules" render={() => <Schedule schedules={cookSchedules} />} />
            <Route path="/cook/orders" render={() => <Orders orders={orders} options={{ showMeals: true, setMealDone, setMealAccepted }} />} />
            <Route path="/cook/profile" render={() => <div><Profile isEditable={true} employeeFlag={true} /><PasswordChange /></div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default CookProfile;