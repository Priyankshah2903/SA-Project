import { Link } from "react-router-dom";
import success from "../../../assets/images/icons/success.gif"
// import Logo from "../../../components/logo/logo";
import React,{Suspense} from "react";
import "../register/registeration.success.css"

// Lazy load Logo component
const Logo = React.lazy(() => import("sharedApp/Logo"));

function RegistrationSuccessful() {
    return(

        <main className='order-success'>
            <div className='order-success-box'>
                <Suspense fallback={<div>Loading Logo...</div>}>
                    <Logo />
                </Suspense>
                <img src={success} size='20px' alt="Registration Successful"/>
                <h4 style={{ textAlign: "center", color: "green" }}>
                    Congratulations, Your account has been successfully created!
                </h4>
                {/* <Link to='/auth/login'><button>Login now</button></Link> */}
                <Link to='/login'><button>Login now</button></Link>
            </div>
        </main>
    )
}

export default RegistrationSuccessful;