import React from 'react'
import { Link } from "react-router-dom"
import logo from '../images/icon-left-font-monochrome-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header () {

    function classToggle() {
        const navs = document.querySelectorAll('.navbar__items')
        navs.forEach(nav => nav.classList.toggle('navbar__toggleShow'));
      }

    return (
    <div className="navbar">
        <Link to="/home" className='navbar__link'><img src={logo} className="navbar__logo" /></Link>
        <FontAwesomeIcon onClick={classToggle} icon={faBars} className="navbar__link navbar__link--toggle" />
        <nav className="navbar__items">
            <Link to="/home" className='navbar__link'>Accueil</Link>
            <Link to="/signup" className='navbar__link'>S'inscrire</Link>
        </nav>
    </div>
    )
}

