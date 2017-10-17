import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';


async function getData() {
    var myList;

    let value = await AsyncStorage.getItem('todo');

    if (value !== null){
        myList = JSON.parse(value);

        for (var i = 0; i < myList.length; i++) {
            if (myList[i] != null) {
                dataList.push(new TodoModel(myList[i].title.toString(), myList[i].completed))
            }
        }
    }

}

getData();

let dataList = [
];


var dataListOrder = getOrder(dataList);

function getOrder(list) {
    return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
    Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
    if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
    constructor(props) {
        super(props);
        this.updateDataList = this.updateDataList.bind(this);
        this._onCompletedChange = this._onCompletedChange.bind(this);

        this.state = {
            dataList: dataList
        }
    }

    async componentWillMount() {
        let value = await AsyncStorage.getItem('todo');
        if (value === null) {
            let firstItem = new TodoModel("Add your first ToDo item", false);
            let todoList = []
            todoList.push(firstItem)
            AsyncStorage.setItem('todo', JSON.stringify(todoList));
        }

    }

    updateDataList(dataList) {
        dataListOrder = getOrder(dataList);
        this.setState({
            dataList: dataList
        });
    }

    _onCompletedChange(dataItem, index) {
        let fromIndex = dataListOrder.indexOf(index);
        let toIndex = dataItem.completed ? dataListOrder.length - 1 : 0;
        moveOrderItem(this, fromIndex, toIndex);
    }

    render() {
        let listView = (<View></View>);
        if (this.state.dataList.length) {
            listView = (
                <SortableListView
                    ref='listView'
                    style={{flex: 1}}
                    data={this.state.dataList}
                    order={dataListOrder}
                    onRowMoved={e => moveOrderItem(this, e.from, e.to)}
                    renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} dataIndex={index} onCompletedChange={this._onCompletedChange}/>}
                />
            );
        }

        return (
            <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <OmniBox
                    data={dataList}
                    updateDataList={this.updateDataList}/>
                {listView}
            </View>
        )
    }
};

module.exports = ListView;