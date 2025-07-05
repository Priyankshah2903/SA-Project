import React, { useContext, lazy, Suspense } from 'react';
// import { useAuth } from "containerApp/AuthContext"; // Only import the hook
// import { useCart } from "containerApp/CartContext"; // Only import the hook
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import Hero from '../components/home_hero/hero';
import Categories from '../components/categories/categories';
// import { AuthProvider } from 'containerApp/AuthContext';
// import { CartProvider } from 'containerApp/CartContext';
import About from '../components/about/about';

const Header = React.lazy(() => import("sharedApp/Header"));
const Footer = React.lazy(() => import("sharedApp/Footer"));

function Home() {
    // console.log("Auth: ",AuthProvider);
    // console.log("Cart: ",CartProvider);
    // const { user } = useAuth();
    // const { cart, addItemToCart, removeItemFromCart, getCartInformation } = useCart();

    return (
        <>
        {/* <AuthProvider> */}
            {/* <CartProvider> */}
                {/* console.log("Home cart: ",CartProvider); */}
            <Suspense fallback={<div>Loading Header...</div>}>
                <Header />
            </Suspense>
            <Hero />
            <Categories />
            <About/>
            <Suspense fallback={<div>Loading Footer...</div>}>
                <Footer />
            </Suspense>
            {/* </CartProvider>
        </AuthProvider> */}
        </>
    );
}

export default Home;