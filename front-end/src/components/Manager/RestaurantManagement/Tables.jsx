import React, {Component} from 'react';
import {Layer, Stage, Text } from 'react-konva';

import Table from './Table';

import { colors, TABLE_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH } from '../../../config';

// credits: http://frontowo.pl/blog/draw-with-reactkonva
class Tables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tables: [{
        key: 0,
        width: TABLE_SIZE, height: TABLE_SIZE,
        x: 10, y: 10,
        color: 'black',
        draggable: false,
        chairs: 5
      }],
      // selectedTable: -1,
    };

    this.cursorDefault = this.cursorDefault.bind(this);
    this.cursorPointer = this.cursorPointer.bind(this);
    this.getColorFromOption = this.getColorFromOption.bind(this);
    this.dragEnded = this.dragEnded.bind(this);
  }
  dragEnded(id, x, y) {
    this.props.updateOneTable(id, x, y);
  }

  // vraca boju u skladu sa trenutno odabranom opcijom
  getColorFromOption(newValue) {
    return colors[newValue];
  }

  componentDidUpdate() {
    console.log('componentDidUpdate ');
  }

  componentDidMount() {
    console.log('ComponentDidMount', 'warning');
    this.props.getTables(this.props.user.token);
  }

  componentWillReceiveProps(nextProps) {
    console.log('ComponentWillRecieveProps', 'warning');
  }

  addTable(tableColor, chairs) {
    console.log('stolovi do sada:');
    console.log(this.props.tables);

    let newTable = {
      width: TABLE_SIZE, height: TABLE_SIZE,
      x: Math.floor(Math.random() * (CANVAS_WIDTH - 10 + 1)) + 10,
      y: Math.floor(Math.random() * (CANVAS_HEIGHT - 10 + 1)) + 10,
      color: tableColor, chairs: chairs
    };

    let tablesFromState = [...this.state.tables];
    tablesFromState.push(newTable);

    this.setState({
      tables: tablesFromState
    });
  }

  /* promjena kursora */
  cursorDefault() {
    this.refs.stage.getStage().container().style.cursor = 'default';
  }
  cursorPointer() {
    this.refs.stage.getStage().container().style.cursor = 'pointer';
  }

  tableClick(tableId) {
    console.log('tableId');
    console.log(tableId);
    this.setState({selectedTable: tableId})
  }

  render() {
    return (
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref='stage'>
        <Layer>
          {
            // ucitani stolovi su narandzasti!
            this.props.tables !== null ?
            this.props.tables.map((table, key) => (
              <Table
                dragEnded={this.dragEnded}
                height={table.height} width={table.width}
                x={table.x} y={table.y}
                chairCount={table.chairCount}
                color={table.reon} // {table.color}
                key={`myRect-${key}`}
                id={table.id}
                // draggable={table.draggable} // nema poente jer je Group.draggable = TRUE
                cursorPointer={this.cursorPointer}
                cursorDefault={this.cursorDefault}
                tableClick={this.tableClick} // reakcija na klik na sto
              />))
              :
              <Text
                text='No table' fill='green'
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