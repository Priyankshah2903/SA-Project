import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import './cart.css'
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loading from '../loading/loading';
import Info from '../info/info';   //'../info/info';
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/auth.context"; // Import the hook
// import { useCart } from "../../context/cart.contect"; // Import the hook
import { useAuth } from "containerApp/AuthContext"; // Import the hook
import { useCart } from "containerApp/CartContext"; // Import the hook

function Cart({ isCartOpen, onClose }) {

    const { cart,wishlist, cartError, isProcessingCart, addItemToCart, removeItemFromCart, getCartInformation, getWishlistInformation,removeWishlistItemFromCart } = useCart();//useContext(CartContext)
    const {user, toggleUser} = useAuth();//useContext(AuthContext);
    const navigate = useNavigate();
    const isFetchingRef = useRef(false);
    const debounceTimer = useRef(null);

    const stableGetCartInformation = useCallback(getCartInformation, [getCartInformation]);
    // const [cartLoading, setCartLoading] = useState(true); // Add loading flag // to stop rerendering

    // new added to stop rerendering
    // useEffect(() => {
    //     const fetchCart = async () => {
    //       setCartLoading(true);
    //       await getCartInformation();
    //       setCartLoading(false);
    //     };
    //     fetchCart();
    //   }, [getCartInformation]);

    // initial function used till issue of cart update was  there
    // useEffect(() => {
    //     console.log("inside useEffect cart.jsx getCartInformation");
    //     getCartInformation()
    //     console.log('User changed:', user);
    // }, [user])

    // to solve cart update issue
    useEffect(() => {
        const fetchCart = () => {
            if (isFetchingRef.current) {
                return;
            }
            isFetchingRef.current = true;
            console.log("inside useEffect cart.jsx getCartInformation");
            getCartInformation();
            isFetchingRef.current = false;
        };

        if (user === null) {
            clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(fetchCart, 100);
        } else {
            fetchCart();
        }

        console.log("User changed:", user);

        return () => clearTimeout(debounceTimer.current);
    }, [user]); // Removed getCartInformation from the dependency array.


    const onProductRemove = (id) => {
        removeItemFromCart(id)
    }
    const onQuantityChange = (id, qty) => {
        addItemToCart(id, qty)
    }
    const onCheckout = () => {
        // navigate(`/order/checkout`)
        navigate(`/checkout`)
        console.log("checkout button pressed")
    }

    useEffect(() => {

    }, [])
    return (
        <>
            <div className={isCartOpen ? "shoppingCart active" : "shoppingCart"}>
                <div className="header">
                    <h2>Cart</h2>
                    <div className="btn close-btn" onClick={onClose}>
                        <AiOutlineClose size={20} />
                    </div>
                </div>
                {isProcessingCart && <Loading />}
                {isProcessingCart && <Loading />}
                {!isProcessingCart && !cart.cartItems && <Info message="No items in your cart!" />}
                {
                    !isProcessingCart && (
                        <>
                            <div className="cart-products">
                                {cart.cartItems && cart?.cartItems.map((cartItem) => (
                                    <div className="cart-product" key={cartItem.productId}>
                                        <img src={`${cartItem.imageUrl}`} alt={cartItem.productName} />
                                        <div className="product-info">
                                            <h4>
                                                {cartItem.productName}
                                                <div
                                                    className={cartItem.quantity === 20 ? "btn close-btn disable" : "btn close-btn"}
                                                    onClick={() => onProductRemove(cartItem.productId)}
                                                >
                                                    <RiDeleteBin6Line size={20} />
                                                </div>

                                            </h4>
                                            <span className="product-price">
                                                {cartItem.price} x {cartItem.quantity} = Rs.  {parseFloat(cartItem.amount).toFixed(2)}
                                            </span>
                                            <div className="quantity-control">
                                                <span
                                                    className={cartItem.quantity === 1 ? "disable" : ""}
                                                    onClick={() => onQuantityChange(cartItem.productId, -1)}
                                                >
                                                    <AiOutlineMinus size={18} />
                                                </span>
                                                <span className="count">{cartItem.quantity}</span>
                                                <span
                                                    className={cartItem.quantity === 20 ? "disable" : ""}
                                                    onClick={() => onQuantityChange(cartItem.productId, 1)}
                                                >
                                                    <AiOutlinePlus size={18} />
                                                </span>
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                            
                                {cart.cartItems && (
                                    <div className="cart-summary">
                                        <h3>Subtotal: Rs. {parseFloat(cart.subtotal).toFixed(2)}</h3>
                                        <button className="btn checkout-btn" onClick={onCheckout}>Proceed to checkout</button>
                                        </div>
                                )}
                            
                        </>
                    )
                }
            </div>

        </>
    )
}

export default Cart;