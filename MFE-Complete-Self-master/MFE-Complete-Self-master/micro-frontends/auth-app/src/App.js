import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './pages/auth/login/login';
import { BrowserRouter } from 'react-router-dom';
// import { useAuth } from "containerApp/AuthContext";
// import { AuthContext } from "containerApp/AuthContext";
// import CartContext from "containerApp/CartContext";
// import CartService from "containerApp/CartService";
function App() {
  // const {user, toggleUser} = useAuth();
  //       const { 
  //           cart, 
  //           cartError, 
  //           isProcessingCart, 
  //           addItemToCart, 
  //           removeItemFromCart, 
  //           getCartInformation 
  //       } = CartService();
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //       <h3>Auth-App</h3>
    //     </a>
    //   </header>
    // </div>
    // <BrowserRouter>
    
      <Login/>
      
    // </BrowserRouter>
  );
}

export default App;
