// import '../auth.css'
// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import {useForm} from 'react-hook-form';
// import AuthService from '../../../api-service/auth.service';
// import Logo from '../../../components/logo/logo';

// function RegistrationVerfication() {

//     const { email } = useParams(); 
//     const navigate = useNavigate();
//     const {register, handleSubmit, formState} = useForm();
//     const {verifyRegistration, resendVerificationCode, isLoading, error} = AuthService()


//     const onVerify = (data) => {
//         verifyRegistration(data.code)
//     }

//     const onResend = () => {
//         resendVerificationCode(email)
//     }

//     return(
//         <main className='auth-container'>
//             <div className='auth-wrapper'>
//                 <form onSubmit={handleSubmit(onVerify)} style={{gap:'15px'}}>
//                     <Logo/>
//                     <h2>Verify your email</h2>

//                     {
//                         (error) && <p>{error}</p>
//                     }

//                     <div className='input-box'>
//                         <label>
//                             <input 
//                                 placeholder='Enter verification code'
//                                     type='text'
//                                     {...register('code', {
//                                         required: "Verification code is required!",
//                                     })}
//                             />
//                         </label>
                        
//                         {formState.errors.code && <small>{formState.errors.code.message}</small>}
//                     </div>
                    
//                     <div className='msg' style={{fontWeight: 600, fontStyle: 'italic'}}>Please note that the verification code will be expired with in 15 minutes!</div>
                    
//                     <div className='input-box'>
//                         <input type='submit' value={isLoading ? 'Verifying' : 'Verify'} className={isLoading ? 'loading' : ''}/>
//                     </div>

//                     <div className='msg'>Having problems? <span className='auth-link' onClick={onResend}>Resend code</span></div>
//                 </form>
//             </div>
//         </main>
//     )
// }

// export default RegistrationVerfication;

// last used code 
// import '../auth.css';
// import { useForm } from 'react-hook-form';
// import { useNavigate, useParams } from 'react-router-dom';
// import React, { useState, useEffect, Suspense } from 'react';
// import AuthServiceHook from "containerApp/AuthService"; // Import the hook

// // Lazy load Logo component
// const Logo = React.lazy(() => import("containerApp/Logo"));

// // // Dynamically import AuthService (as it's a module, not a React component)
// // const loadAuthService = async () => {
// //   const { default: AuthService } = await import("containerApp/AuthService");
// //   return AuthService;
// // };

// function RegistrationVerfication() {
//   const { email } = useParams();
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState } = useForm();
//   const [AuthService, setAuthService] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   // const [error, setError] = useState(null);
//   const {
//     verifyRegistration,
//     resendVerificationCode,
//     loading,
//     error,
//     setError // Assuming your hook might have a function to clear errors
//   } = AuthServiceHook();
//   const [verificationError, setVerificationError] = useState(null);

//   // // Lazy load AuthService
//   // useEffect(() => {
//   //   const fetchAuthService = async () => {
//   //     const AuthServiceModule = await loadAuthService();
//   //     setAuthService(() => AuthServiceModule);
//   //   };

//   //   fetchAuthService();
//   // }, []);

//   useEffect(() => {
//     if (error) {
//       setVerificationError(error);
//     } else if (verificationError && !loading) {
//       setVerificationError(null);
//       if (setError) {
//         setError(); // Clear the error in the hook if a clear function exists
//       }
//     }
//   }, [error, loading, verificationError, setError]);

//   // const onVerify = async (data) => {
//   //   if (AuthService) {
//   //     setIsLoading(true);
//   //     try {
//   //       const { verifyRegistration } = AuthService();
//   //       await verifyRegistration(data.code);
//   //     } catch (err) {
//   //       setError('Verification failed');
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   }
//   // };
//   const onVerify = async (data) => {
//     await verifyRegistration(data.code);
//     // The hook should handle navigation on successful verification
//   };

//   // const onResend = () => {
//   //   if (AuthService) {
//   //     const { resendVerificationCode } = AuthService();
//   //     resendVerificationCode(email);
//   //   }
//   // };
//   const onResend = () => {
//     resendVerificationCode(email);
//     // Optionally, provide feedback to the user that the code has been resent
//   };

//   return (
//     <main className='auth-container'>
//       <div className='auth-wrapper'>
//         <Suspense fallback={<div>Loading Logo...</div>}>
//           <Logo />
//         </Suspense>
//         <form onSubmit={handleSubmit(onVerify)} style={{ gap: '15px' }}>
//           <h2>Verify your email</h2>

//           {verificationError && <p>{verificationError}</p>}

//           <div className='input-box'>
//             <label>
//               <input
//                 placeholder='Enter verification code'
//                 type='text'
//                 {...register('code', {
//                   required: "Verification code is required!",
//                 })}
//               />
//             </label>

//             {formState.errors.code && <small>{formState.errors.code.message}</small>}
//           </div>

//           <div className='msg' style={{ fontWeight: 600, fontStyle: 'italic' }}>
//             Please note that the verification code will expire within 15 minutes!
//           </div>

//           <div className='input-box'>
//             <input type='submit' value={loading ? 'Verifying' : 'Verify'} className={loading ? 'loading' : ''} disabled={loading}/>
//           </div>

//           <div className='msg'>
//             Having problems?{' '}
//             <span className='auth-link' onClick={onResend} style={{ cursor: 'pointer' }}>
//               Resend code
//             </span>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

// export default RegistrationVerfication;

// new code for context sharing
import '../auth.css'
import React , {Suspense} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form';
// import AuthService from '../../../api-service/auth.service';
import AuthService from "sharedApp/AuthService";
// import Logo from '../../../components/logo/logo';

// Lazy load Logo component
const Logo = React.lazy(() => import("sharedApp/Logo"));

function RegistrationVerfication() {

    const { email } = useParams(); 
    const navigate = useNavigate();
    const {register, handleSubmit, formState} = useForm();
    const {verifyRegistration, resendVerificationCode, isLoading, error} = AuthService()


    const onVerify = (data) => {
        verifyRegistration(data.code)
    }

    const onResend = () => {
        resendVerificationCode(email)
    }

    return(
        <main className='auth-container'>
            <div className='auth-wrapper'>
                <form onSubmit={handleSubmit(onVerify)} style={{gap:'15px'}}>
                    <Suspense fallback={<div>Loading Logo...</div>}>
                      <Logo />
                    </Suspense>
                    <h2>Verify your email</h2>

                    {
                        (error) && <p>{error}</p>
                    }

                    <div className='input-box'>
                        <label>
                            <input 
                                placeholder='Enter verification code'
                                    type='text'
                                    {...register('code', {
                                        required: "Verification code is required!",
                                    })}
                            />
                        </label>
                        
                        {formState.errors.code && <small>{formState.errors.code.message}</small>}
                    </div>
                    
                    <div className='msg' style={{fontWeight: 600, fontStyle: 'italic'}}>Please note that the verification code will be expired with in 15 minutes!</div>
                    
                    <div className='input-box'>
                        <input type='submit' value={isLoading ? 'Verifying' : 'Verify'} className={isLoading ? 'loading' : ''}/>
                    </div>

                    <div className='msg'>Having problems? <span className='auth-link' onClick={onResend}>Resend code</span></div>
                </form>
            </div>
        </main>
    )
}

export default RegistrationVerfication;