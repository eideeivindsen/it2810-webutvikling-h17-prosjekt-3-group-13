import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Container, Row, Col } from 'react-grid-system';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';


class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <Container fluid={true} className="mainContainer">
                <Row className="mainRow">
                    <Col className="navContainer" xs={3} lg={2}>
                        <Navbar />
                    </Col>
                    <Col className="contentContainer" xs={9} lg={10}>
                        <Home />
                    </Col>
                </Row>
            </Container>
        </MuiThemeProvider>
    );
  }
}

export default App;
