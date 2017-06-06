
import React, { Component } from 'react';
import { Form, Text } from 'react-form';

import NewEmployeeForm from './Forms/NewEmployeeForm';
import NewSupplierForm from './Forms/NewSupplierForm';
import SupplyRequestForm from  './Forms/SupplyRequestForm';

import DocumentsFieldSet from './Forms/DocumentsFieldSet';

import Profile from '../common/Profile/ProfileContainer';

import Loading from '../common/Loading/Loading';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Panel, Accordion, Label, Carousel, Badge } from 'react-bootstrap';

class Manager extends Component {

  constructor(props) {
    super(props);

    this.addEmployee = this.addEmployee.bind(this);
    this.addSupplier = this.addSupplier.bind(this);
    this.addSupplyRequest = this.addSupplyRequest.bind(this);

    this.nested = this.nested.bind(this);
  }

  addEmployee() {
    this.props.addEmployee();
  }

  addSupplier(values) {
    console.log('this.props.user.token :::: ' + this.props.user.token);
    console.log(values);
    values['token'] = this.props.user.token;

    this.props.addSupplier({ values });
  }

  addSupplyRequest(values) {
    values['token'] = this.props.user.token;
    console.log('values iz funkcije menadžera');
    console.log(values);

    this.props.addSupplyRequest({ values });
  }


  render() {
    const { user, created, createdRequest, inProgress, addEmployee, addSupplier } = this.props;
    return (
      <Panel className='container' style={{marginTop: '21px'}}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Panel>
            <Profile />
          </Panel>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          { inProgress ? <Loading /> : null }
          <Accordion>
            <Panel header="Employee addition" eventKey="1">
              <Form onSubmit={addEmployee}>
                {NewEmployeeForm}
              </Form>
            </Panel>
            <Panel header="Supplier addition" eventKey="2">
              <Form onSubmit={(values) => (this.addSupplier(values))}>
                {NewSupplierForm}
              </Form>
            </Panel>

            <Panel header="Supply request creation" eventKey="3">
              // nested forms:
              // https://react-form.js.org/?selectedKind=2.%20Demos&selectedStory=Kitchen%20Sink&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel#/story/readme-documentation
              // StackOvrflw [KEY]: https://stackoverflow.com/questions/37762991/react-nested-form-values
              <Form onSubmit={(values) => (this.addSupplyRequest(values))}>
                {SupplyRequestForm}
              </Form>
            </Panel>
          </Accordion>
          {
            created.id !== null ?
            <Badge>Napravljen user: {`${created.firstName}`}</Badge>
            :
            null
          }
          {
            createdRequest.id !== null ?
              <Badge>
                Napravljen SupplyRequest:
                {`${createdRequest.publishingDate} ~ ${createdRequest.endingDate}`}
              </Badge>
              :
              null
          }
        </Col>
      </Panel>
    );
  }
}

export default Manager;