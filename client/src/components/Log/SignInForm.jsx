import React, { useState } from "react"
import axios from "axios"

const SignInForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    const emailError = document.querySelector(".signin__error--email")
    const passwordError = document.querySelector(".signin__error--password")

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email
          passwordError.innerHTML = res.data.errors.password
        } else {
          window.location = "/"
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <form
      action=""
      onSubmit={handleLogin}
      id="sign-up-form"
      className="signin__form"
    >
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="signin__input"
      />
      <div className="signin__error signin__error--email"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="signin__input"
      />
      <div className="signin__error signin__error--password"></div>
      <br />
      <input
        type="submit"
        value="Se connecter"
        className="signin__submit btn"
      />
    </form>
  )
}

export default SignInForm
