import React from 'react';
import WelcomeScreen from './WelcomeScreen';
import Topbar from './Topbar';

export default class Home extends React.Component {

  render() {
    return (
        <div className="home">
            <Topbar title="Home" handleDrawerToggle={this.props.handleDrawerToggle.bind(this)} />
            <div className="container" >
                {this.props.username === 'Guest ' ? <WelcomeScreen onUsernameChange={this.props.onUsernameChange.bind(this)} /> : null}
            </div>
        </div>
    );
  }
}
