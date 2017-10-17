import React, { Component } from 'react';
import Topbar from './Topbar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

//require('globalize/lib/cultures/globalize.culture.en-GB');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Events extends Component {
  constructor() {
    super();

    this.state = {
      staticDialogOpen : false,
      staticDialogId : null,
      staticDialogTitle : '',
      addEventDialogTitle : '',
      addEventDialogDesc : '',
      addEventDialogOpen : false,
      addEventDialogStartDate : null,
      addEventDialogEndDate : null,
      eventList : [
        {
          'id': 1,
          'title': 'Gjør ferdig Webutvikling',
          'allDay': true,
          'start': new Date(2017, 9, 4),
          'end': new Date(2017, 9, 5),
          'desc': 'Viktig å få gjort ferdig'
        },
        {
          'id': 2,
          'title': 'AAAA',
          'allDay': true,
          'start': new Date(2017, 9, 16),
          'end': new Date(2017, 9, 17),
          'desc': 'Viktig å få gjort ferdig'
        },
      ],
    }
  }

  componentDidMount() {
    this.resetDefaultDates();
  }

  handleStaticDialogOpen(event) {
    const id = event.id;
    let title = event.title;
    const start = event.start;
    const end = event.end;
    const desc = event.desc;

    const startY = start.getFullYear();
    const startM = start.getMonth() + 1;
    const startD = start.getDate();
    const endY = end.getFullYear();
    const endM = end.getMonth() + 1;
    const endD = end.getDate();
    const formattedStart = startY + '.' + startM + '.' + startD;
    const formattedEnd = endY + '.' + endM + '.' + endD;

    title = title + ' (' + formattedStart + ' - ' + formattedEnd + ')';
    this.setState({
      staticDialogOpen: true,
      staticDialogId: id,
      staticDialogTitle: title,
      addEventDialogDesc: desc,
    });
  };

  handleStaticDialogClose() {
    this.setState({
      staticDialogOpen: false,
      staticDialogId: null,
      staticDialogTitle: '',
      addEventDialogDesc: '',
    });
  };

  handleAddEventDialogOpen(startDate, endDate) {
    this.setState({
      addEventDialogOpen: true,
      addEventDialogStartDate: startDate,
      addEventDialogEndDate: endDate,
    });
  };

  handleAddEventDialogClose() {
    this.setState({
      addEventDialogOpen: false,
      addEventDialogTitle : '',
      addEventDialogDesc : '',
      addEventDialogStartDate: null,
      addEventDialogEndDate: null,
    });
  };

  handleChangeStartDate(event, date) {
    this.setState({
      addEventDialogStartDate: date,
    });
  };

  handleChangeEndDate(event, date) {
    this.setState({
      addEventDialogEndDate: date,
    });
  };

  handleAddEventTitleChange(event) {
    this.setState({
      addEventDialogTitle: event.target.value
    });
  }

  handleAddEventDescChange(event) {
    this.setState({
      addEventDialogDesc: event.target.value
    });
  }

  resetDefaultDates() {
    this.setState({
      addEventDialogStartDate: null,
      addEventDialogEndDate: null,
    });
  }

  handleAddEvent() {
    const eventId = this.state.addEventDialogStartDate.getFullYear() + this.state.addEventDialogStartDate.getMonth() + this.state.addEventDialogStartDate.getDate() + Math.floor((Math.random() * 9999) + 1);
    const newEventObject = {
      'id': eventId,
      'title': this.state.addEventDialogTitle,
      'start': this.state.addEventDialogStartDate,
      'end': this.state.addEventDialogEndDate,
      'allDay': true,
      'desc': this.state.addEventDialogDesc
    };

    this.setState(prevState => ({
      eventList : [...prevState.eventList, newEventObject]
    }));

    console.log(this.state);

    this.handleAddEventDialogClose();
  }

  handleDeleteEvent() {
    const eventId = this.state.staticDialogId;
    var updatedEventList = this.state.eventList.filter(function(element) {
        return element.id !== eventId;
    });
    this.setState({
      eventList: updatedEventList
    });
    this.handleStaticDialogClose();
  }

  endAccessor = (event) => {
    let end = new Date(event.end);
    return end.setHours(end.getHours() + 1);
  };

  render() {

    const staticDialogActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={ () => this.handleStaticDialogClose() }
      />,
      <RaisedButton
        label="Delete"
        secondary={true}
        onClick={ () => this.handleDeleteEvent() }
      />
    ];

    const addEventDialogActions = [
      <TextField
        hintText="Title of event"
        value={this.state.addEventDialogTitle}
        onChange={ event => this.handleAddEventTitleChange(event) }
      />,
      <DatePicker
        hintText="Start date"
        onChange={ (event, date) => this.handleChangeStartDate(event, date)}
        value={this.state.addEventDialogStartDate}
        autoOk={true}
      />,
      <DatePicker
        hintText="End date"
        onChange={ (event, date) => this.handleChangeEndDate(event, date)}
        value={this.state.addEventDialogEndDate}
        autoOk={true}
      />,
      <TextField
        floatingLabelText="Description of event"
        multiLine={true}
        rows={4}
        rowsMax={11}
        value={this.state.addEventDialogDesc}
        onChange={ event => this.handleAddEventDescChange(event) }
      />,
      <FlatButton
        label="Close"
        primary={true}
        onClick={ () => this.handleAddEventDialogClose() }
      />,
      <RaisedButton
        label="Add event"
        primary={true}
        onClick={ () => this.handleAddEvent() }
      />
    ];

    return (
        <div className="events">
            <Topbar title="Events" handleDrawerToggle={this.props.handleDrawerToggle.bind(this)} />
            <div className="container">
              <BigCalendar
                selectable
                popup
                endAccessor={ event => this.endAccessor(event) }
                culture={'en-GB'}
                events={this.state.eventList}
                views={['month', 'agenda']}
                onSelectEvent={event => this.handleStaticDialogOpen(event)}
                onSelectSlot={(slotInfo) => this.handleAddEventDialogOpen(slotInfo.start, slotInfo.end)}
              />
              <Dialog
                title={this.state.staticDialogTitle}
                actions={staticDialogActions}
                modal={false}
                open={this.state.staticDialogOpen}
                onRequestClose={() => this.handleStaticDialogClose()}
              >
              {this.state.addEventDialogDesc}
              </Dialog>
              <Dialog
                title={'Create new event'}
                actions={addEventDialogActions}
                modal={false}
                open={this.state.addEventDialogOpen}
                onRequestClose={() => this.handleAddEventDialogClose()}
              />
            </div>
        </div>
    );
  }
}

export default Events;