import React, { Component } from "react";
import { connect } from "react-redux";
import Crouton from "react-crouton";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container
} from "reactstrap";
import axios from "axios";
import "./Cart.css";
import Img from "react-image";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders:[],
      authMsg: "Sorry You have to log in",
      flageAuth: false
    };
  }

  componentWillMount = () => {
    setInterval(()=>{
      axios
      .get("/orders/" + this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({ orders: response.data.user.myOrders });
      })
      .catch(error => {
        console.log(error);
      });
    },500)
   
  };

  removeOrderHandler = index => {
    axios
      .post("/order/" + this.props.match.params.id,{
        index: index
      }, {
        headers: { authorization: "Bearer" + " " + this.props.token }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    let showEmpty = null;
    if (this.state.orders.length === 0) {
      showEmpty = <div>Cart is empty</div>;
    }
    return (
      <div className="container">
        {showEmpty}
        {this.state.orders.map((order, index) => {
          return (
            <div key={order._id}>
              <Container>
                <Card className="productCard">
                  <Img
                    top
                    style={{ width: "100%", padding: "10px" }}
                    src={[order.productImage, "http://localhost:3000/"+order.productImage]}
                    alt="Card image cap"
                    className="rounded"
                  />
                  <CardBody>
                    <CardTitle>{order.name}</CardTitle>
                    <CardSubtitle>Price: {order.price}</CardSubtitle>
                    <CardText>
                      {" "}
                      Description:
                      {order.description}
                    </CardText>
                    <CardText>
                      {" "}
                      Quantity:
                      {order.quantity}
                      avaliable
                    </CardText>
                    <CardText>
                      Added at:
                      {order.addedAt}
                    </CardText>
                    <Button onClick={() => this.removeOrderHandler(index)}>
                      Remove from Cart
                    </Button>
                  </CardBody>
                </Card>
              </Container>
            </div>
          );
        })}
      </div>
    );
  }
}

let connectedOrders = connect(store => {
  return { token: store.token };
})(Orders);
export default connectedOrders;
