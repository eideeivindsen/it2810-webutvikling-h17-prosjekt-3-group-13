import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <Navbar />
        </MuiThemeProvider>
    );
  }
}

export default App;
