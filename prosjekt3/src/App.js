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


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <MuiThemeProvider>
                <Container fluid={true} className="mainContainer">
                    <Row className="mainRow">
                        <Col className="navContainer" xs={3} lg={2}>
                            <Navbar />
                        </Col>
                        <Col className="contentContainer" xs={9} lg={10}>
                            <Switch>
                                <Route exact path="/" component={Home} />
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

export default App;
