import React, {Component} from 'react';
import {TouchableHighlight, View, Text, Button, Image} from 'react-native';
import CheckBox from './CheckBox';

class ListViewItem extends Component {
    constructor(props) {
        super(props);
        this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }

    _onCheckBoxPressed() {
        var data = this.state.data;
        data.completed = !data.completed;
        this.setState({
            data: data
        });

        this.props.onCompletedChange(data, this.props.dataIndex);
    }

    _onPressButton(task) {
        var index = data.indexOf(task);
        if (index > -1) {
            array.splice(index, 1);
        }
        this.props.onCompletedChange(data, this.props.dataIndex);
    }

    render() {
        let data = this.state.data;
        let color = data.completed ? '#C5C8C9' : '#000';
        let textDecorationLine = data.completed ? 'line-through' : 'none';
        return (
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableHighlight underlayColor={'#eee'} style={{flexDirection: 'row', flex:10, paddingTop: 6, paddingBottom: 6, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}} {...this.props.sortHandlers}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox>
                        <Text style={{fontSize:18, color: color, textDecorationLine: textDecorationLine, paddingRight: 40}}>{data.title}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressButton} underlayColor="white" style={{flex:1, alignItems: 'flex-end'}}>
                    <View>
                        <Image source={require('../../img/delete.png')} style={{width: 20, height: 20}}></Image>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

module.exports = ListViewItem;