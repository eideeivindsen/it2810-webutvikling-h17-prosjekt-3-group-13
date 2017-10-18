import React, { Component } from 'react';
import { TextInput, View, Button, AsyncStorage } from 'react-native';
import TodoModel from './TodoModel';
import Utils from './Utils';


class OmniBox extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.state = {
            newValue: ""
        }
    }

    componentWillMount() {
        this.setState({
            newValue: 'a',
        });
    }

    componentDidMount() {
        this.setState({
            newValue: '',
        });
        var dataList = this.props.data;
        this.props.updateDataList(dataList);

    }


    async saveData(item) {
        let todo = await AsyncStorage.getItem('todo');
        let todoList = JSON.parse(todo);
        if (todoList != null) {
            todoList.push(item);
            AsyncStorage.setItem('todo', JSON.stringify(todoList));

        }
    }


    _handleTextChange = (value) => {
        const inputValue = value;
        this.setState(() => ({
            newValue: inputValue,
        }));
    };


    onChange(event){
        var title = event.nativeEvent.text;
        var dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title +'.*', 'gi')));

        this.setState({
            newValue: title
        });

        this.props.updateDataList(dataList);

    }


    onKeyPress(event){
        if (this.state.newValue && this.state.newValue !== "") {
            var newDataItem = new TodoModel(this.state.newValue);
            var dataList = this.props.data;
            var dataItem = Utils.findTodo(newDataItem, dataList);
            if(dataItem) {
                Utils.move(dataList, (dataList.indexOf(dataItem)), 0);

                this.setState({
                    newValue: ''
                });
                this.props.updateDataList(dataList);

                return;
            }

            dataList.unshift(newDataItem);
            this.saveData(newDataItem);
            this.setState({
                newValue: ''
            });
            this.props.updateDataList(dataList);
        }
    }



    render() {
        return (
            <View style={{flexDirection:'row'}}>
                <TextInput style={{flex:1, height: 36, padding: 4, marginBottom: 0, fontSize: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff'}}
                           placeholder='Add a todo or Search'
                           blurOnSubmit={false}
                           value={this.state.newValue}
                           onChange={this.onChange}
                           autoFocus={true}
                >
                </TextInput>
                <Button
                    title={"Add"}
                    style={{backgroundColor: '#000', borderColor: '#555'}}
                    onPress={this.onKeyPress}
                >
                </Button>
            </View>
        );
    }
}

module.exports = OmniBox;