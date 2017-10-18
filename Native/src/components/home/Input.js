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
            finalName: ''
        };
        this.getData();
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
        if (AsyncStorage.getItem('username') !== null) {
            AsyncStorage.getItem('username').then((value) => this.updateUsername(value));
        } else {
            this.updateUsername("Guest")
        }
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
                    <Text style={{fontSize: 20, marginBottom:30}}>Hello, {this.state.finalName}!</Text>
                    <Text style={{fontSize: 20}}>Welcome to your</Text>
                    <Text style={{fontSize: 25}}>Personal Information Planner</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Header
                    name={this.state.finalName}
                />
                <View style={{flex:1, flexDirection: 'column', alignItems: 'center', paddingTop: 40,  flex: 9, justifyContent: 'flex-start'}}>
                    <View style={{alignItems: 'center', paddingTop: 40,  flex: 9, justifyContent: 'flex-start'}}>
                        {welcomeScreen}
                    </View>
                </View>


                    <View style={styles.username}>
                        <TextInput
                            //ref={(el) => {this.username = el;}}
                            onChangeText={(username) => this.setState({name: username})}
                            value={this.state.name}
                            style={styles.inputForm}
                            placeholder={"Wish to change name?"}
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


    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#00bcd4',
        flex:1
    },
    username: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
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
