import React, { useContext } from 'react';
import '../cart/cart.css'; // You can reuse cart.css for now
// import CartContext from '../../context/cart.contect';
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loading from '../loading/loading';
import Info from '../info/info';
// import { useCart } from "../../context/cart.contect"; // Import the hook
import { useCart } from "containerApp/CartContext"; // Import the hook

function Wishlist({ isWishlistOpen, onClose }) {
    const { wishlist, isProcessingCart, removeItemFromCart, addItemToCart, removeWishlistItemFromCart  } = useCart();//useContext(CartContext);

    console.log('removeWishlistItemFromCart', removeWishlistItemFromCart);

    const onWishlistProductRemove = (id) => {
        removeWishlistItemFromCart(id); // backend should handle this using the wishlist flag
    };

    return (
        <>
            <div className={isWishlistOpen ? "shoppingCart active" : "shoppingCart"}>
                <div className="header">
                    <h2>Your Wishlist</h2>
                    <div className="btn close-btn" onClick={onClose}>
                        <AiOutlineClose size={20} />
                    </div>
                </div>

                {!isProcessingCart && (!wishlist?.cartItems || wishlist.cartItems.length === 0) && (
    <Info message="No items in your wishlist!" />
)}

{!isProcessingCart && wishlist?.cartItems && (
    <div className="cart-products">
        {wishlist.cartItems.map((item) => (
            <div className="cart-product" key={item.productId}>
                <img src={`${item.imageUrl}`} alt={item.productName} />
                <div className="product-info">
                    <h4>
                        {item.productName}
                        <div className="btn close-btn" onClick={() => onWishlistProductRemove(item.productId)}>
                            <RiDeleteBin6Line size={20} />
                        </div>
                    </h4>
                    <span className="product-price">Price: Rs. {parseFloat(item.price).toFixed(2)}</span>
                    <button className="btn" onClick={() => addItemToCart(item.productId, 1, false)}>Add to Cart</button>
                </div>
            </div>
        ))}
    </div>
)}
            </div>
        </>
    );
}

export default Wishlist;
