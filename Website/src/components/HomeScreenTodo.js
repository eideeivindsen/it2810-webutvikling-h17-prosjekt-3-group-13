import React from 'react';
import { Card, Checkbox,  Divider, RaisedButton, Subheader } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { NavLink } from 'react-router-dom';

export default class HomeScreenTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: localStorage.todo === undefined || localStorage.todo.length === 0  ? [] : JSON.parse(localStorage.todo),
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
        <div>
            <Card className="homeTodo">
                <Subheader>YOUR TODOS FOR TODAY:</Subheader>
                <Divider />
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                      <TableRow>
                        <TableHeaderColumn>Done</TableHeaderColumn>
                        <TableHeaderColumn>Task</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} id="todayList">
                    {dailyTodo.length > 0 ? dailyTodo.slice(0,3).map((todo) => {
                        return <TableRow key={todo.id} className={todo.checked ? 'checked' : ''}>
                          <TableRowColumn><Checkbox checked={todo.checked} onCheck={(event, value) => this.handleCheck(event, value, todo.id)}/></TableRowColumn>
                          <TableRowColumn>{todo.task}</TableRowColumn>
                        </TableRow>
                      }
                  ) :
                    <Subheader>You don't have any todos today.</Subheader>}
                </TableBody>
              </Table>
              <Divider />
              <br></br>
              <NavLink  to={"/todo"}>
                  <RaisedButton label="Checkout your todo list" primary={true} className="homeTodoButton"/>
              </NavLink>
            </Card>
        </div>

    );
  }
}
