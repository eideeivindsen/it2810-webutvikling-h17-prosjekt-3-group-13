import React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

import Events from '../events/Events';
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
            <ScrollView style={[styles.view]}>
                <View style={styles.nameContainer}>
                    <Image source={require('../../img/logo.png')} style={styles.logo}/>
                    <Text style={styles.username}>Events</Text>
                </View>
                <View style={styles.mainContainer}>
                    <Events/>
                </View>
            </ScrollView>

        );
    }
}