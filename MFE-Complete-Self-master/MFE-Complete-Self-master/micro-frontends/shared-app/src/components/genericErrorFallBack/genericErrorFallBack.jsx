// // components/GenericErrorFallback.jsx
// import React from 'react';

// const GenericErrorFallback = ({ message }) => {
//   return (
//     <div>
//       <h1>Oops!</h1>
//       <p>{message}</p>
//       {/* You can add more informative UI here, like a retry button */}
//     </div>
//   );
// };

// export default GenericErrorFallback;

// import { Link } from "react-router-dom";
// import Logo from "../logo/logo";
// import React, { Suspense } from 'react';

// function GenericErrorFallback({ message }) {
//   // Use the provided message prop, or a default if none is passed
//   const displayMessage = message || "Sorry! the page your are looking for was either not found or does not exist.";

//   return (
//     <main className='auth-container'>
//       <div className='auth-wrapper' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px', gap: '20px', height: '100vh'}}>
//           <Logo />
//         <h1>404 - Not Found!</h1>
//         <h3 style={{ textAlign: 'center' }}>{displayMessage} Try refreshing the page or click the button below to go back to the home page.</h3>

//         <Link to="/"><button>Go to home</button></Link>
//       </div>
//     </main>
//   );
// }

// export default GenericErrorFallback;

import { Link } from "react-router-dom";
import Logo from "../logo/logo";
import React from 'react';
import { FaExclamationTriangle } from "react-icons/fa"; // Font Awesome icon
import './genericErrorFallBack.css'

function GenericErrorFallback({ message }) {
  const displayMessage = message || "Sorry! The page you are looking for was either not found or does not exist.";

  return (
    <main className='container' role="alert" aria-live="assertive">
      <div className='wrapper'>
        <Logo />
        <FaExclamationTriangle size={60} color="#ff4d4f" className='icon' />
        <h1 className='title'>404 - Not Found</h1>
        <p className='message'>{displayMessage}</p>
        <p className='default-refresh'>Try refreshing the page or click the button below to go back to the home page.</p>
        <Link to="/" >
          <button >Go to Home</button>
        </Link>
      </div>
    </main>
  );
}

// const styles = {
//   container: {
//     height: '100vh',
//     backgroundColor: '#f8f9fa',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     padding: '20px',
//   },
//   wrapper: {
//     maxWidth: '500px',
//     width: '100%',
//     backgroundColor: '#ffffff',
//     borderRadius: '12px',
//     boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//     padding: '40px 30px',
//     textAlign: 'center',
//   },
//   icon: {
//     marginBottom: '20px',
//   },
//   title: {
//     fontSize: '2rem',
//     marginBottom: '15px',
//     color: '#333',
//   },
//   message: {
//     fontSize: '1rem',
//     color: '#666',
//     marginBottom: '30px',
//     lineHeight: '1.6',
//   },
//   link: {
//     textDecoration: 'none',
//   },
//   // button: {
//   //   backgroundColor: '#007bff',
//   //   color: '#fff',
//   //   border: 'none',
//   //   padding: '12px 24px',
//   //   borderRadius: '8px',
//   //   fontSize: '1rem',
//   //   cursor: 'pointer',
//   //   transition: 'background-color 0.3s ease',
//   // }
// };

// import { Link } from "react-router-dom";
// import Logo from "../logo/logo";
// import React from 'react';
// import './genericErrorFallBack.css'
// import { FaExclamationTriangle } from "react-icons/fa"; // Optional: icon for visual cue

// function GenericErrorFallback({ message }) {
//   const displayMessage = message || "Sorry! The page you are looking for was either not found or does not exist.";

//   return (
//     <main className="auth-container" role="alert" aria-live="assertive">
//       <div className="auth-wrapper fallback-wrapper">
//         <Logo />
//         <FaExclamationTriangle size={50} className="error-icon" />
//         <h1>404 - Not Found</h1>
//         <p>{displayMessage}</p>
//         <p>Try refreshing the page or click the button below to go back to the home page.</p>
//         <Link to="/">
//           <button>Go to home</button>
//         </Link>
//       </div>
//     </main>
//   );
// }

export default GenericErrorFallback;

// import { Link } from "react-router-dom";
// import Logo from "../logo/logo";
// import React from 'react';
// import './genericErrorFallBack.css';
// import { FaExclamationTriangle } from "react-icons/fa";

// function GenericErrorFallback({ message }) {
//   const displayMessage = message || "An error occurred while loading a part of the application.";

//   return (
//     <main className="auth-container" role="alert" aria-live="assertive">
//       <div className="fallback-card">
//         <Logo />
//         <FaExclamationTriangle size={40} className="error-icon" />
//         <h1 className="error-title">404 - Not Found</h1>
//         <p className="error-message">{displayMessage}</p>
//         <p className="error-subtext">Try refreshing the page or click the button below to go back to the home page.</p>
//         <Link to="/">
//           <button className="home-button">🏠 Go to Home</button>
//         </Link>
//       </div>
//     </main>
//   );
// }

// export default GenericErrorFallback;

