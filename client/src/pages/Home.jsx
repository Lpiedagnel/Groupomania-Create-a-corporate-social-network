import React from "react"
import { useContext } from "react"
import { UidContext } from "../components/AppContext"
import LeftNav from "../components/LeftNav"
import NewPostForm from "../components/Post/NewPostForm"
import Thread from "../components/Post/Thread"
import Log from "../components/Log"
import Trends from "../components/Trends"
import FriendsHint from "../components/Profil/FriendsHint"

const Home = () => {
  const uid = useContext(UidContext)

  return (
    <div className="main-container">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {uid ? (
            <NewPostForm />
          ) : (
            <Log
              signin={true}
              signup={false}
            />
          )}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
