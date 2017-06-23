import React from 'react';

import { Text, Select } from 'react-form';
import { Col, FormGroup } from 'react-bootstrap';

class DocumentInput extends React.Component {
  render() {
    const item = this.props.item;

    return (
      <FormGroup>
        {/*<Form field={ `field-${ this.props.index }` }>*/}
        <Col xs={5}>
          <Text
            key={this.props.index}
            field={ `item${ this.props.index }[itemName]` }
            name={ `item${ this.props.index }[itemName]` }
            placeholder='Item name'
            className='form-control'
            type='text'
          />
        </Col>
        <Col xs={3}>
          <Text min='0' step='any' className='form-control'
                field={ `item${ this.props.index }[amount]` }
                name={ `item${ this.props.index }[amount]` }
                placeholder='Amount'
          />
        </Col>
        <Col xs={3}>
          <Select
            field={ `item${ this.props.index }[unit]` }
            className='form-control'
            options={[
              {label: 'kg', values: 'KG', select: item !== undefined && item.unit === 'kg'},
              {label: 'l', value: 'L', select: item !== undefined && item.unit === 'l'},
              {label: 'pcs.', value: 'PCS', select: item !== undefined && item.unit === 'pcs'}
              ]}
          />
        </Col>
        {/*</Form> treba van formGroup-a! */}
      </FormGroup>
    );
  }
}
export default DocumentInput;