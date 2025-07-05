import React, { useContext } from 'react';
// import { AuthContext } from '../../contexts/auth.context';
import { AuthContext } from "containerApp/AuthContext";
import './hero.css'
import {Link} from 'react-router-dom'
import { useAuth } from "containerApp/AuthContext"; // Import the hook
// import { useCart } from "../../context/cart.contect"; // Import the hook

function Hero() {
    
    const {user, toggleUser} = useAuth();//useContext(AuthContext)

    return(
        <section className="hero-section" id='hero'>
            <h1>Welcome to leading health and wellness retailer.</h1>

            <h3>We believe in pure, natural goodness - plain and simple. We aim to partner with you on your unique wellness journey while honoring people and the planet in all that we do.</h3>
            <div>
                <Link to='/products'><button>Shop now</button></Link>
                
            </div>
        </section>
    )
}



export default Hero;