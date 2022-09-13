import React from 'react'
import { Link } from "react-router-dom";

export default function Header () {
    return (
        <nav>
            <h1>Groupomania</h1>
            <Link to="/">Accueil</Link>
            <Link to="/signup">S'inscrire</Link>
            <Link to="/login">Se connecter</Link>
        </nav>
    )
}