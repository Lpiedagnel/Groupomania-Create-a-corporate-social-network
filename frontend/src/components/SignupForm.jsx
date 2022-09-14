import React, { useEffect, useState } from 'react'

export default function SignupForm () {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [job, setJob] = useState("")
    const [password, setPassword] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
          let res = await fetch("http://localhost:4200/api/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                job: job,
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
        <form className="register" onSubmit={handleSubmit}>
            <div className="register__body">
                <div className="register__firstname">
                    <label className="register__label" for="firstName">Prénom </label>
                    <input className="register__input" type="text" id="firstName" placeholder="Votre prénom" onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="register__lastname">
                    <label className="register__label" for="lastName">Nom </label>
                    <input  type="text" name="" id="lastName"  className="register__input"placeholder="Votre nom" onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="register__email">
                    <label className="register__label" for="email">Email </label>
                    <input  type="email" id="email" className="register__input" placeholder="Votre adresse mail" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="register__job">
                    <label className="register__label" for="email">Emploi </label>
                    <input  type="text" id="job" className="register__input" placeholder="Votre fonction dans l'entreprise" onChange={(e) => setJob(e.target.value)}/>
                </div>
                <div className="register__password">
                    <label className="register__label" for="password">Mot de passe</label>
                    <input className="register__input" type="password"  id="password" placeholder="Votre mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div class="register__bottom">
                <button type="submit" class="register__submit">Enregistrement</button>
            </div>
        </form>      
    )
}