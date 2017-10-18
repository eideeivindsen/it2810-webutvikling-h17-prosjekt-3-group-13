import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    AsyncStorage
} from 'react-native'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finalName: this.props.name
        }
    }

    componentDidMount() {
        if (this.props.name !== undefined) {
            this.setState({finalName: this.props.name})
        }
    }


    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.nameContainer}>
                    <Image source={require('../../img/logo.png')} style={styles.logo}/>
                    <Text style={styles.username}>{this.props.name}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

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
    inputForm: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        marginBottom: 8,
    },
    inputField: {
        flex: 9
    },
    logo: {
        width: 58,
        height:58,
    }
});


module.exports = Header;
