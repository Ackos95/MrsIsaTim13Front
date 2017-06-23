import React from 'react';

import {Tab, Tabs} from 'react-bootstrap';

import ManagerMain from './ManagerMainContainer';
import TableConfig from './RestaurantManagement/TableConfigContainer';
import Schedule from './EmployeesManagement/ScheduleContainer';
import Reports from './Reports/ReportsContainer'

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 1 };
    // Bind the handleSelect function already here (not in the render function)
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedTab) {
    // if (selectedTab === 2)
    //   getTables();
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
          <TableConfig/>
        </Tab>
        <Tab eventKey={3} title="Employees management">
          <Schedule />
        </Tab>
        <Tab eventKey={4} title="Reports" style={{width: '96%'}}>
          <Reports />
        </Tab>
        <Tab eventKey={42} title="Tab 42">Tab 42 - the Answer</Tab>
      </Tabs>
    );
  }
}

export default Manager;