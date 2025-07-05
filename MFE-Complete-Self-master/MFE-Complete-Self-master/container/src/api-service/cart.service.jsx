// import { useEffect, useState } from "react"
// import API_BASE_URL from "./apiConfig";
// import axios from 'axios';

// function CartService() {
//     const [cart, setCart] = useState({})
//     const [cartError, setError] = useState(false);
//     const [isProcessingCart, setProcessing] = useState(false);
//     const user = JSON.parse(localStorage.getItem("user"));

//     const authHeader = () => {
//         return { Authorization: `${user?.type}${user?.token}` };
//     }

//     const addItemToCart = async (productId, quantity) => {
//         setProcessing(true)
//         await axios.post(
//             `${API_BASE_URL}/cart-service/cart/add`,
//             { productId, quantity },
//             { headers: authHeader() }
//         )
//             .then((response) => {
//                 setError(false)
//             })
//             .catch((error) => {
//                 setError(true)
//             })
//         setProcessing(false)
//         getCartInformation()
//     }

//     const updateItemQuantity = async (productId, quantity) => {
//         setProcessing(true)
//         await axios.post(
//             `${API_BASE_URL}/cart-service/cart/add`,
//             { productId, quantity },
//             { headers: authHeader() }
//         )
//             .then((response) => {
//                 setError(false)
//             })
//             .catch((error) => {
//                 setError(true)
//             })
//         setProcessing(false)
//         getCartInformation()
//     }

//     const removeItemFromCart = async (productId) => {
//         setProcessing(true)
//         await axios.delete(`${API_BASE_URL}/cart-service/cart/remove`, {
//             headers: authHeader(),
//             params: {
//                 productId: productId
//             }
//         })
//             .then((response) => {
//                 setError(false)
//             })
//             .catch((error) => {
//                 setError(true)
//             })
//         getCartInformation()
//     }

//     const getCartInformation = async () => {
//         if (!user?.token) {
//             setCart({})
//             setError(false)
//             return
//         }
//         setProcessing(true)
//         await axios.get(`${API_BASE_URL}/cart-service/cart/get/byUser`, {
//             headers: authHeader()
//         })
//             .then((response) => {
//                 setError(false)
//                 setCart(response.data.response)
//             })
//             .catch((error) => {
//                 setCart({cartItems:[]})
//                 setError(true)
//             })
//         setProcessing(false)
//     }

//     useEffect(() => {
//         getCartInformation()
//     }, [])

//     return { cart, cartError, isProcessingCart, addItemToCart, updateItemQuantity, removeItemFromCart, getCartInformation };

// }

// export default CartService;

// monolithic code -- used till last update
// import { useEffect, useState } from "react"
// import API_BASE_URL from "./apiConfig";
// import axios from 'axios';

// function CartService() {
//     const [cart, setCart] = useState({})
//     const [cartError, setError] = useState(false);
//     const [isProcessingCart, setProcessing] = useState(false);
//     const user = JSON.parse(localStorage.getItem("user"));

//     const authHeader = () => {
//         return { Authorization: `${user?.type}${user?.token}` };
//     }

//     const addItemToCart = async (productId, quantity) => {
//         setProcessing(true)
//         await axios.post(
//             `${API_BASE_URL}/cart-service/cart/add`,
//             { productId, quantity },
//             { headers: authHeader() }
//         )
//             .then((response) => {
//                 setError(false)
//             })
//             .catch((error) => {
//                 setError(true)
//             })
//         setProcessing(false)
//         console.log("addItem getCartInformation")
//         getCartInformation()
//     }

//     const updateItemQuantity = async (productId, quantity) => {
//         setProcessing(true)
//         await axios.post(
//             `${API_BASE_URL}/cart-service/cart/add`,
//             { productId, quantity },
//             { headers: authHeader() }
//         )
//             .then((response) => {
//                 setError(false)
//             })
//             .catch((error) => {
//                 setError(true)
//             })
//         setProcessing(false)
//         console.log("updateItemQuality getCartInformation")
//         getCartInformation()
//     }

//     const removeItemFromCart = async (productId) => {
//         setProcessing(true)
//         await axios.delete(`${API_BASE_URL}/cart-service/cart/remove`, {
//             headers: authHeader(),
//             params: {
//                 productId: productId
//             }
//         })
//             .then((response) => {
//                 setError(false)
//             })
//             .catch((error) => {
//                 setError(true)
//             })
//         console.log("removeItemFromCart getCartInformation")
//         getCartInformation()
//         // console.log("removeItemFromCart getCartInformation")
//     }

//     const getCartInformation = async () => {
//         console.log("inside getCartInformation")
//         if (!user || !user.token) {  //if (!user.token)
//             setCart({})
//             setError(false)
//             return
//         }
//         setProcessing(true)
//         await axios.get(`${API_BASE_URL}/cart-service/cart/get/byUser`, {
//             headers: authHeader()
//         })
//             .then((response) => {
//                 setError(false)
//                 setCart(response.data.response)
//             })
//             .catch((error) => {
//                 setCart({cartItems:[]})
//                 setError(true)
//             })
//         setProcessing(false)
//     }

//     useEffect(() => {
//         console.log("useEffect getCartInformation")
//         getCartInformation()
//     }, [])

//     return { cart, cartError, isProcessingCart, addItemToCart, updateItemQuantity, removeItemFromCart, getCartInformation };

// }

// export default CartService;

// sumit -- new update wishlist
import { useEffect, useState } from "react";
import API_BASE_URL from "./apiConfig";
import axios from 'axios';

function CartService() {
    const [cart, setCart] = useState({});
    const [wishlist, setWishlist] = useState({}); // 👈 new state
    const [cartError, setError] = useState(false);
    const [wishlistError, setWishlistError] = useState(false); // 👈 error for wishlist
    const [isProcessingCart, setProcessing] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const authHeader = () => {
        return { Authorization: `${user?.type}${user?.token}` };
    }

    const addItemToCart = async (productId, quantity, isWishlist = false) => {
        setProcessing(true);
        await axios.post(
            `${API_BASE_URL}/cart-service/cart/add`,
            { productId, quantity, wishlist: isWishlist },
            { headers: authHeader() }
        ).then(() => {
            setError(false);
        }).catch(() => {
            setError(true);
        });
        setProcessing(false);
        getCartInformation();
        getWishlistInformation(); // update wishlist too
    };

    const updateItemQuantity = async (productId, quantity) => {
        setProcessing(true);
        await axios.post(
            `${API_BASE_URL}/cart-service/cart/add`,
            { productId, quantity },
            { headers: authHeader() }
        ).then(() => {
            setError(false);
        }).catch(() => {
            setError(true);
        });
        setProcessing(false);
        getCartInformation();
        getWishlistInformation();
    };

    const removeItemFromCart = async (productId) => {
        setProcessing(true);
        await axios.delete(`${API_BASE_URL}/cart-service/cart/remove`, {
            headers: authHeader(),
            params: {
                productId: productId
            }
        }).then(() => {
            setError(false);
        }).catch(() => {
            setError(true);
        });
        getCartInformation();
        getWishlistInformation();
    };

    const removeWishlistItemFromCart = async (productId) => {
        setProcessing(true);
        await axios.put(
            `${API_BASE_URL}/cart-service/cart/removewishlist`,
            { productId }, // <-- send as body
            { headers: authHeader() }
        ).then(() => {
            setError(false);
        }).catch(() => {
            setError(true);
        });
        setProcessing(false);
        getCartInformation();
        getWishlistInformation();
    };
    
    
    

    const getCartInformation = async () => {
        if (!user?.token) {
            setCart({});
            setError(false);
            return;
        }
        setProcessing(true);
        await axios.get(`${API_BASE_URL}/cart-service/cart/get/byUser`, {
            headers: authHeader()
        }).then((response) => {
            setError(false);
            setCart(response.data.response);
        }).catch(() => {
            setCart({ cartItems: [] });
            setError(true);
        });
        setProcessing(false);
    };

    const getWishlistInformation = async () => {
        if (!user?.token) {
            setWishlist({});
            setWishlistError(false);
            return;
        }
        setProcessing(true);
        await axios.get(`${API_BASE_URL}/cart-service/cart/getwaitlist/byUser`, {
            headers: authHeader()
        }).then((response) => {
            setWishlistError(false);
            setWishlist(response.data.response);
        }).catch(() => {
            setWishlist({ cartItems: [] });
            setWishlistError(true);
        });
        setProcessing(false);
    };

    useEffect(() => {
        getCartInformation();
        getWishlistInformation(); // 👈 fetch both on mount
    }, []);

    return {
        cart,
        wishlist,
        cartError,
        wishlistError,
        isProcessingCart,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        removeWishlistItemFromCart,
        getCartInformation,
        getWishlistInformation
    };
}

export default CartService;
