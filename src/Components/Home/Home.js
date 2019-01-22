import React, { Component } from "react";
import Products from "../Products/Products";
import SearchBar from "../SearchBar/SearchBar"
import Footer from "../Footer/Footer"
class Home extends Component {
  

  render() {
    return (
      <div>
         <SearchBar/>
         <hr/>
        <Products />
        <Footer />
      </div>
    );
  }
}

export default Home;
