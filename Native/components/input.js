import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button } from 'react-native';

export default class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Text>
                    What is your name?
                </Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type in your name here!"
                    onChangeText={(text) => this.setState({text})}
                />
                <Button
                    onPress={() => { this.state.text = "Hei" + this.state.text + "!"}}
                    title="Enter "
                />
                <Text style={{padding: 10, fontSize: 22}}>
                    {this.state.text}
                </Text>
            </View>
        );
    }
}


