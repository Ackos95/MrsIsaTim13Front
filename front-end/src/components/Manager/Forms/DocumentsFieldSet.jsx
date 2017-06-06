import React from 'react';

import { Col } from 'react-bootstrap';

import DocumentInput from './DocumentInput';

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
    const {supplyItems} = this.props;
    const documents = this.state.documents.map((Element, index) => {
      return <Element key={ index } index={ index }
                      item={supplyItems == null ? {} : supplyItems}
                      style={{marginBottom: '5px'}}/>
    });

    return (
      <div>
        <Col sm={1}>
          <button onClick={ this.add }>Add<br/>item</button>
        </Col>
        <hr/>
        <div className='inputs'>
          { documents }
        </div>
      </div>);
  }
}

export default DocumentsFieldSet;