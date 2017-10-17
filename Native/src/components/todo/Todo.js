import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    AsyncStorage} from 'react-native';

export const todoItemDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
//const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
function getData() {
    var list = [];
    AsyncStorage.getItem('todo').then((data) => {
        //alert(JSON.parse(data));
        list.push(JSON.parse(data));
    });
    return list;
}

export default class App extends Component {
    constructor(props) {
        super(props);
        var data = AsyncStorage.getItem('todo').then((value) => this.setState({'dataSource': JSON.parse(value)}));
        this.state = {
            inputValue: '',
            dataSource: ds.cloneWithRows(data),
            pressStatus: false,
        };
        this._handleTextChange = this._handleTextChange.bind(this);
        this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
    }

    _todoList (){
        var dataBlob = [];
        data = getData();
        for (var ii = 0; ii < data().length; ii++) {
            alert(ii);
            dataBlob.push(getData[ii]["text"]);
        }
        return dataBlob;
    };

    componentDidMount() {
        //AsyncStorage.getItem('todo').then((value) => alert(value));
        //AsyncStorage.getItem('todo').then((value) => this.setState({'dataSource': JSON.parse(value))}));
        //AsyncStorage.getItem('todo').then((value) => alert(JSON.parse(value)[0]["id"]))
        //alert(this.state.dataSource)

    }

    _handleTextChange = (value) => {
        const inputValue = value;
        this.setState(() => ({
            inputValue,
        }));
    };

    _handleSendButtonPress = () => {
        if (!this.state.inputValue) {
            return;
        }
        const textArray = this.state.dataSource._dataBlob.s1;
        textArray.push(this.state.inputValue);
        this.setState(() => ({
            dataSource: this.state.dataSource.cloneWithRows(textArray),
            inputValue: '',
            pressStatus: false
        }));
    };

    _handleDeleteButtonPress = (id) => {
        this.setState((a) => {
            const newItem = a.dataSource._dataBlob.s1.filter((item, i) => (parseInt(id) !== i));
            return {
                dataSource: this.state.dataSource.cloneWithRows(newItem),
            }
        });
    };

    _changeStyle = (id) => {
        alert(JSON.stringify(this.state.dataSource._dataBlob))
        if (this.state.pressStatus == false) {
            this.setState(() => {
                return {
                    pressStatus: true,
                }
            });
        }
        if (this.state.pressStatus == true){
            this.setState(() => {
                return {
                    pressStatus: false,
                }
            });
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formView}>
                    <TextInput
                        style={styles.inputForm}
                        value={this.state.inputValue}
                        onChangeText={this._handleTextChange}
                        placeholder="New Todo"
                    />
                    <Button
                        title="Add"
                        onPress={this._handleSendButtonPress}
                    />
                </View>
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={(rowData, sectionID, rowID) => {
                        const handleDelete = () => {
                            return this._handleDeleteButtonPress(rowID);
                        }
                        const handleStyle = () =>  {
                            return this._changeStyle(rowID)
                        }
                        return (
                            <TouchableWithoutFeedback
                                onPress={handleStyle}
                                style={styles.todoText}
                            >
                                <View
                                    style={this.state.pressStatus ? styles.todoItemCompleted : styles.todoItem}
                                >
                                    <View style={styles.todoText}>
                                        <Text >{rowData}</Text>
                                    </View>
                                    <Button
                                        title="Delete"
                                        onPress={handleDelete}
                                        style={styles.deleteButton}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    }
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    formView: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 8,
        //flexDirection: 'row' needs fixing
    },
    inputForm: {
        width: 320,
        height: 40,
        padding: 8,
        marginBottom: 8,
    },
    todoItem: {
        alignItems: 'center',
        padding: 8,
        width: 320,
        borderBottomWidth: 1.5,
        borderColor: '#e0e0e0',
        flex: 1,
        flexDirection: 'row',
    },
    todoText: {
        flex: 1,
    },
    todoItemCompleted: {
        backgroundColor: 'gray',
        alignItems: 'center',
        padding: 8,
        width: 320,
        borderBottomWidth: 1.5,
        borderColor: '#e0e0e0',
        flex: 1,
        flexDirection: 'row',
    },

});
