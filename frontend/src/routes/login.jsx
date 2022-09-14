import React from 'react'
import Header from '../components/Header'
import LoginForm from '../components/LoginForm'

export default function Login () {
    return (
        <div className='container'>
            <h1>Se connecter</h1>
            <LoginForm />
        </div>
    )
}