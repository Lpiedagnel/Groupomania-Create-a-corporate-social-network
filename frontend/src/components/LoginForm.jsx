import React, { useEffect, useState } from 'react'

export default function LoginForm () {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
          let res = await fetch("http://localhost:4200/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
          })
          let resJson = await res.json()
          if (res.status === 200) {
            console.log(resJson)
          } else {
            console.log(resJson)
          }
        } catch (err) {
          console.log(err);
        }
      }


    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="login__body">
                <div className="login__email">
                    <label className="login__label" for="email">Email </label>
                    <input  type="email" id="email" className="login__input" placeholder="Votre adresse mail" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="login__password">
                    <label className="login__label" for="password">Mot de passe</label>
                    <input className="login__input" type="password"  id="password" placeholder="Votre mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div class="login__bottom">
                <button type="submit" class="login__submit">Connexion</button>
            </div>
        </form>      
    )
}