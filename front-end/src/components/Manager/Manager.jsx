import React from 'react';

import {Tab, Tabs} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import ManagerMain from './ManagerMainContainer';
import TableConfiguration from './RestaurantManagement/TableConfigurationContainer';

const Manager = React.createClass({
  getInitialState() {
    return {
      key: 1
    };
  },

  handleSelect(key) {
    console.log('selected ' + key);
    this.setState({key});
  },

  render() {
    // TODO: zamijeniti tabove <Link>-ovima - link ispod...,
    // https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Main page">
          <ManagerMain/>
        </Tab>
        <Tab eventKey={2} title="Table configuration">
          <TableConfiguration/>
        </Tab>
        <Tab eventKey={3} title="Employees management">
          <div>
            <p>Raspored - komponenta!</p>
            <Link to="http://www.jqwidgets.com/react/react-scheduler/react-scheduler-timelineviews.htm">prvi - jednostavniji</Link>
            <br/>
            <Link to='https://github.com/intljusticemission/react-big-calendar'>
              drugi - mocniji
            </Link>
          </div>
        </Tab>
      </Tabs>
    );
  }
});


export default Manager;