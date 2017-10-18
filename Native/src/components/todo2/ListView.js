import React, { Component } from 'react';
import {
    View,
    Button,
    AsyncStorage,
    Text
} from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';



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
        this._onDeleteDone = this._onDeleteDone.bind(this);
        this.state = {
            dataList: dataList,
            dataLoaded: false
        }
    }

    async componentWillMount() {
        this.getData();
        let value = await AsyncStorage.getItem('todo');
        if (value === null) {
            let firstItem = new TodoModel("Add your first ToDo item", false);
            let todoList = [];
            todoList.push(firstItem);
            AsyncStorage.setItem('todo', JSON.stringify(todoList));
        }
    }

    componentDidMount() {
    }

    async getData() {
        var myList;

        let value = await AsyncStorage.getItem('todo');
        if (value !== null){
            myList = JSON.parse(value);

            for (var i = 0; i < myList.length; i++) {
                if (myList[i] !== null) {
                    dataList.push(new TodoModel(myList[i].title.toString(), myList[i].completed))
                }
            }
        }
        this.setState({
            dataList: dataList,
            dataLoaded: true
        })
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

    async saveData(item) {
        AsyncStorage.setItem('todo', JSON.stringify(item));
    }

    _onDeleteDone() {
        let todoList = dataList;

        var activeList = todoList.filter(function(item){
            return item.completed === false;
        });

        this.updateDataList(activeList);

        this.setState({dataList: activeList}, function() {
            this.saveData(activeList)
        })
    }


    render() {
        let listView = (<View></View>);
        if (this.state.dataLoaded) {
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

        return (
            <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <OmniBox
                    data={dataList}
                    updateDataList={this.updateDataList}
                />
                {listView}
            <View>
            </View>
                <Button title={"Delete Done"} onPress={this._onDeleteDone}/>
            </View>
        )
        } else {
            return(
                <View>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        }
    }
};

module.exports = ListView;