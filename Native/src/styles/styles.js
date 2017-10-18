import {
    StyleSheet,
    Platform
} from 'react-native';

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
            marginTop: (Platform.OS == 'ios') ? 20 : 0,
        },
        icon: {
            width: 26,
            height: 26,
        },
        nameContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: '#00bcd4',
            flex: 1,
        },
        username: {
            fontSize: 30,
            justifyContent: 'center',
            padding: 8,
            color: 'white',
            flex: 1,
            flexDirection: 'row',
        },
        logo: {
            width: 58,
            height:58,
        }
    }
);

export default styles;