import React, { Component } from 'react';

import {Layer, Stage } from 'react-konva';

import { Panel, Col } from 'react-bootstrap';

import Table from './tableOld';

class TableConfiguration extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        tablesLoaded: false, //
        obj2: null,  //
        tables: [{x: 10, y: 10, w: 50, h: 50, draggable: false}],
      };

    this.updateConfig = this.updateConfig.bind(this);
    this.add = this.add.bind(this);
  }

  add() {
    this.setState(
      { tables: this.state.tables.concat([
          { x: 10, y: 10, w: 50, h: 50, draggable: true } ]) } );
  }

  updateConfig() {
    console.log('Simanje konfiguracije.....');
  }

  /** azurira sto sa indeksom 'index' **/
  updateTable(index, x, y) {
    this.state.tables[index].x = x;
    this.state.tables[index].y = y;
  }

  componentDidMount() {
    if (!this.state.tablesLoaded)
      console.log('Kao poziv this.props.loadConfig();');
    // this.props.loadConfig(); // getLoggedUser().getRestaurant().getTableConfig()....
  }

  render() {
    //const {a,b,c} = this.props;

    return (
      <Panel className='container' style={{marginTop: '21px'}}>
        <Col xs={12} sm={12} md={3} lg={3}>
          <ul>
            <li>
              <button>opcija1</button>
            </li>
            <li>
              <button>opcija2</button>
            </li>
          </ul>
        </Col>
        <Col xs={12} sm={12} md={9} lg={9}>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <button onClick={this.add}>add</button> <br/>
              <Stage width={700} height={700}>
                <Layer>
                  {
                    this.state.tables.map((table, index) => {
                      return (
                        <Table key={index}
                           x={table.x} y={table.y}
                           w={table.w} h={table.h}
                           draggable={table.draggable}
                           dragEnded={this.updateTable}
                        />
                      );})
                  }
                </Layer>
              </Stage>
            </div>
          </div>
        </Col>
      </Panel>);
  }
}

export default TableConfiguration;