import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table, TableBody, TableCell, TableRow, Typography, withStyles, Theme, makeStyles} from '@material-ui/core';

const ToDo = (props:any) => (
    <TableRow>
        <TableCell className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</TableCell>
        <TableCell className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</TableCell>
        <TableCell className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</TableCell>
        <TableCell>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </TableCell>
    </TableRow>
)

const TableHead = withStyles((theme:Theme) =>({
    root: {
        backgroundColor: 'orange'
    }
}))(TableHead);

const TableHeaderCell = withStyles((theme:Theme) =>({
    root: {
        color: 'white'
    }
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default class ToDoList extends React.Component<any, any> {
    const classes = useStyles();

    constructor(props:any) {
        super(props);
        this.state = {todos: []};
    }



    componentDidMount() {
        axios.get('http://localhost:4000/todos')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/todos')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList(){
        return this.state.todos.map(function (currentTodo: any, i: any){
            return <ToDo todo = {currentTodo} key = {i}/>;
        });
    }

    render(){
        return(
            <div style={{marginTop: 20}}>
                <Typography variant="h4">ToDos List</Typography>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Responsible</TableHeaderCell>
                            <TableHeaderCell>Priority</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { this.todoList() }
                    </TableBody>
                </Table>
                {/*<table className='table table-striped' style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>*/}
            </div>
        )
    }
}