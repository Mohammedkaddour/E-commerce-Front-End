import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class addProduct extends Component {
  state = {
    category: "",
    description: "",
    price: "",
    quantity: "",
    prodImg: null,
    type:"",
    model:"",
    condition:""

  };

  categoryHandler = e => {
    this.setState({ category: e.target.value });
  };

  typeHandler = e => {
    this.setState({ type: e.target.value });
  };

  modelHandler = e => {
    this.setState({ model: e.target.value });
  };

  conditionHandler = e => {
    this.setState({ condition: e.target.value });
  };

  descriptionHandler = e => {
    this.setState({ description: e.target.value });
  };
  priceHandler = e => {
    this.setState({ price: e.target.value });
  };
  quantityHandler = e => {
    this.setState({ quantity: e.target.value });
  };

  prodImgHandler = e => {
    this.setState({ prodImg: e.target.files[0] });
  };
  addProductHandler = () => {
    let fd = new FormData();
    fd.append("productImage", this.state.prodImg, this.state.prodImg.name);
    fd.append("category", this.state.category);
    fd.append("type", this.state.type);
    fd.append("condition", this.state.condition);
    fd.append("model", this.state.model);
    fd.append("description", this.state.description);
    fd.append("price", this.state.price);
    fd.append("quantity", this.state.quantity);
    
    axios
      .post("/addProduct", fd, {
        headers: { Authorization: "Bearer" + " " + this.props.token }
      })
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
          <Label for="exampleProduct">Product Category</Label>
          <Input
            onChange={this.categoryHandler}
            type="text"
            name="Category"
            id="exampleProduct"
            placeholder="Product Category"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleType">Product Type</Label>
          <Input
            onChange={this.typeHandler}
            type="text"
            name="Type"
            id="exampleType"
            placeholder="Product Type"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleModel">Product Model</Label>
          <Input
            onChange={this.modelHandler}
            type="text"
            name="Model"
            id="exampleModel"
            placeholder="Product Model"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleCondition">Product Condition</Label>
          <Input
            onChange={this.conditionHandler}
            type="text"
            name="Condition"
            id="exampleCondition"
            placeholder="Product Condition"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePrice">Price</Label>
          <Input
            onChange={this.priceHandler}
            type="number"
            name="price"
            id="examplePrice"
            placeholder="Product price"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleQuantity">Quantity</Label>
          <Input
            onChange={this.quantityHandler}
            type="number"
            name="quantity"
            id="exampleQuantity"
            placeholder="how many products avaliable"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Description</Label>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            onChange={this.descriptionHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Upload product picture</Label>
          <Input
            type="file"
            name="file"
            id="exampleFile"
            onChange={this.prodImgHandler}
          />
          <FormText color="muted">
            By clicking Submit your product will be ready for sale
          </FormText>
        </FormGroup>
        <Button onClick={this.addProductHandler}>Submit</Button>
      </Form>
    );
  }
}
let connectedAddProduct = connect(store => {
  return { token: store.token };
})(addProduct);

export default connectedAddProduct;
