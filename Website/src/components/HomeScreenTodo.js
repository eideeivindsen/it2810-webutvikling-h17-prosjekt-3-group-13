import React, { Component } from 'react';
import { Card, Checkbox,  Divider, RaisedButton, Subheader } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { NavLink } from 'react-router-dom';

class HomeScreenTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: localStorage.todo === undefined || localStorage.todo.length === 0  ? [] : JSON.parse(localStorage.todo),
            noTaskMessage: '',
        }
    }

    componentDidMount() {
        this.tabHasContent();
    }

    tabHasContent() {
        if(document.getElementById("todoList") != null) {
            document.getElementById("todoList").hasChildNodes() ? this.setState({noTaskMessage: ''}) : this.setState({noTaskMessage: "You don't have any tasks today."});
        }
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

    updateLocalStorage() {
        localStorage.setItem("todo", JSON.stringify(this.state.todo));
    }

  render() {
      var today = new Date();
      var dailyTodo = this.state.todo.slice().filter(function(todo) {
          return todo.date.slice(0,10) === today.toJSON().slice(0,10);
      });
    return (
        <div className="homeTodoContainer">
            <Card className="homeTodo">
                <Subheader>Daily Todos:</Subheader>
                <Divider />
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                      <TableRow>
                        <TableHeaderColumn>Done</TableHeaderColumn>
                        <TableHeaderColumn>Task</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} id="todoList">
                    {dailyTodo.length > 0 ? dailyTodo.slice(0,4).map((todo) => {
                        return <TableRow key={todo.id} className={todo.checked ? 'checked' : ''}>
                          <TableRowColumn><Checkbox checked={todo.checked} onCheck={(event, value) => this.handleCheck(event, value, todo.id)}/></TableRowColumn>
                          <TableRowColumn>{todo.task}</TableRowColumn>
                        </TableRow>
                      }
                  ) :
                    null}
                </TableBody>
              </Table>
              <Subheader>{this.state.noTaskMessage}</Subheader>
            </Card>
            <NavLink  to={"/todo"}>
                <RaisedButton label="Checkout your todo list" primary={true} className="homeTodoButton"/>
            </NavLink>
        </div>
    );
    }
  }

 export default HomeScreenTodo;
