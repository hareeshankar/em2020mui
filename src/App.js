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
      user: JSON.parse(localStorage.getItem("user")) || {},
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
        this.setState(state => ({ token: res.data.id, loading: false, user: {userId: res.data.userId }}));
        const userId = res.data.userId;
        localStorage.setItem("token", res.data.id);
        this.getUser(userId);
        this.getEvents(userId);
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
      localStorage.removeItem("user");
  }
  editEvent = (props) => {
    console.log(JSON.stringify(props));
    this.setState({loading:true,errmsg:""});
    axios.request({
    method:"patch",
    url:'https://eventmanagerapi.herokuapp.com/api/events?access_token='+this.state.token,
    data: props
    }).then(
    res => {
      console.log("Event Updated Successfully:", res);
        this.setState({loading:false});
      console.log("Loading: ", this.state.loading);
      this.getEvents(props.userId);
    }
    ).catch( err =>
    {
    console.log("AXIOS ERROR: ", err);
    this.setState({loading:false});
    }
    );
    console.log(props);
  }
  saveEvent = (props) => {
      this.setState({loading:true,errmsg:""});
      axios.request({
      method:"post",
      url:'https://eventmanagerapi.herokuapp.com/api/events?access_token='+this.state.token,
      data: props
      }).then(
      res => {
        console.log("Event added Successfully:", res);
          this.setState({loading:false});
        console.log("Loading: ", this.state.loading);
        this.getEvents(props.userId);
      }
      ).catch( err =>
      {
      console.log("AXIOS ERROR: ", err);
      this.setState({loading:false});
      }
      );
      console.log(props);

  //  let meth = props.edev ? ("patch") : ("post");
  //console.log("meth = " + meth + " event " + JSON.stringify(props.event) + " edev = " + props.edev);
  }

  /* Get user and get events *//////////////////////////
  getEvents = userId => {
    let getEventsURL =
      'https://eventmanagerapi.herokuapp.com/api/events?filter={"where" : {"userId" : "' +
      userId +
      '" }}&access_token=' +
      this.state.token;
      if (userId) {
                  this.setState({loading:true})
                  axios
                    .get(getEventsURL)
                    .then(response => {
                      this.setState({ events: response.data, loading: false });
                      console.log("response received:", response);
                      console.log("events retrieved: ", this.state.events);
                    })
                    .catch(function(error) {
                      //this.setState({loading:false})
                      console.log("AXIOS ERROR: ", error);
                    });
                }
  };
  getUser = userId => {
    let getUserURL =
      "https://eventmanagerapi.herokuapp.com/api/Users/" +
      userId +
      "?access_token=" +
      this.state.token;
    axios
      .get(getUserURL)
      .then(res => {
        console.log("RESPONSE RECEIVED: ", res);
        this.setState({
          user: {
            realm: res.data.realm,
            username: res.data.username,
            email: res.data.email,
            emailVerified: false,
            userId: res.data.id
          }
        });
        console.log(
          "user updated in context state: " + JSON.stringify(this.state.user)
        );
        localStorage.setItem("user", JSON.stringify(this.state.user));
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
        console.log(err.response.data.error.statuscode);
        let errmsgobj = JSON.stringify(err.response.data.error.statusCode);
        if (errmsgobj === "401") {
          let mesg = "Get User Failed. Username or password incorrect";
          console.log(mesg);
          this.setState(state => ({
            errmsg: mesg
          }));
        }
        this.setState(state => ({
          errmsg: err.response.data
        }));
      });
  };
///////////////////////////////////////////////////
  componentDidMount() {
    this.getEvents(this.state.user.userId);
  }
  render() {
    return (
      <Router>
      <AppBar signout={this.signout} token={this.state.token} username={this.state.user.username} />
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
        <AddEvent saveEvent={this.saveEvent} token={this.state.token} userId={this.state.user.userId} />
        </Fragment>)
      } />
      <Route exact path="/Home" render=  { (props) => (
        <Fragment>
        <Home events={this.state.events} token={this.state.token} username={this.state.user.username} loading={this.state.loading} editEvent={this.editEvent} />
        </Fragment>)
      } />
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route component={NoMatch} />
      </Switch>
      </Router>
    );
  }

}

export default App;
