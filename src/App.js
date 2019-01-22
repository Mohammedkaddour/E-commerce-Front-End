import React, { Component } from "react";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import { Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart"
import "./App.css";
import Products from "./Components/Products/Products";
import Crouton from "react-crouton"
import UserProfile from "./Components/UserProfile/UserProfile"

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        {/* <Crouton id={11} type="info" message="Welcome to Buy and Sell"/> */}
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/SignUp/" component={SignUp} />
        <Route exact={true} path="/SignIn/" component={SignIn} />
        <Route exact={true} path="/Products/" component={Products} />
        <Route exact={true} path="/myCart/:id" component={Cart} />
        <Route exact={true} path="/UserProfile/:id" component={UserProfile} />
      </div>
    );
  }
}

export default App;
