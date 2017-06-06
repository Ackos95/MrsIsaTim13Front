import React from 'react';

import DocumentsFieldSet from './DocumentsFieldSet';

import { Col, FormGroup } from 'react-bootstrap';
import { Text } from 'react-form';

const SupplyRequestForm = ({ submitForm, resetForm }) => (
  <form onSubmit={submitForm}>
    <FormGroup style={{marginBottom: '30px'}}>
      <Col sm={5}>
        From:
        <Text type='date' field='publishingDate' className='form-control' placeholder="From" />
      </Col>
      <Col sm={5}>
        To:
        <Text type='date' field='endingDate' className='form-control' placeholder="To" />
      </Col>
      <DocumentsFieldSet /> {/* dugme ima Col sm={2} */}
    </FormGroup>

    <FormGroup>
      <Col sm={12} style={{marginTop: '30px', width: '100%'}}>
        <button type='submit' className='btn btn-default'>
          Submit form
        </button>
      </Col>
    </FormGroup>
  </form>
);
export default SupplyRequestForm;
