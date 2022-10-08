import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addComment, getPosts } from "../../actions/post.actions"
import FollowHandler from "../Profil/FollowHandler"
import { isEmpty, timestampParser } from "../Utils"
import EditDeleteComment from "./EditDeleteComment"

const CardComments = ({ post }) => {
  const [text, setText] = useState("")
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""))
    }
  }

  return (
    <div className="comment__section">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment__card comment__card--user"
                : "comment__card"
            }
            key={comment._id}
          >
            <div className="comment__left-part">
              <img
                className="comment__avatar"
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture
                      else return null
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="comment__right-part">
              <div className="comment__header">
                <div className="comment__name-section">
                  <h3 className="comment__name-title">
                    {
                      // Get firstName and lastName
                      !isEmpty(usersData[0]) &&
                        usersData.map((user) => {
                          if (user._id === comment.commenterId)
                            return user.firstName + " " + user.lastName
                          else return null
                        })
                    }
                  </h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type={"card"}
                    />
                  )}
                </div>
                <span className="comment__date">{timestampParser(comment.timestamp)}</span>
              </div>
              <p className="comment__message">{comment.text}</p>
              <EditDeleteComment
                comment={comment}
                postId={post._id}
              />
            </div>
          </div>
        )
      })}
      {userData._id && (
        <form
          action=""
          onSubmit={handleComment}
          className="comment__form"
        >
          <input
          className="comment__input"
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input
          className="comment__btn btn"
            type="submit"
            value="Envoyer"
          />
        </form>
      )}
    </div>
  )
}

export default CardComments
