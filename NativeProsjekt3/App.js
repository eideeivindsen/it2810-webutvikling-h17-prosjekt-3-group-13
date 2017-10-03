import React from 'react';
import {
    AppRegistry,
    Text,
    Button,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import UserInput from './src/components/home/Input.js';
import ListView from './src/components/todo/ListView';

class HomeTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./src/img/home.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={[styles.view]}>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"
                />
                <UserInput/>
            </View>
        );
    }
}


class EventsTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Events',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./src/img/event.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={[styles.view]}>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"
                />
                <UserInput/>
            </View>
        );
    }
}


class NotesTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Notes',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./src/img/note.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={[styles.view]}>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"
                />
                <UserInput/>
            </View>
        );
    }
}

class TodoTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'ToDo',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./src/img/todo.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <ListView></ListView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingTop: 30,
            paddingBottom: 10,
            paddingLeft: 2,
            paddingRight: 2,
            backgroundColor: '#F8F8F8',
        },
        view: {
            flex: 1,
            flexDirection: 'column',
            paddingTop: 20,
        },
        icon: {
            width: 26,
            height: 26,
        }

    }
);


// Register tabs here
const NativeProsjekt3 = TabNavigator({
        HomeTab: {
            screen: HomeTab,
        },
        EventsTab: {
            screen: EventsTab,
        },
        NotesTab: {
            screen: NotesTab,
        },
        TodoTab: {
            screen: TodoTab,
        },
    }, {
        tabBarPosition: 'bottom',
        //animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: '#eee',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#00bcd4',

            },
        }

    },
);


AppRegistry.registerComponent('NativeProsjekt3', () => NativeProsjekt3);