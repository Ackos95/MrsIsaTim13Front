import React from 'react'
//noinspection JSUnresolvedVariable
import { Text } from 'react-form';

import { Col } from 'react-bootstrap';

const NewRestaurantForm = ({ submitForm, resetForm }) => (
  <form onSubmit={submitForm}>
    <Col sm={12} className='form-group'>
      <label htmlFor='name'>Name</label>
      <Text
        field='name'
        placeholder='name'
        className='form-control'
      />
    </Col>
    <Col sm={12} className='form-group'>
      <label htmlFor='type'>Description</label>
      <Text
        field='description'
        placeholder='description'
        className='form-control'
      />
    </Col>
    <Col sm={12} className='form-group'>
      <label htmlFor='city'>City</label>
      <Text
        field='city'
        placeholder='city'
        className='form-control'
      />
    </Col>
    <div className='form-group'>
      <button type='submit' className='btn btn-default'>Add restaurant</button>
    </div>
  </form>
);

export default NewRestaurantForm;