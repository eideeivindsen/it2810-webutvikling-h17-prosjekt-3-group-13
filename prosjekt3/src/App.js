import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Drawer } from 'material-ui';
import { Col, Container, Hidden, Row, Visible } from 'react-grid-system';
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
    this.state = {
      username: '',
      drawerOpen: false,
      menuDisabled: true,
    };
  }

  componentDidMount() {
      if (localStorage.username) {
          this.setState({username: localStorage.username});
      } else {
          this.setState({username: 'Guest '});
      }
  }

  handleDrawerToggle() {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  onUsernameChange(newName) {
      var name = newName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      this.setState({username: name, menuDisabled: false})
      localStorage.username = name;
      localStorage.todo = [];
      localStorage.notes = [];
      localStorage.todoCounter = 0;
      localStorage.notesCounter = 0;
  }

  render() {
    return (
        <BrowserRouter>
            <MuiThemeProvider>
                <Container fluid={true} className="mainContainer">
                    <Row className="mainRow">
                        <Visible xl lg>
                            <Col className="navContainer" lg={2}>
                                <Navbar username={this.state.username} menuDisabled={this.state.menuDisabled} />
                            </Col>
                        </Visible>
                        <Col className="contentContainer" lg={10}>
                            <Hidden xl lg>
                                <Drawer open={this.state.drawerOpen}>
                                    <Navbar username={this.state.username} menuDisabled={this.state.menuDisabled} handleDrawerToggle={this.handleDrawerToggle.bind(this)}/>
                                </Drawer>
                            </Hidden>
                            <Switch>
                                <Route exact path="/" render={() => <Home username={this.state.username} onUsernameChange={this.onUsernameChange.bind(this)} handleDrawerToggle={this.handleDrawerToggle.bind(this)} />} />
                                <Route path="/events" render={() => <Events handleDrawerToggle={this.handleDrawerToggle.bind(this)}  />} />
                                <Route path="/notes" render={() => <Notes handleDrawerToggle={this.handleDrawerToggle.bind(this)} />} />
                                <Route path="/todo" render={() => <ToDo handleDrawerToggle={this.handleDrawerToggle.bind(this)} />} />
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
