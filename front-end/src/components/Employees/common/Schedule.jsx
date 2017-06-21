import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import map from 'lodash/map';
import moment from 'moment';


class Schedule extends Component {
  
  static propTypes = {
    schedules: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor(props) {
    super(props);

    this.renderSchedules = this.renderSchedules.bind(this);
  }

  renderSchedules() {
    return map(this.props.schedules, (schedule) => (
      <li>
        <div className="user-info-name">{`${schedule.employee.firstName} ${schedule.employee.lastName}`}</div>
        <div className="timelapse">{moment(schedule.start).format('HH:mm (DD. MM. YYYY.)')} - {moment(schedule.end).format('HH:mm (DD. MM. YYYY.)')}</div>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <h2> Schedules </h2>
        <ul>
          {this.renderSchedules()}
        </ul>
      </div>
    );
  }
}

export default Schedule;