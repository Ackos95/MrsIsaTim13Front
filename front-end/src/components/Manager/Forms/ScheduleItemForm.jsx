import React from 'react';

import { Col, Button } from 'react-bootstrap';
import { Text, Form } from 'react-form';


import {reons} from './../../../config';

class ScheduleItemForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date1: null,
      date2: null,
      time1: null,
      time2: null,
      selectedEmployee: null,
      waiterSelected: false,
      selectedReon: null,
    };

    this.sendTreminValues = this.sendTreminValues.bind(this);

    this.employeeChanged = this.employeeChanged.bind(this);
    this.changeReon = this.changeReon.bind(this);
  }

  changeReon(event) {
    console.log('ODABRAN REON: ' + reons[event.target.selectedIndex]);
    this.setState({selectedReon: reons[event.target.selectedIndex]});
  }

  sendTreminValues() {
    let dateTime1 = document.getElementById("dateTime1").value;
    let dateTime2 = document.getElementById("dateTime2").value;

    this.props.addScheduleItem({
      start: new Date(dateTime1),
      end: new Date(dateTime2),
      employee: this.state.selectedEmployee === null ? this.props.employees[0] : this.state.selectedEmployee,
      reon: this.state.selectedReon
    });
  }

  employeeChanged(event) {
    let selectedEmployee = this.props.employees[event.target.selectedIndex];
    this.setState({selectedEmployee: selectedEmployee});

    // svi imaju po jednu ulogu, a od 12-og char-a trazimo ("ROLE_EMPLOYEE_..")
    const waiterSelected = selectedEmployee.roles[0].name.includes('WAITER', 12);
    this.setState({waiterSelected: waiterSelected});
    if (!waiterSelected)
      this.setState({selectedReon: null});
    else
      this.setState({selectedReon: 'INSIDE'});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.employees !== null && nextProps.employees !== undefined
      && nextProps.employees.length > 0)
      if (this.state.selectedEmployee !== null)
        this.setState({selectedEmployee: nextProps.employees[0]});
    console.log('nextProps');
    console.log(nextProps);
    console.log('ComponentWillRecieveProps', 'warning');
  }

  render() {
    return (
      <Form >
        <Col style={{marginBottom: '30px'}}>

          <Col sm={5} md={6} lg={3}>
            From:
            <Text type='datetime-local' field='start' className='form-control' placeholder="From"
                  min='2017-06-30T09:00:00' id='dateTime1'/>
          </Col>
          <Col sm={5} md={6} lg={3}>
            To:
            <Text type='datetime-local' field='end' className='form-control' placeholder="To"
                  min='2017-06-30T09:10:00' id='dateTime2'/>
          </Col>
          {/*DOLE JE GRESKA*/}
          <Col sm={5} md={6} lg={3}>
            Employee:
            <select onChange={this.employeeChanged}>
              {
                this.props.employees.map((employee, index) => (
                  <option value={index} key={index}>{`${employee.firstName} ${employee.lastName}`}</option>
                ))
              }
            </select>
          </Col>
          {/*GORE JE GRESKA*/}
          {/* prikaz odabira reona - samo za konobare */}
          {
            this.state.waiterSelected ?
            <Col xs={6} md={3} >
              Choose waiter's reon:
              <select onChange={this.changeReon}>
                {
                  reons.map((reon, index) => (
                    <option value={index} key={index}>{reon}</option>
                  ))
                }
              </select>
            </Col>
              :
              null
          }
          <Col sm={12} md={12} lg={12} style={{marginTop: '30px', width: '100%'}}>
            <Button bsStyle='success' onClick={this.sendTreminValues}>Add Termin</Button>
          </Col>
        </Col>
      </Form>);
  }
}

export default ScheduleItemForm;
