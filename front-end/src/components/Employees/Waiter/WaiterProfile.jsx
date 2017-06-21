import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';

import Schedule from '../common/Schedule';


class WaiterProfile extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    waiterSchedules: PropTypes.object,
    loadSchedule: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { user: { id, token, restaurant }, loadSchedule } = this.props;
    
    loadSchedule(restaurant.id, id, token);
  }

  render() {
    const { waiterSchedules } = this.props;

    return (
      <div>
        <h1> Waiter Profile page </h1>

        <Link to="/waiter/schedules">Schedules</Link>
        <Link to="/waiter/orders">Orders</Link>
        <Link to="/waiter/profile">Profile</Link>
        
        <div className="employee__main-content">
          <Switch>
            <Route path="/waiter/schedules" render={() => <Schedule schedules={waiterSchedules} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default WaiterProfile;