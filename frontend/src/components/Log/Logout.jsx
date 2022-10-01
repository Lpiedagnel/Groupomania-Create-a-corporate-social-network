import React from 'react'
import axios from 'axios'
import cookie from "js-cookie"

const Logout = () => {

    // Function to remove cookie
    const removeCookie = (key) => {
        if (window != "undefined") {
            cookie.remove(key, {expires: 1})
        }
    }

    const logout = async () => {
        await axios({
            method: "get",
            // url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            url: 'http://localhost:4200/api/user/logout',
            withCredentials: true
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err))

        window.location = "/"
    }

  return (
    <li onClick={logout}>Se déconnecter</li>
  )
}

export default Logout