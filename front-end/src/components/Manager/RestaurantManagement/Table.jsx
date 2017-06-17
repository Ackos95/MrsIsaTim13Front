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

  handleDrag(id) {

    // get new position of dragged element
    const x = this.refs[id].attrs.x;
    const y = this.refs[id].attrs.y;

    this.setState({ x, y });
  }

  render() {
    return (
      <Group draggable={true}
             x={this.state.x} y={this.state.y}
             ref={this.props.id}
             key={`rect-${this.props.id}`}
             onDragEnd={()=>this.handleDrag(this.props.id)}
             onClick={()=>this.props.tableClick({id: this.props.id, x: this.state.x, y: this.state.y})}
          onMouseEnter={this.props.cursorPointer}
          onMouseLeave={this.props.cursorDefault}>
        <Rect
          width={this.props.width} height={this.props.height}
          fill={this.state.color}
          stroke={'black'} strokeWidth={2}
        />
        <Text
          text={`${this.props.chairs}`} fill='red'
          fontSize={30}
          padding={25}
        />
      </Group>
    );
  }
}
export default Table;