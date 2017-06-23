import React from 'react'

import { Text } from 'react-form';

import { Col, Label, FormGroup } from 'react-bootstrap';

const NewOfferForm = ({ submitForm, resetForm }) => (
  <form onSubmit={submitForm}>
    <Col xs={12}>
      <div className='form-group'>
        <Label>Price</Label>
        <Col xs={12}>
          <Text field='price' type='number' min='0' step='any' className='form-control' required='required'/>
        </Col>
      </div>
      <div className='form-group'>
        <Label>Guarantee</Label>
        <Col xs={12}>
          <Text type='number' field='guarantee' min='1' className='form-control' required='required'/>
        </Col>
      </div>
      <div className='form-group'>
        <Label> Delivered until </Label>
        <Col xs={12}>
          <Text type='date' className='form-control' field='deliveredUntil' required='required'/>
        </Col>
      </div>
    </Col>
    <div className='form-group'>
      <button type='submit' className='btn btn-default'>
        Submit offer
      </button>
    </div>
  </form>
);

export default NewOfferForm;