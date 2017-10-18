import React from 'react';
import {
    AppRegistry,
    StyleSheet,
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import HomeTab from './src/components/tabnav/HomeTab';
import TodoTab from './src/components/tabnav/TodoTab';
import EventsTab from './src/components/tabnav/EventsTab';
import NotesTab from './src/components/tabnav/NotesTab';


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