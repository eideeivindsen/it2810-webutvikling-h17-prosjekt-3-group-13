import React, { Component } from 'react';
import Topbar from './Topbar';

class Events extends Component {
  render() {
    return (
        <div className="events">
            <Topbar title="Events" handleDrawerToggle={this.props.handleDrawerToggle.bind(this)} />
            <div className="container">

            </div>
        </div>
    );
  }
}

export default Events;
