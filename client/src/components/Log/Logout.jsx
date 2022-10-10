import React from "react"
import axios from "axios"
import cookie from "js-cookie"

const Logout = () => {
  // Function to remove cookie
  const removeCookie = (key) => {
    if (window != "undefined") {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err))

    window.location = "/"
  }

  return (
    <>
    <li
      className="navbar__item navbar__item--desktop navbar__logout"
      onClick={logout}
    >
      Se déconnecter
    </li>
    <li
      className="navbar__item navbar__item--responsive navbar__logout"
      onClick={logout}
    >
      <i class="fas fa-sign-out-alt"></i>
    </li>
    </>
  )
}

export default Logout
