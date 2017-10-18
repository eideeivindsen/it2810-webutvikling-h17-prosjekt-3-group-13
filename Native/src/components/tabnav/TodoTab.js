import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import ListView from '../todo2/ListView';
import styles from '../../styles/styles';


export default class TodoTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'ToDo',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../img/todo.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={[styles.view]}>
                <View style={styles.nameContainer}>
                    <Image source={require('../../img/logo.png')} style={styles.logo}/>
                    <Text style={styles.username}>ToDo</Text>
                </View>
                <View style={styles.mainContainer}>
                    <ListView/>
                </View>
            </View>

        );
    }
}