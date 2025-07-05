// import { useContext, useEffect } from "react";
// import Footer from "../../components/footer/footer";
// import Header from "../../components/header/header";
// import { AuthContext } from "../../contexts/auth.context";
// code used till last
// import { AuthContext } from "containerApp/AuthContext";
// import AuthContextHook from "containerApp/AuthService";
// import './my.css'
// // import OrderService from "../../api-service/order.service";
// import OrderService from "containerApp/OrderService";
// // import Loading from "../../components/loading/loading";
// // import Info from "../../components/info/info";
// import React, { useContext, lazy, Suspense, useEffect } from 'react';
// import CartContext from "containerApp/CartContext";
// import CartService from "containerApp/CartService";


// // Dynamically import Header from the container app (host)
// const Header = React.lazy(() => import("containerApp/Header"));
// const Footer = React.lazy(() => import("containerApp/Footer"));
// const Info = React.lazy(() => import("containerApp/Info"));
// const Loading = React.lazy(() => import("containerApp/Loading"));


// function MyAccount() {
//     const { user, toggleUser } = AuthContextHook(); //useContext(AuthContext)
//     const { isLoading, userOrders, getOrdersByUser } = OrderService()
//     const { 
//                 cart, 
//                 cartError, 
//                 isProcessingCart, 
//                 addItemToCart, 
//                 removeItemFromCart, 
//                 getCartInformation 
//             } = CartService();

//     return (
//         <>
//         <AuthContext.Provider value={{user, toggleUser}}>
//             <CartContext.Provider value={{ cart, cartError, isProcessingCart, addItemToCart, removeItemFromCart, getCartInformation }}>
//             <Suspense fallback={<div>Loading Header...</div>}>
//                 <Header />
//             </Suspense>
//             <ProfileCard user={user} />
//             {isLoading && <Loading />}
//             {!isLoading && <OrderList orders={userOrders} />}
//             <Footer />
//             </CartContext.Provider>
//         </AuthContext.Provider>
//         </>
//     )
// }

// export default MyAccount;


// function ProfileCard({ user }) {


//     return (
//         <section className="profile-card">
//             <h3>Welcome back {user?.username}! <span>({user?.email})</span></h3>
//         </section>
//     )
// }

// function OrderList({ orders }) {

//     return (
//         <>
//             {orders.length == 0 && <Info message="You have no orders placed yet!" />}

//             {orders.length != 0 && (
//                 <>
//                     <div className='orders'>
//                         <h2>My orders</h2>

//                         {
//                             orders.map((order) => {
//                                 return (
//                                     <div className='order' key={order.id}>
//                                         <div>
//                                             <div>Order #{order.id}</div>
//                                             <div>Placed on {order.placedOn.split("T")[0]} {order.placedOn.split("T")[1]}</div>
//                                         </div>
//                                         <div className='items'>
//                                             {
//                                                 order.orderItems.map((item) => {
//                                                     return (
//                                                         <div key={item.productId}>
//                                                             <img src={`${item.imageUrl}`} />
//                                                             <div>
//                                                                 <div>{item.productName}</div>
//                                                                 <div>Rs. {item.price} x {item.quantity}</div>
//                                                             </div>
//                                                         </div>
//                                                     )
//                                                 })
//                                             }
//                                         </div>
//                                         <div>
//                                             <div>Total: Rs. {order.orderAmt}</div>
//                                             <div>Order Status: {order.orderStatus}</div>
//                                             <div>Paid Status: {order.paymentStatus}</div>
//                                             <div>Shipped address: {order.addressLine1} {order.addressLine2}</div>
//                                         </div>

//                                     </div>
//                                 )
//                             })
//                         }


//                     </div>
//                 </>
//             )}
//         </>
//     )
// }

import React, { Suspense, useContext, useEffect } from "react";
// import Footer from "../../components/footer/footer";
// import Header from "../../components/header/header";
// import { AuthContext } from "../../contexts/auth.context";
import { useAuth } from "containerApp/AuthContext"; // Import the hook
import './my.css'
// import OrderService from "../../api-service/order.service";
import OrderService from "sharedApp/OrderService";
// import Loading from "../../components/loading/loading";
// import Info from "../../components/info/info";

// Dynamically import Header from the container app (host)
const Header = React.lazy(() => import("sharedApp/Header"));
const Footer = React.lazy(() => import("sharedApp/Footer"));
const Info = React.lazy(() => import("sharedApp/Info"));
const Loading = React.lazy(() => import("sharedApp/Loading"));


function MyAccount() {
    const { user, toggleUser } = useAuth(); //useContext(AuthContext)
    const { isLoading, userOrders, getOrdersByUser } = OrderService()

    return (
        <>
            <Suspense fallback={<div>Loading Header...</div>}>
                <Header />
            </Suspense>
            <ProfileCard user={user} />
            {isLoading && <Loading />}
            {!isLoading && <OrderList orders={userOrders} />}
            <Suspense fallback={<div>Loading Footer...</div>}>
                <Footer />
            </Suspense>
        </>
    )
}

export default MyAccount;


function ProfileCard({ user }) {


    return (
        <section className="profile-card">
            <h3>Welcome back {user?.username}! <span>({user?.email})</span></h3>
        </section>
    )
}

function OrderList({ orders }) {

    return (
        <>
            {orders.length == 0 && <Info message="You have no orders placed yet!" />}

            {orders.length != 0 && (
                <>
                    <div className='orders'>
                        <h2>My orders</h2>

                        {
                            orders.map((order) => {
                                return (
                                    <div className='order' key={order.id}>
                                        <div>
                                            <div>Order #{order.id}</div>
                                            <div>Placed on {order.placedOn.split("T")[0]} {order.placedOn.split("T")[1]}</div>
                                        </div>
                                        <div className='items'>
                                            {
                                                order.orderItems.map((item) => {
                                                    return (
                                                        <div key={item.productId}>
                                                            <img src={`${item.imageUrl}`} />
                                                            <div>
                                                                <div>{item.productName}</div>
                                                                <div>Rs. {item.price} x {item.quantity}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div>
                                            <div>Total: Rs. {order.orderAmt}</div>
                                            <div>Order Status: {order.orderStatus}</div>
                                            <div>Paid Status: {order.paymentStatus}</div>
                                            <div>Shipped address: {order.addressLine1} {order.addressLine2}</div>
                                        </div>

                                    </div>
                                )
                            })
                        }


                    </div>
                </>
            )}
        </>
    )
}