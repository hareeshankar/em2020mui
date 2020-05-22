import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Redirect, Link } from "react-router-dom";

class SignIn extends Component {

    state = {
      email: '',
      password: '',
    }
    onSubmit = e => {
    e.preventDefault();
    console.log("clicked signin");
    this.props.signin(this.state.email, this.state.password);
    };
    handleEmail = e => {
      e.preventDefault();
      this.setState({email:e.target.value});
    }
    handlePwd = e => {
      e.preventDefault();
      this.setState({password:e.target.value});
    }

  render() {
    return (
      this.props.token ?
      (<Redirect to="/Home" />) :
      (
        <div>
      <div  style={{textAlign:"center", marginLeft:"auto", width:"300px", marginRight:"auto"}}>
      <h6> Existing Users, Please Sign In </h6>
      <Form onSubmit={this.onSubmit} >
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={this.handlePwd}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form><br/>
      <h6> New Users, Please Sign Up </h6>
        <Link to={`/SignUp`}>
        <Button>Sign Up</Button>
        </Link>
      </div></div>)

    );
  }
}
export default SignIn;
