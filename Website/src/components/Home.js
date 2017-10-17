import React, { Component } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import {Card, RaisedButton, Subheader } from 'material-ui';
import { Link, NavLink } from 'react-router-dom';

// Components
import WelcomeScreen from './WelcomeScreen';
import Topbar from './Topbar';
import HomeScreenTodo from './HomeScreenTodo';
import HomeScreenEvents from './HomeScreenEvents';

import EventIcon from 'material-ui/svg-icons/action/event';
import NoteIcon from 'material-ui/svg-icons/av/note';
import ChecklistIcon from 'material-ui/svg-icons/av/playlist-add-check';
const Logo = require('./../img/logo.png');

class Home extends Component {

  render() {
    return (
        <div className="home">
            <Topbar title="Home" handleDrawerToggle={this.props.handleDrawerToggle.bind(this)} />
            <div className="container" >
                {this.props.username === 'Guest ' ? <WelcomeScreen onUsernameChange={this.props.onUsernameChange.bind(this)} /> :
                <Container fluid={true}>
                    <Row>
                        <Col xs={12} className="frontIcons">
                            <Link to="/events">
                                <div>
                                    <EventIcon />
                                    <h2>Events</h2>
                                </div>
                            </Link>
                            <Link to="/notes">
                                <div>
                                    <NoteIcon />
                                    <h2>Notes</h2>
                                </div>
                            </Link>
                            <Link to="/todo">
                                <div>
                                    <ChecklistIcon />
                                    <h2>To Do</h2>
                                </div>
                            </Link>
                        </Col>
                        <Col  xs={12} md={5}>
                            <HomeScreenTodo/>
                        </Col>
                        <Col className="contentContainer" xs={12} md={6} offset={{ md: 1 }}>
                          <HomeScreenEvents/>
                        </Col>
                    </Row>
                </Container>
            }
            </div>
        </div>
    );
  }
}

export default Home;
