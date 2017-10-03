import React, { Component } from 'react';
import { TextInput, View, Button } from 'react-native';
import TodoModel from './Todo';
import Utils from './Utils';

class OmniBox extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillMount() {
        this.setState({
            newValue: ''
        });
    }

    onChange(event){
        var title = event.nativeEvent.text;
        var dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title +'.*', 'gi')));

        this.setState({
            newValue: title
        });
        this.props.updateDataList(dataList);
    }

    onKeyPress(event){
        if (event.nativeEvent.key == 'Enter' && this.state.newValue) {
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
                           onKeyPress={this.onKeyPress}
                           onChange={this.onChange}>
                </TextInput>
                <Button
                    title={"Add"}
                    style={{backgroundColor: '#000', borderColor: '#555'}}
                    onPress={() => {
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

                        this.setState({
                            newValue: ''
                        });
                        this.props.updateDataList(dataList);
                    }}>

                </Button>
            </View>
        );
    }
}

module.exports = OmniBox;