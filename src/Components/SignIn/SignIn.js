import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import Crouton from "react-crouton"
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: ""
    };
  }

  emailHandler = e => {
    this.setState({ email: e.target.value });
  };

  passWordHandler = e => {
    this.setState({ passWord: e.target.value });
  };

  submitHandler = () => {
    axios
      .post("/login", {
        email: this.state.email,
        passWord: this.state.passWord
      })
      .then(response => {
        console.log(response);
        this.props.dispatch({
          type: "token",
          token: response.data.token,
          flageShowProfile: response.data.success
        });
        this.props.history.push("/UserProfile/" + response.data.id);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
     
        <Form className="container">
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              onChange={this.emailHandler}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="E-mail"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              onChange={this.passWordHandler}
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
            />
          </FormGroup>
          <Button onClick={this.submitHandler}>Sign in</Button>
        </Form>
      
    );
  }
}
let connectedSignIn = connect()(SignIn);
export default connectedSignIn;
