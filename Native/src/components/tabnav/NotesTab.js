import React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import Notes from '../notes/Notes';
import styles from '../../styles/styles';


export default class NotesTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Notes',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../img/note.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <ScrollView style={[styles.view]}>
                <View style={styles.nameContainer}>
                    <Image source={require('../../img/logo.png')} style={styles.logo}/>
                    <Text style={styles.username}>Notes</Text>
                </View>
                <View style={styles.mainContainer}>
                    <Notes/>
                </View>
            </ScrollView>

        );
    }
}