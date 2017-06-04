
import React, { Component } from 'react';
import { Form } from 'react-form';

import NewEmployeeForm from './Forms/NewEmployeeForm';

import Profile from '../common/Profile/Profile';

// BS reference: https://react-bootstrap.github.io/components.html
import { Row, Col, Panel, Accordion } from 'react-bootstrap'

class Manager extends Component {

  constructor(props) {
    super(props);

    this.addEmployee = this.addEmployee.bind(this);
  }

  addEmployee() {
    this.props.addEmployee();
  }

  render() {
    const { user, addEmployee } = this.props;
    return (
      <div className='container' style={{marginTop: '20px'}}>
        {/*"col-xs-12 col-sm-12 col-md-6 col-lg-6 toppad"*/}
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <Profile user={`${user}`} />
              <br/> a <br/> {`${user.firstName}`}
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Accordion>
            <Panel header="Employee addition" eventKey="1">
              <Form onSubmit={addEmployee}>
                {NewEmployeeForm}
              </Form>
            </Panel>
            <Panel header="Supplier addition" eventKey="2">
              Supplier addition form
            </Panel>
            <Panel header="Manage supply requests" eventKey="3">
              Manage supply requests
            </Panel>
          </Accordion>
          <button onClick={addEmployee}>
            Dodaj! isto kao na form submit
          </button>
        </Col>
      </div>
    );
  }
}

// prije klase bilo:
// Manager.propTypes = { addEmployee: PropTypes.func.isRequired, }

export default Manager;