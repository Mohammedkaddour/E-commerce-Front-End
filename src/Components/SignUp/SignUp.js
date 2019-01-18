import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class SignUp extends Component {
  state = {
    email: "",
    passWord: "",
    userName: "",
    userImg: null,
    city: "",
    country: "",
    summary: ""
  };

  emailHandler = e => {
    this.setState({ email: e.target.value });
  };

  userNameHandler = e => {
    this.setState({ userName: e.target.value });
  };
  passWordHandler = e => {
    this.setState({ passWord: e.target.value });
  };

  cityHandler = e => {
    this.setState({ city: e.target.value });
  };

  countryHandler = e => {
    this.setState({ country: e.target.value });
  };

  summaryHandler = e => {
    this.setState({ summary: e.target.value });
  };
  userImgHandler = e => {
    this.setState({ userImg: e.target.files[0] });
  };
  submitHandler = () => {
    let fd = new FormData();
    fd.append("userImage", this.state.userImg, this.state.userImg.name);
    fd.append("email", this.state.email);
    fd.append("passWord", this.state.passWord);
    fd.append("userName", this.state.userName);
    fd.append("city", this.state.city);
    fd.append("country", this.state.country);
    fd.append("summary", this.state.summary);

    axios
      .post("/signup", fd)
      .then(response => {
        console.log(response);
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
          <Label for="exampleUsername">User name</Label>
          <Input
            onChange={this.userNameHandler}
            type="text"
            name="username"
            id="exampleUsername"
            placeholder="choose any user name"
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
        <FormGroup>
          <Label for="exampleCity">City</Label>
          <Input
            onChange={this.cityHandler}
            type="text"
            name="City"
            id="exampleCity"
            placeholder="City"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleCountry">Country</Label>
          <Input
            onChange={this.countryHandler}
            type="text"
            name="Country"
            id="exampleCountry"
            placeholder="Country"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSummary">Summary</Label>
          <Input
            onChange={this.summaryHandler}
            type="textarea"
            name="Summary"
            id="exampleSummary"
            placeholder="Summary"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Upload profile picture</Label>
          <Input
            type="file"
            name="file"
            id="exampleFile"
            onChange={this.userImgHandler}
          />
          <FormText color="muted">
            By clicking Submit your profile will be created
          </FormText>
        </FormGroup>
        <Button onClick={this.submitHandler}>Submit</Button>
      </Form>
    );
  }
}

export default SignUp;
