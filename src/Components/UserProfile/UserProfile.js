import React, { Component } from "react";
import axios from "axios";
import moment from "moment"
import AddProduct from "../AddProduct/AddProduct"
import "./UserProfile.css"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle
} from "reactstrap";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount = () => {
    axios
      .get("/user/" + this.props.match.params.id)
      .then(response => {
        console.log(response);
      //  let newUser = {... response.data.user}
        this.setState({ user: response.data.user });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
        
      <div>
          <AddProduct />
        {" "}
        <Card>
          <CardBody>
            <CardTitle>{this.state.user.userName}</CardTitle>
            <CardSubtitle>{this.state.user.country} / {this.state.user.city}</CardSubtitle>
            <CardSubtitle>Joined: { moment(this.state.user.joined).format("YYYY")}</CardSubtitle>
          </CardBody>
          <CardImg
           style={{ width: "100%", padding: "10px" }}
           className="rounded"
            width="100%"
            src={this.state.user.userImage}
          />
          <CardBody>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <CardLink href="#">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserProfile;
