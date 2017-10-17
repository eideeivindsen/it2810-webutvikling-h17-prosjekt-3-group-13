import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import {Card, RaisedButton, Subheader } from 'material-ui';
import { NavLink } from 'react-router-dom';

// Components
import WelcomeScreen from './WelcomeScreen';
import Topbar from './Topbar';
import HomeScreenTodo from './HomeScreenTodo';

export default class Home extends React.Component {

  render() {
    return (
        <div className="home">
            <Topbar title="Home" handleDrawerToggle={this.props.handleDrawerToggle.bind(this)} />
            <div className="container" >
                {this.props.username === 'Guest ' ? <WelcomeScreen onUsernameChange={this.props.onUsernameChange.bind(this)} /> :
                <Container fluid={true}>
                    <Row>
                        <Col xs={12}>
                            <h1>Hello {this.props.username}!</h1>
                        </Col>
                        <Col  xs={5}>
                            <HomeScreenTodo/>
                            <h2>Need to add some notes?</h2>
                            <NavLink  to={"/notes"}>
                                <RaisedButton label="Go to notes!" primary={true} className="homeNotesButton"/>
                            </NavLink>
                        </Col>
                        <Col className="contentContainer" xs={7}>
                            <Card>
                                <Subheader>Torkil sin kolonne</Subheader>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            }
            </div>
        </div>
    );
  }
}
