import React from 'react'
import { Link } from "react-router-dom"
import logo from '../images/icon-left-font-monochrome-white.png'

export default function Header () {

    function toggleNavbar() {
        console.log("Hello world")
        const x = document.getElementById('nav')
        if (x.className === 'nav') {
            x.className += " responsive"
        } else {
            x.className = "nav"
        }
        console.log(x.className)
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <nav className='nav' id="nav">
                {/* <Link to="/" className='nav__link'>
                    <img className='nav__logo' src={logo} />
                </Link> */}
                <Link to="/" className="nav__link"><h1 className='nav__brand'>Groupomania</h1></Link>
                <Link to="/" className='nav__link'>Accueil</Link>
                <Link to="/signup" className='nav__link'>S'inscrire</Link>
                <Link to="/login" className='nav__link'>Se connecter</Link>
                <Link to="#" className='nav__link nav__icon' onClick={toggleNavbar}><i className='fa fa-bars'></i></Link>
            </nav>
        </div>
    )
}

