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
    }

    _onPressButton() {
        let username = this.state.username;
        if (username !== null) {
            try {
                AsyncStorage.setItem('username', username);
                this.setState({ 'name': username });
                AsyncStorage.setItem('notes', JSON.stringify([]));
                AsyncStorage.setItem('todoCounter', JSON.stringify(0));
                AsyncStorage.setItem('notesCounter', JSON.stringify(0));
            } catch (error) {

            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nameContainer}>
                    <Image source={require('../../img/logo.png')} style={styles.logo}/>
                    <Text style={styles.username}>{this.state.name}</Text>
                </View>
                <View style={styles.inputField}>
                <TextInput autoCapitalize = 'none'
                           ref={(el) => {this.username = el;}}
                           onChangeText={(username) => this.setState({username})}
                           value={this.state.username}
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
        paddingTop: 30,
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
