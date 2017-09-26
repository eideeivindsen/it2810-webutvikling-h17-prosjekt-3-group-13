import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class Events extends Component {
  render() {
    return (
        <div className="container events">
            <AppBar className="appBar" title="Events" />
        </div>
    );
  }
}

export default Events;
