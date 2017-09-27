import React, { Component } from 'react';
import Topbar from './Topbar';

class Notes extends Component {
  render() {
    return (
        <div className="notes">
            <Topbar title="Notes" handleDrawerToggle={this.props.handleDrawerToggle.bind(this)} />
            <div className="container">

            </div>
        </div>
    );
  }
}

export default Notes;
