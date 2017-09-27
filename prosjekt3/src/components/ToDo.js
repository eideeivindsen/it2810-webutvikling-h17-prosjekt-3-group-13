import React, { Component } from 'react';
import Topbar from './Topbar';

class ToDo extends Component {
  render() {
    return (
        <div className="todo">
            <Topbar title="To Do" handleDrawerToggle={this.props.handleDrawerToggle.bind(this)} />
            <div className="container">

            </div>
        </div>
    );
  }
}

export default ToDo;
