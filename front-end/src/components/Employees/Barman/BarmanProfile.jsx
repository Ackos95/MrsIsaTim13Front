import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';

import Schedule from '../common/Schedule';

class BarmanProfile extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    barmanSchedules: PropTypes.object,
    loadSchedule: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { user: { id, token, restaurant }, loadSchedule } = this.props;
    
    loadSchedule(restaurant.id, id, token);
  }

  render() {
    const { barmanSchedules } = this.props;

    return (
      <div>
        <h1> Barman Profile page </h1>
        <Link to="/barman/schedules">Schedules</Link>
        <Link to="/barman/orders">Orders</Link>
        <Link to="/barman/profile">Profile</Link>
        
        <div className="employee__main-content">
          <Switch>
            <Route path="/barman/schedules" render={() => <Schedule schedules={barmanSchedules} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default BarmanProfile;