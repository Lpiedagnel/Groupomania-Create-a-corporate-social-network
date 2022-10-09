import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../actions/post.actions"
import { isEmpty } from "../Utils"
import Card from "../Post/Card"

const AdminPosts = () => {

  const posts = useSelector((state) => state.postReducer)
  
    return (
      <div className="admin-posts">
        <h2 className="admin_posts__title">Tous les messages</h2>
        <div className="admin-posts__container">
          <ul className="admin-posts__list">
          {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return (
              <Card
                post={post}
                key={post._id}
              />
            )
          })}
          </ul>
        </div>
      </div>
    )
}

export default AdminPosts