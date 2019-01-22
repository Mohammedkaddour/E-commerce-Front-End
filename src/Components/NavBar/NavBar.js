import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import Crouton from "react-crouton"
class NavBar extends Component {
  constructor(props) {
    super(props);
    
  }

  showMyProfileHandler=()=>{
 let decode = jwt_decode(this.props.token)
 console.log(this.props.token)
 console.log(decode)
 this.props.history.push("/UserProfile/" + decode.id);
  }
  showMyCartHandler=()=>{
    let decode = jwt_decode(this.props.token)
 this.props.history.push("/myCart/" + decode.id);
  }
  render() {
    let showMyProfile = null;
    let showCart=null
    if (this.props.flageShowProfile) {
      showMyProfile = <Button onClick={this.showMyProfileHandler}>My Profile</Button>
      showCart = <Button onClick={this.showMyCartHandler}>My Cart</Button>
    }

    return (
      <div>
        <Navbar
          color="light"
          light
          expand="md"
          className="navbar navbar-dark bg-dark"
        >
          <NavbarBrand>
            <Link to="/">Buy & Sell</Link>
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
           
            <NavItem>
              <NavLink>
                <Link to="/SignUP">Sign up</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/SignIn">Sign in</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>{showMyProfile}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                {showCart}
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

let connectedNavBar = connect(store => {
  return { token: store.token,
    flageShowProfile: store.flageShowProfile };
})(NavBar);
export default withRouter(connectedNavBar);
