import React, { Component } from "react";

import "./Footer.css"

class Footer extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <footer className="footer">
          <div Col md={6} mdPush={6}>
            Company Information (c)2019
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
