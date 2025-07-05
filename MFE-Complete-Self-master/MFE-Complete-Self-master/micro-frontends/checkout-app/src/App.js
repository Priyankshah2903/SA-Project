import logo from './logo.svg';
import './App.css';
import React from 'react';
import CheckoutForm from './pages/checkout/checkout';
import { BrowserRouter } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

function App() {
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
    //     </a>
    //     <h3>Checkout-App</h3>
    //   </header>
    // </div>
    // <BrowserRouter>
    <CheckoutForm/>
    // </BrowserRouter>
  );
}

export default App;
