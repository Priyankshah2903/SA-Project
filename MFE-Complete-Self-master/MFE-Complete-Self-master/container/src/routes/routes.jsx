// src/components/routes/routes.jsx
// import React, { lazy, Suspense } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/auth.context.jsx';
// import Loading from '../components/loading/loading.jsx';

// // Lazy-load micro frontends
// const Home = lazy(() => import('home_app/Home'));
// const Products = lazy(() => import('products_app/Products'));
// // const ProductCategory = lazy(() => import('product_app/ProductCategory'));
// // const MyAccount = lazy(() => import('account_app/MyAccount'));
// // const Auth = lazy(() => import('auth_app/Auth'));
// const Cart = lazy(() => import('../components/cart/cart.jsx')); // From container app
// // const Checkout = lazy(() => import('../checkout/Checkout')); // From container app

// // Protected route component
// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
  
//   if (!user) {
//     return <Navigate to="/auth/login" replace />;
//   }
  
//   return children;
// };

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={
//         <Suspense fallback={<Loading />}>
//           <Home />
//         </Suspense>
//       } />
//       <Route path="/products/*" element={
//         <Suspense fallback={<Loading />}>
//           <Products />
//         </Suspense>
//       } />
//       {/* <Route path="/auth/*" element={
//         <Suspense fallback={<Loading />}>
//           <Auth />
//         </Suspense>
//       } /> */}
//       <Route path="/cart" element={
//         <Suspense fallback={<Loading />}>
//           <Cart />
//         </Suspense>
//       } />
//       {/* <Route path="/checkout" element={
//         <Suspense fallback={<Loading />}>
//           <ProtectedRoute>
//             <Checkout />
//           </ProtectedRoute>
//         </Suspense>
//       } /> */}
//       {/* <Route path="/my-account/*" element={
//         <Suspense fallback={<Loading />}>
//           <ProtectedRoute>
//             <MyAccount />
//           </ProtectedRoute>
//         </Suspense>
//       } /> */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default AppRoutes;



//main final routes.jsx
// src/components/routes/routes.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth.context.jsx';
import Loading from '../components/loading/loading.jsx';
// import Cart from '../components/cart/cart.jsx';

// Micro‑frontends (remotes)
const Home                     = lazy(() => import('home_app/Home'));
const Products                 = lazy(() => import('products_app/Products'));
const Search                   = lazy(() => import('search_app/Search'));
const CheckoutForm             = lazy(() => import('checkout_app/Checkout'));
const OrderSuccess             = lazy(() => import('checkout_app/OrderSuccess'));
const MyAccount                = lazy(() => import('myaccount_app/Myaccount'));
const Login                    = lazy(() => import('auth_app/Login'));
const Register                 = lazy(() => import('auth_app/Register'));
const RegistrationVerification = lazy(() => import('auth_app/RegistrationVerification'));
const RegistrationSuccessful   = lazy(() => import('auth_app/RegistrationSuccessful'));
const Unauthorized             = lazy(() => import('auth_app/Unauthorized'));
const NotFound                 = lazy(() => import('auth_app/NotFound'));
// const Cart                 = lazy(() => import('sharedApp/Cart'));

// Guest‑only: redirect to “/” if already logged in
const GuestRoute = () => {
  const { user } = useAuth();
  console.log('Guest User:', user);
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
};

// Auth‑only: redirect to login if not, or to /unauthorized if missing roles
const ProtectedRoute = ({ roles = [] }) => {
  const { user } = useAuth();
  console.log('User:', user);
  //not there
  if (user) {
    console.log('ProtectedRoute - User Roles:', user.roles);
  }
  //till here
  if (!user) {
    console.log('ProtectedRoute - Redirecting to /login');
    // return <Navigate to="/auth/login" replace />;
    return <Navigate to="/login" replace />
  }
  if (roles.length > 0 && !roles.some(r => user.roles.includes(r))) {
    console.log('ProtectedRoute - Redirecting to /unauthorized due to roles');
    return <Navigate to="/unauthorized" replace />;
  }
  console.log('ProtectedRoute - Access granted');
  return <Outlet />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/products/*"
        // path="/products/:category"
        element={
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        }
      />
      <Route
        //path="/products/*"
        path="/products/:category"
        element={
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        }
      />
      <Route
        path="/search/:search"
        element={
          <Suspense fallback={<Loading />}>
            <Search />
          </Suspense>
        }
      />
      {/* <Route
        path="/cart"
        element={
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        }
      /> */}
      <Route
        path="/unauthorized"
        element={
          <Suspense fallback={<Loading />}>
            <Unauthorized />
          </Suspense>
        }
      />

      {/* Guest‑only (no token) */}
      <Route element={<GuestRoute />}>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/userRegistrationVerfication/:email"
          element={
            <Suspense fallback={<Loading />}>
              <RegistrationVerification />
            </Suspense>
          }
        />
        <Route
          path="/success-registration"
          element={
            <Suspense fallback={<Loading />}>
              <RegistrationSuccessful />
            </Suspense>
          }
        />
      </Route>

      {/* Authenticated only (ROLE_USER) */}
      <Route element={<ProtectedRoute roles={['ROLE_USER']} />}>
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loading />}>
              <CheckoutForm />
            </Suspense>
          }
        />
        <Route
          path="/success"
          element={
            <Suspense fallback={<Loading />}>
              <OrderSuccess />
            </Suspense>
          }
        />
        <Route
          path="/account"
          element={
            <Suspense fallback={<Loading />}>
              <MyAccount />
            </Suspense>
          }
        />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}