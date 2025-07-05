import logo from './logo.svg';
import './App.css';
import React from 'react';
import Products from './pages/products/products';

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
    //       <h3>Products-App</h3>
    //     </a>
    //   </header>
    // </div>
    <Products/>
  );
}

export default App;
