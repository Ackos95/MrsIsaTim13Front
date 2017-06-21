import React from 'react'
import events from './events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: events
    }

    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });

    alert(`${event.title} was dropped onto ${event.start}`);
  }

  render(){
    return (
      <DragAndDropCalendar
        selectable={true}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        defaultView='month'
        defaultDate={new Date(2017, 6, 12)}
        onSelectEvent={event => this.props.selectEvent(event)}
        onSelectSlot={(slotInfo) => console.log(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
          `\nend: ${slotInfo.end.toLocaleString()}`
        )}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)