import React from "react";
import EItem from "./EitemMUI.js";
import { Container, Row, Col } from "react-bootstrap";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Transition } from './Transition.js';
import TextField from '@material-ui/core/TextField';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events : this.props.events,
      edit : false,
      eventname: "",
      eventloc:"",
      eventdate:"",
      eventdes:"",
      userId:"",
      id:"",
      modevent : {}
        };
    console.log(this.props.events);
  }
  componentDidMount(){
    this.setState({events: this.props.events, edit: false});
  }

  invokeEdit = (event) => {
  this.setState({
    eventname:event.eventname,
    eventdate:event.eventdate.split("T",1),
    eventloc:event.eventloc,
    eventdes:event.eventdes,
    userId:event.userId,
    id:event.id,
    edit:true});
  console.log("edit" + this.state.edit + "event: " + JSON.stringify(event));
  }
  closeEdit = () => {
  this.setState({edit:false});
  console.log("edit close clicked" + this.state.edit );
  }
  onSubmit = e => {
    e.preventDefault();
    let modevent={
      eventname:this.state.eventname,
      eventdate:this.state.eventdate,
      eventloc:this.state.eventloc,
      eventdes:this.state.eventdes,
      userId:this.state.userId,
      id:this.state.id,
    }
    this.props.editEvent(modevent);
      this.setState({edit:false});
    console.log("clicked on submit, modvent : " + JSON.stringify(modevent));
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
      <div style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
      <Typography component="h1" variant="h5" color="primary">
        Ongoing Events {" (" + (this.props.events.length) + ")"}
        <hr/>
      </Typography>
      <Container >
          {this.props.events.map(event => (

              <EItem key={event.id} event={event} invokeEdit={this.invokeEdit}/>

          ))}
      </Container>
      <Dialog fullScreen open={this.state.edit} onClose={this.closeEdit} TransitionComponent={Transition}>
        <AppBar style={{position:"relative"}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.closeEdit} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              Editing Event
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={this.onSubmit.bind(this)} style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Event Name"
            name="eventname"
            value={this.state.eventname}
            type="text"
            autoComplete="email"
            onChange={this.handleChange.bind(this)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="eventdate"
            value={this.state.eventdate}
            label="Event Date"
            InputLabelProps={{
              shrink: true,
            }}
            type="date"
            onChange={this.handleChange.bind(this)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="eventloc"
            value={this.state.eventloc}
            label="Event Location"
            type="text"
            onChange={this.handleChange.bind(this)}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="eventdes"
            value={this.state.eventdes}
            label="Event Description"
            type="text"
            onChange={this.handleChange.bind(this)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            autoFocus
          >
            Submit
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:"15px"}}
            onClick={this.closeEdit}>
            Cancel
          </Button>
        </form>
      </Dialog>
      </div>
    );
  }
}
export default Events;
