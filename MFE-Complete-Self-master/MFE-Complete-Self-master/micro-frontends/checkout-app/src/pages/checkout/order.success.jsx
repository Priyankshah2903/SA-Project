// // old code used till last
// import { Link } from "react-router-dom";
// // import Logo from "../../components/logo/logo";
// // import { AuthContext } from "../../contexts/auth.context";
// import { AuthContext } from "containerApp/AuthContext";
// import { useContext } from "react";
// import success from "../../assets/images/icons/success.gif"
// import './checkout.css'

// // Lazy load Logo component
// const Logo = React.lazy(() => import("containerApp/Logo"));

// function OrderSuccess() {

//     const { user, toggleUser } = useContext(AuthContext)

//     return (
//         <main className='order-success'>
//             <div className='order-success-box'>
//                 <Logo />
//                 <img src={success} />
//                 <h4 style={{ textAlign: "center", color: "green" }}>
//                     Thank you for your order!<br />
//                     Your order has been successfully placed.
//                 </h4>
//                 <h4 style={{ textAlign: "center", color: "green" }}>Order confirmation email has been sent to {user?.email}.</h4>
//                 <Link to='/'><button>Go home</button></Link>
//             </div>
//         </main>
//     )
// }

// export default OrderSuccess;

import { Link } from "react-router-dom";
// import Logo from "../../components/logo/logo";
// import { AuthContext } from "../../contexts/auth.context";
import { useAuth } from "containerApp/AuthContext"; // Import the hook
import React, { Suspense, useContext } from "react";
import success from "../../assets/images/icons/success.gif"
import './checkout.css'

// Dynamically import Header from the container app (host)
const Logo = React.lazy(() => import("sharedApp/Logo"));

function OrderSuccess() {

    const { user, toggleUser } = useAuth();//useContext(AuthContext)

    return (
        <main className='order-success'>
            <div className='order-success-box'>
                <Logo />
                <img src={success} />
                <h4 style={{ textAlign: "center", color: "green" }}>
                    Thank you for your order!<br />
                    Your order has been successfully placed.
                </h4>
                <h4 style={{ textAlign: "center", color: "green" }}>Order confirmation email has been sent to {user?.email}.</h4>
                <Link to='/'><button>Go home</button></Link>
            </div>
        </main>
    )
}

export default OrderSuccess;