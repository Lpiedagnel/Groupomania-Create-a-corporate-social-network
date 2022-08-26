import React from 'react'

export default function () {
    return (
        <div className="register">
            <div className="register__body">
                <div className="register__firstname">
                    <label className="register__label" for="firstName">Prénom </label>
                    <input className="register__input" type="text" id="firstName" placeholder="Votre prénom"/>
                </div>
                <div className="register__lastname">
                    <label className="register__label" for="lastName">Nom </label>
                    <input  type="text" name="" id="lastName"  className="register__input"placeholder="Votre nom"/>
                </div>
                <div className="register__email">
                    <label className="register__label" for="email">Email </label>
                    <input  type="email" id="email" className="register__input" placeholder="Votre adresse mail"/>
                </div>
                <div className="register__job">
                    <label className="register__label" for="email">Emploi </label>
                    <input  type="email" id="job" className="register__input" placeholder="Votre fonction dans l'entreprise"/>
                </div>
                <div className="register__password">
                    <label className="register__label" for="password">Mot de passe</label>
                    <input className="register__input" type="password"  id="password" placeholder="Votre mot de passe"/>
                </div>
            </div>
            <div class="register__bottom">
                <button type="submit" class="register__submit">Enregistrement</button>
            </div>
        </div>      
    )
}