import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class Home extends Component {
  render() {
    return (
        <div className="container home">
            <AppBar className="appBar" title="Home" />
        </div>
    );
  }
}

export default Home;
