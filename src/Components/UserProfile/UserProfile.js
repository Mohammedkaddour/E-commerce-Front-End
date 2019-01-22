import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import AddProduct from "../AddProduct/AddProduct";
import "./UserProfile.css";
import classnames from "classnames";
import { connect } from "react-redux";
import MyProducts from "../MyProducts/MyProducts";
import Crouton from "react-crouton"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Container,
  Button
} from "reactstrap";
import Img from "react-image"

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      activeTab: "1",
      myProducts: []
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
      
        axios
        .get("/products")
        .then(response => {
          console.log(response);
          this.setState({ products: response.data.products });
          this.props.dispatch({
            type: "products",
            products: response.data.products
          });
        })
        .catch(error => {
          console.log(error);
        });
    
    
  };
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
    let filterId = product => {
      if (product.createdBy._id === this.props.match.params.id) {
        return true;
      }
    };
    let filteredProducts = this.props.products.filter(filterId);
    this.setState({ myProducts: filteredProducts });
  };
  render() {
    return (
      <div>
        {" "}
        <Card className="usercard-Container">
          <Img
            style={{
              width: "30%",
              padding: "10px"
            }}
            className="usercard-Img"
            width="100%"
            src={[this.state.user.userImage,"http://localhost:3000/"+this.state.user.userImage]}
          />
          <CardBody className="usercard-body1">
            <CardTitle className="usercard-title">
              {this.state.user.userName}
            </CardTitle>
            <CardSubtitle className="usercard-subtitle">
              {" "}
              Country/City: {this.state.user.country} / {this.state.user.city}
            </CardSubtitle>
            <CardSubtitle className="usercard-subtitle">
              Joined: {moment(this.state.user.joined).format("YYYY")}
            </CardSubtitle>
          </CardBody>
          <CardBody>
            <CardText className="usercard-summary">
              Summary: {this.state.user.summary}
            </CardText>
          </CardBody>
        </Card>
        <hr />
        <Nav tabs>
          <NavItem className=" navbar-dark bg-dark">
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Sell Products
            </NavLink>
          </NavItem>
          <NavItem className=" navbar-dark bg-dark">
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              My Products
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Fill the form</h4>
                <AddProduct />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <Container className="userproducts">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="2">
              <Col>
                <h4>My Products: {this.state.myProducts.length} avaliable</h4>
                <MyProducts myProducts={this.state.myProducts} />
              </Col>
            </TabPane>
          </TabContent>
        </Container>
      </div>
    );
  }
}
let connectedUserProfile = connect(store => {
  return { products: store.products, token: store.token };
})(UserProfile);
export default connectedUserProfile;
