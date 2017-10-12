import React, { Component } from 'react';
import { AsyncStorage, Text, View, TextInput, StyleSheet, Button, TouchableHighlight } from 'react-native'

export default class UserInput extends Component {
    state = {
        'name': ''
    };
    componentDidMount = () => AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }));

    setName = (value) => {
        AsyncStorage.setItem('name', value);
        this.setState({ 'name': value });
    }

    _onPressButton () {
        // Get the data
        let name = this.state.name


        // Retrieve the existing messages
        AsyncStorage.getItem('name', (res) => {
            var username;

            // If this is the first time, set up a new array
            if (res === null) {
                username = []
            }else {
                username = JSON.parse(res)
            }

            // Add the new message
            username.push({
                name: name,
            })

            // Save the messages
            AsyncStorage.setItem('name', JSON.stringify(username), (res) => {});
        })
    }

    render() {
        return (
            <View>
                <TextInput autoCapitalize = 'none'
                           onChangeText = {this.setName}/>
                <TouchableHighlight onPress={this._onPressButton.bind(this)}>
                    <Text>Add</Text>
                </TouchableHighlight>
                <Text>
                    {this.state.name}
                </Text>
            </View>
        )
    }
}
