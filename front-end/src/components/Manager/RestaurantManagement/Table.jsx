import React, {Component} from 'react';

import {Rect, Group, Text } from 'react-konva';

// credits: http://frontowo.pl/blog/draw-with-reactkonva
class Table extends Component {

  constructor() {

    super();

    this.state = {
      color: '',
      x: 0,
      y: 0
    };
  }

  componentDidMount() {
    this.setState({
      color: this.props.color,
      x: this.props.x,
      y: this.props.y
    })
  }

  handleDragEnd(id) {

    // get new position of dragged element
    // https://konvajs.github.io/docs/events/Binding_Events.html
    const x = this.refs[id].attrs.x;
    const y = this.refs[id].attrs.y;
    this.props.dragEnded(id, x, y);
  }

  render() {
    const textFill = this.props.color === 'red' || this.props.color === 'black' ? 'white' : 'black';
    return (
      <Group draggable={true}
             x={this.props.x} y={this.props.y}
             ref={this.props.id}
             // key={`rect-${this.props.id}`}
             onDragEnd={()=>this.handleDragEnd(this.props.id)}
             onClick={()=>this.props.tableClick({id: this.props.id, chairCount: this.props.chairCount})}
          onMouseEnter={this.props.cursorPointer}
          onMouseLeave={this.props.cursorDefault}>
        <Rect
          ref={`R-${this.props.id}`}
          fill={this.props.color}
          width={this.props.width} height={this.props.height}
          stroke='black' strokeWidth={2}
        />
        <Text
          text={`${this.props.chairCount}`} fill={textFill}
          fontSize={30}
          padding={25}
        />
      </Group>
    );
  }
}
export default Table;