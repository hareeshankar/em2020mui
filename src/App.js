import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./SignInMUI.js";
import SignUp from "./SignUpMUI.js";
import Home from "./Home.js"
import NoMatch from "./NoMatch.js"
import ProtectedRoute from "./ProtectedRoute.js";
import NavBar from "./NavBar.js";
import SideBar from "./SideBar.js";
import AppBar from "./AppBar.js";
import AddEvent from "./AddEvent.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
class App extends Component {
  constructor(){
    super();
    this.state={
      token: localStorage.getItem("token") || "",
      user: {},
      events: [],
      errmsg: "",
      loading: false
    }
  }
  signin = (email, password) => {
    const cred = {
      email: email,
      password: password
    }
    this.setState({loading:true,errmsg:""});
    axios.request(
      {
        method:'post',
        url: 'https://eventmanagerapi.herokuapp.com/api/Users/login',
        data: cred
      }
    ).then(
      res => {
        console.log("RESPONSE RECEIVED: ", res);
        this.setState(state => ({ token: res.data.id, loading: false }));
        const userId = res.data.userId;
        localStorage.setItem("token", res.data.id);
        //this.getUser(userId);
        //this.getEvents(userId);
      }
    ).catch(
      err => {
        console.log("AXIOS ERROR: ", err);
        //NProgress.done();
        console.log(err.response.data.error.statuscode);
        let errmsgobj = JSON.stringify(err.response.data.error.statusCode);
        let mesg = "";
        if (errmsgobj === "401") {
          mesg = "Login Failed. Username or password incorrect";
          console.log(mesg);
          this.setState(state => ({
            errmsg: mesg,
            loading: false
          }));
        }
      }
    );
    console.log(localStorage.getItem("token")+" Retrieved")
  }
  signup = (props) => {
    console.log(props.email + " " + props.password + " " + props.fname + " " + props.lname);
    console.log(this.state.token);
  //  localStorage.setItem("token", "tokensignup");
    const cred = {
      realm: "EM",
      username: props.fname,
      email: props.email,
      password : props.password,
      emailVerified: true
    }
    this.setState({loading:true,errmsg:""});
    axios.request({
      method:'post',
      url:'https://eventmanagerapi.herokuapp.com/api/Users',
      data: cred
    }).then(
      res => {
        console.log("Sign Up Successful:", res);
        this.setState({
          user : {
            realm: res.data.realm,
            username: res.data.username,
            email: res.data.email,
            emailVerified: false,
            userId: res.data.id
          },
          errmsg: "Sign up Successful. Please login !",
          loading: false
        });
        console.log("Loading: ", this.state.loading);
      }
    ).catch( err =>
      {
      console.log("AXIOS ERROR: ", err);
      console.log(err.response.data.error.statuscode);
      this.setState({loading:false});
      let errmsgobj = JSON.stringify(err.response.data.error.statusCode);
      //this.setState({
      //  errmsg: JSON.stringify(err.response.data)
      //});
      if (errmsgobj === "401") {
        let mesg = "Sign Up Failed. Username or password incorrect";
        console.log(mesg);
        this.setState({
          errmsg: mesg
        });
      }
      if (errmsgobj === "422") {
        let mesg = "Sign Up Failed. Invalid Email/Username !";
        console.log(mesg);
        this.setState({
          errmsg: mesg
        });
      }

      }
    );

  }
  signout = () => {
    console.log("clicked sign out");
      this.setState({token:""});
      localStorage.removeItem("token");
  }
  saveEvent = (props) => {
    console.log(props);

  }
  render() {
    return (
      <Router>
      <AppBar signout={this.signout} token={this.state.token} />
      {this.state.loading ?  (<LinearProgress style={{zIndex:"2000"}}/>):(null)}
      <Switch>
      <Route exact path="/signin" render=  { (props) => (
        <Fragment>
        <SignIn signin={this.signin} token={this.state.token} errmsg={this.state.errmsg} loading={this.state.loading} />
        </Fragment>)
      } />
      <Route exact path="/signup" render=  { (props) => (
        <Fragment>
        <SignUp signup={this.signup} token={this.state.token} errmsg={this.state.errmsg} loading={this.state.loading}/>
        </Fragment>)
      } />
      <Route exact path="/addEvent" render=  { (props) => (
        <Fragment>
        <AddEvent saveEvent={this.saveEvent} token={this.state.token} />
        </Fragment>)
      } />
      <ProtectedRoute path="/home" component={Home} token={this.state.token}/>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route component={NoMatch} />
      </Switch>
      </Router>
    );
  }

}

export default App;
