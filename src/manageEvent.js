import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import TasksItem from "./TasksItem.js";

class manageEvent extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      eventname:"",
      eventloc:"",
      eventdate:"",
      eventdes:"",
      id:"",
      userId:"",
      todos: {},
      token: props.token,
      gotoEvents: false,
      getToDosURL: ""
    }
  }
  componentDidMount(){
    let eventId = this.props.match.params.id;
    let getEvURL =
    'https://emapi2020.herokuapp.com/api/events/' + eventId +
    '?access_token=' +
    this.state.token;
    //Get Event
    axios.get(getEvURL)
   .then(response => {
     this.setState({
       id: response.data.id,
       userId: response.data.userId,
       eventname: response.data.eventname,
       eventloc: response.data.eventloc,
       eventdate: response.data.eventdate,
       eventdes: response.data.eventdes
     }, () => {
       console.log("Manage event state: " + JSON.stringify(this.state));
     });
   })
   .catch(err => console.log(err));
   let getToDosURL =
     'https://emapi2020.herokuapp.com/api/todos?filter={"where" : {"eventId" : "' +
     eventId +
     '" }}&access_token=' +
     this.state.token;
     this.setState({getToDosURL:getToDosURL});
   axios.get(getToDosURL)
  .then(response => {
    this.setState({
      todos: response.data
    }, () => {
      console.log("Manage TODOS state: " + JSON.stringify(this.state.todos));
    });
  })
  .catch(err => console.log(err));
   }

   //Delete ToDos
    dTask = (id) => {
        console.log("Task ID: ", id);
        //Patch ToDos
        axios.request({
        method:"delete",
        url:'https://emapi2020.herokuapp.com/api/todos/'+ id + '?access_token='+this.state.token
        }).then(
        res => {
          console.log("ToDos Deleted Successfully:", res);
          //Refresh ToDos
              axios.get(this.state.getToDosURL)
             .then(response => {
               this.setState({
                 todos: response.data
               }, () => {
                 console.log("Refresh TODOS state: " + JSON.stringify(this.state.todos));
               });
              })
             .catch(err => console.log(err));
              }
        ).catch( err =>
        {
        console.log("AXIOS ERROR1: ", err); } )
    }
     //Back to events
     onBtoE = () => {
       this.setState({gotoEvents: true});
     }
   //Mapping Todos
   todoMap = () => {

     return(
       this.state.todos.map(todo => (

        <TasksItem task={todo} dTask={this.dTask} eventId={this.state.id} />
       ))
     )
   }
  render() {
    return (
      !this.props.token  ?
      (<Redirect to="/Home" />) : ( this.state.gotoEvents ? (<Redirect to="/Home" />) : (
      <div style={{marginTop:"80px", marginLeft:"20px", marginRight:"20px",display:"flex",flexDirection:"column"}}>
      <Paper style={{padding:"20px", display:"flex", flexDirection:"row", justifyContent:"space-around",flexWrap:"wrap"}}>
      <div style={{display:"flex", flexDirection:"column"}}>
      <Typography variant="h6" color="primary">{this.state.eventname.toUpperCase()}</Typography>
      <Typography variant="subtitle2">Location: {this.state.eventloc}</Typography>
      <Typography variant="subtitle2">Date: {this.state.eventdate.split("T",1)}</Typography>
      <Typography  variant="body2">Description: {this.state.eventdes}</Typography>
      </div>
      <div style={{display: "flex", flexDirection:"column"}}>
      <Button size="small" variant="outlined" color="primary" style={{marginTop:"5px"}}>
       <Link to={`/addtodos/${this.state.userId}/${this.state.id}`} style={{textDecoration:"none",color:"inherit"}}>Add Tasks</Link>
      </Button>
      <Button size="small" variant="outlined" color="primary" style={{marginTop:"5px"}}>Add Transactions</Button>
      <Button size="small" variant="outlined" color="primary" style={{marginTop:"5px"}}>Delete Event</Button>
      <Button size="small" variant="outlined" color="primary" style={{marginTop:"5px"}} onClick={this.onBtoE}>
      Back to Events</Button>
      </div>
      </Paper>
      <Paper style={{marginTop:"15px",padding:"15px"}}>
      <Typography variant="h6" color="primary">TASKS</Typography>
      { this.state.todos && this.state.todos.length ? (
        <div><table style={{border:"2px"}}>
        <tr>
        <th>Task Name</th>
        <th>Status</th>
        <th>Assigned To</th>
        <th>Actions</th>
        </tr>
        {this.todoMap()}</table></div>
        ) : (
        <Typography variant="subtitle2" color="secondary">No Tasks to show !  Add Tasks</Typography>
      )}
      </Paper>
      </div>))
    );
  }

}

export default manageEvent ;
