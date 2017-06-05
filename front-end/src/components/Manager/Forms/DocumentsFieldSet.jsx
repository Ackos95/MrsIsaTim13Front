import React from 'react';

import { Form, Text, Select } from 'react-form';
import { Col, FormGroup } from 'react-bootstrap';

class DocumentInput extends React.Component {
  render() {
    return (
      <Form field={ `field-${ this.props.index }` }>
      <FormGroup>
        <br/>
        <Col xs={5}>
          <Text
            key={this.props.index}
            // field={ `itemName-${ this.props.index }` }
            field='itemName'
            placeholder='Item name'
            className='form-control'
          />
        </Col>
        <Col xs={3}>
          <Text type='number' min='0' step='any' className='form-control'
            // field={`amount-${ this.props.index }`}
            field='amount'
            name={`amount-${ this.props.index }`} placeholder='Amount'
          />
        </Col>
        <Col xs={3}>
          <Select
            // field={ `unitSelect-${ this.props.index }` }
            field='unit'
            className='form-control'
            options={[
              {label: 'kg', values: 'KG', select: true},
              {label: 'l', value: 'L'},
              {label: 'pcs.', value: 'PCS'}]}
          />
        </Col>
      </FormGroup>
      </Form>
    );
  }
}

class DocumentsFieldSet extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      documents: [DocumentInput]
    };

    this.add = this.add.bind(this);
  }

  add() {
    const documents = this.state.documents.concat(DocumentInput);
    this.setState({ documents });
  }

  render () {
    const documents = this.state.documents.map((Element, index) => {
      return <Element key={ index } index={ index } style={{marginBottom: '5px'}}/>
    });

    return (
      <div>
        <button onClick={ this.add } className="col-sm-2">Add<br/>item</button>
        <div className='inputs'>
          { documents }
        </div>
      </div>);
  }
}

export default DocumentsFieldSet;