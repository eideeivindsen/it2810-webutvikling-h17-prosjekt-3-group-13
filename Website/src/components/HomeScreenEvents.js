import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class HomeScreenEvents extends Component {

  constructor() {
    super();
    this.state = {
      eventList : localStorage.events.length !== 0 ? JSON.parse(localStorage.events) : []
    }
  }

  render() {
    return(
      <BigCalendar
        className='homeScreenEvents'
        popup
        events={this.state.eventList}
        views={['month', 'agenda']}
      />
    );
  }

}

export default HomeScreenEvents;
