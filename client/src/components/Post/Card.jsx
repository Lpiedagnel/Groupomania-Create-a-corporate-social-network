import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dateParser, isEmpty } from "../Utils"
import FollowHandler from "../Profil/FollowHandler"
import LikeButton from "./LikeButton"
import { getPosts, updatePost } from "../../actions/post.actions"
import DeleteCard from "./DeleteCard"
import CardComments from "./CardComments"

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdated, setIsUpdated] = useState(false)
  const [textUpdate, setTextUpdate] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const updateItem = async () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false)
  }

  // If users not empty stop the loading.
  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false)
  })

  return (
    <li
      className="card"
      key={post._id}
    >
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card__left">
            <img
              className="card__avatar"
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture
                    else return null
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card__right">
            <div className="card__header">
              <div className="card__name-section">
                <h3 className="card__name-title">
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId)
                        return user.firstName + " " + user.lastName
                      else return null
                    })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler
                    idToFollow={post.posterId}
                    type={"card"}
                  />
                )}
              </div>
              <span className="card__date">{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && (
              <p className="card__message">{post.message}</p>
            )}
            {isUpdated && (
              <div className="card__update">
                <textarea
                  className="card__textarea"
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="card__button-container">
                  <button
                    className="btn card__update-btn"
                    onClick={updateItem}
                  >
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img
                src={post.picture}
                alt="card-pic"
                className="card__picture"
              />
            )}
            {post.video && (
              <iframe
                className="card__video"
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {/* If the same user (or admin), he can modified the post */}
            {userData._id === post.posterId || userData.isAdmin ? (
              <div className="card__button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <i className="card__edit-btn fas fa-pencil-alt"></i>
                </div>
                <DeleteCard
                  id={post._id}
                  userId={userData._id}
                />
              </div>
            ) : null}
            <div className="card__footer">
              <div className="card__comment-ico">
                <i
                  onClick={() => setShowComments(!showComments)}
                  className="card__comment-btn fas fa-comment-dots"
                ></i>
                <span className="card__comment-span">
                  {post.comments.length}
                </span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  )
}

export default Card
