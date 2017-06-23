import React from 'react';

import { Button, Col, Row } from 'react-bootstrap';

import Loading from '../../common/Loading/Loading';


//http://intljusticemission.github.io/react-big-calendar/examples/index.html#api
class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false,
      reportText: 'Report name',
      dateFrom: '',
      dateTo: ''
    };

    this.restaurantRatingView = this.restaurantRatingView.bind(this);
    this.mealRatingView = this.mealRatingView.bind(this);
    this.waiterRatingView = this.waiterRatingView.bind(this);
    this.visitsGraphView = this.visitsGraphView.bind(this);

    this.restaurantEarningsView = this.restaurantEarningsView.bind(this);
    this.waitersEarningsView = this.waitersEarningsView.bind(this);

    this.restaurantRating = this.restaurantRating.bind(this);
    this.mealRating = this.mealRating.bind(this);
    this.waiterRating = this.waiterRating.bind(this);
    this.visitsGraph = this.visitsGraph.bind(this);

    this.restaurantEarnings = this.restaurantEarnings.bind(this);
    this.waitersEarnings = this.waitersEarnings.bind(this);

    this.dateFromChanged = this.dateFromChanged.bind(this);
    this.dateToChanged = this.dateToChanged.bind(this);
  }
  dateFromChanged(event) {
    console.log('DateFrom changed: ' + event.target.value);
    this.setState({dateFrom: event.target.value});
  }

  dateToChanged(event) {
    console.log('DateTo changed: ' + event.target.value);
    this.setState({dateTo: event.target.value});
  }

  restaurantRatingView() {this.setState({reportText: 'Restaurant rating'});}
  mealRatingView() {this.setState({reportText: 'Meal rating'});}
  waiterRatingView() {this.setState({reportText: 'Waiter rating'});}
  visitsGraphView() {this.setState({reportText: 'Visits graph'});}
  restaurantEarningsView() {this.setState({reportText: 'Restaurant earnings'});}
  waitersEarningsView() {this.setState({reportText: 'Waiters earnings'});}

  restaurantRating() {
    this.props.restaurantRating(this.props.user.restaurant.id, this.props.user.token);
  }

  mealRating() { alert('not implemented :/'); }
  waiterRating() { alert('not implemented :/'); }

  visitsGraph() {
    // const dateFrom = new Date(document.getElementById('dateFrom').value);
    // const dateTo = new Date(document.getElementById('dateTo').value);
    const dateFrom = new Date(this.state.dateFrom);
    const dateTo = new Date(this.state.dateTo);
    this.props.visitsGraph(this.props.user.restaurant.id, dateFrom, dateTo, this.props.user.token);
  }

  restaurantEarnings() {
    this.props.restaurantEarnings();
  }

  waitersEarnings() {
    this.props.waitersEarnings();
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
            <Button bsStyle='primary' onClick={this.restaurantRatingView} block>Restaurant rating</Button><br/>
            <Button bsStyle='primary' onClick={this.mealRatingView} block>Meal rating</Button><br/>
            <Button bsStyle='primary' onClick={this.waiterRatingView} block>Waiter rating</Button><br/>
            <Button bsStyle='primary' onClick={this.visitsGraphView} block>Visits graph</Button><br/><br/>
            <Button bsStyle='success' onClick={this.restaurantEarningsView} block>Restaurant earnings</Button><br/>
            <Button bsStyle='success' onClick={this.waitersEarningsView} block>Waiters earnings</Button>
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
                      return <RestaurantRating
                        value={this.props.restaurantRatingValue}
                        generateReport={this.restaurantRating}/>;
                    case 'Meal rating':
                      return <MealRating generateReport={this.mealRating}/>;
                    case 'Waiter rating':
                      return <WaiterRating generateReport={this.waiterRating}/>;
                    case 'Visits graph':
                      return <VisitsGraph generateReport={this.visitsGraph}/>;
                    case 'Restaurant earnings':
                      return <RestaurantEarnings generateReport={this.restaurantEarnings}/>;
                    case 'Waiters earnings':
                      return <WaitersEarnings generateReport={this.waitersEarnings}/>;
                    default:
                      return null;
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
        <p>Average rating: {`${this.props.value}`}</p>
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
            this.props.results.map(row => (
              <p>{`${row.waiter.id} - ${row.earnings}`}</p>
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