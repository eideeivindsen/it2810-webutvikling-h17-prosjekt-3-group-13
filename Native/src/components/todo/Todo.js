import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ListView, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            inputValue: '',
            dataSource: ds.cloneWithRows([]),
            pressStatus: false,
        };
        this._handleTextChange = this._handleTextChange.bind(this);
        this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
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
        }));
    };

    _handleDeleteButtonPress = (id) => {
        this.setState((a) => {

            const newItem = a.dataSource._dataBlob.s1.filter((item, i) => (parseInt(id) !== i));
            alert(newItem);
            return {
                dataSource: this.state.dataSource.cloneWithRows(newItem),
            }
        });
    };

    _changeStyle = (id) => {
        if (this.state.pressStatus == false) {
            const blob = this.state.dataSource._dataBlob;
            alert(blob)
            alert(this.state.dataSource[id])
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
