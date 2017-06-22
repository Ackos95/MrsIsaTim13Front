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

    this.tableClick = this.tableClick.bind(this);
  }
  tableClick() {
    console.log('TABLE_CLICK!');
    console.log(this.props.tableClick);
    if (this.props.tableClick !== null)
      this.props.tableClick({id: this.props.id, chairCount: this.props.chairCount});
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
    const taken = this.props.occupied ? '\ntaken' : '';
    return (
      // If not occupied, you can drag it. 'Draggable' is passed from <Tables editing={true} /> in TableConfig
      <Group draggable={!this.props.occupied && this.props.draggable}
             x={this.props.x} y={this.props.y}
             ref={this.props.id}
             onDragEnd={()=>this.handleDragEnd(this.props.id)}
             onClick={this.tableClick}
          onMouseEnter={this.props.cursorPointer}
          onMouseLeave={this.props.cursorDefault}>
        <Rect
          ref={`R-${this.props.id}`}
          fill={this.props.color}
          width={this.props.width} height={this.props.height}
          stroke={this.props.strokeColor} strokeWidth={2}
        />
        <Text
          text={`   ${this.props.chairCount} ${taken}`} fill={textFill}
          fontSize={30}
          padding={5}
        />
      </Group>
    );
  }
}
export default Table;