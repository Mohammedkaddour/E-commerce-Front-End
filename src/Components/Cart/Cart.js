import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Alert
} from "reactstrap";
import axios from "axios";
import "./Cart.css";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount = () => {
   
      axios
        .get("/orders")
        .then(response => {
          console.log(response);
          this.setState({ orders: response.data.orders });
        })
        .catch(error => {
          console.log(error);
        });
    
  };

  removeOrderHandler = id => {
    axios
      .delete("/order/" + id, {
        headers: { authorization: "Bearer" + " " + this.props.token }
      })
      .then(response => {
        console.log(response);
        // if (response.message ==="Auth failed"){
        //   <Alert color="danger"> You must sign in</Alert>
        // }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container">
        {this.state.orders.map((order, index) => {
          return (
            <div key={order._id}>
              <Container>
                <Card className="productCard">
                  <CardImg
                    top
                    style={{ width: "100%", padding: "10px" }}
                    src={order.product.productImage}
                    alt="Card image cap"
                    className="rounded"
                  />
                  <CardBody>
                    <CardTitle>{order.product.name}</CardTitle>
                    <CardSubtitle>Price: {order.product.price}</CardSubtitle>
                    <CardText>
                      {" "}
                      Description:
                      {order.product.description}
                    </CardText>
                    <CardText>
                      {" "}
                      Quantity:
                      {order.product.quantity}
                      avaliable
                    </CardText>
                    <CardText>
                      Added at:
                      {order.product.addedAt}
                    </CardText>
                    <Button onClick={() => this.removeOrderHandler(order._id)}>
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
