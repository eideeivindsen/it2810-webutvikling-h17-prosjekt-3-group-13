import React from 'react';
import {
    View,
    Image,
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
            <View style={[styles.view]}>
                <UserInput/>
            </View>
        );
    }
}


//module.exports = 'HomeTab'