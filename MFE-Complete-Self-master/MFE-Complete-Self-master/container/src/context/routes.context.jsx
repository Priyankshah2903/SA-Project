// RouterContext.js
import React, { createContext, useContext, useNavigate, useLocation } from 'react';
// routes.context.jsx (in container-app)
// import React, { createContext, useContext, useNavigate, useLocation } from 'react';

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const value = {
    navigate,
    location,
  };

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const useRouter = () => useContext(RouterContext);