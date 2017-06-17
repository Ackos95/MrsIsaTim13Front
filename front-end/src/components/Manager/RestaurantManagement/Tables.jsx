import React, {Component} from 'react';
import {Layer, Stage} from 'react-konva';

import Table from './Table';

// credits: http://frontowo.pl/blog/draw-with-reactkonva
class Tables extends Component {
  constructor(props) {
    super(props);

    this.cursorDefault = this.cursorDefault.bind(this);
    this.cursorPointer = this.cursorPointer.bind(this);
  }
  cursorDefault() {
    this.refs.stage.getStage().container().style.cursor = 'default';
  }

  cursorPointer() {
    this.refs.stage.getStage().container().style.cursor = 'pointer';
  }

  render() {
    return (
      <Stage width={this.props.width} height={this.props.height} ref='stage'>
        <Layer>
          {
            this.props.tables.map((table, key) => (
              <Table
                height={table.height} width={table.width}
                x={table.x} y={table.y}
                chairs={table.chairs}
                color={table.color}
                key={`myRect-${key}`}
                id={key}
                draggable={table.draggable}
                cursorPointer={this.cursorPointer}
                cursorDefault={this.cursorDefault}
                tableClick={this.props.tableClick} // reakcija na klik na sto
              />))
          }
        </Layer>
      </Stage>
    );
  }
}

export default Tables;