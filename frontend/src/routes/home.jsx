import React from 'react'
import { Navigate } from "react-router-dom"

import PostForm from "../components/PostForm"

export default function Home() {
    // Check if user is connected with Localstorage. Else: redirect to login page
    if (localStorage.getItem("authenticated")) {
        console.log('L\'utilisateur est connecté.')
        return (
            <div className='container'>
                <h1>Bienvenue sur votre mur !</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet voluptates, aperiam veritatis non atque vel blanditiis quam ipsam vero! Illo dicta ut culpa quaerat officiis laudantium, architecto libero possimus itaque.</p>
                <PostForm />
            </div>
        )
    } else {
        console.log('L\'utilisateur n\'est pas connecté.')
        return <Navigate replace to="/login" />
    }
}