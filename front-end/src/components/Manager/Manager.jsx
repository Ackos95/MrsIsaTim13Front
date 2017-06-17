import React from 'react';

import {Tab, Tabs} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import ManagerMain from './ManagerMainContainer';
import TableConfiguration from './RestaurantManagement/TableConfigurationContainer';

class Manager extends React.Component {
  constructor(props) {
    super();
    this.state = { activeTab: 1 };
    // Bind the handleSelect function already here (not in the render function)
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab
    });
  }
  render() {
    // TODO: zamijeniti tabove <Link>-ovima - link ispod...,
    // https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669
    return (
      <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} id='restaurant-manager-tabs'>
        <Tab eventKey={1} title="My profile">
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
              drugi - mocniji?
            </Link>
          </div>
        </Tab>
        <Tab eventKey={42} title="Tab 42">Tab 42 - the Answer</Tab>
      </Tabs>
    );
  }
}

export default Manager;