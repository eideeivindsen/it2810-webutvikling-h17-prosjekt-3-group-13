import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
// import events
//import ListView from '../todo2/ListView';
import styles from '../../styles/styles';


export default class EventsTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Events',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../img/event.png')}
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

                </View>
            </View>

        );
    }
}