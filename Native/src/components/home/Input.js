import React, { Component } from 'react';
import { AsyncStorage, Text, View, TextInput, StyleSheet, Button, TouchableHighlight } from 'react-native'

export default class UserInput extends Component {
    state = {
        'username': '',
        'nameSat': false
    };
    componentDidMount = () => AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }));



    _onPressButton(value) {
        // Get the data
        let username = this.state.username;
        AsyncStorage.setItem('name', username);
        this.setState({ 'name': username });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.todoItem}>
                    {this.state.name}
                </Text>
                <TextInput autoCapitalize = 'none'
                           ref={(el) => {this.username = el;}}
                           //onChangeText = {this.setName}
                           onChangeText={(username) => this.setState({username})}
                           value={this.state.username}
                           style={styles.inputForm}
                           placeholder={"Enter your name"}
                />
                <Button onPress={this._onPressButton.bind(this)} title={"Add"}>
                </Button>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    formView: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 8,
    },
    inputForm: {
        flex: 1,
        alignItems: 'center',


        padding: 8,
        marginBottom: 8,
    },
    todoItem: {
        fontSize: 30,
        alignItems: 'center',
        padding: 8,

        borderBottomWidth: 1.5,
        borderColor: '#e0e0e0',

        flex: 1,
        flexDirection: 'row',
    },
    todoText: {
        flex: 1,
    },

});
