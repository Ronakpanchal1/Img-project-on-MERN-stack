import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./App.css"
export default function Navbar() {

    const history = useNavigate()

    const removeToken = () => {
        localStorage.removeItem('token')
        history('/login')
    }
    return (
        <div className='Navbar'>
            <div className="logo"><Link to="/" className='link'>ImgProject</Link></div>
            <div className="navbtns">
                <Link to="/getUser" className='link'>Your info</Link>
                <li className='logout' onClick={removeToken}>Logout</li>
            </div>
        </div>
    )
}
