import React from 'react';

import { Text, Select } from 'react-form';
import { Col, FormGroup } from 'react-bootstrap';

class DocumentInput extends React.Component {
  render() {
    const item = this.props.item;
    console.log('this.props.item');
    console.log(this.props.item);
    console.log('item #' + this.props.index);
    console.log(item);
    console.log(item === undefined);
    console.log(item === null);

    return (
      <FormGroup>
        {/*<Form field={ `field-${ this.props.index }` }>*/}
        <br/>
        <Col xs={5}>
          <Text
            key={this.props.index}
            field={ `item${ this.props.index }[itemName]` }
            placeholder='Item name'
            className='form-control'
            // value={`${item === undefined ? '' : item.itemName}`}
            value={'5'}
          />
        </Col>
        <Col xs={3}>
          <Text type='number' min='0' step='any' className='form-control'
                field={ `item${ this.props.index }[amount]` }
                name={ `item${ this.props.index }[amount]` } placeholder='Amount'
                // value={`${item === undefined? '' : item.amount}`}
                value={42}
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