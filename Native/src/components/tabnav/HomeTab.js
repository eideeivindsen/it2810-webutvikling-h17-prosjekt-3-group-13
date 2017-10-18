import React from 'react';
import {
    View,
    Image,
    ScrollView
} from 'react-native';
import UserInput from '../home/Input';
import styles from '../../styles/styles';


export default class HomeTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../img/home.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),

    };

    render() {
        return (
            <ScrollView style={[styles.view]}>
                <UserInput/>
            </ScrollView>
        );
    }
}