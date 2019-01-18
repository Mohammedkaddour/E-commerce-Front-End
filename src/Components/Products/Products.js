import React, { Component } from "react";
import moment from "moment";
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
  Badge
} from "reactstrap";
import axios from "axios";
import "./Products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount = () => {
    axios
      .get("/products")
      .then(response => {
        console.log(response);
        this.setState({ products: response.data.products });
      })
      .catch(error => {
        console.log(error);
      });
  };

  addToCartHandler = id => {
    axios
      .post(
        "/addOrder",
        { id: id },
        {
          headers: { authorization: "Bearer " + this.props.token }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container">     
        {this.state.products.map((product, index) => {
          return (
            <div key={product._id}>
              <Container className="productsContainer">
                <Card className="productCard">
                  <CardImg
                    top
                    style={{ width: "100%", padding: "10px" }}
                    src={product.productImage}
                    alt="Card image cap"
                    className="rounded"
                  />
                  <CardBody>
                    <CardTitle>Category : {product.category}</CardTitle>
                    <hr />
                    <CardSubtitle>Type : {product.type}</CardSubtitle>
                    <CardSubtitle>Price : {product.price} $</CardSubtitle>
                    <CardText> Model : {product.model}</CardText>
                    <CardText>
                      {" "}
                      Condition :
                      <h5>
                        {" "}
                        <Badge color="primary"> {product.condition}</Badge>
                      </h5>
                    </CardText>
                    <CardText> Quantity :{product.quantity}</CardText>
                    <CardText> Description : {product.description}</CardText>
                    <CardText>
                      Added : {moment(product.addedAt).format("MMM Do YYYY")}
                    </CardText>
                    <CardText> Seller : {product.createdBy.userName}</CardText>
                    <Button color="info" onClick={() => this.addToCartHandler(product._id)}>
                      Add to Cart
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

let connectedProducts = connect(store => {
  return { token: store.token };
})(Products);
export default connectedProducts;
