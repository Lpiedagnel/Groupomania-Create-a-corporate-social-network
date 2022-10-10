import React from "react"
import { useContext } from "react"
import { UidContext } from "../components/AppContext"
import LeftNav from "../components/LeftNav"
import NewPostForm from "../components/Post/NewPostForm"
import Thread from "../components/Post/Thread"
import Trends from "../components/Trends"
import FriendsHint from "../components/Profil/FriendsHint"
import Welcome from "../components/Welcome"

const Home = () => {
  const uid = useContext(UidContext)

  return (
    <div className="main-container">
      <LeftNav />
      <div className="home">
        {uid ? (
          <>
            <div className="home__header">
              <NewPostForm />
            </div>
            <div className="home__thread-container">
              <Thread />
            </div>
            <div className="home__right-side">
              <div className="home__right-side-container">
                <div className="home__wrapper">{uid && <FriendsHint />}</div>
              </div>
            </div>
          </>
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  )
}

export default Home
