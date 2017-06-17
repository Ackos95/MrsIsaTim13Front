import React, {Component} from 'react';
import Tables from './Tables';
import Table from './Table';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

import { TABLE_SIZE } from '../../../config';

import { Col, Row } from 'react-bootstrap';

import { Layer, Stage, Rect } from 'react-konva';

//import {Select} from 'react-form';

// credits: http://frontowo.pl/blog/draw-with-reactkonva
class TableCanvas extends Component {
  constructor() {
    super();

    this.state = {
      tables: [{
        key: 0,
        width: TABLE_SIZE,
        height: TABLE_SIZE,
        x: 10,
        y: 10,
        color: 'red',
        draggable: false,
        chairs: 5
      }],
      selectedOption: 'Inside',
      tableColor: 'black',
      colors: ['black', 'blue', 'gray', 'white', 'yellow', 'green'],
      reons: ['Inside', 'Outside', 'Smokers', 'Non-smokers', 'Inside garden', 'Outside garden'],
      selectedTable: -1
    };
    this.addTable = this.addTable.bind(this);
    this.changeTableColor = this.changeTableColor.bind(this);
    this.getColorFromOption = this.getColorFromOption.bind(this);
    this.tableClick = this.tableClick.bind(this);
  }

  changeTableColor(event) {
    console.log(event.target.selectedIndex);
    console.log('selected BILO: ' + this.state.selectedOption + ' a postaje: ' + event.target.value);
    this.setState({ selectedOption: event.target.value });
    this.setState({tableColor: this.getColorFromOption(event.target.selectedIndex)});
  }

  // vraca boju u skladu sa trenutno odabranom opcijom
  getColorFromOption(newValue) {
    return this.state.colors[newValue];
  }

  addTable() {
    console.log('stolovi do sada:');
    console.log(this.state.tables);

    let newRectangle = {
      width: TABLE_SIZE, height: TABLE_SIZE,
      x: Math.floor(Math.random() * (CANVAS_WIDTH - 10 + 1)) + 10,
      y: Math.floor(Math.random() * (CANVAS_HEIGHT - 10 + 1)) + 10,
      color: this.state.tableColor, draggable: true,
      chairs: Math.floor(Math.random() * (10 - 5 + 1)) + 5
    };

    let rectangleFromState = [...this.state.tables];
    rectangleFromState.push(newRectangle);

    this.setState({
      tables: rectangleFromState
    });
  }

  tableClick(index) {
    console.log('index');
    console.log(index);
    this.setState({selectedTable: index})
  }


  render() {
    return (
      <Row>
        <Col xs={6} md={3} style={{border: '1px solid black'}}>
          <button onClick={() => this.addTable()}>Add table</button>
          <br/>
          {/*izbor tipa stola*/}
          <Row>
            {/*https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option*/}
            <Col xs={6} md={6}>
              Choose new table's type
            </Col>
            <Col xs={6} md={6}>
              <select value={this.state.selectedOption} onChange={this.changeTableColor}>
                {
                  this.state.reons.map((reon, index) => (
                    <option value={index} key={index}>{reon}</option>
                  ))
                }
              </select>
            </Col>
          </Row>
          <hr/>
          <h4>Indeks boja</h4>
          <Row>
            {/*kolona sa nazivima reona*/}
            <Col xs={6} md={6}>
              {
                this.state.reons.map((reon) => (
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
                    this.state.colors.map((color, index) => (
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
          <Tables width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{background: 'gray'}}
                  tables={this.state.tables}
          tableClick={this.tableClick}>
            {/*{*/}
              {/*this.state.tables.map((table, key) => (*/}
                {/*<Table*/}
                  {/*height={table.height} width={table.width}*/}
                  {/*x={table.x} y={table.y}*/}
                  {/*chairs={table.chairs}*/}
                  {/*color={table.color}*/}
                  {/*key={`myRect-${key}`}*/}
                  {/*id={key}*/}
                  {/*draggable={table.draggable}*/}
                  {/*tableClick={this.tableClick} // reakcija na klik na sto*/}
                {/*/>))*/}
            {/*}*/}
          </Tables>
        </Col>
      </Row>
    )
  }
}

export default TableCanvas;