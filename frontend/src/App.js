import React from "react"
import { BrowserRouter } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import LoginForm from "./components/LoginForm"
import Header from "./components/Header"

export default function App() {
    return (
        <div className="container">
          <Header />
          <Outlet />
        </div>
    )
}