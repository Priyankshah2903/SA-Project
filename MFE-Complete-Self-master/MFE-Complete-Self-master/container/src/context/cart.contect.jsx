// import { createContext } from "react";

// const CartContext = createContext();

// // export default CartContext;
// export default CartContext;

// code to not export in default manner
// import { createContext } from "react";

// export const CartContext = createContext();

// new code
// src/components/context/cart.context.jsx
// import React, { createContext, useState, useCallback, useContext } from 'react';

// // const CartContext = createContext({
// //     cart: [],
// //     cartError: null,
// //     isProcessingCart: false,
// //     addItemToCart: () => {},
// //     removeItemFromCart: () => {},
// //     getCartInformation: () => {}
// // });
// const CartContext = createContext();
// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);
//     const [cartError, setCartError] = useState(null);
//     const [isProcessingCart, setIsProcessingCart] = useState(false);

//     const addItemToCart = useCallback((item) => { /* Your add item logic */ }, []);
//     const removeItemFromCart = useCallback((itemId) => { /* Your remove item logic */ }, []);
//     const getCartInformation = useCallback(() => { /* Your get cart info logic */ }, []);

//     return (
//         <CartContext.Provider value={{ cart, cartError, isProcessingCart, addItemToCart, removeItemFromCart, getCartInformation }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);

// cart.contect.jsx
import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import CartService from '../api-service/cart.service'; // Adjust the import path
// import CartService from 'sharedApp/CartService'; // Adjust the import path

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const {
        cart,
        wishlist,
        cartError,
        isProcessingCart,
        addItemToCart,
        removeItemFromCart,
        getCartInformation,
        getWishlistInformation,
        removeWishlistItemFromCart
    } = CartService();

    // Fetch cart data on component mount
    // useEffect(() => {
    //     console.log("useEffect cart.context getCartInformation")
    //     getCartInformation();

    // }, [getCartInformation]);

    return (
        <CartContext.Provider value={{ cart,wishlist, cartError, isProcessingCart, addItemToCart, removeItemFromCart, getCartInformation, getWishlistInformation,removeWishlistItemFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);