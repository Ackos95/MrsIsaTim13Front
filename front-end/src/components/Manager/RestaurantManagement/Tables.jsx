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
  }
  dragEnded(id, x, y) {
    this.props.updateOneTable(id, x, y);
  }

  componentDidMount() {
    console.log('ComponentDidMount', 'warning');
    this.props.getTables(this.props.user.token);
  }

  // addTable(tableColor, chairs) {
  //   console.log('stolovi do sada:');
  //   console.log(this.props.tables);
  //
  //   let newTable = {
  //     width: TABLE_SIZE, height: TABLE_SIZE,
  //     x: Math.floor(Math.random() * (CANVAS_WIDTH - 10 + 1)) + 10,
  //     y: Math.floor(Math.random() * (CANVAS_HEIGHT - 10 + 1)) + 10,
  //     color: tableColor, chairs: chairs
  //   };
  //
  //   let tablesFromState = [...this.props.tables];
  //   tablesFromState.push(newTable);
  // }

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
              // CLICKED ako je id_stola == id_selektovanog
              const colorKey = this.props.selectedTableId === table.id ? 'CLICKED' : table.reon;
              return (
                <Table
                  dragEnded={this.dragEnded}
                  tableClick={this.props.selectTable} // reakcija na klik na sto
                  width={TABLE_SIZE} height={TABLE_SIZE}
                  chairCount={table.chairCount}
                  x={table.x} y={table.y}
                  color={reonColors[colorKey]} // note: reonColors['CLICKED'] = 'red'
                  index={index}
                  key={`myTable-${index}`} // key je za REACT identifikaciju u DOM-u
                  id={table.id}            // ID je ID iz baze!
                  cursorPointer={this.cursorPointer}
                  cursorDefault={this.cursorDefault}
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