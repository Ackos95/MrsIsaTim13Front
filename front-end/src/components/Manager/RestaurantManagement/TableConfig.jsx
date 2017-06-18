import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Layer, Stage, Rect } from 'react-konva';

import { reons, colors } from '../../../config';
import Tables from './TablesContainer';


// credits: http://frontowo.pl/blog/draw-with-reactkonva
class TableConfig extends Component {
  constructor() {
    super();

    this.state = {
      chairCount: 0
    }

    this.changeTableColor = this.changeTableColor.bind(this);
    this.chairCountChange = this.chairCountChange.bind(this);
    this.addTable = this.addTable.bind(this);
  }

  /**
   * Dodaje sto u niz, a podatke kupi iz propsa.
   */
  addTable() {
    this.props.addTable();
  }

  chairCountChange(e) {
    this.setState({chairCount: e.target.value});
    this.props.updateChairCount(Number(e.target.value));
  }

  changeTableColor(event) {
    this.props.updateColorIndex(event.target.selectedIndex);
    // console.log(event.target.selectedIndex);
    // console.log('selected BILO: ' + this.state.selectedOption + ' a postaje: ' + event.target.value);
    // this.setState({ selectedOption: event.target.value });
    // this.setState({tableColor: this.getColorFromOption(event.target.selectedIndex)});
  }

  render() {
    return (
      <Row>
        <Col xs={6} md={3} style={{border: '1px solid black'}}>
          <button onClick={this.addTable}>Add table</button>
          <br/>
          {/*izbor tipa stola*/}
          <Row>
            {/*https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option*/}
            <Col xs={6} md={6}>
              Choose new table's type
            </Col>
            <Col xs={6} md={6}>
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
            <Col xs={7} md={7}>
              Chair count:
            </Col>
            <Col xs={5} md={5}>
              <input
                min={1} max={10}
                type='number'
                value={this.state.chairCount}
                onChange={this.chairCountChange} />
            </Col>
          </Row>
          <h4>Indeks boja</h4>
          <Row>
            {/*kolona sa nazivima reona*/}
            <Col xs={6} md={6}>
              {
                reons.map((reon) => (
                  <div style={{margin: '28px 10px'}} key={`reon-${reon}`}>
                    {reon}<br/>
                  </div>
                ))
              }
            </Col>
            {/*kolona sa bojama*/}
            <Col xs={6} md={6}>
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
        <Col xs={12} md={9} style={{border: '1px solid black'}}>
          <Tables/>
        </Col>
      </Row>
    )
  }
}

export default TableConfig;