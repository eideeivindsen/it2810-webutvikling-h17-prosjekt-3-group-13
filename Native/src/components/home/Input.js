import React, { Component } from 'react';
import { AsyncStorage, Text, View, TextInput, StyleSheet, Button, TouchableHighlight } from 'react-native'

export default class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
        };
    }


    componentDidMount() {
        if (AsyncStorage.getItem('username') != null) {
            AsyncStorage.getItem('username').then((value) => this.setState({ 'name': value }));
        } else {
            this.setState({'name': "Guest"});
        }



        //const someArray = ["Make a list","Dance","Jump","Die react native"];
        //return AsyncStorage.setItem('todo', JSON.stringify(someArray))
        //    .then(json => console.log('success!'))
        //    .catch(error => console.log('error!'));



        //AsyncStorage.setItem('todo', JSON.stringify(["Bob", "Peter", "My Todo list"]));
    }

    //AsyncStorage.getItem('todo').then((value) => this.setState({'mylist': JSON.parse(value)}))


    _onPressButton(value) {
        // Get the data
        let username = this.state.username;
        AsyncStorage.setItem('username', username);
        this.setState({ 'name': username });

        AsyncStorage.setItem('notes', JSON.stringify([]));
        AsyncStorage.setItem('todoCounter', JSON.stringify(0));
        AsyncStorage.setItem('notesCounter', JSON.stringify(0));

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
