import React, { Component } from 'react';
import { PropTypes } from 'prop-types'

class BarmanProfile extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    schedule: PropTypes.object,
    loadSchedule: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { user: { id, token, restaurant }, loadSchedule } = this.props;
    
    loadSchedule(restaurant.id, id, token);
  }

  render() {
    console.log(this.props);

    return (
      <h1> Barman Profile page </h1>
    );
  }
}

export default BarmanProfile;