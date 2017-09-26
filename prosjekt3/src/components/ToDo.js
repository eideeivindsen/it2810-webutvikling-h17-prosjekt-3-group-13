import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class ToDo extends Component {
  render() {
    return (
        <div className="container toDo">
            <AppBar className="appBar" title="To Do" />
        </div>
    );
  }
}

export default ToDo;
