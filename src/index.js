import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let reducer = (state, action) =>{
   if(action.type==="token"){
       return {... state, token :action.token, flageShowProfile: action.flageShowProfile }
   }
   if(action.type==="products"){
     return{... state, products: action.products}
   }
    return state; 
  };


  const store = createStore(
   reducer, // reducer
    {products:[]}, // initial state
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  let content = (<Provider store={store}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>)


ReactDOM.render(content, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
