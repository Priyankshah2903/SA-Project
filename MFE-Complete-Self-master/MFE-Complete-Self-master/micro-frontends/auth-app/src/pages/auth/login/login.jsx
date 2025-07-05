// import "../auth.css"
// import {useForm} from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// // import Logo from "../../../components/logo/logo";
// // import AuthService from "../../../api-service/auth.service";
// import AuthService from "containerApp/AuthService";
// import React, { useContext, useEffect, Suspense } from "react";
// // import { AuthContext } from "../../../contexts/auth.context";
// import { AuthContext } from "containerApp/AuthContext";


// const Logo = React.lazy(() => import("containerApp/Logo"));

// function Login() {

//     const {register, handleSubmit,formState} = useForm();
//     const { login, isLoading, error } = AuthService();
//     const {user, toggleUser} = useContext(AuthContext)
//     const navigate = useNavigate();

//     useEffect(()=> {
//         if (user && user.token) {
//             navigate("/");
//         }
//     }, [user])

//     console.log(user)

//     const onSubmit = async (data) => {
//         console.log("onSubmit:", data)
//         await login(data.email, data.password)
//         toggleUser()
//     }
//     return (
//         <main className='auth-container'>
//             <div className='auth-wrapper'>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                 <Suspense fallback={<div>Loading Logo...</div>}>
//                    <Logo />
//                  </Suspense>
//                     <h2>Login to continue...</h2>
//                     {
//                         error && <p>{error}</p>
//                     }

//                     <div className='input-box'>
//                         <label>
//                             Email
//                             <input
//                                 type='text'
//                                 placeholder="john@gmail.com"
//                                 {...register('email', {
//                                     required: "Email is required!",
//                                     pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Invalid email address!" }
//                                 })}
//                             />
//                         </label>

//                         {formState.errors.email && <small>{formState.errors.email.message}</small>}
//                     </div>

//                     <div className='input-box'>
//                         <label>
//                             Password
//                             <input
//                                 type='password'
//                                 placeholder="********"
//                                 {
//                                     ...register('password', {
//                                         required: 'Password is required!'
//                                 })
//                                 }
//                             />
//                         </label>
//                         {formState.errors.password && <small>{formState.errors.password.message}</small>}
//                     </div>

//                     <div className='input-box'>
//                         <input type='submit' value={isLoading ? 'Logging in' : 'Login'} className={isLoading ? 'loading' : ''} />
//                     </div>
//                     <div className='msg'>New member? <Link to='/auth/register' className='auth-link'>Register Here</Link></div>
//                 </form>
//             </div>
//         </main>
//     )
// }

// export default Login;


// import "../auth.css";
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import React, { useState, useEffect, Suspense } from 'react';
// // import AuthService from "containerApp/AuthService";
// import AuthServiceHook from "containerApp/AuthService"; // Rename import to avoid confusion


// // Lazy load Logo component
// const Logo = React.lazy(() => import("containerApp/Logo"));

// // Dynamically import AuthService (as it's a module, not a React component)
// // const loadAuthService = async () => {
// //   const { default: AuthService } = await import("containerApp/AuthService");
// //   return AuthService;
// // };

// function Login() {
// //   const [AuthService, setAuthService] = useState(null);
//   const { register, handleSubmit, formState } = useForm();
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login, toggleUser } = AuthServiceHook(); // Call the hook here
// // const { login, toggleUser, loading: authServiceLoading, error: authServiceError } = AuthServiceHook(); // Get loading and error from the hook


//   // Lazy load AuthService
// //   useEffect(() => {
// //     const fetchAuthService = async () => {
// //       const AuthServiceModule = await loadAuthService();
// //       setAuthService(() => AuthServiceModule);
// //     };

// //     fetchAuthService();
// //     console.log("fetchAuthService: ",AuthService)
// //   }, []);

//   useEffect(() => {
//     if (user && user.token) {
//       navigate("/");
//     }
//   }, [user, navigate]);

// //   const onSubmit = async (data) => {
// //     if (AuthService) {
// //       setIsLoading(true);
// //       try {
// //         const { login, toggleUser } = AuthService();
// //         await login(data.email, data.password);
// //         toggleUser();
// //         setUser({ token: 'some_token' }); // Set the user token after successful login
// //       } catch (err) {
// //         setError('Login failed');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }else{
// //         console.log("onSubmit: ",AuthService)
// //     }
// //   };
// // code for loading but didn't work here
//     // useEffect(() => {
//     //     // Update the local loading state based on the AuthService hook's loading state
//     //     setIsLoading(authServiceLoading);
//     // }, [authServiceLoading]);

//     // useEffect(() => {
//     //     // Update the local loading state based on the AuthService hook's loading state
//     //     setIsLoading(authServiceLoading);
//     //   }, [authServiceLoading]);
    
//     //   useEffect(() => {
//     //     // Update the local error state based on the AuthService hook's error state
//     //     if (authServiceError) {
//     //       setError(authServiceError);
//     //     } else if (!authServiceLoading && !authServiceError && localStorage.getItem("user")) {
//     //       // If not loading, no error, and user data exists, set the user
//     //       setUser(JSON.parse(localStorage.getItem("user")));
//     //     }
//     //   }, [authServiceError, authServiceLoading]);
    
//     //   const onSubmit = async (data) => {
//     //     // The AuthServiceHook should handle setting loading and error states internally
//     //     await login(data.email, data.password);
//     //     // The effect hook above will handle setting the user and navigating upon successful login
//     //   };
//     // till here

//     // new code for AuthServiceHook
//     const onSubmit = async (data) => {
//         setIsLoading(true);
//         try {
//         const loginSuccess = await login(data.email, data.password);
//         if (loginSuccess) {
//             toggleUser();
//             setUser(JSON.parse(localStorage.getItem("user"))); // Get user from localStorage after successful login
//             console.log("loginSuccess: ",loginSuccess);
//             navigate('/'); // Navigate to the root route

//         } else {
//             // Error state should be handled within AuthService and reflected in the 'error' state here if needed
//         }
//         } catch (err) {
//         setError('Login failed'); // Generic error, AuthService might provide more specific errors
//         } finally {
//         setIsLoading(false);
//         }
//     };

//   return (
//     <main className="auth-container">
//       <div className="auth-wrapper">
//         <Suspense fallback={<div>Loading Logo...</div>}>
//           <Logo />
//         </Suspense>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <h2>Login to continue...</h2>
//           {error && <p>{error}</p>}

//           <div className="input-box">
//             <label>
//               Email
//               <input
//                 type="text"
//                 placeholder="john@gmail.com"
//                 {...register('email', {
//                   required: "Email is required!",
//                   pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Invalid email address!" }
//                 })}
//               />
//             </label>
//             {formState.errors.email && <small>{formState.errors.email.message}</small>}
//           </div>

//           <div className="input-box">
//             <label>
//               Password
//               <input
//                 type="password"
//                 placeholder="********"
//                 {...register('password', {
//                   required: 'Password is required!'
//                 })}
//               />
//             </label>
//             {formState.errors.password && <small>{formState.errors.password.message}</small>}
//           </div>

//           <div className="input-box">
//             {/* <input type="submit" value={isLoading ? 'Logging in' : 'Login'} className={isLoading ? 'loading' : ''} disabled={isLoading} /> line for loading but didn't work*/} 
//             <input type="submit" value={isLoading ? 'Logging in' : 'Login'} className={isLoading ? 'loading' : ''} />
//           </div>
//           <div className="msg">New member? <Link to="/register" className="auth-link">Register Here</Link></div>
//         </form>
//       </div>
//     </main>
//   );
// }

// export default Login;

// new code for context sharing
import "../auth.css"
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// import Logo from "../../../components/logo/logo";
// import AuthService from "../../../api-service/auth.service";
import AuthService from "sharedApp/AuthService";
import React, { useContext, useEffect, Suspense } from "react";
// import { AuthContext } from "../../../contexts/auth.context";
import { useAuth } from "containerApp/AuthContext"; // Import the hook
import { useCart } from "containerApp/CartContext";


// Lazy load Logo component
const Logo = React.lazy(() => import("sharedApp/Logo"));

function Login() {

    const {register, handleSubmit,formState} = useForm();
    const { login, isLoading, error } = AuthService();
    const {user, toggleUser} = useAuth();//useContext(AuthContext)
    const navigate = useNavigate();
    const { getCartInformation } = useCart(); // Access getCartInformation

    useEffect(()=> {
        if (user && user.token) {
            navigate("/");
        }
    }, [user])

    console.log("Login User: ",user)

    const onSubmit = async (data) => {
        await login(data.email, data.password)
        toggleUser()
        console.log("onSumit login.jsc getCartInformation");
        getCartInformation(); // Call getCartInformation after login
    }
    return (
        <main className='auth-container'>
            <div className='auth-wrapper'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Suspense fallback={<div>Loading Logo...</div>}>
                      <Logo />
                    </Suspense>
                    <h2>Login to continue...</h2>
                    {
                        error && <p>{error}</p>
                    }

                    <div className='input-box'>
                        <label>
                            Email
                            <input
                                type='text'
                                placeholder="john@gmail.com"
                                {...register('email', {
                                    required: "Email is required!",
                                    pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Invalid email address!" }
                                })}
                            />
                        </label>

                        {formState.errors.email && <small>{formState.errors.email.message}</small>}
                    </div>

                    <div className='input-box'>
                        <label>
                            Password
                            <input
                                type='password'
                                placeholder="********"
                                {
                                    ...register('password', {
                                        required: 'Password is required!'
                                })
                                }
                            />
                        </label>
                        {formState.errors.password && <small>{formState.errors.password.message}</small>}
                    </div>

                    <div className='input-box'>
                        <input type='submit' value={isLoading ? 'Logging in' : 'Login'} className={isLoading ? 'loading' : ''} />
                    </div>
                    {/* <div className='msg'>New member? <Link to='/auth/register' className='auth-link'>Register Here</Link></div> */}
                    <div className='msg'>New member? <Link to='/register' className='auth-link'>Register Here</Link></div>
                </form>
            </div>
        </main>
    )
}

export default Login;