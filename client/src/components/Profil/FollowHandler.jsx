import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { followUser, unfollowUser } from "../../actions/user.actions"
import { isEmpty } from "../Utils"

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer)
  const [isFollowed, setIsFollowed] = useState(false)
  const dispatch = useDispatch()

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow))
    setIsFollowed(true)
  }

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow))
    setIsFollowed(false)
  }

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true)
      } else setIsFollowed(false)
    }
  }, [userData, idToFollow])

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type == "suggestion" && (
            <button className="btn follow-handler__suggestion follow-handler__suggestion--unfollow">Abonné</button>
          )}
          {type == "card" && (
            <i className="follow-handler__card fas fa-check-circle"></i>
          )}
        </span>
      )}
      {isFollowed == false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type == "suggestion" && (
            <button className="btn follow-handler__suggestion">Suivre</button>
          )}
          {type == "card" && (
            <i className="follow-handler__card far fa-check-circle"></i>
          )}
        </span>
      )}
    </>
  )
}

export default FollowHandler
