/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import PizzaTranslator from './components/input.js';

export default class NativeProsjekt3 extends Component {
    render() {
        let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
                <View style={styles.container}>
                <Text styel={styles.username}>Guest</Text>
                <Text style={styles.welcome}>
                Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                Press Cmd+R to reload,{'\n'}
                Cmd+D or shake for dev menu
                </Text>
                <Image source={pic} style={{width: 193, height: 110}} />
                <PizzaTranslator />
                </View>
                );
    }
}

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F5FCFF',
                                 },
                                 username {
                                 
                                 },
                                 welcome: {
                                 flex: 2,
                                 fontSize: 20,
                                 textAlign: 'center',
                                 backgroundColor: 'rgb(106, 187, 210)',
                                 marginTop: 10,
                                 borderStyle: 'solid',
                                 borderColor: 'gray',
                                 borderWidth: 1,
                                 },
                                 instructions: {
                                 flex: 8,
                                 textAlign: 'center',
                                 color: '#333333',
                                 marginBottom: 5,
                                 },
                                 });

AppRegistry.registerComponent('NativeProsjekt3', () => NativeProsjekt3);
