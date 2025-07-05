// import './search.css'
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Header from "../../components/header/header";
// import { useContext, useEffect, useState } from 'react';
// import Loading from '../../components/loading/loading';
// import Info from '../../components/info/info';
// import ProductService from '../../api-service/product.service';
// import CartContext from '../../contexts/cart.contect';
// import { AuthContext } from '../../contexts/auth.context';
// import Footer from '../../components/footer/footer';

// function Search() {

//     const { search } = useParams();
//     const { searchProducts, isLoading, products, error } = ProductService()

//     useEffect(() => {
//         searchProducts(search)
//     }, [search])

//     return (
//         <>
//             <Header />
//             {isLoading && <Loading />}
//             {error && <Info message="Unable to search products right now. Try again later..."/>}
//             {!isLoading && !error && (
//                 <>
//                     <h3 className='search-result'>{products.length} product/s found for <q>{search}</q></h3>
//                     <ProductsWrapper products={products} />
//                 </>
//             )}
//             <Footer/>
//         </>
//     )
// }

// export default Search;


// function ProductsWrapper({ products }) {

//     const { addItemToCart } = useContext(CartContext);
//     const { user, toggleUser } = useContext(AuthContext)
//     const [isLoading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const onAddToCart = async (productId) => {
//         if (!user) {
//             navigate("/auth/login")
//             return
//         }
//         setLoading(true)
//         await addItemToCart(productId, 1)
//         setLoading(false)
//     }

//     return (
//         <section className="products-container">
//             <div className='products-wrapper'>
//                 {
//                     isLoading ? <Loading /> :
//                         products.map((product) => {
//                             return (
//                                 <div className='box' key={product.id}>
//                                     <img src={`${product.imageUrl}`} className="image" alt='product'></img>
//                                     <div className='price' aria-label='image'>Rs. {product.price}</div>
//                                     <div className='text-part'>
//                                         <div className='name'>{product.productName}</div>
//                                         <div className='description'>{product.description}</div>
//                                     </div>
//                                     <button
//                                         onClick={() => onAddToCart(product.id)}
//                                     >
//                                         Add to cart
//                                     </button>
//                                 </div>
//                             )
//                         })
//                 }
//             </div>
//         </section>
//     )
// }

// code used till last
// import './search.css';
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import React, { useContext, useEffect, useState, Suspense } from 'react';
// import { AuthContext } from "containerApp/AuthContext";
// import CartContext from "containerApp/CartContext";
// import { useAuth } from "containerApp/AuthContext";
// // import { AuthContext } from "containerApp/AuthContext";
// // import CartContext from "containerApp/CartContext";
// import CartService from "containerApp/CartService";
// import ProductService from "containerApp/ProductService";

// // Lazy load components from containerApp
// const Header = React.lazy(() => import("containerApp/Header"));
// const Loading = React.lazy(() => import("containerApp/Loading"));
// const Info = React.lazy(() => import("containerApp/Info"));
// const Footer = React.lazy(() => import("containerApp/Footer"));

// // // Dynamically import ProductService (if it's a module)
// // const loadProductService = async () => {
// //   const { default: ProductService } = await import('containerApp/ProductService');
// //   return ProductService;
// // };

// function Search() {
//     const { search } = useParams();
//     const [ProductService, setProductService] = useState(null);
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
    
//     const { searchProducts } = ProductService || {}; // Deconstruct only if ProductService is loaded

//     const navigate = useNavigate();

//     // Lazy load ProductService
//     // useEffect(() => {
//     //     const fetchProductService = async () => {
//     //         const ProductServiceModule = await loadProductService();
//     //         setProductService(() => ProductServiceModule);
//     //     };

//     //     fetchProductService();
//     // }, []);

//     // Fetch products using searchProducts from ProductService
//     useEffect(() => {
//         if (searchProducts) {
//             setIsLoading(true);
//             searchProducts(search)
//                 .then((result) => {
//                     setProducts(result);
//                     setIsLoading(false);
//                 })
//                 .catch((err) => {
//                     setError("Unable to search products right now. Try again later...");
//                     setIsLoading(false);
//                 });
//         }
//     }, [search, searchProducts]);

//     const {user, toggleUser} = useAuth();
//             const { 
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

//             {isLoading && (
//                 <Suspense fallback={<div>Loading Products...</div>}>
//                     <Loading />
//                 </Suspense>
//             )}

//             {error && (
//                 <Suspense fallback={<div>Loading Error...</div>}>
//                     <Info message={error} />
//                 </Suspense>
//             )}

//             {!isLoading && !error && (
//                 <>
//                     <h3 className='search-result'>
//                         {products.length} product/s found for <q>{search}</q>
//                     </h3>
//                     <ProductsWrapper products={products} />
//                 </>
//             )}

//             <Suspense fallback={<div>Loading Footer...</div>}>
//                 <Footer />
//             </Suspense>
//             </CartContext.Provider>
//         </AuthContext.Provider>
//         </>
        
//     );
// }

// export default Search;

// // Assuming ProductsWrapper is part of the current code
// function ProductsWrapper({ products }) {
//     const { addItemToCart } = useContext(CartContext);
//     const { user } = useContext(AuthContext);
//     const [isLoading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const onAddToCart = async (productId) => {
//         if (!user) {
//             // navigate("/auth/login");
//             navigate("/login");
//             return;
//         }
//         setLoading(true);
//         await addItemToCart(productId, 1);
//         setLoading(false);
//     };

//     return (
//         <section className="products-container">
//             <div className='products-wrapper'>
//                 {isLoading ? (
//                     <Suspense fallback={<div>Loading Product...</div>}>
//                         <Loading />
//                     </Suspense>
//                 ) : (
//                     products.map((product) => (
//                         <div className='box' key={product.id}>
//                             <img src={product.imageUrl} className="image" alt="product" />
//                             <div className='price' aria-label='image'>Rs. {product.price}</div>
//                             <div className='text-part'>
//                                 <div className='name'>{product.productName}</div>
//                                 <div className='description'>{product.description}</div>
//                             </div>
//                             <button onClick={() => onAddToCart(product.id)}>
//                                 Add to cart
//                             </button>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </section>
//     );
// }

import './search.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Header from "../../components/header/header";
import React, { useContext, useEffect, useState } from 'react';
// import Loading from '../../components/loading/loading';
// import Info from '../../components/info/info';
// import ProductService from '../../api-service/product.service';
// import CartContext from '../../contexts/cart.contect';
// import { AuthContext } from '../../contexts/auth.context';
import { useAuth } from "containerApp/AuthContext"; // Import the hook
import { useCart } from "containerApp/CartContext"; // Import the hook
// import Footer from '../../components/footer/footer';
import ProductService from "sharedApp/ProductService";


// Lazy load components from containerApp
const Header = React.lazy(() => import("sharedApp/Header"));
const Loading = React.lazy(() => import("sharedApp/Loading"));
const Info = React.lazy(() => import("sharedApp/Info"));
const Footer = React.lazy(() => import("sharedApp/Footer"));
const ProductModal = React.lazy(() => import("sharedApp/ProductModal"));

function Search() {

    const { search } = useParams();
    const { searchProducts, isLoading, products, error } = ProductService()

    useEffect(() => {
        searchProducts(search)
    }, [search])

    return (
        <>
            <Header />
            {isLoading && <Loading />}
            {error && <Info message="Unable to search products right now. Try again later..."/>}
            {!isLoading && !error && (
                <>
                    <h3 className='search-result'>{products.length} product/s found for <q>{search}</q></h3>
                    <ProductsWrapper products={products} />
                </>
            )}
            <Footer/>
        </>
    )
}

export default Search;


function ProductsWrapper({ products }) {

    const { addItemToCart } = useCart();//useContext(CartContext);
    const { user, toggleUser } = useAuth();//useContext(AuthContext)
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const onAddToCart = async (productId) => {
        if (!user) {
            navigate("/auth/login")
            return
        }
        setLoading(true)
        await addItemToCart(productId, 1)
        setLoading(false)
    }

    const onProductClick = (product) => {
        setSelectedProduct(product);
      };

// used till last complete
    // return (
    //     <section className="products-container">
    //         <div className='products-wrapper'>
    //             {
    //                 isLoading ? <Loading /> :
    //                     products.map((product) => {
    //                         return (
    //                             <div className='box' key={product.id}>
    //                                 <img src={`${product.imageUrl}`} className="image" alt='product'></img>
    //                                 <div className='price' aria-label='image'>Rs. {product.price}</div>
    //                                 <div className='text-part'>
    //                                     <div className='name'>{product.productName}</div>
    //                                     <div className='description'>{product.description}</div>
    //                                 </div>
    //                                 <button
    //                                     onClick={() => onAddToCart(product.id)}
    //                                 >
    //                                     Add to cart
    //                                 </button>
    //                             </div>
    //                         )
    //                     })
    //             }
    //         </div>
    //     </section>
    // )

    return (
        <section className="products-container">
          <div className='products-wrapper'>
            {isLoading ? <Loading /> :
              products.map((product) => (
                <div className='box' key={product.id}>
                  <img
                    src={`${product.imageUrl}`}
                    className="image"
                    alt='product'
                    onClick={() => onProductClick(product)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className='price' aria-label='image'>Rs. {product.price}</div>
                  <div className='text-part'>
                    <div className='name'>{product.productName}</div>
                    <div className='description'>{product.description}</div>
                  </div>
                  <button onClick={() => onAddToCart(product.id)}>
                    Add to cart
                  </button>
                </div>
              ))
            }
          </div>
    
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </section>
      );
}
