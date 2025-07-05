// import '../auth.css'
// import {useRef} from 'react';
// import {useForm} from 'react-hook-form';
// import { Link} from 'react-router-dom';
// import React, { useState, useEffect, Suspense } from 'react';
// // import AuthService from '../../../api-service/auth.service';
// // import Logo from '../../../components/logo/logo';

// // Lazy load Logo component
// const Logo = React.lazy(() => import("containerApp/Logo"));

// // Dynamically import AuthService (as it's a module, not a React component)
// const loadAuthService = async () => {
//     const { default: AuthService } = await import("containerApp/AuthService");
//     return AuthService;
//   };

// function Register() {
//     const [AuthService, setAuthService] = useState(null);

//     const {register, handleSubmit,formState, watch} = useForm();
//     const password = useRef({});
//     password.current = watch('password', "");
//     const {save, isLoading, error} = AuthService()


//     // Lazy load AuthService
//     useEffect(() => {
//     const fetchAuthService = async () => {
//         const AuthServiceModule = await loadAuthService();
//         setAuthService(() => AuthServiceModule);
//     };

//     fetchAuthService();
//     }, []);

//     const onSubmit = async (data) => {
//         if (AuthService) {
//           setIsLoading(true);
//           try {
//             const { save, isLoading: serviceLoading, error: serviceError } = AuthService();
    
//             // Call the save method from AuthService to register the user
//             await save(data.username, data.email, data.password);
    
//             // Handle success, update user state or handle any further logic
//             setUser({ token: 'some_token' }); // Example of setting user token
//           } catch (err) {
//             setError('Registration failed');
//           } finally {
//             setIsLoading(false);
//           }
//         } else {
//           console.error("AuthService not loaded.");
//         }
//     };


//     // const onSubmit = (data) => {
//     //     save(data.username, data.email, data.password)
//     // }


//     return(
//         <main className='auth-container'>
//             <div className='auth-wrapper'>
//                 <Suspense fallback={<div>Loading Logo...</div>}>
//                     <Logo />
//                 </Suspense>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <h2>Register now!</h2>
//                     {
//                         error && <p>{error}</p>
//                     }

//                     <div className='input-box'>
//                         <label>
//                             <input 
//                                 type='text'
//                                 placeholder='Username'
//                                 {...register('username', {
//                                     required: "Username is required!",
//                                     maxLength: {
//                                         value: 20,
//                                         message: "Username cannot have more than 20 characters!"
//                                     },
//                                     minLength: {
//                                         value: 3,
//                                         message: "Username must have atleast 3 characters!"
//                                     }
//                                 })}
//                             />
//                         </label>
                        
//                         {formState.errors.username && <small>{formState.errors.username.message}</small>}
//                     </div>
                    
                    
//                     <div className='input-box'>
//                         <label>
//                             <input 
//                                 type='text'
//                                 placeholder='Email address'
//                                 {...register('email', {
//                                     required: "Email is required!",
//                                     pattern: {value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message:"Invalid email address!"}
//                                 })}
//                             />
//                         </label>
                        
//                         {formState.errors.email && <small>{formState.errors.email.message}</small>}
//                     </div>
                    
//                     <div className='input-box'>
//                         <label>
//                             <input 
//                                 type='password'
//                                 placeholder='Password'
//                                 {
//                                     ...register('password', {
//                                         required: 'Password is required!',
//                                         minLength: {
//                                             value:8,
//                                             message: "Password must have atleast 8 characters!"
//                                         },
//                                         maxLength: {
//                                             value: 20,
//                                             message: "Password cannot have more than 20 characters!"
//                                         }
//                                     })
//                                 }
//                             />
//                         </label>
                        
//                         {formState.errors.password && <small>{formState.errors.password.message}</small>}
//                     </div>

//                     <div className='input-box'>
//                         <input 
//                             type='password'
//                             placeholder='Confirm password'
//                             {
//                                 ...register('cpassword', {
//                                     required: 'Confirm password is required!',
//                                     minLength: {
//                                         value:8,
//                                         message: "Password must have atleast 8 characters!"
//                                     },
//                                     maxLength: {
//                                         value: 20,
//                                         message: "Password cannot have more than 20 characters!"
//                                     },
//                                     validate: cpass => cpass === password.current || "Passwords do not match!"
//                                 })
//                             }
//                         />
//                         {formState.errors.cpassword && <small>{formState.errors.cpassword.message}</small>}
//                     </div>

                    
//                     <div className='input-box'>
//                         <input type='submit' value={isLoading ? 'Registering' : 'Register'} className={isLoading ? 'loading' : ''}/>
//                     </div>
//                     <div className='msg'>By clicking Register, you are agree to our user agreement and privacy policy.</div>
//                     <div className='msg'>Already a member? <Link to='/auth/login' className='auth-link'>Login Here</Link></div>
//                 </form>
//             </div>
//         </main>
//     )
// }

// export default Register;


// import "../auth.css";
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import React, { useState, useEffect, Suspense, useRef } from 'react'; 
// import AuthServiceHook from "containerApp/AuthService"; // Import the hook


// // Lazy load Logo component
// const Logo = React.lazy(() => import("containerApp/Logo"));

// // // Dynamically import AuthService (as it's a module, not a React component)
// // const loadAuthService = async () => {
// //   const { default: AuthService } = await import("containerApp/AuthService");
// //   return AuthService;
// // };

// function Register() {
//   // const [AuthService, setAuthService] = useState(null);
//   const { register: formRegister, handleSubmit, formState, watch } = useForm(); // Renamed to avoid conflict
//   const password = useRef({});
//   password.current = watch('password', "");
//   const [user, setUser] = useState(null);
//   // const [error, setError] = useState(null);
//   // const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { save, isLoading: loading, error, setError } = AuthServiceHook(); // Destructure 'save' and rename 'isLoading'

//   // Lazy load AuthService
//   // useEffect(() => {
//   //   const fetchAuthService = async () => {
//   //     const AuthServiceModule = await loadAuthService();
//   //     setAuthService(() => AuthServiceModule);
//   //   };

//   //   fetchAuthService();
//   // }, []);

//   // const onSubmit = async (data) => {
//   //   if (AuthService) {
//   //     setIsLoading(true);
//   //     try {
//   //       const { save } = AuthService();
        
//   //       // Call the save method from AuthService to register the user
//   //       await save(data.username, data.email, data.password);
        
//   //       // Handle success, update user state or handle any further logic
//   //       setUser({ token: 'some_token' }); // Example of setting user token
//   //       navigate("/");  // Navigate to the homepage after registration
//   //     } catch (err) {
//   //       setError('Registration failed',err);
//   //       console.log("Reg Error: ",err)
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   } else {
//   //     console.error("AuthService not loaded.");
//   //   }
//   // };

//   useEffect(() => {
//     if (user && user.token) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     if (!loading && !error && localStorage.getItem("user")) {
//       setUser(JSON.parse(localStorage.getItem("user")));
//     }
//   }, [loading, error]);

//   // const onSubmit = async (data) => {
//   //   setIsLoading(true);
//   //   try {
//   //       const { save } = AuthService(); // Get the save function from AuthService
//   //       await save(data.username, data.email, data.password);
//   //       setUser({ token: 'some_token' }); // Example of setting user token
//   //       navigate("/");
//   //   } catch (err) {
//   //       setError('Registration failed');
//   //       console.log("Reg Error: ", err);
//   //   } finally {
//   //       setIsLoading(false);
//   //   }

//   const onSubmit = async (data) => {
//     await save(data.username, data.email, data.password);
//     // The AuthServiceHook should handle setting loading and error states internally
//     // and potentially updating localStorage on success.
//   // }
// };

//   return (
//     <main className="auth-container">
//       <div className="auth-wrapper">
//         <Suspense fallback={<div>Loading Logo...</div>}>
//           <Logo />
//         </Suspense>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <h2>Register now!</h2>
//           {error && <p>{error}</p>}

//           <div className="input-box">
//             <label>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 {...formRegister('username', {
//                   required: "Username is required!",
//                   maxLength: {
//                     value: 20,
//                     message: "Username cannot have more than 20 characters!"
//                   },
//                   minLength: {
//                     value: 3,
//                     message: "Username must have atleast 3 characters!"
//                   }
//                 })}
//               />
//             </label>
//             {formState.errors.username && <small>{formState.errors.username.message}</small>}
//           </div>

//           <div className="input-box">
//             <label>
//               <input
//                 type="text"
//                 placeholder="Email address"
//                 {...formRegister('email', {
//                   required: "Email is required!",
//                   pattern: {
//                     value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//                     message: "Invalid email address!"
//                   }
//                 })}
//               />
//             </label>
//             {formState.errors.email && <small>{formState.errors.email.message}</small>}
//           </div>

//           <div className="input-box">
//             <label>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 {...formRegister('password', {
//                   required: 'Password is required!',
//                   minLength: {
//                     value: 8,
//                     message: "Password must have atleast 8 characters!"
//                   },
//                   maxLength: {
//                     value: 20,
//                     message: "Password cannot have more than 20 characters!"
//                   }
//                 })}
//               />
//             </label>
//             {formState.errors.password && <small>{formState.errors.password.message}</small>}
//           </div>

//           <div className="input-box">
//             <input
//               type="password"
//               placeholder="Confirm password"
//               {...formRegister('cpassword', {
//                 required: 'Confirm password is required!',
//                 minLength: {
//                   value: 8,
//                   message: "Password must have atleast 8 characters!"
//                 },
//                 maxLength: {
//                   value: 20,
//                   message: "Password cannot have more than 20 characters!"
//                 },
//                 validate: cpass => cpass === password.current || "Passwords do not match!"
//               })}
//             />
//             {formState.errors.cpassword && <small>{formState.errors.cpassword.message}</small>}
//           </div>

//           <div className="input-box">
//             <input
//               type="submit"
//               value={loading ? 'Registering' : 'Register'}
//               className={loading ? 'loading' : ''}
//               disabled={loading}
//             />
//           </div>
//           <div className="msg">By clicking Register, you are agree to our user agreement and privacy policy.</div>
//           <div className="msg">
//             {/* Already a member? <Link to="/auth/login" className="auth-link">Login Here</Link> */}
//             Already a member? <Link to="/login" className="auth-link">Login Here</Link>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

// export default Register;

// new code for context sharing
import '../auth.css'
import React, {useRef, Suspense} from 'react';
import {useForm} from 'react-hook-form';
import { Link} from 'react-router-dom';
// import AuthService from '../../../api-service/auth.service';
import AuthService from "sharedApp/AuthService";
// import Logo from '../../../components/logo/logo';

// Lazy load Logo component
const Logo = React.lazy(() => import("sharedApp/Logo"));


function Register() {

    const {register, handleSubmit,formState, watch} = useForm();
    const password = useRef({});
    password.current = watch('password', "");
    const {save, isLoading, error} = AuthService()


    const onSubmit = (data) => {
        save(data.username, data.email, data.password)
    }


    return(
        <main className='auth-container'>
            <div className='auth-wrapper'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Suspense fallback={<div>Loading Logo...</div>}>
                      <Logo />
                    </Suspense>
                    <h2>Register now!</h2>
                    {
                        error && <p>{error}</p>
                    }

                    <div className='input-box'>
                        <label>
                            <input 
                                type='text'
                                placeholder='Username'
                                {...register('username', {
                                    required: "Username is required!",
                                    maxLength: {
                                        value: 20,
                                        message: "Username cannot have more than 20 characters!"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Username must have atleast 3 characters!"
                                    }
                                })}
                            />
                        </label>
                        
                        {formState.errors.username && <small>{formState.errors.username.message}</small>}
                    </div>
                    
                    
                    <div className='input-box'>
                        <label>
                            <input 
                                type='text'
                                placeholder='Email address'
                                {...register('email', {
                                    required: "Email is required!",
                                    pattern: {value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message:"Invalid email address!"}
                                })}
                            />
                        </label>
                        
                        {formState.errors.email && <small>{formState.errors.email.message}</small>}
                    </div>
                    
                    <div className='input-box'>
                        <label>
                            <input 
                                type='password'
                                placeholder='Password'
                                {
                                    ...register('password', {
                                        required: 'Password is required!',
                                        minLength: {
                                            value:8,
                                            message: "Password must have atleast 8 characters!"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Password cannot have more than 20 characters!"
                                        }
                                    })
                                }
                            />
                        </label>
                        
                        {formState.errors.password && <small>{formState.errors.password.message}</small>}
                    </div>

                    <div className='input-box'>
                        <input 
                            type='password'
                            placeholder='Confirm password'
                            {
                                ...register('cpassword', {
                                    required: 'Confirm password is required!',
                                    minLength: {
                                        value:8,
                                        message: "Password must have atleast 8 characters!"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Password cannot have more than 20 characters!"
                                    },
                                    validate: cpass => cpass === password.current || "Passwords do not match!"
                                })
                            }
                        />
                        {formState.errors.cpassword && <small>{formState.errors.cpassword.message}</small>}
                    </div>

                    
                    <div className='input-box'>
                        <input type='submit' value={isLoading ? 'Registering' : 'Register'} className={isLoading ? 'loading' : ''}/>
                    </div>
                    <div className='msg'>By clicking Register, you are agree to our user agreement and privacy policy.</div>
                    {/* <div className='msg'>Already a member? <Link to='/auth/login' className='auth-link'>Login Here</Link></div> */}
                    <div className='msg'>Already a member? <Link to='/login' className='auth-link'>Login Here</Link></div>
                </form>
            </div>
        </main>
    )
}

export default Register;