import React, { Component } from 'react';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Panel, Accordion, Label, Carousel, Badge } from 'react-bootstrap';
import { Form, Text } from 'react-form';

import Profile from '../common/Profile/ProfileContainer';
import Loading from '../common/Loading/Loading';

import {NewOfferForm} from './Forms/NewOfferForm';

class Supplier extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        gotRequests: false
      };

    this.selected = this.selected.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getRequests = this.getRequests.bind(this);
  }

  selected(args, b) { // samo prvi put se izvršava
    if (!this.state.gotRequests)
    {
      this.state.gotRequests = true; // dobavljeni zahtjevi
      this.props.getRequests(this.props.token);
    }
  }

  getRequests(args) {
    console.log('args');
    console.log(args);
    console.log('getRequests');
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    const { token, requests, createdOffer, inProgress } = this.props;

    return (
      <Panel className='container' style={{marginTop: '21px'}}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Panel>
            <Profile />
          </Panel>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          { inProgress ? <Loading /> : null }
          <Accordion >
            <Panel header={<Badge style={{width: '100%'}}>Requests overview</Badge>} onSelect={this.selected} eventKey="1"
                   expanded={this.state.open} >
              <Form onSubmit={this.getRequests}>
                {<Badge>REQ OVERVIEW</Badge>}
              </Form>
            </Panel>
            <Panel header="Create offer" eventKey="2">
              <Form onSubmit={this.getRequests}>
                {NewOfferForm}
                <Badge> Nova ponuda </Badge>
              </Form>
            </Panel>
          </Accordion>
        </Col>
      </Panel>
    );
  }
}

export default Supplier;