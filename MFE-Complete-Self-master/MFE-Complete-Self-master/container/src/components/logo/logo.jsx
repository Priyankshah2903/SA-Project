import './logo.css'
import React from 'react';
import {Link} from 'react-router-dom'

function Logo() {
    return <Link to='/'><h1 className='logo'><span></span>WellNexa</h1></Link>
}

export default Logo;