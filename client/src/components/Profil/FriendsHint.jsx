import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { isEmpty } from "../Utils"
import FollowHandler from "./FollowHandler"

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [playOnce, setPlayOnce] = useState(true)
  const [friendsHint, setFriendsHint] = useState()
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)

  useEffect(() => {
    const notFriendList = () => {
      let array = []
      usersData.map((user) => {
        if (user._id !== userData._id && !user.followers.includes(userData._id))
          return array.push(user._id)
      })
      array.sort(() => 0.5 - Math.random())
      if (window.innerHeight > 780) {
        array.length = 5
      } else if (window.innerHeight > 720) {
        array.length = 4
      } else if (window.innerHeight > 615) {
        array.length = 3
      } else if (window.innerHeight > 540) {
        array.length = 1
      } else {
        array.length = 0
      }

      setFriendsHint(array)
    }

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList()
      setIsLoading(false)
      setPlayOnce(false)
    }
  }, [usersData, userData, playOnce])

  return (
    <div className="friends-hint">
      <h4 className="friends-hint__title">Suggestions</h4>
      {isLoading ? (
        <div className="friends-hint__loading-container">
          <i className="friends-hint__loading-icon fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul className="friends-hint__list">
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <>
                    <li
                      className="friends-hint__item"
                      key={user}
                    >
                      <img
                      className="friends-hint__avatar"
                        src={usersData[i].picture}
                        alt="user-pic"
                      />
                      <p className="friends-hint__name">{usersData[i].firstName} {usersData[i].lastName}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={"suggestion"}
                      />
                      
                    </li>
                    <hr className="friends-hint__hr" />
                    </>
                  )
                }
              }
            })}
        </ul>
      )}
    </div>
  )
}

export default FriendsHint
