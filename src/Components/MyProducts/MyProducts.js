import React , {Component} from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Button,
  Badge
} from "reactstrap";
import Img from "react-image"


class MyProducts extends Component {

    removeProductHandler = id => {
        axios
          .delete("/product/" + id, {
            headers: { authorization: "Bearer" + " " + this.props.token }
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      };

      render(){
        return (
            <Container>
              {this.props.myProducts.map(product => {
                return (
                    <div key={product._id}>
                      <Card className="productCard">
                      <Img
                    top
                    style={{ width: "100%", padding: "10px" }}
                    src={[product.productImage,
                    "http://localhost:3000/"+product.productImage]}
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
                          <Button
                            color="primary"
                            onClick={()=>this.removeProductHandler(product._id)}
                          >
                          Remove the Product 
                          </Button>
                        </CardBody>
                      </Card>
                    </div>
                  );
              })}
            </Container>
          );
      }
  
};

let connectedMyProducts = connect(store => {
  return { token: store.token };
})(MyProducts);

export default connectedMyProducts;
