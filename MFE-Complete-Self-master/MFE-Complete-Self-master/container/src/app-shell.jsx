//app-shell.js
// import React from 'react';

// const App = () => {
//   return (
//     <main className="main-content">
//       HELLO WORLD! (inside app-shell)
//     </main>
//   );
// };

// export default App;


// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import Header from '../src/components/header/header';
// // import Footer from './components/footer/Footer';
// // import Loading from './components/loading/Loading';
// import { AuthContext } from "/src/context/auth.context" //"../contexts/auth.context";
// import CartContext from "/src/context/cart.contect";

// // Lazy-loaded micro-frontends
// const Home = lazy(() => import('home_app/Home'));
// // const Auth = lazy(() => import('auth_app/Auth'));
// // const Account = lazy(() => import('account_app/Account'));

// const App = () => {
//   // return (
//   //   <BrowserRouter>
//   //     <Toaster position="top-center" />
//   //     <Header />
//   //     <main className="main-content">
//   //       HELLO WORLD! (inside app-shell test-app)
//   //       <Suspense fallback={<div>Loading Home...</div>}>
//   //         {/* <Suspense fallback={<Loading />}> */}
//   //         <ErrorBoundary fallback={<div>Home App is unavailable.</div>}>
//   //         <Routes>
//   //           <Route path="/" element={<Home />} />
//   //           {/* <Route path="/auth/*" element={<Auth />} />
//   //             <Route path="/account/*" element={<Account />} /> */}
//   //         </Routes>
//   //         </ErrorBoundary>
//   //       </Suspense>
//   //     </main>
//   //     <Footer />
//   //   </BrowserRouter>
//   // );
//   return (
//     <BrowserRouter>
//       <AuthContext.Provider value={{user, toggleUser}}>
//         <CartContext.Provider value={{ cart, cartError, isProcessingCart, addItemToCart, removeItemFromCart, getCartInformation }}>
//         <Toaster position="top-center" />
//   //     <Header />
//   //     <main className="main-content">
//   //       HELLO WORLD! (inside app-shell test-app)
//   //       <Suspense fallback={<div>Loading Home...</div>}>
//   //         {/* <Suspense fallback={<Loading />}> */}
//   //         <ErrorBoundary fallback={<div>Home App is unavailable.</div>}>
//   //         <Routes>
//   //           <Route path="/" element={<Home />} />
//   //           {/* <Route path="/auth/*" element={<Auth />} />
//   //             <Route path="/account/*" element={<Account />} /> */}
//   //         </Routes>
//   //         </ErrorBoundary>
//   //       </Suspense>
//   //     </main>
//   //     <Footer />
//         </CartContext.Provider>
//       </AuthContext.Provider>
//     </BrowserRouter>
//   )
// };

// src/components/app-shell/app-shell.jsx

// // src/components/app-shell/app-shell.jsx
// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// // import Header from '../header/header.jsx';
// // import Footer from '../footer/footer.jsx';
// import AppRoutes from '../src/routes/routes.jsx';
// // import { AuthProvider, useAuth } from '../src/context/auth.context.jsx';
// // import { CartProvider } from '../src/context/cart.contect.jsx';
// import CartService from '../src/api-service/cart.service.jsx';
// import Loading from '../src/components/loading/loading.jsx';
// // import React from 'react';
// // import { BrowserRouter } from 'react-router-dom';
// // import AppRoutes from '../../routes/routes';
// // import '../../assets/styles/index.css';
// import { AuthContext, useAuth } from '../src/context/auth.context.jsx';
// // import CartService from '../../api-service/cart.service';
// import CartContext from '../src/context/cart.contect.jsx';
// import Header from '../src/components/header/header.jsx';
// // import Footer from '../footer/footer.jsx';
// import { Link, useAsyncError, useNavigate } from "react-router-dom";

// const AppShell = () => {
//   // Keep the exact same context setup as your monolithic app
//   const {user, toggleUser} = useAuth();
//   const { 
//     cart, 
//     cartError, 
//     isProcessingCart, 
//     addItemToCart, 
//     removeItemFromCart, 
//     getCartInformation 
//   } = CartService();

//   return (
//     <BrowserRouter>
//       <AuthContext.Provider value={{user, toggleUser}}>
//         <CartContext.Provider value={{ 
//           cart, 
//           cartError, 
//           isProcessingCart, 
//           addItemToCart, 
//           removeItemFromCart, 
//           getCartInformation 
//         }}>
//           <div className="app-container" style={{ display: 'flex', flexDirection: 'column' }}>
//             HELLO WORLD! Container-app (app-shell)
//             {/* <Header /> */}
//             <Link to="products" className="nav-link">Products</Link>
//             <div className="app-container-routes">
//             <main className="content">
//               <AppRoutes />
//             </main>
//             </div>
//             {/* <Footer /> */}
//           </div>
//         </CartContext.Provider>
//       </AuthContext.Provider>
//     </BrowserRouter>
//   );
// };

// export default AppShell;

// last used code
// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// // import Header from '../header/header.jsx';
// // import Footer from '../footer/footer.jsx';
// import AppRoutes from '../src/routes/routes.jsx';
// // import { AuthProvider, useAuth } from '../src/context/auth.context.jsx';
// // import { CartProvider } from '../src/context/cart.contect.jsx';
// import CartService from '../src/api-service/cart.service.jsx';
// import Loading from '../src/components/loading/loading.jsx';
// // import React from 'react';
// // import { BrowserRouter } from 'react-router-dom';
// // import AppRoutes from '../../routes/routes';
// // import '../../assets/styles/index.css';
// import { AuthContext, useAuth } from '../src/context/auth.context.jsx';
// // import CartService from '../../api-service/cart.service';
// import CartContext from '../src/context/cart.contect.jsx';
// import Header from '../src/components/header/header.jsx';
// // import Footer from '../footer/footer.jsx';
// import { Link, useAsyncError, useNavigate } from "react-router-dom";
// import { RouterProvider } from '/src/context/routes.context';

// const AppShell = () => {
//   const {user, toggleUser} = useAuth();
//         const { 
//             cart, 
//             cartError, 
//             isProcessingCart, 
//             addItemToCart, 
//             removeItemFromCart, 
//             getCartInformation 
//         } = CartService();
//         // const { navigate, location } = useRouter();
//   // Keep the exact same context setup as your monolithic app
//   // const {user, toggleUser} = useAuth();
//   // const { 
//   //   cart, 
//   //   cartError, 
//   //   isProcessingCart, 
//   //   addItemToCart, 
//   //   removeItemFromCart, 
//   //   getCartInformation 
//   // } = CartService();

// //   return (
// //     <BrowserRouter>
// //       {/* <AuthContext.Provider value={{user, toggleUser}}>
// //         <CartContext.Provider value={{ 
// //           cart, 
// //           cartError, 
// //           isProcessingCart, 
// //           addItemToCart, 
// //           removeItemFromCart, 
// //           getCartInformation 
// //         }}> */}
// //           <div className="app-container" style={{ display: 'flex', flexDirection: 'column' }}>
// //             HELLO WORLD! Container-app (app-shell)
// //             {/* <Header /> */}
// //             <Link to="products" className="nav-link">Products</Link>
// //             <div className="app-container-routes">
// //             <main className="content">
// //               <AppRoutes />
// //             </main>
// //             </div>
// //             {/* <Footer /> */}
// //           </div>
// //         {/* </CartContext.Provider>
// //       </AuthContext.Provider> */}
// //     </BrowserRouter>
// //   );
// // };

// // return (
// //   <BrowserRouter>
// //     {/* <AuthContext.Provider value={{user, toggleUser}}>
// //       <CartContext.Provider value={{ 
// //         cart, 
// //         cartError, 
// //         isProcessingCart, 
// //         addItemToCart, 
// //         removeItemFromCart, 
// //         getCartInformation 
// //       }}> */}
// //         {/* <div className="app-container" style={{ display: 'flex', flexDirection: 'column' }}> */}
// //           {/* <Header /> */}
// //           {/* <Link to="products" className="nav-link">Products</Link>
// //           <div className="app-container-routes">
// //           <main className="content"> */}
// //             <AppRoutes />
// //           {/* </main> */}
// //           {/* </div> */}
// //           {/* <Footer /> */}
// //         {/* </div> */}
// //       {/* </CartContext.Provider>
// //     </AuthContext.Provider> */}
// //   </BrowserRouter>
// // );

// return (
//   <BrowserRouter>
//     {/* <RouterProvider> */}
//       <AppRoutes />  
//     {/* </RouterProvider> */}
//   </BrowserRouter>
// );
// // return (
// //     <BrowserRouter>
// //         <AuthContext.Provider value={{ user, toggleUser }}>
// //           <CartContext.Provider value={{ cart, cartError, isProcessingCart, addItemToCart, removeItemFromCart, getCartInformation }}>
// //             <RouterProvider>
// //               <AppRoutes />  
// //             </RouterProvider>
// //           </CartContext.Provider>
// //         </AuthContext.Provider>
// //     </BrowserRouter>
// //   );
// };

// export default AppShell;

// app-shell.jsx (in container-app)
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes.jsx';
import { AuthProvider } from './context/auth.context.jsx';
import { CartProvider } from './context/cart.contect.jsx';
// import { CartProvider } from 'sharedApp/CartContext';
import GenericErrorFallback from './components/genericErrorFallBack/genericErrorFallBack'; // Assuming you have this

const AppShell = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ErrorBoundary fallback={<GenericErrorFallback message="An error occurred while loading a part of the application." />}>
            <AppRoutes />
          </ErrorBoundary>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default AppShell;

// export default App;