import React from 'react';

import DocumentsFieldSet from './DocumentsFieldSet';

import { Col, FormGroup } from 'react-bootstrap';

const SupplyRequestForm = ({ submitForm, resetForm }) => (
  <form onSubmit={submitForm} >
    <FormGroup style={{marginBottom: '30px'}}>
      <Col sm={5}>
        <input type='date' name='publishingDate' className='form-control' placeholder="From" />
      </Col>
      <Col sm={5}>
        <input type='date' name='endingDate' className='form-control' placeholder="To" />
      </Col>

      <DocumentsFieldSet ref='itemsFields' onSubmit={submitForm}/> {/* dugme ima Col sm={2} */}

    </FormGroup>

    <FormGroup>
      <Col sm={12} style={{marginTop: '30px'}}>
        <button type='submit' className='btn btn-default'>
          Submit form
        </button>
      </Col>
    </FormGroup>
  </form>
);
export default SupplyRequestForm;
