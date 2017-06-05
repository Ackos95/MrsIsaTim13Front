import React from 'react'
//noinspection JSUnresolvedVariable
import { Text, Select } from 'react-form';

import { Row, Col, Button, Input, Label, FormGroup } from 'react-bootstrap';

const NewEmployeeForm = ({ submitForm, resetForm }) => (
  <form onSubmit={submitForm}>
    <Col sm={12}>
      <Row className='form-group'>
        <Col sm={6}>
          <FormGroup>
            <label htmlFor='firstName'>First name</label>
            <Text
              field='firstName'
              placeholder='First name'
              className='form-control'
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <label htmlFor='lastName'>Last name</label>
            <Text
              field='lastName'
              placeholder='Last name'
              className='form-control'
            />
          </FormGroup>
        </Col>
      </Row>
    </Col>
    <FormGroup>
      <label htmlFor='email'>e-mail</label>
      <Text
        field='email'
        placeholder='e-mail'
        type='email'
        value='casperjazz7@gmail.com'
        className='form-control'
      />
    </FormGroup>
    <Col sm={12}>
      <Row bsClass='form-group'>
        <Col sm={6}>
          <FormGroup>
            <label htmlFor='userName'>Username</label>
            <Text
              field='userName'
              placeholder='Username'
              className='form-control'
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <label htmlFor='password'>Password</label>
            <Text
              field='password'
              placeholder='Password'
              type='password'
              value='default-change'
              className='form-control'
            />
          </FormGroup>
        </Col>
      </Row>
    </Col>
    <FormGroup>
      <label htmlFor="employeeType">Employee type</label>
      <Select
        field='employeeType'
        options={[
          {label: 'Barman', values: 'barman', select: true},
          {label: 'Cook', value: 'cook'},
          {label: 'Waiter', value: 'waiter'}]}
      />
      <label htmlFor="shirtSize">Shirt size</label>
      <Text
        field='shirtSize'
        placeholder='Shirt size'
        className='form-control'
      />
      <label htmlFor="shoeSize">Shoe size</label>
      <Text
        field='shoeSize'
        placeholder='Shoe size'
        className='form-control'
      />
    </FormGroup>
    <FormGroup>
      <button type='submit' className='btn btn-default'>Submit Form</button>
    </FormGroup>
  </form>
);

export default NewEmployeeForm;