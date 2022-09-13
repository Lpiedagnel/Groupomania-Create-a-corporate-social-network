import React from 'react'
import Header from '../components/Header'
import SignupForm from '../components/SignupForm'

export default function Signup () {
    return (
        <div className='container'>
            <h1>S'inscrire</h1>
            <SignupForm />
        </div>
    )
}