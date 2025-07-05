// code used before ui/ux improvement - start
import { useContext, useState } from 'react';
import React from 'react';
import Logo from "../logo/logo";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css"
import "../header/header.css"
import Cart from "../cart/cart";
import Wishlist from '../wishlist/wishlist';
// import { AuthContext } from "../../context/auth.context"
// import CartContext from "../../context/cart.contect";
// import { useAuth } from "../../context/auth.context"; // Import the hook
// import { useCart } from "../../context/cart.contect"; // Import the hook
import { useAuth } from "containerApp/AuthContext"; // Import the hook
import { useCart } from "containerApp/CartContext"; // Import the hook
// import { useRouter } from '/src/context/routes.context';

function Header() {
    // const { navigate, location } = useRouter();
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCartOpen, setCart] = useState(false);
    // const { cart } = useCart();//useContext(CartContext)
    const { cart, wishlist,getCartInformation } = useCart();
    const { user, toggleUser } = useAuth();//useContext(AuthContext)
    const [searchKey, setSearchKey] = useState("");
    // const { getCartInformation } = useCart(); // Access getCartInformation
    const [isWishlistOpen, setWishlist] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(prev => !prev);
    };

    const toggleCart = () => {
        setCart(prev => !prev);
    };

    const toggleWishlist = () => {
        setWishlist(prev => !prev);
        };

    const onSearch = () => {
        if (searchKey !== "") {
            navigate(`/search/${searchKey}`);
        }
    };

    const onSearchKeyChange = (newKey) => {
        setSearchKey(newKey);
    };

    const logout = () => {
        localStorage.removeItem("user");
        toggleUser();
        console.log("inside logout getCartInformation");
        getCartInformation(); // Call getCartInformation on logout
        navigate("/");
    };

    return (
        <>
            <header className="app-header">
                <div className="logo-wrapper">
                    <span>
                        {isNavOpen ? (
                            <i className="fa fa-times" aria-hidden="true" onClick={toggleNav}></i>
                        ) : (
                            <i className="fa fa-bars" aria-hidden="true" onClick={toggleNav}></i>
                        )}
                    </span>
                    <span>
                        <Link to="/"> <Logo /></Link>
                    </span>
                </div>

                <div className="search">
                    <input
                        type="search"
                        placeholder="Search entire wellness..."
                        value={searchKey}
                        onChange={(e) => onSearchKeyChange(e.target.value)}
                    />
                    <i
                        className="fa fa-search"
                        aria-hidden="true"
                        onClick={onSearch}
                    ></i>
                </div>

                <ul className={isNavOpen ? "nav-open" : "nav-close"}>
                    <li>
                        <Link to="/products" className="nav-link">Products</Link>
                    </li>
                    {!user && (
                        <li>
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    )}
                    {user && (
                        <>
                            <li>
                                {/* <Link to='/my/account' className="nav-link">My Account</Link> */}
                                <Link to='/account' className="nav-link">My Account</Link>
                            </li>
                            <li onClick={logout} className="nav-link">
                                Logout
                            </li>
                        </>
                    )}
                    
                {/* <div className="search">
                    <input
                        type="search"
                        placeholder="Search entire wellness..."
                        value={searchKey}
                        onChange={(e) => onSearchKeyChange(e.target.value)}
                    />
                    <i
                        className="fa fa-search"
                        aria-hidden="true"
                        onClick={onSearch}
                    ></i>
                </div> */}
                </ul>
                <Link onClick={toggleWishlist} className="nav-link">
                {/* Wishlist   */}
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    <span>
                        {/* ({wishlist?.noOfCartItems || wishlist?.cartItems?.length || 0}) */}
                    </span> 
                </Link>

                <div>
                    <Link onClick={toggleCart}>
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span>({cart.noOfCartItems || 0})</span>
                    </Link>
                </div>
            </header>
            {/* <header className="app-header bottom">
                <div className="search">
                    <input
                        type="search"
                        placeholder="Search entire wellness..."
                        value={searchKey}
                        onChange={(e) => onSearchKeyChange(e.target.value)}
                    />
                    <i
                        className="fa fa-search"
                        aria-hidden="true"
                        onClick={onSearch}
                    ></i>
                </div>
            </header> */}
            <Cart isCartOpen={isCartOpen} setIsCartOpen={setCart} onClose={() => setCart(false)} />
            <Wishlist isWishlistOpen={isWishlistOpen} onClose={() => setWishlist(false)} />
        </>
    );
}

export default Header;

// sumit code wishilist

// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import "./header.css";  // Import the updated header styles
// import "../../index.css";  // Global styles
// import Logo from "../logo/logo";
// import Cart from "../cart/cart";
// import { useAuth } from "../../context/auth.context";
// import { useCart } from "../../context/cart.contect";
// import Wishlist from '../wishlist/wishlist';

// function Header() {
//   const navigate = useNavigate();
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [isCartOpen, setCart] = useState(false);
//   const { cart, wishlist,getCartInformation } = useCart();
//   const { user, toggleUser } = useAuth();
//   const [searchKey, setSearchKey] = useState("");
//   const [isWishlistOpen, setWishlist] = useState(false);

//   const toggleNav = () => setIsNavOpen(prev => !prev);
//   const toggleCart = () => setCart(prev => !prev);

//   const toggleWishlist = () => {
//     setWishlist(prev => !prev);
//     };

//   const onSearch = () => {
//     if (searchKey.trim() !== "") {
//       navigate(`/search/${searchKey}`);
//     }
//   };

//     const onSearchKeyChange = (newKey) => {
//         setSearchKey(newKey);
//     };

//   const logout = () => {
//     localStorage.removeItem("user");
//     toggleUser();
//     getCartInformation();
//     navigate("/");
//   };

//   return (
//     <>
//       <header className="app-header">
//         <div className="header-left">
//             <div className="logo-wrapper">
//             {/* Hamburger icon always visible on mobile */}
//             <span className="hamburger-icon">
//                 <i
//                 className={isNavOpen ? "fa fa-times" : "fa fa-bars"}
//                 onClick={toggleNav}
//                 aria-hidden="true"
//                 ></i>
//             </span>
//             {/* Show logo on desktop only */}
//             <span className="logo-desktop">
//                 <Link to="/"><Logo /></Link>
//             </span>
//             </div>
//         </div>
//         <div className="search">
//         <input
//             type="search"
//             placeholder="Search entire wellness..."
//             value={searchKey}
//             onChange={(e) => onSearchKeyChange(e.target.value)}
//         />
//         <i
//             className="fa fa-search"
//             aria-hidden="true"
//             onClick={onSearch}
//         ></i>
//     </div>

//     <ul className={isNavOpen ? "nav-open" : "nav-close"}>
//         <li>
//             <Link to="/products" className="nav-link">Products</Link>
//         </li>
//         {!user && (
//             <li>
//                 <Link to="/login" className="nav-link">Login</Link>
//             </li>
//         )}
//         {user && (
//             <>
//                 <li>
//                     {/* <Link to='/my/account' className="nav-link">My Account</Link> */}
//                     <Link to='/account' className="nav-link">My Account</Link>
//                 </li>
//                 <li>
//                     {/* Logout wrapped in an anchor for proper styling */}
//                 <a onClick={logout} className="nav-link logout" role="button">
//                   Logout
//                 </a>
//                 </li>
//             </>
//         )}
        
//     </ul>
//     <Link onClick={toggleWishlist}>
//     <i className="fa fa-heart" aria-hidden="true"></i>
//     {/* <span>({wishlist?.noOfCartItems || wishlist?.cartItems?.length || 0})</span> */}
// </Link>
//         <div className="header-right">
//             <Link onClick={toggleCart}>
//             <i className="fa fa-shopping-cart" aria-hidden="true"></i>
//             <span>({cart.noOfCartItems || 0})</span>
//             </Link>
//         </div>
//         </header>

//         {isNavOpen && (
//         <div className="mobile-menu">
//             {/* <div className="mobile-menu-content"> */}
//             {/* <div className="mobile-logo">
//                 <Link to="/"><Logo /></Link>
//             </div> */}
//             <div className="mobile-search">
//                 <input
//                 type="search"
//                 placeholder="Search entire wellness..."
//                 value={searchKey}
//                 onChange={(e) => setSearchKey(e.target.value)}
//                 />
//                 <i className="fa fa-search" onClick={onSearch} aria-hidden="true"></i>
//             </div>
//             <ul className="mobile-nav">
//                 <li>
//                 <Link to="/products" className="nav-link">Products</Link>
//                 </li>
//                 {!user && (
//                 <li>
//                     <Link to="/login" className="nav-link">Login</Link>
//                 </li>
//                 )}
//                 {user && (
//                 <>
//                     <li>
//                     <Link to="/account" className="nav-link">My Account</Link>
//                     </li>
//                     <li>
//                     <a onClick={logout} className="nav-link logout" role="button">
//                         Logout
//                     </a>
//                     </li>
//                 </>
//                 )}
//             </ul>
//             {/* </div> */}
//         </div>
//         )}

//         <Cart
//         isCartOpen={isCartOpen}
//         setIsCartOpen={setCart}
//         onClose={() => setCart(false)}
//         />
//         <Wishlist isWishlistOpen={isWishlistOpen} onClose={() => setWishlist(false)} />
//     </>
//   );
// }

// export default Header;