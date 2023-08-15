module.exports.signUpErrors = (err) => {
  
  let errors = { firstName: "", lastName: "", job: "", email: "", password: "" }

  if (err.message.includes("firstName"))
    errors.firstName = "Le prénom doit faire entre 3 et 55 caractères"

  if (err.message.includes("lastName"))
    errors.lastName = "Le nom doit faire entre 3 et 55 caractères"

  if (err.message.includes("job"))
    errors.job = "L'intitulé du poste doit faire entre 3 et 55 caractères"

  if (err.message.includes("email")) errors.email = "Email incorrect"

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum"

  if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà pris"

  return errors
}

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" }

  if (err.message.includes("email")) errors.email = "Email inconnu"

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas"

  return errors
}
