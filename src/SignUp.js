import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  state = {
    email: '',
    password: '',
  }
  onSubmit = e => {
  e.preventDefault();
  console.log("clicked signup");
  this.props.signup(this.state.email, this.state.password);
  };
  handleEmail = e => {
    e.preventDefault();
    this.setState(this.state.email,e.target.value);
  }
  handlePwd = e => {
    e.preventDefault();
    this.setState(this.state.password,e.target.value);
  }
  render() {
    return (
      this.props.token ?
      (<Redirect to="/Home" />) :
      (<div  style={{textAlign:"center", marginLeft:"auto", width:"300px", marginRight:"auto"}}>
        <Form onSubmit={this.onSubmit} >
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={this.handlePwd}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>)
    );
  }
}
export default SignUp;
