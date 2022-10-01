import React, { useState } from 'react'
import axios from 'axios'
import SignInForm from './SignInForm'

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  // const [pseudo, setPseudo] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [job, setJob] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    const terms = document.getElementById('terms')
    // const pseudoError = document.querySelector('.pseudo.error')
    const firstNameError = document.querySelector('.firstName.error')
    const lastNameError = document.querySelector('.lastName.error')
    const jobError = document.querySelector('.job.error')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const passwordConfirmError = document.querySelector('.password-confirm.error')
    const termsError = document.querySelector('.terms.error')


    passwordConfirmError.innerHTML = ""
    termsError.innerHTML = ""

    if (password != controlPassword || !terms.checked) {
      if (password != controlPassword)
        passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas."

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales."
    } else {
      await axios({
        method: 'post',
        // url: `${process.env.REACT_APP_API_URL}api/user/register`,
        url: 'http://localhost:4200/api/user/register',
        data: {
          firstName,
          lastName,
          job,
          email,
          password
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data.errors) {
            firstNameError.innerHTML = res.data.errors.firstName
            lastNameError.innerHTML = res.data.errors.lastName
            jobError.innerHTML = res.data.errors.job
            emailError.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password
          } else {
            setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className='success'>Enregistrement réussi, veuillez-vous connecter</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">

          {/* FirstName */}
          <label htmlFor="firstName">Prénom</label>
          <br />
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <br />
          <div className="firstName error"></div>
          <br />

          {/* LastName */}
          <label htmlFor="lastName">Nom</label>
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <br />
          <div className="lastName error"></div>
          <br />

          {/* Job */}
          <label htmlFor="job">Poste au sein de Groupomania</label>
          <br />
          <input
            type="text"
            name="job"
            id="job"
            onChange={(e) => setJob(e.target.value)}
            value={job}
          />
          <br />
          <div className="job error"></div>
          <br />

          {/* Email */}
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <div className="email error"></div>
          <br />

          {/* Password */}
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />

          {/* Password confirmation */}
          <label htmlFor="password-conf">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">Conditions générales</a></label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )
      }
    </>
  )
}

export default SignUpForm