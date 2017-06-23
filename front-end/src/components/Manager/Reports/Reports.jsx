import React from 'react';

import { Button, Col, Row } from 'react-bootstrap';

import Loading from '../../common/Loading/Loading';


//http://intljusticemission.github.io/react-big-calendar/examples/index.html#api
class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false,
      reportText: 'Report name'
    };

    this.selectEvent = this.selectEvent.bind(this);

    this.restaurantRating = this.restaurantRating.bind(this);
    this.mealRating = this.mealRating.bind(this);
    this.waiterRating = this.waiterRating.bind(this);
    this.visitsGraph = this.visitsGraph.bind(this);

    this.restaurantEarnings = this.restaurantEarnings.bind(this);
    this.waitersEarnings = this.waitersEarnings.bind(this);
  }

  restaurantRating() {
    console.log();
    this.setState({reportText: 'Restaurant rating'});
  }

  mealRating() {
    this.setState({reportText: 'Meal rating'});
  }
  waiterRating() {
    this.setState({reportText: 'Waiter rating'});
  }
  visitsGraph() {
    this.setState({reportText: 'Visits graph'});
  }


  restaurantEarnings() {
    this.setState({reportText: 'Restaurant earnings'});
  }

  waitersEarnings() {
    this.setState({reportText: 'Waiters earnings'});
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

  selectEvent(event) {
    console.log('<<<< event >>>');
    console.log(event);
    this.props.selectScheduleItem(event);
  }

  render() {
    return (
        <Row>
          {/* generate report buttons */}
          <Col xs={6} md={2} lg={2} style={{align: 'center'}}>
            {
              this.props.inProgress ? <Loading/> :
              <span>
                Loading done!<br/>Click on the buttons below to generate reports.
              </span>
            }
            {/*{ this.props.confirmationInProgress ? <Notify /> : null }*/}
            <br/>
            <Button bsStyle='primary' onClick={this.restaurantRating} block>Restaurant rating</Button><br/>
            <Button bsStyle='primary' onClick={this.mealRating} block>Meal rating</Button><br/>
            <Button bsStyle='primary' onClick={this.waiterRating} block>Waiter rating</Button><br/>
            <Button bsStyle='primary' onClick={this.visitsGraph} block>Visits graph</Button><br/><br/>
            <Button bsStyle='success' onClick={this.restaurantEarnings} block>Restaurant earnings</Button><br/>
            <Button bsStyle='success' onClick={this.waitersEarnings} block>Waiters earnings</Button>
          </Col>
          <Col xs={12} md={9} mdOffset={1} lg={9} lgOffset={1}>
            <Row>
              <h2>
                { this.state.reportText }
              </h2>
              <Col md={10} mdOffset={1}>
                {(() => {
                  switch (this.state.reportText) {
                    case 'Restaurant rating':
                      return <RestaurantRating/>;
                    case 'Meal rating':
                      return <MealRating/>;
                    case 'Waiter rating':
                      return <WaiterRating/>;
                    case 'Visits graph':
                      return <VisitsGraph/>;
                    case 'Restaurant earnings':
                      return <RestaurantEarnings/>;
                    case 'Waiters earnings':
                      return <WaitersEarnings/>;
                    default: null;
                  }
                })()}
              </Col>
            </Row>
          </Col>
        </Row>
    );
  }
}

class RestaurantRating extends React.Component {

  componentDidMount() {
    this.props.generateReport();
  }

  render() {
    return (
      <Col md={6} mdOffset={3}>
        <div>Restaurant Rating component</div>
        <p>Average rating: {`${this.props.result}`}</p>
      </Col>
    );
  }
}

class MealRating extends React.Component {
  render() {
    return (
      <Col>
        <div>Meal Rating component</div>
        <form>
          <input type='text' onChange={this.props.mealNameChanged}/>
        </form>
        <Button block onClick={this.props.generateReport}>Get Rating</Button>
      </Col>
    );
  }
}

class WaiterRating extends React.Component {
  componentDidMount() {
    this.props.generateReport();
  }

  render() {
    return (
      <div>Waiter Rating component</div>
    );
  }
}

class VisitsGraph extends React.Component {
  render() {
    return (
      <div>
        Visits Graph component
        <DatesFromAndTo/>
        <Button onClick={this.props.generateReport}>Get earnings</Button>
      </div>
    );
  }
}

class RestaurantEarnings extends React.Component {
  render() {
    return (
      <div>
        Restaurant Earnings component
        <DatesFromAndTo/>
        <Button block onClick={this.props.generateReport}>Get earnings</Button>
      </div>
    );
  }
}

class WaitersEarnings extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }
  componentDidMount() {
    this.props.generateReport();
  }

  render() {
    return (
      <div>
        Waiters Earnings component - earnings per waiter
        <div>
          {
            this.props.results.map(result => (
              <p>{`${result.price}`}</p>
            ))
          }
        </div>
      </div>
    );
  }
}

class DatesFromAndTo extends React.Component {
  render() {
    return (
      <Row>
        <Col md={3} mdOffset={1} lg={3} lgOffset={1}>
          <span>From:</span>
          <input type='date' id='dateFrom'/>
        </Col>
        <Col md={3} mdOffset={1} lg={3} lgOffset={1}>
          <span> To: </span>
          <input type='date' id='dateTo'/>
        </Col>
      </Row>
    );
  }
}

export default Reports;