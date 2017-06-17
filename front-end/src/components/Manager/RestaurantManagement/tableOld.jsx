import React from 'react';

import { Rect, Group } from 'react-konva';

class Table extends React.Component {
  render() {
    return (
        <Rect key={this.props.key}
              width={this.props.w} height={this.props.w}
              fill="black"
              draggable={this.props.draggable}
              x={this.props.x}
              y={this.props.y}
              onDragEnd={
                this.props.dragEnded(this.props.key, this.props.x, this.props.y)
              }
        />
    );
  }
}

export default Table;