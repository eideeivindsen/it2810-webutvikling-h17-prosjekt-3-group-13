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
import UserInput from './src/components/home/Input';
import NotesApp from './src/components/notes/Notes';
import ListView from './src/components/todo2/ListView';
import Events from './src/components/events/Events';


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
                <UserInput/>
            </View>
        );
    }
}


class EventsTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Events',
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
                <View style={styles.nameContainer}>
                    <Image source={require('./src/img/logo.png')} style={styles.logo}/>
                    <Text style={styles.username}>Events</Text>
                </View>
                <View style={styles.mainContainer}>
                    <Events/>
                </View>
            </View>

        );
    }
}


class NotesTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Notes',
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
                <View style={styles.nameContainer}>
                    <Image source={require('./src/img/logo.png')} style={styles.logo}/>
                    <Text style={styles.username}>Notes</Text>
                </View>
                <View style={styles.mainContainer}>
                    <NotesApp/>
                </View>
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
            <View style={[styles.view]}>
                <View style={styles.nameContainer}>
                    <Image source={require('./src/img/logo.png')} style={styles.logo}/>
                    <Text style={styles.username}>ToDo</Text>
                </View>
                <View style={styles.mainContainer}>
                <ListView/>
                </View>
            </View>

        );
    }
}


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
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: '#eee',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#00bcd4',

            },
            showIcon: true
        }

    },
);



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
        mainContainer: {
          flex: 9
        },
        view: {
            flex: 1,
            flexDirection: 'column',
            paddingTop: 20,
        },
        icon: {
            width: 26,
            height: 26,
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
        logo: {
            width: 58,
            height:58,
        }
    }
);



AppRegistry.registerComponent('NativeProsjekt3', () => NativeProsjekt3);