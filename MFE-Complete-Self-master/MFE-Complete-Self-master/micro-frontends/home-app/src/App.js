import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './pages/home';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       {/* Edit <code>src/App.js</code> and save to reload. */}
    //       Hello World! HOME-APP
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //       <h2>HOME-APP</h2>
    //     </a>
    //   </header>
    // </div>
    // <BrowserRouter>
    <>
    <Home />
    </>
    // {/* </BrowserRouter> */}
  );
}

export default App;
