import React from 'react';

import { Button, Col, Row, Panel } from 'react-bootstrap';

import Loading from '../../common/Loading/Loading';

import ScheduleItemForm from './../Forms/ScheduleItemForm';

/*** CALENDAR SETTINGS ***/

import BigCalendar from 'react-big-calendar';
// import myEventsList from './events'
import moment from 'moment';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
import 'react-big-calendar/lib/css/react-big-calendar.css'
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

import DragDropCalendar from './dnd';

/*** CALENDAR SETTINGS END ***/

//http://intljusticemission.github.io/react-big-calendar/examples/index.html#api
class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false
    };

    // Bind the handleSelect function already here (not in the render function)
    this.handleSelect = this.handleSelect.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.addScheduleItem = this.addScheduleItem.bind(this);

    this.loadEmployees = this.loadEmployees.bind(this);
    this.loadSchedule = this.loadSchedule.bind(this);
    this.deleteTermin = this.deleteTermin.bind(this);
  }

  deleteTermin() {
    this.props.deleteTermin(this.props.selectedItem.id, this.props.user.token);
  }

  loadEmployees() {
    console.log('LOAD employees');
    this.props.loadEmployees(this.props.user.token);
  }

  loadSchedule() {
    console.log('LOAD schedule ||| restoran: ' + this.props.user.restaurant.id);
    this.props.loadSchedule(this.props.user.restaurant.id, this.props.user.token);
  }

  addScheduleItem(newTermin) {
    console.log('|||| addScheduleItem |||| newTermin');
    console.log(newTermin);

    console.log('schedule');
    console.log(this.props.schedule);

    this.props.addTermin(newTermin, this.props.user.token, this.props.schedule.id);

  }

  selectEvent(event) {
    console.log('<<<< event >>>');
    console.log(event);
    this.props.selectScheduleItem(event);
  }

  handleSelect(args) {
    this.setState({
      bool: true
    });
  }

  render() {
    return (
      <Panel className='container'>
        <Row>
          <Col xs={12} md={12}>
            <Row>
              <Col xs={4} md={2}>
                <Button bsStyle='primary' onClick={this.loadEmployees}>Load employees</Button>
                <br/>
                <Button bsStyle='primary' onClick={this.loadSchedule}>Load schedule</Button>
              </Col>
              <Col xs={4} md={2}>
                { this.props.inProgress ? <Loading/> : <b>Ready!</b> }
                {/*{ this.props.confirmationInProgress ? <Notify /> : null }*/}
              </Col>
              <Col xs={4} md={2}>
                {
                  this.props.employees.length > 0 ?
                    <div>Loaded {`${this.props.employees.length}`} employees</div>
                    :
                    <div>No employees loaded!</div>
                }
                {
                  this.props.schedule.id !== null && this.props.schedule.id !== undefined ?
                    <div>Schedule Loaded</div>
                    :
                    <div>Click on "Load schedule" button!</div>
                }
              </Col>
            </Row>
            <Row>
              <ScheduleItemForm addScheduleItem={this.addScheduleItem} employees={this.props.employees}/>
              <Col xs={6} md={3} xsOffset={4} mdOffset={8}>
                <Button bsStyle='warning' disabled={this.props.selectedItem === null}
                        onClick={this.deleteTermin} className='pull-right'>
                  Delete selected termin
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={11} lg={11} style={{height: '600px', float: 'none', margin: '0 auto'}}>
            <DragDropCalendar  selectEvent={this.selectEvent} events={this.props.schedule.scheduleItems} />
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Schedule;