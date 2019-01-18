import React from "react";
import { Route, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import SignUp from "../SignUp/SignUp";

const NavBar = () => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand><Link to="/">Home</Link></NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink>
              <Link to="/Products">Products</Link>
            </NavLink>
          </NavItem>
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
            <NavLink><Link to="/Cart">Cart</Link></NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
