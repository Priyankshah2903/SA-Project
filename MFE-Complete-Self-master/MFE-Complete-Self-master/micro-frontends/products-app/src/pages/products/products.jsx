// import './products.css'
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// // import Header from "../../components/header/header";
// import { useContext, useEffect, useState } from 'react';
// // import Loading from '../../components/loading/loading';
// // import Info from '../../components/info/info';
// // import ProductService from '../../api-service/product.service';
// import ProductService from "containerApp/ProductService";
// // import CartContext from '../../contexts/cart.contect';
// // import { AuthContext } from '../../contexts/auth.context';
// import { AuthContext } from "containerApp/AuthContext";
// import CartContext from "containerApp/CartContext";
// // import Footer from '../../components/footer/footer';

// const Header = React.lazy(() => import("containerApp/Header"));
// const Footer = React.lazy(() => import("containerApp/Footer"));
// const Loading = React.lazy(() => import("containerApp/Loading"));
// const Info = React.lazy(() => import("containerApp/Info"));

// function Products() {

//     const { category } = useParams();
//     const location = useLocation();
//     const { getAllCategories, getAllProducts, getProductsByCategory, isLoading, categories, products, error } = ProductService()

//     useEffect(() => {
//         getAllCategories()
//         if (location.state) {
//             getProductsByCategory(location.state.categoryId)
//         } else {
//             getAllProducts()
//         }
//     }, [category])

//     return (
//         <>
//             <Header />
//             {isLoading && <Loading />}
//             {error && <Info message="Unable to display product right now. Try again later..." />}
//             {!isLoading && !error && (
//                 <>
//                     <CategoryWrapper category={category} categoryList={categories} />
//                     <ProductsWrapper products={products} />
//                 </>
//             )}
//             <Footer />
//         </>
//     )
// }

// export default Products;


// function CategoryWrapper({ category, categoryList }) {

//     const navigate = useNavigate();

//     const onSelect = (categoryName, categoryId) => {
//         categoryId ?
//             navigate(`/products/${categoryName}`, { state: { categoryId: categoryId } })
//             :
//             navigate(`/products/${categoryName}`)
//     }

//     return (
//         <section className="category-wrapper">
//             <div className="category-list">
//                 <div
//                     className={category == "All" ? "category active" : "category"}
//                     onClick={() => onSelect("All")}
//                 >
//                     All
//                 </div>
//                 {
//                     categoryList.map((cat) => {
//                         return (
//                             <div
//                                 className={category == cat.categoryName ? "category active" : "category"}
//                                 key={cat.id}
//                                 onClick={() => onSelect(cat.categoryName, cat.id)}
//                             >
//                                 {cat.categoryName}
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </section>
//     )
// }


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


import './products.css';
import { BrowserRouter, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, Suspense } from 'react';
import ProductService from "sharedApp/ProductService";
// import { useAuth } from "containerApp/AuthContext";
import { AuthContext } from "containerApp/AuthContext";
import CartContext from "containerApp/CartContext";
import { useCart } from "containerApp/CartContext"; // Import the hook
import { useAuth } from "containerApp/AuthContext"; // Import the hook
// import CartService from "containerApp/CartService";
import React from 'react';

const Header = React.lazy(() => import("sharedApp/Header"));
const Footer = React.lazy(() => import("sharedApp/Footer"));
const Loading = React.lazy(() => import("sharedApp/Loading"));
const Info = React.lazy(() => import("sharedApp/Info"));
const ProductModal = React.lazy(() => import("sharedApp/ProductModal"));

function Products() {
    // const {user, toggleUser} = useAuth();
        // const { 
        //     cart, 
        //     cartError, 
        //     isProcessingCart, 
        //     addItemToCart, 
        //     removeItemFromCart, 
        //     getCartInformation 
        // } = CartService();
    const { category } = useParams();
    // const [currentCategory, setCurrentCategory] = useState("All");
    const location = useLocation();
    const { getAllCategories, getAllProducts, getProductsByCategory, isLoading, categories, products, error } = ProductService();
    // const { user, toggleUser } = useContext(AuthContext);
    // const { cart, cartError, isProcessingCart, addItemToCart, removeItemFromCart, getCartInformation } = useContext(CartContext);

    useEffect(() => {
        console.log("Category from useParams in Products:", category);
        getAllCategories();
        if (location.state) {
            getProductsByCategory(location.state.categoryId);
        } else {
            getAllProducts();
        }
    }, [category, location.state]);

    return (
        // <BrowserRouter>
        // <AuthContext.Provider value={{ user, toggleUser }}>
        //     <CartContext.Provider value={{ cart, cartError, isProcessingCart, addItemToCart, removeItemFromCart, getCartInformation }}>
                <>
                    <Suspense fallback={<div>Loading Header...</div>}>
                        <Header />
                    </Suspense>
                    <Suspense fallback={<div>Loading...</div>}>
                        {isLoading && <Loading />}
                        </Suspense>
                        {error && <Info message="Unable to display product right now. Try again later..." />}
                        {!isLoading && !error && (
                            <>
                                console.log("category: ",category)
                                <CategoryWrapper category={category} categoryList={categories} />
                                <ProductsWrapper products={products} />
                            </>
                        )}
                    {/* </Suspense> */}
                    <Suspense fallback={<div>Loading Footer...</div>}>
                        <Footer />
                    </Suspense>
                </>
        //     </CartContext.Provider>
        // </AuthContext.Provider>
        // {/* </BrowserRouter> */}
    );
}

export default Products;

function CategoryWrapper({ category, categoryList }) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Category prop in CategoryWrapper:", category);
      }, [category]);

    const onSelect = (categoryName, categoryId) => {
        categoryId
            ? navigate(`/products/${categoryName}`, { state: { categoryId: categoryId } })
            : navigate(`/products/${categoryName}`);
    };

    return (
        <section className="category-wrapper">
            <div className="category-list">
                <div
                    // className={category === "All" ? "category active" : "category"}
                    className={category === "All" || category === undefined ? "category active" : "category"}
                    onClick={() => onSelect("All")}
                >
                    All
                </div>
                {categoryList.map((cat) => (
                    <div
                        className={category === cat.categoryName ? "category active" : "category"}
                        key={cat.id}
                        onClick={() => onSelect(cat.categoryName, cat.id)}
                    >
                        {cat.categoryName}
                    </div>
                ))}
            </div>
        </section>
    );
}

function ProductsWrapper({ products }) {
    const { addItemToCart } = useCart();//useContext(CartContext);
    const { user } = useAuth();//useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const onAddToCart = async (productId) => {
        if (!user) {
            // navigate("/auth/login");
            navigate("/login");
            return;
        }
        setLoading(true);
        await addItemToCart(productId, 1);
        setLoading(false);
    };

    const onAddToWishlist = async (productId) => {
        if (!user) {
          navigate("/auth/login");
          return;
        }
        setLoading(true);
        await addItemToCart(productId, 1, true); // 👈 set wishlist = true
        setLoading(false);
      };
  
    const onProductClick = (product) => {
      setSelectedProduct(product);
    };
//  used till last complete
    // return (
    //     <section className="products-container">
    //         <div className="products-wrapper">
    //             {isLoading ? (
    //                 <Suspense fallback={<div>Loading...</div>}><Loading /></Suspense>
    //             ) : (
    //                 products.map((product) => (
    //                     <div className="box" key={product.id}>
    //                         <img src={`${product.imageUrl}`} className="image" alt="product" />
    //                         <div className="price" aria-label="image">
    //                             Rs. {product.price}
    //                         </div>
    //                         <div className="text-part">
    //                             <div className="name">{product.productName}</div>
    //                             <div className="description">{product.description}</div>
    //                         </div>
    //                         <button onClick={() => onAddToCart(product.id)}>Add to cart</button>
    //                     </div>
    //                 ))
    //             )}
    //         </div>
    //     </section>
    // );
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
                
                  {/* Buttons row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button className="add-to-cart-button" onClick={() => onAddToCart(product.id)}>
    Add to cart
  </button>
                    <button className="wishlist-button" onClick={() => onAddToWishlist(product.id)}>
                      <i className="fa fa-heart"></i>
                    </button>
                  </div>
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