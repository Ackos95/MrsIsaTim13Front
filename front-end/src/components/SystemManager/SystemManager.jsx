
import React, { Component } from 'react';
import { Form } from 'react-form';

import Profile from '../common/Profile/ProfileContainer';
import Loading from '../common/Loading/Loading';

import NewRestaurantForm from './Forms/NewRestaurantForm';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Panel, Accordion, Badge, Label } from 'react-bootstrap';

class SystemManager extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        asd: null
      };

    this.addSysManager = this.addSysManager.bind(this);
    this.addResManager = this.addResManager.bind(this);

    this.addRestaurant = this.addRestaurant.bind(this);

    this.selected = this.selected.bind(this);
  }

  addRestaurant(values) {
    values['token'] = this.props.token;
    this.props.addRestaurant(values);
  }
  addSysManager() {

  }
  addResManager() {

  }

  selected() { // samo prvi put se izvršava // poslije na REFRESH

    this.setState({showRequestList: true});

    if (!this.state.gotRequests)
    {
      this.setState({ gotRequests: true}); // dobavljeni zahtjevi

      this.props.getRequests(this.props.user.token);
    }
  }

  addSupplier(values) {
    console.log('this.props.user.token :::: ' + this.props.user.token);
    console.log(values);
    values['token'] = this.props.token;

    this.props.addSupplier({values});
  }

  render() {
    const { createdManager, createdRestaurant, inProgress } = this.props;
    return (
      <div style={{marginTop: '21px'}}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <Profile/>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          { inProgress ? <Loading /> : <Label>Ready!</Label> }
          <Accordion>
            <Panel header="Restaurant addition" eventKey="1">
              <Form onSubmit={(values) => (this.addRestaurant(values))}>
                {NewRestaurantForm}
              </Form>
            </Panel>
            <Panel header="Restaurant manager addition" eventKey="2">
              <Form onSubmit={(values) => (this.addSysManager(values))}>
                {/*{restoran menadzer Forma}*/}
              </Form>
            </Panel>
            <Panel header="System manager addition" eventKey="3">
              <Form onSubmit={(values) => (this.addSysManager(values))}>
                {/*{sistem menadzer Forma}*/}
              </Form>
            </Panel>
          </Accordion>
          {
            createdManager.id !== null ?
              <Badge>Napravljen menadžer: {`${createdManager.userName}`}</Badge>
              :
              null
          }
          {
            createdRestaurant.id !== null ?
              <Badge>
                Rezultujući Restoran:
                {`${createdRestaurant.name} ~ ${createdRestaurant.description}`}
              </Badge>
              :
              null
          }
        </Col>
      </div>
    );
  }
}

export default SystemManager;