import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class Notes extends Component {
  render() {
    return (
        <div className="container notes">
            <AppBar className="appBar" title="Notes" />
        </div>
    );
  }
}

export default Notes;
