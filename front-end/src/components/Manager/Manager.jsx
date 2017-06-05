
import React, { Component } from 'react';
import { Form } from 'react-form';

import NewEmployeeForm from './Forms/NewEmployeeForm';
import NewSupplierForm from './Forms/NewSupplierForm';
import SupplyRequestForm from  './Forms/SupplyRequestForm';

import DocumentsFieldSet from './Forms/DocumentsFieldSet';

import Profile from '../common/Profile/ProfileContainer';

import Loading from '../common/Loading/Loading';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Panel, Accordion, Label } from 'react-bootstrap';

class Manager extends Component {

  constructor(props) {
    super(props);

    this.addEmployee = this.addEmployee.bind(this);
    this.addSupplier = this.addSupplier.bind(this);
    this.addSupplyRequest = this.addSupplyRequest.bind(this);
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

  addSupplyRequest(items) {
    items['token'] = this.props.user.token;
    console.log('items iz funkcije menadžera');
    console.log(items);

    console.log(this.refs.itemsFields);

    this.props.addSupplyRequest({ items });
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
              <Form onSubmit={(values) => (this.addSupplyRequest(values))}>
                {SupplyRequestForm}
                {/*<DocumentsFieldSet ref='itemsFields' /> /!* dugme ima Col sm={2} *!/*/}
              </Form>
            </Panel>
          </Accordion>
          {
            created.id !== null ?
            <Label>Napravljen korisnik: {`${created.firstName}`}</Label>
            :
            null
          }
          {
            createdRequest.id !== null ?
              <Label>Napravljena potražnja: {`${createdRequest.publishingDate} ~ ${createdRequest.endingDate}`}</Label>
              :
              null
          }
        </Col>
      </Panel>
    );
  }
}

export default Manager;