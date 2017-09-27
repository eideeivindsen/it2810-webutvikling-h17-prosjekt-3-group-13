import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Container, Row, Col } from 'react-grid-system';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

// components
import Home from './components/Home';
import Events from './components/Events';
import Notes from './components/Notes';
import ToDo from './components/ToDo';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.username) {
        this.state = {username: localStorage.username}
    } else {
        this.state = {username: 'Guest '}
    }
  }

  onUsernameChange(newName) {
      var name = newName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      this.setState({username: name})
      localStorage.username = name;
  }

  render() {
    return (
        <BrowserRouter>
            <MuiThemeProvider>
                <Container fluid={true} className="mainContainer">
                    <Row className="mainRow">
                        <Col className="navContainer" xs={3} lg={2}>
                            <Navbar username={this.state.username} />
                        </Col>
                        <Col className="contentContainer" xs={9} lg={10}>
                            <Switch>
                                <Route exact path="/" render={() => <Home username={this.state.username} onUsernameChange={this.onUsernameChange.bind(this)}/>} />
                                <Route path="/events" component={Events} />
                                <Route path="/notes" component={Notes} />
                                <Route path="/todo" component={ToDo} />
                                <Route component={NotFound} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </MuiThemeProvider>
        </BrowserRouter>
    );
  }
}
