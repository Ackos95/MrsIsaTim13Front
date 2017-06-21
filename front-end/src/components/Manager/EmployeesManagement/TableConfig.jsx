import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';

import Loading from '../../common/Loading/Loading';

import Schedule from './ScheduleContainer';

class TableConfig extends Component {
  constructor() {
    super();

    this.method1 = this.method1.bind(this);
  }

  method1(args) {

  }

  deleteTable() {
    if (this.props.selectedTableId !== -1) {
      this.props.deleteTable(this.props.selectedTableId, this.props.user.token);

      setTimeout(() => {
        // Completed of async action, set loading state back
        this.props.updateDone();
      }, 3000);
    }
  }

  render() {
    return (
      <Row>
        <Col xs={6} md={2} style={{border: '1px solid black'}}>
          <Row>
            {/*https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option*/}
            <Col xs={6} md={6} style={{paddingLeft: '10%'}}>
              <Button bsStyle='success' onClick={this.addTable}>Add table</Button>
            </Col>
            <Col xs={6} md={6}>
              <Button bsStyle='warning' onClick={this.deleteTable}>Delete selected table</Button>
            </Col>
            <Col xs={12} md={12} style={{margin: '10px'}}>
              { this.props.inProgress ? <Loading/> : null }
              { this.props.confirmationInProgress ? <Notify /> : null }
            </Col>
          </Row>
          <hr/>
          {/*izbor tipa stola*/}
          <Row>
            {/*https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option*/}
            <Col xs={7} md={7} style={{paddingLeft: '10%'}}>
              Choose new table's reon
            </Col>
            <Col xs={5} md={5}>
              <select onChange={this.changeTableColor}>
                {
                  reons.map((reon, index) => (
                    <option value={index} key={index}>{reon}</option>
                  ))
                }
              </select>
            </Col>
          </Row>
          <hr/>
          {/*broj stolica*/}
          <Row>
            {/*https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option*/}
            <Col xs={7} md={7} style={{paddingLeft: '10%'}}>
              Chair count:
            </Col>
            <Col xs={5} md={5}>
              <input
                min={1} max={10}
                type='number'
                value={this.props.chairCount}
                onChange={this.chairCountChange} />
            </Col>
          </Row>
          <Row style={{textAlign: 'center'}}>
            <h4>Color index</h4>
            {/*kolona sa nazivima reona*/}
            <Col xs={7} md={7} style={{paddingLeft: '10%'}}>
              {
                reons.map((reon) => (
                  <div style={{margin: '28px 0'}} key={`reon-${reon}`}>
                    {reon}<br/>
                  </div>
                ))
              }
            </Col>
            {/*kolona sa bojama*/}
            <Col xs={5} md={5} style={{paddingRight: '10%'}}>
              <Stage width={100} height={320}>
                <Layer>
                  {
                    colors.map((color, index) => (
                      <Rect
                        key={`color-${color}`}
                        ref={`color-${color}`}
                        width={50} height={50}
                        x={30} y={50 * index + 10}
                        fill={color} draggable={false}
                        stroke={'black'} strokeWidth={2}
                      />
                    ))
                  }
                </Layer>
              </Stage>
            </Col>
          </Row>
        </Col> {/* kraj kolone za opcije*/}
        <Col xs={12} md={10} style={{border: '1px solid black'}}>
          <Schedule />
        </Col>
      </Row>
    )
  }
}

export default TableConfig;