import React, { Component } from "react";
import axios from "axios";
import moment from "moment"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Jumbotron,
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Badge
} from "reactstrap";
import "./SearchBar.css";


class SearchBar extends Component {
  state = {
    searchInput: "",
    results: []
  };
  handleSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  handleSearch = () => {
    axios
      .post("/search", {
        searchInput: this.state.searchInput
      })
      .then(response => {
        console.log(response);
        this.setState({ results: response.data.result });
      })
      .catch(error => {
        console.error(error);
      });
      this.setState({searchInput:""})
  };
  render() {
    return (
      <Container>
        <Jumbotron className="itemJumbotron">
          <Container className="Jumbcontainer">
            <h1 className="display-3">Welcome to Buy & Sell</h1>
            <p className="lead">
            Buy & Sell No.1 online shopping store for new & used items
            </p>
            <hr className="my-2" />
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleText" className="mr-sm-2">
                  Search items
                </Label>
                <Input
                  type="text"
                  name="text"
                  id="exampleText"
                  onChange={this.handleSearchInput}
                  placeholder="Search..."
                  value={this.state.searchInput}
                />
              </FormGroup>
              <Button color="danger" onClick={this.handleSearch}>
                Submit
              </Button>
            </Form>
          </Container>
        </Jumbotron>
        <Container className="productsContainer">
        {this.state.results.map(product => {
          return (
            <div key={product._id}>
              <Card className="productCard">
                <CardImg
                  top
                  style={{ width: "100%", padding: "10px" }}
                  src={product.productImage}
                  alt="Card image cap"
                  className="productImg"
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
                  <Button
                    color="info"
                    onClick={() => this.addToCartHandler(product._id)}
                  >
                    Add to Cart
                  </Button>
                  <hr />
                  <FormGroup>
                 
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      placeholder="Ask Seller"
                      onChange={this.changeMsgHandler}
                      value={this.state.description}
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    size="sm"
                    onClick={() =>
                      this.sendMsgHandlel(product.createdBy.userName._id)
                    }
                  >
                    Send Message to {product.createdBy.userName}
                  </Button>
                </CardBody>
              </Card>
            </div>
          );
        })}
         </Container>
      </Container>
    );
  }
}

export default SearchBar;
