import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, Redirect, Link } from "react-router-dom";
import axios from "axios";

class EditTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskname: "",
      status: "",
      assignedTo: "",
      eventId: "",
      userId: "",
      id:"",
      toME: false,
      returnurl: "",
      token: props.token
    }
  }
  componentDidMount(){
    let taskId = this.props.match.params.taskId;
    let eventId = this.props.match.params.eventId;
    let returnurl = "/manageEvent/" + eventId;
    this.setState({returnurl:returnurl,eventId:eventId,id:taskId});
    console.log("Evnt ID = " + eventId + "Task Id = " + taskId );
   let getToDosURL =
     'https://emapi2020.herokuapp.com/api/todos/' +
     taskId +
     '?access_token=' +
     this.state.token;
   axios.get(getToDosURL)
  .then(response => {
    this.setState({
      taskname: response.data.taskname,
      status: response.data.status,
      assignedTo: response.data.assignedTo,
      eventId: response.data.eventId,
      userId: response.data.userId,
      id: response.data.id
    }, () => {
      console.log("Manage TODOS state: " + JSON.stringify(this.state.todos));
    });
  })
  .catch(err => console.log(err));
   }
  onSubmit = e => {
    e.preventDefault();
    let task={
      taskname:this.state.taskname,
      status:this.state.status,
      assignedTo:this.state.assignedTo,
      eventId:this.state.eventId,
      userId:this.state.userId,
      id:this.state.id
    }
    //Patch ToDos
    axios.request({
    method:"patch",
    url:'https://emapi2020.herokuapp.com/api/todos?access_token='+this.state.token,
    data: task
    }).then(
    res => {
      console.log("ToDos Updated Successfully:", res);
      this.setState({toME: true})
    }
    ).catch( err =>
    {
    console.log("AXIOS ERROR1: ", err);
    }
    );
  //  this.props.editEvent(modevent);
  //    this.setState({edit:false});
    console.log("clicked on submit, task : " + JSON.stringify(task));
  }
  handleChange = (evt) => {
      const value =
        evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
      this.setState({
        ...this.state,
        [evt.target.name]: value
      });
    }

  render() {
    return (
      !this.props.token ?
      (<Redirect to="/Home" />) :( this.state.toME ? (<Redirect to={this.state.returnurl}  />) :(
        <div style={{marginTop:"80px", marginLeft:"20px", marginRight:"20px"}}>
          <Typography component="h1" variant="h5" color="primary">
            Edit Task Details
          </Typography>
          <form onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Task Name"
              name="taskname"
              type="text"
              autoComplete="email"
              value={this.state.taskname}
              onChange={this.handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="status"
              value={this.state.status}
              label="Status"
              InputLabelProps={{
                shrink: true,
              }}
              type="text"
              id="edate"
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="assignedTo"
              label="Assigned To"
              type="text"
              value={this.state.assignedTo}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
            <Button
              style={{marginTop:"15px"}}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {this.setState({toME: true})}}
            >
              Cancel
            </Button>
          </form>
        </div>))
    );
  }


}

export default EditTask;
