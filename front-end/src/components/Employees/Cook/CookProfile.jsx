import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';

import Schedule from '../common/Schedule';


class CookProfile extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    cookSchedules: PropTypes.object,
    loadSchedule: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { user: { id, token, restaurant }, loadSchedule } = this.props;
    
    loadSchedule(restaurant.id, id, token);
  }

  render() {
    const { cookSchedules } = this.props;

    return (
      <div>
        <h1> Cook Profile page </h1>
        <Link to="/cook/schedules">Schedules</Link>
        <Link to="/cook/orders">Orders</Link>
        <Link to="/cook/profile">Profile</Link>
        
        <div className="employee__main-content">
          <Switch>
            <Route path="/cook/schedules" render={() => <Schedule schedules={cookSchedules} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default CookProfile;