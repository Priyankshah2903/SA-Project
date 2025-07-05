// code used till last
// // import Logo from '../../components/logo/logo';
// import './checkout.css'
// import { useForm } from 'react-hook-form';
// // import CopyRight from '../../components/footer/copyright';
// // import OrderService from '../../api-service/order.service';
// import OrderService from 'containerApp/OrderService';
// import React, { useContext, useEffect, Suspense } from 'react';
// // import CartContext from '../../contexts/cart.contect';
// import CartContext from "containerApp/CartContext";
// import { useAuth } from "containerApp/AuthContext";
// import CartService from "containerApp/CartService";
// import { Link } from 'react-router-dom';

// // Lazy load Logo component
// const Logo = React.lazy(() => import("containerApp/Logo"));
// const CopyRight = React.lazy(() => import("containerApp/CopyRight"));

// const CheckoutForm = () => {

//     const { register, handleSubmit, formState } = useForm();
//     const { isLoading, error, placeOrder } = OrderService();
//     const {user, toggleUser} = useAuth();
//     // const { cart, cartError, isProcessingCart, getCartInformation } = useContext(CartContext);//CartServiceHook();//useContext(CartContext);
//     const { 
//                 cart, 
//                 cartError, 
//                 isProcessingCart, 
//                 addItemToCart, 
//                 removeItemFromCart, 
//                 getCartInformation 
//             } = CartService();

//     const onSubmit = async (data) => {
//         placeOrder(data, cart.cartId)
//     };

//     return (
//         <>
//         <AuthContext.Provider value={{ user, toggleUser }}>
//                     <CartContext.Provider value={{ cart, cartError, isProcessingCart, addItemToCart, removeItemFromCart, getCartInformation }}>
//             <header className='app-header'> <Suspense fallback={<div>Loading Logo...</div>}>
//                                         <Logo />
//                                     </Suspense></header>
//             <div className="checkout-container">
//                 <h1>Checkout</h1>
//                 <div className='checkout-wrapper'>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         {error && <small className="text-danger">{error}</small>}
//                         <div className="input-box">
//                             <label htmlFor="fname" className="form-label">
//                                 First Name
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Eg. John"
//                                 {...register('fname', {
//                                     required: "First name is required!"
//                                 })}
//                             />
//                             {formState.errors.fname && <small className="text-danger">{formState.errors.fname.message}</small>}
//                         </div>
//                         <div className="input-box">
//                             <label htmlFor="lname" className="form-label">
//                                 Last Name
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Eg. Smith"
//                                 {...register('lname', {
//                                     required: "Last name is required!"
//                                 })}
//                             />
//                             {formState.errors.lname && <small className="text-danger">{formState.errors.lname.message}</small>}

//                         </div>
//                         <div className="input-box">
//                             <label htmlFor="address1" className="form-label">
//                                 Address Line 1
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Eg. House No, Street No, Area"
//                                 {...register('address1', {
//                                     required: "Address line 1 is required!"
//                                 })}
//                             />
//                             {formState.errors.address1 && <small className="text-danger">{formState.errors.address1.message}</small>}

//                         </div>
//                         <div className="input-box">
//                             <label htmlFor="address2" className="form-label">
//                                 Address Line 2
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Eg. Suite no / floor No"
//                                 {...register('address2')}
//                             />
//                         </div>
//                         <div className="input-box">
//                             <label htmlFor="city" className="form-label">
//                                 City
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Eg. Point Pedro"
//                                 {...register('city', {
//                                     required: "City is required!"
//                                 })}
//                             />
//                             {formState.errors.city && <small className="text-danger">{formState.errors.city.message}</small>}

//                         </div>
//                         <div className="input-box">
//                             <label htmlFor="phone" className="form-label">
//                                 Phone Number
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Eg. 07xxxxxxxx"
//                                 {...register('phone', {
//                                     required: "Phone is required!"
//                                 })}
//                             />
//                             {formState.errors.phone && <small className="text-danger">{formState.errors.phone.message}</small>}
//                         </div>
//                         <button
//                             type="submit"
//                             className={isLoading ? "loading" : ""}
//                             name="proceed">
//                             {isLoading ? "Processing..." : "Place Order"}
//                         </button>
//                     </form>
//                     <summary>
//                         <h2>Order summary</h2>
//                         <hr />
//                         {cart?.cartItems?.map((cartItem) => (
//                             <div className="product" key={cartItem.productId}>
//                                 <img src={`${cartItem.imageUrl}`} alt={cartItem.productName} />
//                                 <div className="product-info">
//                                     <h4>
//                                         {cartItem.productName}
//                                     </h4>
//                                     <span className="product-price">
//                                         {cartItem.price} x {cartItem.quantity} = Rs.  {parseFloat(cartItem.amount).toFixed(2)}
//                                     </span>
//                                 </div>

//                             </div>
//                         ))}
//                         <hr />
//                         <h3><span>Sub Total</span><span>Rs. {parseFloat(cart?.subtotal).toFixed(2)}</span></h3><br />
//                         <small>Delivary charges will be added to above total at you door step by our staffs when we deliver your order.</small>
//                         <br />
//                         <Link to="/"><button>Edit cart</button></Link>
//                     </summary>
//                 </div>
//             </div>
//              <Suspense fallback={<div>Loading Header...</div>}>
//                                         <CopyRight />
//                                     </Suspense>
//                                     </CartContext.Provider>
//                                     </AuthContext.Provider>
//         </>
//     );
// };

// export default CheckoutForm;

// import Logo from '../../components/logo/logo';
import './checkout.css'
import { useForm } from 'react-hook-form';
// import CopyRight from '../../components/footer/copyright';
// import OrderService from '../../api-service/order.service';
import OrderService from 'sharedApp/OrderService';
import React,{Suspense, useContext, useEffect,useState, useRef } from 'react';
// import CartContext from '../../contexts/cart.contect';
import { useCart } from "containerApp/CartContext"; // Import the hook
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
// import CheckoutService from '../../api-service/Checkout.service'; // Import CheckoutService
import PaymentService from 'sharedApp/PaymentService'; // Import CheckoutService

// Dynamically import Header from the container app (host)
const Logo = React.lazy(() => import("sharedApp/Logo"));
const CopyRight = React.lazy(() => import("sharedApp/CopyRight"));

const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  
  const DraggableMarker = ({ position, setPosition, onDragEnd }) => {
    const markerRef = useRef(null);
  
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
  
    return (
      <Marker
        draggable
        eventHandlers={{
          dragend: () => {
            const marker = markerRef.current;
            if (marker != null) {
              const newPos = marker.getLatLng();
              setPosition(newPos);
              onDragEnd(newPos);
            }
          },
        }}
        position={position}
        icon={markerIcon}
        ref={markerRef}
      />
    );
  };
  
  const LocationMap = ({ mapCoords, setMapCoords, setValue }) => {
    const [position, setPosition] = useState(mapCoords);
  
    useEffect(() => {
      if (mapCoords) {
        setPosition(mapCoords);
      }
    }, [mapCoords]);
  
    const handleDragEnd = async (newPos) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${newPos.lat}&lon=${newPos.lng}&format=json`
        );
        const data = await response.json();
        const address = data.address;
  
        const addressLine1 = [
          address.house_number,
          address.road,
          address.residential,
          address.block,
        ].filter(Boolean).join(", ");
  
        const addressLine2 = [
          address.suburb,
          address.city_district,
          address.neighbourhood,
        ].filter(Boolean).join(", ");
  
        const cityStateCountry = [
          address.city || address.town || address.village,
          address.state,
          address.country,
        ].filter(Boolean).join(", ");
  
        setValue("address1", addressLine1);
        setValue("address2", addressLine2);
        setValue("city", cityStateCountry);
        setValue("postalCode", address.postcode);
  
      } catch (error) {
        console.error("Failed to reverse geocode: ", error);
      }
    };
  
    return (
      <MapContainer center={position} zoom={15} style={{ height: '300px', borderRadius: '10px' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker position={position} setPosition={setPosition} onDragEnd={handleDragEnd} />
      </MapContainer>
    );
  };

const CheckoutForm = () => {
    console.log(useCart());
    const { register, handleSubmit, formState,setValue } = useForm();
    const { isLoading, error, placeOrder } = OrderService();
    const { cart, cartError, isProcessingCart, getCartInformation } = useCart();//useContext(CartContext);
    const [detectedAddress, setDetectedAddress] = useState("");
    const [mapCoords, setMapCoords] = useState(null);
    const { checkoutLoading, checkoutError, initiateCheckout } = PaymentService(); // Us

    const onSubmit = async (data) => {
        // placeOrder(data, cart.cartId)
        try{
        await initiateCheckout(cart.subtotal,"Order Payment");
        placeOrder(data, cart.cartId)
        }catch(error){
          console.log("Payment failed due to: ",error);
        }
    };

    const getUserLocation = () => {
        if (!navigator.geolocation) {
          alert("Geolocation is not supported by your browser");
          return;
        }
      
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
      
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              const data = await response.json();
              const address = data.address;
      
              const addressLine1 = [
                address.house_number,
                address.road,
                address.residential,
                address.block,
                address.quarter,
                address.suburb,
              ]
                .filter(Boolean)
                .join(", ");
      
              const addressLine2 = [
                address.neighbourhood,
                address.village,
                address.town,
                address.city_district,
              ]
                .filter(Boolean)
                .join(", ");
      
              // Combine city, state, and country
              const cityStateCountry = [
                address.city || address.town || address.village,
                address.state,
                address.country,
              ]
                .filter(Boolean)
                .join(", ");
      
              if (addressLine1) setValue("address1", addressLine1);
              if (addressLine2) setValue("address2", addressLine2);
              if (cityStateCountry) setValue("city", cityStateCountry);
              if (address.postcode) setValue("postalCode", address.postcode);

              setDetectedAddress(`${addressLine1}, ${addressLine2}, ${cityStateCountry}`);
              setMapCoords({ lat: latitude, lon: longitude });
      
            } catch (err) {
              alert("Unable to fetch address from coordinates");
              console.error(err);
            }
          },
          (error) => {
            alert("Unable to retrieve your location");
            console.error(error);
          }
        );
      };

      // last update till complete

    // return (
    //     <>
    //         <header className='app-header'>
    //         <Suspense fallback={<div>Loading Logo...</div>}>
    //             <Logo />
    //         </Suspense>
    //         </header>
    //         <div className="checkout-container">
    //             <h1>Checkout</h1>
    //             <div className='checkout-wrapper'>
    //                 <form onSubmit={handleSubmit(onSubmit)}>
    //                     {error && <small className="text-danger">{error}</small>}
    //                     <div className="input-box">
    //                         <label htmlFor="fname" className="form-label">
    //                             First Name
    //                         </label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Eg. John"
    //                             {...register('fname', {
    //                                 required: "First name is required!"
    //                             })}
    //                         />
    //                         {formState.errors.fname && <small className="text-danger">{formState.errors.fname.message}</small>}
    //                     </div>
    //                     <div className="input-box">
    //                         <label htmlFor="lname" className="form-label">
    //                             Last Name
    //                         </label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Eg. Smith"
    //                             {...register('lname', {
    //                                 required: "Last name is required!"
    //                             })}
    //                         />
    //                         {formState.errors.lname && <small className="text-danger">{formState.errors.lname.message}</small>}

    //                     </div>
    //                     <div className="input-box">
    //                         <label htmlFor="address1" className="form-label">
    //                             Address Line 1
    //                         </label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Eg. House No, Street No, Area"
    //                             {...register('address1', {
    //                                 required: "Address line 1 is required!"
    //                             })}
    //                         />
    //                         {formState.errors.address1 && <small className="text-danger">{formState.errors.address1.message}</small>}

    //                     </div>
    //                     <div className="input-box">
    //                         <label htmlFor="address2" className="form-label">
    //                             Address Line 2
    //                         </label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Eg. Suite no / floor No"
    //                             {...register('address2')}
    //                         />
    //                     </div>
    //                     <div className="input-box">
    //                         <label htmlFor="city" className="form-label">
    //                             City
    //                         </label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Eg. Point Pedro"
    //                             {...register('city', {
    //                                 required: "City is required!"
    //                             })}
    //                         />
    //                         {formState.errors.city && <small className="text-danger">{formState.errors.city.message}</small>}

    //                     </div>
    //                     <div className="input-box">
    //                         <label htmlFor="phone" className="form-label">
    //                             Phone Number
    //                         </label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Eg. 07xxxxxxxx"
    //                             {...register('phone', {
    //                                 required: "Phone is required!"
    //                             })}
    //                         />
    //                         {formState.errors.phone && <small className="text-danger">{formState.errors.phone.message}</small>}
    //                     </div>
    //                     <button
    //                         type="submit"
    //                         className={isLoading ? "loading" : ""}
    //                         name="proceed">
    //                         {isLoading ? "Processing..." : "Place Order"}
    //                     </button>
    //                 </form>
    //                 <summary>
    //                     <h2>Order summary</h2>
    //                     <hr />
    //                     {cart?.cartItems && cart?.cartItems.map((cartItem) => (
    //                         <div className="product" key={cartItem.productId}>
    //                             <img src={`${cartItem.imageUrl}`} alt={cartItem.productName} />
    //                             <div className="product-info">
    //                                 <h4>
    //                                     {cartItem.productName}
    //                                 </h4>
    //                                 <span className="product-price">
    //                                     {cartItem.price} x {cartItem.quantity} = Rs.  {parseFloat(cartItem.amount).toFixed(2)}
    //                                 </span>
    //                             </div>

    //                         </div>
    //                     ))}
    //                     <hr />
    //                     <h3><span>Sub Total</span><span>Rs. {parseFloat(cart?.subtotal).toFixed(2)}</span></h3><br />
    //                     <small>Delivary charges will be added to above total at you door step by our staffs when we deliver your order.</small>
    //                     <br />
    //                     <Link to="/"><button>Edit cart</button></Link>
    //                 </summary>
    //             </div>
    //         </div>
    //         <Suspense fallback={<div>Loading Copyright...</div>}>
    //             <CopyRight />
    //         </Suspense>
    //     </>
    // );

    return (
        <>
            <header className='app-header'><Logo /></header>
            <div className="checkout-container">
                <h1>Checkout</h1> <button type="button" className="location-btn" onClick={getUserLocation}>
  📍 Use My Location
</button>
{detectedAddress && (
  <div className="location-preview">
    <h4>📍 Detected Location:</h4>
    <p>{detectedAddress}</p>
    {mapCoords && (
  <div className="map-container">
    <LocationMap mapCoords={mapCoords} setMapCoords={setMapCoords} setValue={setValue} />
  </div>
)}
  </div>
)}

                <div className='checkout-wrapper'>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <small className="text-danger">{error}</small>}
                        <div className="input-box">
                            <label htmlFor="fname" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. John"
                                {...register('fname', {
                                    required: "First name is required!"
                                })}
                            />
                            {formState.errors.fname && <small className="text-danger">{formState.errors.fname.message}</small>}
                        </div>
                        <div className="input-box">
                            <label htmlFor="lname" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. Smith"
                                {...register('lname', {
                                    required: "Last name is required!"
                                })}
                            />
                            {formState.errors.lname && <small className="text-danger">{formState.errors.lname.message}</small>}

                        </div>
                        <div className="input-box">
                            <label htmlFor="address1" className="form-label">
                                Address Line 1
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. House No, Street No, Area"
                                {...register('address1', {
                                    required: "Address line 1 is required!"
                                })}
                            />
                            {formState.errors.address1 && <small className="text-danger">{formState.errors.address1.message}</small>}

                        </div>
                        <div className="input-box">
                            <label htmlFor="address2" className="form-label">
                                Address Line 2
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. Suite no / floor No"
                                {...register('address2')}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="city" className="form-label">
                                City
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. Point Pedro"
                                {...register('city', {
                                    required: "City is required!"
                                })}
                            />
                            {formState.errors.city && <small className="text-danger">{formState.errors.city.message}</small>}

                        </div>
                        <div className="input-box">
  <label htmlFor="postalCode" className="form-label">
    Postal Code
  </label>
  <input
    type="text"
    className="form-control"
    placeholder="Eg. 600001"
    {...register('postalCode', {
      required: "Postal Code is required!"
    })}
  />
  {formState.errors.postalCode && <small className="text-danger">{formState.errors.postalCode.message}</small>}
</div>

                        <div className="input-box">
                            <label htmlFor="phone" className="form-label">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. 07xxxxxxxx"
                                {...register('phone', {
                                    required: "Phone is required!"
                                })}
                            />
                            {formState.errors.phone && <small className="text-danger">{formState.errors.phone.message}</small>}
                        </div>
                        {/* <LocationMap setValue={setValue} /> */}
                        <button
                            type="submit"
                            className={isLoading ? "loading" : ""}
                            name="proceed">
                            {isLoading ? "Processing..." : "Place Order"}
                        </button>
                    </form>
                    <summary>
                        <h2>Order summary</h2>
                        <hr />
                        {cart?.cartItems && cart?.cartItems.map((cartItem) => (
                            <div className="product" key={cartItem.productId}>
                                <img src={`${cartItem.imageUrl}`} alt={cartItem.productName} />
                                <div className="product-info">
                                    <h4>
                                        {cartItem.productName}
                                    </h4>
                                    <span className="product-price">
                                        {cartItem.price} x {cartItem.quantity} = Rs.  {parseFloat(cartItem.amount).toFixed(2)}
                                    </span>
                                </div>

                            </div>
                        ))}
                        <hr />
                        <h3><span>Sub Total</span><span>Rs. {parseFloat(cart?.subtotal).toFixed(2)}</span></h3><br />
                        <small>Delivary charges will be added to above total at you door step by our staffs when we deliver your order.</small>
                        <br />
                        <Link to="/"><button>Edit cart</button></Link>
                    </summary>
                </div>
            </div>
            <CopyRight />
        </>
    );
};

export default CheckoutForm;

