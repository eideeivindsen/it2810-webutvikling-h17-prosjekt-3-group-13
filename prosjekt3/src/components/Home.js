import React from 'react';
import { AppBar, Card, TextField } from 'material-ui';
import WelcomeScreen from './WelcomeScreen';

export default class Home extends React.Component {


  render() {
    return (
        <div className="home">
            <AppBar className="appBar" title="Home" />
            <div className="container">
                {this.props.username == 'Guest ' ? <WelcomeScreen onUsernameChange={this.props.onUsernameChange.bind(this)} /> : null}
            </div>
        </div>
    );
  }
}
