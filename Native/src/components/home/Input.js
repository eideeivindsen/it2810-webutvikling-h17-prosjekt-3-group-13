import React, { Component } from 'react';
import {
    AsyncStorage,
    Text,
    View,
    TextInput,
    Button,
    Image,
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
        if (username !== null) {
            try {
                AsyncStorage.setItem('username', username);
                this.updateUsername(username);
                this.setState({
                    finalName: username,
                    name: ''
                })
            } catch (error) {

            }
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

        return (
            <View style={styles.container}>
                <Header
                    name={this.state.finalName}
                />
                <View style={styles.inputField}>
                    <TextInput
                               //ref={(el) => {this.username = el;}}
                               onChangeText={(username) => this.setState({name: username})}
                               value={this.state.name}
                               style={styles.inputForm}
                               placeholder={"Enter your name"}
                    />
                    <Button onPress={this._onPressButton.bind(this)} title={"Add"}/>
                </View>
            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#00bcd4',
        flex:1
    },
    username: {
        fontSize: 30,
        justifyContent: 'center',
        padding: 8,

        color: 'white',
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
