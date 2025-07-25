import { useState } from "react"
import API_BASE_URL from "./apiConfig";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AuthService() {
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    console.log("inside auth service shared-app");

    const login = async (email, password) => {
        console.log(email, password)
        setLoading(true)
        await axios.post(`${API_BASE_URL}/auth-service/auth/signin`, { email: email, password: password })
            .then((response) => {
                console.log("success");
                if (response.data.response.token) {
                    setResponse(true);
                    setError(null)
                    localStorage.setItem("user", JSON.stringify(response.data.response));
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error)
                setResponse(null)
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                if (resMessage == "Bad credentials") {
                    setError("Invalid email or password!");
                } else {
                    setError("Unable to perform login now. Try again later!");
                }
            })
        setLoading(false)
    }

    // new function
    // const login = async (email, password) => {
    //             console.log(email, password);
    //             setLoading(true);
    //             try {
    //                 const response = await axios.post(`${API_BASE_URL}/auth-service/auth/signin`, {
    //                     email: email,
    //                     password: password
    //                 });
        
    //                 if (response.data.response && response.data.response.token) {
    //                     setResponse(true);
    //                     setError(null);
    //                     localStorage.setItem("user", JSON.stringify(response.data.response));
    //                     return true;
    //                 }
    //                 return false;
    //             } catch (error) {
    //                 console.log(error);
    //                 setResponse(null);
    //                 const resMessage = (error.response && error.response.data && error.response.data.message)
    //                     || error.message
    //                     || error.toString();
        
    //                 if (resMessage == "Bad credentials") {
    //                     setError("Invalid email or password!");
    //                 } else {
    //                     setError("Unable to perform login now. Try again later!");
    //                 }
    //                 return false;
    //             } finally {
    //                 setLoading(false);
    //             }
    //     };

    const save = async (userName, email, password) => {
        setLoading(true)
        await axios.post(`${API_BASE_URL}/auth-service/auth/signup`, { userName, email, password })
            .then((response) => {
                console.log(response.data)
                if (response.data.success) {
                    setResponse(true);
                    setError(null)
                    // navigate(`/auth/userRegistrationVerfication/${email}`);
                    navigate(`/userRegistrationVerfication/${email}`);
                }
            })
            .catch((error) => {
                console.error(error)
                setResponse(null)
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError("Unable to perform register now. Try again later!");
                }
            })
        setLoading(false)
    }

    const verifyRegistration = async (verificationCode) => {
        setLoading(true)
        await axios.get(`${API_BASE_URL}/auth-service/auth/signup/verify`, {
                params: {
                    code: verificationCode
                }
            })
            .then((response) => {
                console.log(response.data)
                if (response.data.success) {
                    setResponse(true);
                    setError(null)
                    // navigate(`/auth/success-registration`);
                    navigate(`/success-registration`);
                }
            })
            .catch((error) => {
                console.error(error)
                setResponse(null)
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError("Unable to perform verify now. Try again later!");
                }
            })
        setLoading(false)
    }

    const resendVerificationCode = async (email) => {
        await axios.get(`${API_BASE_URL}/auth-service/auth/signup/resend`, {
                params: {
                    email: email
                }
            })
            .then((response) => {
                console.log(response.data)
                if (response.data.success) {
                    setResponse(true);
                    setError(null)
                }
            })
            .catch((error) => {
                console.error(error)
                setResponse(null)
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError("Unable to resend code now. Try again later!");
                }
            })
    }

    return {login, save, verifyRegistration, resendVerificationCode, isLoading, response, error};
    
}

export default AuthService;