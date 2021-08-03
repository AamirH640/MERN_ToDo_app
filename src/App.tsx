import "bootstrap/dist/css/bootstrap.min.css";
import {AppBar, Toolbar, Typography, Link} from '@material-ui/core';
import {BrowserRouter as Router, Route} from "react-router-dom";
import CreateToDo from "./components/create-todo.component";
import EditToDo from "./components/edit-todo.component";
import ToDoList from "./components/todos-list.component";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
        color: 'white',
      },
    },
  }),
);

function App() {
    const classes = useStyles();
  return (
      <Router>
           <div className="container">
               <AppBar position = "static">
                   <Toolbar>
                       <Typography>MERN Stack APP </Typography>
                       <Typography className={classes.root}>
                           <Link href="/" underline='none'> ToDo </Link>
                           <Link href="/create" underline='none'> Create ToDo </Link></Typography>
                   </Toolbar>
               </AppBar>

               <Route path="/" exact component={ToDoList}/>
               <Route path="/edit/:id" component={EditToDo}/>
               <Route path="/create" component={CreateToDo}/>
           </div>
      </Router>
  );
}

export default App;
