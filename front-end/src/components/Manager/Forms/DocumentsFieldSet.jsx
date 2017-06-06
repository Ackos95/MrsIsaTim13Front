import React from 'react';

import { Form, Text, Select } from 'react-form';
import { Col, FormGroup } from 'react-bootstrap';

class DocumentInput extends React.Component {
  render() {
    return (
      <FormGroup>
      {/*<Form field={ `field-${ this.props.index }` }>*/}
        <br/>
        <Col xs={5}>
          <Text
            key={this.props.index}
            // field={ `itemName-${ this.props.index }` }
            field={ `item${ this.props.index }[itemName]` }
            placeholder='Item name'
            className='form-control'
          />
        </Col>
        <Col xs={3}>
          <Text type='number' min='0' step='any' className='form-control'
            // field={`amount-${ this.props.index }`}
            field={ `item${ this.props.index }[amount]` }
            name={ `item${ this.props.index }[amount]` } placeholder='Amount'
          />
        </Col>
        <Col xs={3}>
          <Select
            field={ `item${ this.props.index }[unit]` }
            className='form-control'
            options={[
              {label: 'kg', values: 'KG', select: true},
              {label: 'l', value: 'L'},
              {label: 'pcs.', value: 'PCS'}]}
          />
        </Col>
      {/*</Form> treba van formGroup-a! */}
      </FormGroup>
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

  add(e) {
    e.preventDefault(); // da ne submituje?
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