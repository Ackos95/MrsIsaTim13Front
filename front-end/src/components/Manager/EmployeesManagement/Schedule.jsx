import React from 'react';

import { Button, Col, Row, Panel } from 'react-bootstrap';

import Loading from '../../common/Loading/Loading';


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
  }

  loadEmployees() {
    console.log('LOAD employees');
    this.props.loadEmployees(this.props.user.token);
  }

  loadSchedule() {
    console.log('LOAD schedule');
    this.props.loadSchedule(this.props.user.token);
  }

  addScheduleItem() {

  }

  selectEvent(event) {
    console.log('<<<< event >>>');
    console.log(event);
    this.props.selectScheduleItem(event.id);
  }

  handleSelect(args) {
    this.setState({
      bool: true
    });
  }

  render() {
    console.log('this.props.schedule');
    console.log(this.props.schedule);
    return (
      <Panel className='container' style={{marginTop: '21px'}}>
        <Row>
          <Col xs={12} md={12}>
            <Row>
              <Col xs={6} md={3} style={{paddingLeft: '10%'}}>
                <Button bsStyle='primary' onClick={this.loadEmployees}>Load employees</Button>
              </Col>
              <Col xs={6} md={3} style={{paddingLeft: '10%'}}>
                <Button bsStyle='primary' onClick={this.loadSchedule}>Load schedule</Button>
              </Col>
              <Col xs={6} md={3} style={{paddingLeft: '10%'}}>
                <Button bsStyle='success' onClick={this.addTermin}>Add Termin</Button>
              </Col>
              <Col xs={6} md={3}>
                <Button bsStyle='warning' disabled={this.props.selectedItemId === -1} onClick={this.deleteTermin}>Delete selected termin</Button>
              </Col>
              <Col xs={12} md={12} style={{margin: '10px'}}>
                { this.props.inProgress ? <Loading/> : <b>Ready!</b> }
                {/*{ this.props.confirmationInProgress ? <Notify /> : null }*/}
              </Col>
              <Col xs={12} md={12} style={{margin: '10px'}}>
                {/*<select>*/}
                  {
                    this.props.schedule !== null ?
                      <div>Schedule Loaded</div>
                      :
                      <div>Click on "Load schedule" button</div>
                  }
                  {
                    this.props.employees.length > 0 ?
                      <div>Loaded {`${this.props.employees.length}`} employees</div>
                      :
                      <div>No employees loaded!</div>
                  }
                { this.props.inProgress ? <Loading/> : <b>Do something!</b> }
                {/*{ this.props.confirmationInProgress ? <Notify /> : null }*/}
                {/*</select>*/}
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