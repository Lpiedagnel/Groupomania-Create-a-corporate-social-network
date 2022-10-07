import React, { useContext, useEffect, useState } from "react"
import { UidContext } from "../AppContext"
import "reactjs-popup/dist/index.css"
import { useDispatch } from "react-redux"
import { likePost, unlikePost } from "../../actions/post.actions"

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true)
  }

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false)
  }

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true)
    else setLiked(false)
  }, [uid, post.likers, liked])

  return (
    <div className="like-container">
      {uid && liked === false && (
        <i
          onClick={like}
          class="fa-regular fa-heart"
        ></i>
      )}
      {uid && liked === true && (
        <i
          onClick={unlike}
          class="fa-solid fa-heart"
        ></i>
      )}
      <span>{post.likers.length}</span>
    </div>
  )
}

export default LikeButton
