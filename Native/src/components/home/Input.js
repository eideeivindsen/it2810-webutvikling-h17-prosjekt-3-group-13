import React, { Component } from 'react';
import {
    AsyncStorage,
    Text,
    View,
    TextInput,
    Button,
    StyleSheet
} from 'react-native'
import Header from './Header'

export default class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            finalName: '',
            todoNum: 0,
            eventNum: 0
        };
        this.getData();
    }

    componentWillMount() {
        if (this.state.finalName.length === 0) {
            this.state.finalName != "Guest";
        }
    }

    _onPressButton() {
        let username = this.state.name;
        if (username.length !== 0) {
            try {
                AsyncStorage.setItem('username', username);
                this.updateUsername(username);
                this.setState({
                    finalName: username,
                    name: ''
                })
            } catch (error) {

            }
        } else {
            this.setState({
                finalName: 'Guest'
            })
        }
    }

    async getData() {
        let todos;
        let events;
        try {
            AsyncStorage.getItem('username').then((value) => this.updateUsername(value));
            todos = await AsyncStorage.getItem('todo');
            events = await AsyncStorage.getItem('events');
        } catch (e) {

        }

        if (todos != undefined || todos != null) {
            todos = JSON.parse(todos);
            todos = todos.length;
        } else {
            events = 0;
        }
        if (events != undefined || events != null) {
            events = JSON.parse(events);
            events = events.length;
        } else {
            events = 0;
        }
        this.setState({
            todoNum: todos,
            eventNum: events
        })

    }

    updateUsername(name) {
        this.setState({finalName: name})
    }

    render() {
        let welcomeScreen = (
            <View>
                <Text style={{fontSize: 20}}>Welcome to your</Text>
                <Text style={{fontSize: 25}}>Personal Information Planner</Text>
            </View>
        )

        if (this.state.finalName.length !== 0) {
            welcomeScreen = (
                <View>
                    <Text style={{fontSize: 20, marginBottom:30, alignItems: 'center'}}>Hello, {this.state.finalName}!</Text>
                    <Text style={{fontSize: 20}}>Welcome to your</Text>
                    <Text style={{fontSize: 25}}>Personal Information Planner</Text>
                    <View>
                        <Text>Last time you were logged in, you had:</Text>
                        <Text>{this.state.todoNum} todos</Text>
                        <Text>{this.state.eventNum} events</Text>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Header
                    name={this.state.finalName}
                />
                <View style={styles.nameContainer}>
                    <View style={{alignItems: 'center', paddingTop: 30,  flex: 9}}>
                        {welcomeScreen}
                    </View>
                </View>


                <View style={styles.username}>
                    <TextInput
                        onChangeText={(username) => this.setState({name: username})}
                        value={this.state.name}
                        style={styles.inputForm}
                        placeholder={"Want to change name?"}
                    />
                    <Button onPress={this._onPressButton.bind(this)} title={"Save"}/>
                </View>
            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    nameContainer: {
        //backgroundColor: '#00bcd4',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        paddingTop: 40,
        flex: 8,
        paddingBottom: 180
    },
    username: {
        borderBottomWidth: 1.5,
        borderColor: '#e0e0e0',
        flex: 1,
        flexDirection: 'row',
    },
    inputForm: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        marginBottom: 8,
    },
    inputField: {
        flex: 9
    },
    logo: {
        width: 58,
        height:58,
    }
});
