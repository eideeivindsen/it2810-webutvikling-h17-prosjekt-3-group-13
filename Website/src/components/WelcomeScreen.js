import React, { Component } from 'react';
import { Card, TextField } from 'material-ui';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {nameField: ''}
 }

 handleChange(event) {
  this.setState({nameField: event.target.value});
}

  handleKeyPress(event) {
    if(event.key === 'Enter'){
      this.props.onUsernameChange(this.state.nameField);
    }
  }

  render() {
    return (
        <Card className="welcomeCard">
            <h1>Get started!</h1>
            <br/>
            <p>What	&#39;s your name?</p>
            <TextField name="nameField" fullWidth={true} value={this.state.nameField} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/><br />
        </Card>
    );
  }
}

export default WelcomeScreen;
