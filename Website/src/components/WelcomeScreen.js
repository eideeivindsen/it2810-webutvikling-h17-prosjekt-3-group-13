import React, { Component } from 'react';
import { Card, Subheader, TextField } from 'material-ui';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nameField: '',
        warningMessage: '',
    }
 }

 handleChange(event) {
  this.setState({nameField: event.target.value});
}

  handleKeyPress(event) {
    if (event.key === 'Enter'){
        if (this.state.nameField.length !== 0) {
            this.props.onUsernameChange(this.state.nameField);
        } else {
            this.setState({warningMessage: 'Please enter a name.'});
        }
    }
  }

  render() {
    return (
        <Card className="welcomeCard">
            <h1>Get started!</h1>
            <br/>
            <p>What	&#39;s your name?</p>
            <TextField name="nameField" fullWidth={true} value={this.state.nameField} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/><br />
            <Subheader>{this.state.warningMessage}</Subheader>
        </Card>
    );
  }
}

export default WelcomeScreen;
