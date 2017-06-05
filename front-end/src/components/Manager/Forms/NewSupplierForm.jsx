import React from 'react'
//noinspection JSUnresolvedVariable
import { Text } from 'react-form';

import { Row, Col } from 'react-bootstrap';

const NewSupplierForm = ({ submitForm, resetForm }) => (
  <form onSubmit={submitForm}>
    <Col sm={12}>
      <Row className='form-group'>
        <Col sm={6}>
          <div className='form-group'>
            <label htmlFor='firstName'>First name</label>
            <Text
              field='firstName'
              placeholder='First name'
              className='form-control'
            />
          </div>
        </Col>
        <Col sm={6}>
          <div className="form-group">
            <label htmlFor='lastName'>Last name</label>
            <Text
              field='lastName'
              placeholder='Last name'
              className='form-control'
            />
          </div>
        </Col>
      </Row>
    </Col>
    <div className='form-group'>
      <label htmlFor='email'>e-mail</label>
      <Text
        field='email'
        placeholder='e-mail'
        type='email'
        value='casperjazz7@gmail.com'
        className='form-control'
      />
    </div>
    <Col sm={12}>
      <Row className='form-group'>
        <Col sm={6}>
          <div className='form-group'>
            <label htmlFor='userName'>Username</label>
            <Text
              field='userName'
              placeholder='Username'
              className='form-control'
            />
          </div>
        </Col>
        <Col sm={6}>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <Text
              field='password'
              placeholder='Password'
              type='password'
              value='default-change'
              className='form-control'
            />
          </div>
        </Col>
      </Row>
    </Col>
    <div className='form-group'>
      <button type='submit' className='btn btn-default'>Submit Form</button>
    </div>
  </form>
);

export default NewSupplierForm;