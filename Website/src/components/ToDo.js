import React, { Component } from 'react';
import Topbar from './Topbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { Hidden, Visible } from 'react-grid-system';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, Checkbox, DatePicker, RaisedButton, Subheader, TextField } from 'material-ui';

class ToDo extends Component {

constructor(props) {
    super(props);
    this.state = {
      todo: localStorage.todo.length !== 0 ? JSON.parse(localStorage.todo) : [],
      todoCounter: parseInt(localStorage.todoCounter, 10),
      newTask: '',
      newDate: null,
      newTaskMessage: '',
      yesterdayMessage: '',
      todayMessage: '',
      tomorrowMessage: '',
      laterMassage: '',
        }
    };

    componentDidMount() {
        this.tabHasContent();
    }

    tabHasContent() {
        document.getElementById("yesterdayList").hasChildNodes() ? this.setState({yesterdayMessage: ''}) : this.setState({yesterdayMessage: 'No tasks.'});
        document.getElementById("todayList").hasChildNodes() ? this.setState({todayMessage: ''}) : this.setState({todayMessage: 'No tasks.'});
        document.getElementById("tomorrowList").hasChildNodes() ? this.setState({tomorrowMessage: ''}) : this.setState({tomorrowMessage: 'No tasks.'});
        document.getElementById("laterList").hasChildNodes() ? this.setState({laterMessage: ''}) : this.setState({laterMessage: 'No tasks.'});
    }

    handleNewTaskChange(event) {
     this.setState({newTask: event.target.value});
   }

   handleNewDateChange(nullValue, date) {
    this.setState({newDate: date});
  }

  handleCheck(event, value, id) {
      var updatedList = this.state.todo.slice()
      updatedList.forEach(function(todo) {
            if(todo.id === id) {
                todo.checked = !todo.checked;
            }
        });
      this.setState({todo: updatedList }, function() {
          this.updateLocalStorage();
      })
  }

  handleRemove(id) {
      var updatedList = this.state.todo.filter(function(element) {
            return element.id !== id;
        });
      this.setState({todo: updatedList }, function() {
          this.updateLocalStorage();
          this.tabHasContent();
      })
  }

  handleNewTaskSubmit() {
      if (this.state.newTask.length === 0) {
          this.setState({newTaskMessage: 'You need to define a task.'});
      } else if (this.state.newDate == null ){
          this.setState({newTaskMessage: 'You need to set a date for the task to be finished.'});
      } else {
          var copiedDate = new Date(this.state.newDate.getTime());
          copiedDate.setHours(copiedDate.getHours() - copiedDate.getTimezoneOffset() / 60);
          var newObject = {
              id: this.state.todoCounter,
              task: this.state.newTask,
              date: copiedDate.toJSON(),
              checked: false
          };
          if(this.state.todo.length === 0) {
              this.setState({todo: [newObject], todoCounter: this.state.todoCounter + 1}, function() {
                  this.updateLocalStorage();
                  this.tabHasContent();
              });
          } else {
              var updatedList = this.state.todo.slice()
              updatedList.push(newObject)
              this.setState({todo: updatedList, todoCounter: this.state.todoCounter + 1}, function() {
                  this.updateLocalStorage();
                  this.tabHasContent();
              })
          }
          this.setState({newTaskMessage: 'The new task has been added.'});
          this.setState({newTask: ''});
          this.setState({newDate: null});
      }
  }

    removeMessage() {
        this.setState({newTaskMessage: ''});
    }

    updateLocalStorage() {
        localStorage.setItem("todo", JSON.stringify(this.state.todo));
        localStorage.setItem("todoCounter", this.state.todoCounter);
    }



  render() {
    return (
        <div className="todo">
            <Topbar title="To Do" handleDrawerToggle={this.props.handleDrawerToggle.bind(this)} />
            <div className="container">

                <Card className="newTask" onFocus={this.removeMessage.bind(this)}>
                    <TextField className="newTaskText" hintText="Create a task..." value={this.state.newTask} onChange={this.handleNewTaskChange.bind(this)}/>
                        <Visible xl lg>
                            <DatePicker className="newTaskDate" hintText="Choose Date" mode="landscape" value={this.state.newDate} onChange={this.handleNewDateChange.bind(this)}/>
                        </Visible>
                        <Hidden xl lg>
                            <DatePicker className="newTaskDate" hintText="Choose Date" mode="portrait" value={this.state.newDate} onChange={this.handleNewDateChange.bind(this)}/>
                        </Hidden>
                    <RaisedButton className="newTaskButton" label="Add Task" primary={true} onClick={this.handleNewTaskSubmit.bind(this)} />
                    <Subheader>{this.state.newTaskMessage}</Subheader>
                </Card>

                <Card>
                    <Tabs initialSelectedIndex={1}>
                        <Tab label="Yesterday" >
                          <div className="todoContent">
                              <Table>
                                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                    <TableRow>
                                      <TableHeaderColumn>Done</TableHeaderColumn>
                                      <TableHeaderColumn>Task</TableHeaderColumn>
                                      <TableHeaderColumn>Date</TableHeaderColumn>
                                      <TableHeaderColumn>Remove</TableHeaderColumn>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody displayRowCheckbox={false} id="yesterdayList">
                                    {this.state.todo.map((todo) => {
                                        var yesterday = new Date();
                                        yesterday.setDate(yesterday.getDate() - 1);
                                        if (todo.date.slice(0,10) === yesterday.toJSON().slice(0,10)) {

                                            return <TableRow key={todo.id} className={todo.checked ? 'checked' : ''}>
                                              <TableRowColumn><Checkbox checked={todo.checked} onCheck={(event, value) => this.handleCheck(event, value, todo.id)} /></TableRowColumn>
                                              <TableRowColumn>{todo.task}</TableRowColumn>
                                              <TableRowColumn>{todo.date.slice(0,10)}</TableRowColumn>
                                              <TableRowColumn><DeleteIcon className="deleteIcon" onClick={() => this.handleRemove(todo.id)}/></TableRowColumn>
                                            </TableRow>
                                        }
                                      }
                                    )}
                                  </TableBody>
                                </Table>
                                <Subheader>{this.state.yesterdayMessage}</Subheader>
                          </div>
                        </Tab>
                        <Tab label="Today">
                          <div className="todoContent">
                              <Table>
                                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                    <TableRow>
                                      <TableHeaderColumn>Done</TableHeaderColumn>
                                      <TableHeaderColumn>Task</TableHeaderColumn>
                                      <TableHeaderColumn>Date</TableHeaderColumn>
                                      <TableHeaderColumn>Remove</TableHeaderColumn>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody displayRowCheckbox={false} id="todayList">
                                    {this.state.todo.map((todo) => {
                                        var today = new Date();
                                        if (todo.date.slice(0,10) === today.toJSON().slice(0,10)) {
                                            return <TableRow key={todo.id} className={todo.checked ? 'checked' : ''}>
                                              <TableRowColumn><Checkbox checked={todo.checked} onCheck={(event, value) => this.handleCheck(event, value, todo.id)} /></TableRowColumn>
                                              <TableRowColumn>{todo.task}</TableRowColumn>
                                              <TableRowColumn>{todo.date.slice(0,10)}</TableRowColumn>
                                              <TableRowColumn><DeleteIcon className="deleteIcon" onClick={() => this.handleRemove(todo.id)}/></TableRowColumn>
                                            </TableRow>
                                        }
                                      }
                                    )}
                                  </TableBody>
                                </Table>
                                <Subheader>{this.state.todayMessage}</Subheader>
                          </div>
                        </Tab>
                        <Tab label="Tomorrow">
                          <div className="todoContent">
                              <Table>
                                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                    <TableRow>
                                      <TableHeaderColumn>Done</TableHeaderColumn>
                                      <TableHeaderColumn>Task</TableHeaderColumn>
                                      <TableHeaderColumn>Date</TableHeaderColumn>
                                      <TableHeaderColumn>Remove</TableHeaderColumn>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody displayRowCheckbox={false} id="tomorrowList">
                                    {this.state.todo.map((todo) => {
                                        var tomorrow = new Date();
                                        tomorrow.setDate(tomorrow.getDate() + 1);
                                        if (todo.date.slice(0,10) === tomorrow.toJSON().slice(0,10)) {
                                            return <TableRow key={todo.id} className={todo.checked ? 'checked' : ''}>
                                              <TableRowColumn><Checkbox checked={todo.checked} onCheck={(event, value) => this.handleCheck(event, value, todo.id)} /></TableRowColumn>
                                              <TableRowColumn>{todo.task}</TableRowColumn>
                                              <TableRowColumn>{todo.date.slice(0,10)}</TableRowColumn>
                                              <TableRowColumn><DeleteIcon className="deleteIcon" onClick={() => this.handleRemove(todo.id)}/></TableRowColumn>
                                            </TableRow>
                                        }
                                      }
                                    )}
                                  </TableBody>
                                </Table>
                                <Subheader>{this.state.tomorrowMessage}</Subheader>
                          </div>
                        </Tab>
                        <Tab label="Later">
                          <div className="todoContent">
                              <Table>
                                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                    <TableRow>
                                      <TableHeaderColumn>Done</TableHeaderColumn>
                                      <TableHeaderColumn>Task</TableHeaderColumn>
                                      <TableHeaderColumn>Date</TableHeaderColumn>
                                      <TableHeaderColumn>Remove</TableHeaderColumn>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody displayRowCheckbox={false} id="laterList">
                                    {this.state.todo.map((todo) => {
                                        var tomorrow = new Date();
                                        tomorrow.setDate(tomorrow.getDate() + 1);
                                        if (todo.date.slice(0,10) > tomorrow.toJSON().slice(0,10)) {
                                            return <TableRow key={todo.id} className={todo.checked ? 'checked' : ''}>
                                              <TableRowColumn><Checkbox checked={todo.checked} onCheck={(event, value) => this.handleCheck(event, value, todo.id)} /></TableRowColumn>
                                              <TableRowColumn>{todo.task}</TableRowColumn>
                                              <TableRowColumn>{todo.date.slice(0,10)}</TableRowColumn>
                                              <TableRowColumn><DeleteIcon className="deleteIcon" onClick={() => this.handleRemove(todo.id)}/></TableRowColumn>
                                            </TableRow>
                                        }
                                      }
                                    )}
                                  </TableBody>
                                </Table>
                                <Subheader>{this.state.laterMessage}</Subheader>
                          </div>
                        </Tab>
                      </Tabs>
                </Card>
            </div>
        </div>
    );
  }
}

export default ToDo;
