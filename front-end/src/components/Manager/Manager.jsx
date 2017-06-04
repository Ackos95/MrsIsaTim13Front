
import React, { Component } from 'react';
import { Form } from 'react-form';

import NewEmployeeForm from './Forms/NewEmployeeForm';
import NewSupplierForm from './Forms/NewSupplierForm';

import Profile from '../common/Profile/ProfileContainer';

import Loading from '../common/Loading/Loading';

// BS reference: https://react-bootstrap.github.io/components.html
import { Row, Col, Panel, Accordion } from 'react-bootstrap'

class Manager extends Component {

  constructor(props) {
    super(props);

    this.addEmployee = this.addEmployee.bind(this);
    this.addSupplier = this.addSupplier.bind(this);
  }

  addEmployee(event) {
    console.log(event);
    console.log(event.target);

    this.props.addEmployee();
  }

  addSupplier(event) {
    console.log(event);
    console.log(event.target);

    this.props.addSupplier();
  }

  render() {
    const { user, created, inProgress, addEmployee, addSupplier } = this.props;
    return (
      <div className='container' style={{marginTop: '20px'}}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <div className="">
                <Profile />
              </div>
            </div>
          </div>
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
              <Form onSubmit={addSupplier}>
                {NewSupplierForm}
              </Form>
              Supplier addition form
            </Panel>
            <Panel header="Manage supply requests" eventKey="3">
              Manage supply requests
            </Panel>
          </Accordion>
          { created.id !== null ? <div>IMA napravljenog</div> : <div>nema napravljenog</div> }
        </Col>
      </div>
    );
  }
}

// prije klase bilo:
// Manager.propTypes = { addEmployee: PropTypes.func.isRequired, }

export default Manager;