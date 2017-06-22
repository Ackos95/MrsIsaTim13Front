import React, {Component} from 'react';
import {Layer, Stage, Text } from 'react-konva';

import Table from './Table';

import { reonColors, TABLE_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH } from '../../../config';

// credits: http://frontowo.pl/blog/draw-with-reactkonva
class Tables extends Component {
  constructor(props) {
    super(props);

    this.cursorDefault = this.cursorDefault.bind(this);
    this.cursorPointer = this.cursorPointer.bind(this);
    this.dragEnded = this.dragEnded.bind(this);
    this.sendTableConfigFromTables = this.sendTableConfigFromTables.bind(this);
  }
  dragEnded(id, x, y) {
    let table = this.props.tables[this.props.tables.findIndex(t=> t.id === id)];
    console.log('nasli sto>>>');
    console.log(table);
    table.x = x;
    table.y = y;
    console.log('update local sto. sada je>>>');
    console.log(table);
    this.props.updateTable(table, this.props.user.token);
  }

  componentDidMount() {
    console.log('ComponentDidMount', 'warning');
    this.props.getTables(this.props.user.token);
  }

  sendTableConfigFromTables() {
    this.props.sendTableConfig(this.props.tables, this.props.user.token);
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.props.updateDone();
    }, 3000);
  }
  /* promjena kursora */
  cursorDefault() {
    this.refs.stage.getStage().container().style.cursor = 'default';
  }
  cursorPointer() {
    this.refs.stage.getStage().container().style.cursor = 'pointer';
  }

  tableClick(tableInfo) {
    console.log('tableInfo');
    console.log(tableInfo);
    this.props.selectTable(tableInfo);
  }

  render() {
    return (
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref='stage' >
        {/* DEselect: https://konvajs.github.io/docs/events/Stage_Events.html */}
        <Layer>
          {
            this.props.tables !== null ?
            this.props.tables.map((table, index) => {
              // da li filtriramo stolove
              if (this.props.reonFilter !== null && this.props.reonFilter !== undefined)
              {
                console.log('FILTER: ' + this.props.reonFilter + ' table.reon: ' + table.reon);
                if (table.reon !== this.props.reonFilter)
                  return null;
              }


              // CLICKED ako je id_stola == id_selektovanog
              const colorKey = this.props.selectedTableId === table.id ? 'CLICKED' : table.reon;
              return (
                <Table
                  occupied={table.occupied}
                  draggable={this.props.editing}
                  dragEnded={this.dragEnded}
                  tableClick={table.occupied ? null : this.props.selectTable} // reakcija na klik na sto
                  width={TABLE_SIZE} height={TABLE_SIZE}
                  chairCount={table.chairCount}
                  x={table.x} y={table.y}
                  color={reonColors[colorKey]} // note: reonColors['CLICKED'] = 'red'
                  index={index}
                  key={`myTable-${index}`} // key je za REACT identifikaciju u DOM-u
                  id={table.id}            // ID je ID iz baze!
                  cursorPointer={this.cursorPointer}
                  cursorDefault={this.cursorDefault}
                  strokeColor={table.occupied ? 'red' : 'black'}
                  // draggable={table.draggable} // Group.draggable = TRUE, ali šta sa rezervisanim?!??!
                />)
            })
              :
              <Text
                text='No tables' fill='green'
                x={100} y={100}
                fontSize={30}
                padding={25}
              />
          }
        </Layer>
      </Stage>
    );
  }
}

export default Tables;